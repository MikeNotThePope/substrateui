/**
 * Fails when a built file's `"use client"` doesn't match what it contains, or
 * when a published class recipe is reachable only through a client boundary.
 *
 * The failure this exists to catch is invisible everywhere else. A consumer
 * calling `cn()` or `buttonVariants()` from a server component gets a runtime
 * throw — `next build`, `tsc` and lint all pass, because the boundary lives in
 * a directive the bundler writes, not in any type. This runs against `dist`
 * right after `build:lib`, which is the only place the truth exists.
 *
 * `classify` here is the same function the build marks with, so a rule change
 * cannot drift between writing the directives and checking them.
 */

import { readFile, readdir } from "node:fs/promises"
import { join } from "node:path"

import { classify } from "./client-boundary"

const DIST = "dist"

const fail: string[] = []

const verdicts = await classify(DIST)

for (const verdict of verdicts) {
  const text = await readFile(join(DIST, verdict.file), "utf-8")
  const marked = /^\s*(["'])use client\1/.test(text)
  if (verdict.client && !marked) {
    fail.push(
      `${verdict.file} bundles ${verdict.clientInputs.length} client module(s) but carries no "use client"`
    )
  }
  if (!verdict.client && marked) {
    fail.push(
      `${verdict.file} carries "use client" but defines no client module — that publishes ${
        verdict.serverInputs.join(", ") || "a re-export"
      } as a client reference`
    )
  }
}

// Stated independently of the classifier above, because these two are the
// contract: `cn` and the class recipes are what a server component calls, and
// the whole point of `/variants` is that importing it costs no boundary. If
// the rule and the outcome ever disagree, this is the half that is right.
for (const entry of ["utils.js", "variants.js"]) {
  const text = await readFile(join(DIST, entry), "utf-8")
  if (/^\s*(["'])use client\1/.test(text)) {
    fail.push(
      `dist/${entry} carries "use client" — it is a server-safe entrypoint and must not`
    )
  }
}

// Every recipe a source module exports has to reach consumers through
// `/variants`. Exporting it only from the root barrel means only client
// components can call it, which is the bug this whole entrypoint answers.
const files = await readdir("src/components/ui")
const recipes: string[] = []
for (const file of files) {
  if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue
  if (file.includes(".stories.") || file.includes(".test.")) continue
  const src = await readFile(join("src/components/ui", file), "utf-8")
  for (const match of src.matchAll(/^export const (\w+) = cva\(/gm)) {
    recipes.push(match[1] ?? "")
  }
}

const published = await readFile(join(DIST, "variants.js"), "utf-8")
for (const recipe of recipes) {
  if (!new RegExp(`\\b${recipe}\\b`).test(published)) {
    fail.push(`${recipe} is not exported from dist/variants.js — add it to src/variants.ts`)
  }
}

// No framework inside dist.
//
// tsup.config.ts says a reintroduced `next` or `next-themes` import "fails the
// build here instead", on the grounds that neither is listed in `external`.
// That was not true. tsup externalises `dependencies` and `peerDependencies`
// automatically and bundles everything else, and both packages are
// devDependencies — so the import does not fail, it is *inlined*. Exporting
// `ThemeToggle` while it still read `useTheme` from next-themes put 1.3KB of a
// private copy of that package into `dist/organisms.js`, with a React context
// no consumer's own `<ThemeProvider>` could ever fill: `useTheme` returns
// `{ setTheme: () => {}, themes: [] }` and the control silently does nothing.
//
// Nothing else in the build could see that. The metafile can, so it is read
// here (MikeNotThePope/substrateui#123).
const FRAMEWORK = [/^node_modules\/next-themes\//, /^node_modules\/next\//]

interface Metafile {
  outputs: Record<string, { inputs?: Record<string, unknown> }>
}

const metafile = JSON.parse(
  await readFile(join(DIST, "metafile-esm.json"), "utf-8")
) as Metafile

for (const [output, info] of Object.entries(metafile.outputs)) {
  if (!output.endsWith(".js")) continue
  for (const input of Object.keys(info.inputs ?? {})) {
    if (!FRAMEWORK.some((pattern) => pattern.test(input))) continue
    fail.push(
      `${output} bundles ${input} — a published entrypoint must not carry a copy of the framework. ` +
        `Take the import out, or make the package a real peer dependency and mark it external in tsup.config.ts.`
    )
  }
}

if (fail.length > 0) {
  console.error("Client-boundary audit failed:\n")
  for (const line of fail) console.error(`  ✗ ${line}`)
  console.error(
    `\n${fail.length} problem(s). See scripts/client-boundary.ts for the rule.`
  )
  process.exit(1)
}

console.log(
  `Client boundary OK — ${verdicts.filter((v) => v.client).length} client file(s), ${
    verdicts.filter((v) => !v.client).length
  } server-safe, ${recipes.length} recipe(s) published from /variants.`
)
