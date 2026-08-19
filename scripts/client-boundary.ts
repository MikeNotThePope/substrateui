import { readFile, readdir, writeFile } from "fs/promises"
import { join } from "path"

/**
 * Which built files are client references, decided from the real chunk graph.
 *
 * `"use client"` marks *every* export of a module, and esbuild's `splitting`
 * means the module a consumer imports is not the module we wrote. Prepending
 * the directive to every `.js` in `dist` — which is what this build did until
 * now — therefore published `cn` and every `cva` recipe as client references.
 * A consumer calling one from a server component gets
 *
 *   Attempted to call cn() from the server but cn is on the client.
 *
 * at request time, which no build, `tsc` or lint run can see.
 *
 * The directive still cannot go in the source and survive: `treeshake` runs a
 * rollup pass that strips module-level directives, so it has to be written
 * after the build. What changes here is *which* files get it.
 *
 * A file needs the directive when it defines client code — when any source
 * module bundled into it carried `"use client"`. It also needs it when it
 * re-exports from a file that does, because a re-export through a client
 * module is still a client reference. Nothing else does: server-safe code that
 * merely *renders* a client component is server-safe, and marking it would
 * push the boundary up rather than leave it where it belongs.
 */

const DIRECTIVE = '"use client";'

/** esbuild's metafile, narrowed to the two fields this reads. */
interface Metafile {
  outputs: Record<string, { inputs: Record<string, unknown> }>
}

/** One built file, with the reason it is or isn't a client reference. */
export interface OutputVerdict {
  /** Path relative to the dist directory, e.g. `index.js`. */
  file: string
  /** Does this file need `"use client"`? */
  client: boolean
  /** Source modules bundled in that carried the directive. */
  clientInputs: string[]
  /** Source modules bundled in that did not. */
  serverInputs: string[]
  /** Files this one re-exports from, which propagate client-ness. */
  reExports: string[]
}

const isClientSource = async (path: string) => {
  const src = await readFile(path, "utf-8")
  return /^\s*(["'])use client\1/.test(src)
}

/** `export { a } from "./chunk-X.js"` and `export * from "./chunk-X.js"`. */
const RE_EXPORT = /\bexport\s*(?:\*|\{[^}]*\})\s*(?:as\s+\w+\s*)?from\s*["']\.\/([^"']+)["']/g

/**
 * Classify every `.js` in `distDir` against the metafile esbuild wrote.
 *
 * Returns one verdict per file, ordered as `readdir` gave them. Both the build
 * and `audit:boundary` call this, so the rule that writes the directives is the
 * same rule that checks them.
 */
export async function classify(distDir = "dist"): Promise<OutputVerdict[]> {
  const metafile = JSON.parse(
    await readFile(join(distDir, "metafile-esm.json"), "utf-8")
  ) as Metafile

  const files = (await readdir(distDir)).filter((f) => f.endsWith(".js"))
  const verdicts = new Map<string, OutputVerdict>()

  for (const file of files) {
    const entry = metafile.outputs[`${distDir}/${file}`]
    const inputs = Object.keys(entry?.inputs ?? {}).filter(
      (i) => !i.includes("node_modules")
    )
    const clientInputs: string[] = []
    const serverInputs: string[] = []
    for (const input of inputs) {
      ;((await isClientSource(input)) ? clientInputs : serverInputs).push(input)
    }

    const text = await readFile(join(distDir, file), "utf-8")
    const reExports = [...text.matchAll(RE_EXPORT)].map((m) => m[1] ?? "")

    verdicts.set(file, {
      file,
      client: clientInputs.length > 0,
      clientInputs,
      serverInputs,
      reExports,
    })
  }

  // Propagate along re-export edges to a fixpoint. `utils.js` bundles no source
  // of its own — everything it exports lives in a shared chunk — so its verdict
  // can only come from what it re-exports.
  let changed = true
  while (changed) {
    changed = false
    for (const verdict of verdicts.values()) {
      if (verdict.client) continue
      if (verdict.reExports.some((f) => verdicts.get(f)?.client === true)) {
        verdict.client = true
        changed = true
      }
    }
  }

  return files.map((f) => verdicts.get(f) as OutputVerdict)
}

/** Prepend `"use client"` to the built files that need it. */
export async function markClientBoundaries(distDir = "dist") {
  const verdicts = await classify(distDir)
  for (const verdict of verdicts) {
    if (!verdict.client) continue
    const path = join(distDir, verdict.file)
    const content = await readFile(path, "utf-8")
    await writeFile(path, `${DIRECTIVE}\n${content}`)
  }
  return verdicts
}
