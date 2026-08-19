/**
 * Fails when a component under src/components/ui/ has no docs page, or when a
 * component page is missing its Import section.
 *
 * Coverage was reached the hard way — 17 components had no page at all — and the
 * only thing that keeps it is a check that runs on every PR. Without one, the
 * next component lands documented by nothing and nobody finds out until someone
 * goes looking for its page.
 *
 * Two things are checked, both cheap:
 *
 *   1. Every component resolves to a page, either at
 *      /docs/components/<slug> or wherever ALIASES says it is documented.
 *   2. Every /docs/components/* page renders <ImportLine>. It is the one slot in
 *      the page template a reader cannot do without — the page's whole job is to
 *      say what to type — and it is the first thing a hand-written page forgets.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

const COMPONENT_DIR = "src/components/ui"
const DOCS_DIR = "src/app/docs/components"

/** Modules that export no renderable component, so there is nothing to document. */
const NOT_COMPONENTS = new Set<string>([
  "index.ts", // barrel export
  // *-variants.ts is a class recipe, published from `/variants` so server code
  // can call it. The component's own page documents the variants it accepts.
])

/**
 * Components documented somewhere other than /docs/components/<slug>, and where.
 * The target must exist, so a page moving out from under one of these still fails.
 *
 * Keep this short. It is for components whose documentation genuinely belongs
 * with a concept rather than on a page of their own — not a parking space for
 * work not done yet.
 */
const ALIASES: Record<string, string> = {
  // DirectionProvider is one part of a subject bigger than itself.
  "direction.tsx": "src/app/docs/accessibility/direction/page.tsx",
  // Toaster is what the Toast page documents; `sonner` is the module it lives in.
  "sonner.tsx": "src/app/docs/components/toast/page.tsx",
  // ThemeProvider and the token plumbing are the Theming API page's subject.
  "theme.tsx": "src/app/docs/foundations/theming/page.tsx",
}

function componentFiles(): string[] {
  return readdirSync(COMPONENT_DIR)
    .filter((entry) => statSync(join(COMPONENT_DIR, entry)).isFile())
    .filter((entry) => !NOT_COMPONENTS.has(entry))
    .filter((entry) => !entry.endsWith(".stories.tsx"))
    .filter((entry) => !entry.endsWith("-variants.ts"))
    .filter((entry) => entry.endsWith(".ts") || entry.endsWith(".tsx"))
    .sort()
}

const problems: string[] = []
const files = componentFiles()

for (const file of files) {
  const slug = file.replace(/\.tsx?$/, "")
  const alias = ALIASES[file]

  if (alias) {
    if (!existsSync(alias)) {
      problems.push(
        `${join(COMPONENT_DIR, file)}\n` +
          `    → ALIASES points at ${alias}, which no longer exists.\n` +
          `      Update the alias in scripts/audit-docs.ts, or give it its own page.`
      )
    }
    continue
  }

  const page = join(DOCS_DIR, slug, "page.tsx")
  if (!existsSync(page)) {
    problems.push(
      `${join(COMPONENT_DIR, file)}\n` +
        `    → create ${page}\n` +
        `      Or add an ALIASES entry in scripts/audit-docs.ts if it is\n` +
        `      documented under another subject.`
    )
  }
}

// Every component page must say what to import.
for (const entry of readdirSync(DOCS_DIR).sort()) {
  const page = join(DOCS_DIR, entry, "page.tsx")
  if (!existsSync(page)) continue
  // Anchored on a delimiter, so `<ImportLineSomethingElse` is not a match.
  if (!/<ImportLine[\s/>]/.test(readFileSync(page, "utf8"))) {
    problems.push(
      `${page}\n` +
        `    → no <ImportLine>. Add one under the hero specimen so the page says\n` +
        `      which symbols to import and from where.`
    )
  }
}

const pageCount = readdirSync(DOCS_DIR).filter((e) =>
  existsSync(join(DOCS_DIR, e, "page.tsx"))
).length

if (problems.length === 0) {
  console.log(
    `audit:docs — ${files.length} component(s) checked against ${pageCount} page(s), ` +
      `all documented and all importable.`
  )
  process.exit(0)
}

console.error(`audit:docs — ${problems.length} problem(s):\n`)
for (const problem of problems) console.error(`  ${problem}\n`)
process.exit(1)
