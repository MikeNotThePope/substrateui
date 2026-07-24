#!/usr/bin/env node
/**
 * SubstrateUI CLI.
 *
 * Zero-dependency init helper that wires the stylesheet imports into a project's
 * global CSS and prints the remaining setup (fonts, ThemeProvider, LinkProvider).
 * Unlike shadcn's CLI, this does NOT copy component source into your repo — the
 * components live in the installed package. This only scaffolds the glue.
 *
 * Usage:
 *   npx @mikenotthepope/substrateui init [--css <path>] [--yes]
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync, readSync } from "node:fs"
import { dirname, resolve } from "node:path"
import process from "node:process"

const PKG = "@mikenotthepope/substrateui"

const color = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
}
const c = (name, s) => `${color[name]}${s}${color.reset}`

// The lines every SubstrateUI project needs in its global stylesheet, in order.
const CSS_IMPORTS = [
  { line: `@import "tailwindcss";`, match: /@import\s+["']tailwindcss["']/ },
  { line: `@import "tw-animate-css";`, match: /@import\s+["']tw-animate-css["']/ },
  { line: `@import "${PKG}/styles.css";`, match: new RegExp(`@import\\s+["']${escapeRe(PKG)}/styles\\.css["']`) },
  { line: `@source "../node_modules/${PKG}";`, match: new RegExp(`@source\\s+["'][^"']*${escapeRe(PKG)}["']`) },
]

const CANDIDATE_CSS = [
  "src/app/globals.css",
  "app/globals.css",
  "src/styles/globals.css",
  "styles/globals.css",
  "src/app/global.css",
]

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function parseArgs(argv) {
  const args = { _: [], css: undefined, yes: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--css") args.css = argv[++i]
    else if (a === "--yes" || a === "-y") args.yes = true
    else if (a === "-h" || a === "--help") args._.push("help")
    else args._.push(a)
  }
  return args
}

function readComponentsJsonCss() {
  const p = resolve(process.cwd(), "components.json")
  if (!existsSync(p)) return undefined
  try {
    const json = JSON.parse(readFileSync(p, "utf-8"))
    return json?.tailwind?.css
  } catch {
    return undefined
  }
}

function resolveCssPath(explicit) {
  if (explicit) return resolve(process.cwd(), explicit)
  const fromConfig = readComponentsJsonCss()
  if (fromConfig) return resolve(process.cwd(), fromConfig)
  for (const rel of CANDIDATE_CSS) {
    const abs = resolve(process.cwd(), rel)
    if (existsSync(abs)) return abs
  }
  // Default target when nothing exists yet.
  return resolve(process.cwd(), "src/app/globals.css")
}

function printHelp() {
  console.log(`
${c("bold", "SubstrateUI")} — a monolithic design system for React.

${c("bold", "Usage")}
  npx ${PKG} <command> [options]

${c("bold", "Commands")}
  init            Add the required CSS imports and print setup steps.

${c("bold", "Options")}
  --css <path>    Path to your global stylesheet (auto-detected otherwise).
  -y, --yes       Write changes without prompting.
  -h, --help      Show this help.

${c("dim", `Docs: https://www.substrateui.dev/docs`)}
`)
}

function ensureImports(cssPath, autoYes) {
  const exists = existsSync(cssPath)
  const original = exists ? readFileSync(cssPath, "utf-8") : ""

  const missing = CSS_IMPORTS.filter(({ match }) => !match.test(original))

  if (missing.length === 0) {
    console.log(c("green", `✓ ${rel(cssPath)} already has every SubstrateUI import.`))
    return
  }

  // Insert missing lines in canonical order. Tailwind must be imported first,
  // so if the file already imports it, splice the rest in right after that line
  // rather than prepending above it (which would leave tailwindcss last).
  const lines = original.length ? original.split("\n") : []
  const tailwindMissing = missing.some((m) => m.match === CSS_IMPORTS[0].match)
  const toInsert = missing.filter((m) => m.match !== CSS_IMPORTS[0].match).map((m) => m.line)

  let next
  if (tailwindMissing || lines.length === 0) {
    // No tailwind import yet (or empty file): write the full canonical header on top.
    const header = missing.map((m) => m.line).join("\n")
    next = exists ? `${header}\n${original}` : `${header}\n`
  } else {
    const anchor = lines.findIndex((l) => CSS_IMPORTS[0].match.test(l))
    lines.splice(anchor + 1, 0, ...toInsert)
    next = lines.join("\n")
  }

  console.log(`\n${c("bold", exists ? "Will add to" : "Will create")} ${c("cyan", rel(cssPath))}:`)
  for (const m of missing) console.log(`  ${c("green", "+")} ${m.line}`)

  if (!autoYes && !confirm()) {
    console.log(c("yellow", "\nSkipped. Add the lines above to your stylesheet manually."))
    return
  }

  if (!exists) mkdirSync(dirname(cssPath), { recursive: true })
  writeFileSync(cssPath, next, "utf-8")
  console.log(c("green", `\n✓ Updated ${rel(cssPath)}`))
}

function rel(abs) {
  return abs.startsWith(process.cwd()) ? abs.slice(process.cwd().length + 1) : abs
}

// Minimal synchronous y/N prompt without pulling in a dependency.
function confirm() {
  if (!process.stdin.isTTY) return true // non-interactive (CI, pipes): proceed.
  process.stdout.write(`\n${c("bold", "Apply these changes?")} ${c("dim", "(Y/n) ")}`)
  let answer = ""
  try {
    // Read a single line from stdin synchronously (no dependency needed).
    const chunk = Buffer.alloc(256)
    const bytes = readSync(process.stdin.fd, chunk, 0, 256, null)
    answer = chunk.slice(0, bytes).toString("utf-8").trim().toLowerCase()
  } catch {
    return true
  }
  return answer === "" || answer === "y" || answer === "yes"
}

function printNextSteps() {
  console.log(`
${c("bold", "Next steps")}

${c("cyan", "1.")} ${c("bold", "Fonts")} — in your root layout:
   ${c("dim", `import { DM_Sans, DM_Mono } from "next/font/google"`)}
   ${c("dim", `const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })`)}
   ${c("dim", `const mono = DM_Mono({ weight: ["400","500"], subsets: ["latin"], variable: "--font-mono" })`)}
   ${c("dim", `// add \`${"${sans.variable} ${mono.variable}"}\` to <html className={...}>`)}

${c("cyan", "2.")} ${c("bold", "Dark mode")} — wrap your app:
   ${c("dim", `import { ThemeProvider } from "next-themes"`)}
   ${c("dim", `<ThemeProvider attribute="class" defaultTheme="system" enableSystem>{children}</ThemeProvider>`)}

${c("cyan", "3.")} ${c("bold", "Router-aware links")} ${c("dim", "(optional, any framework)")} — wrap once:
   ${c("dim", `import NextLink from "next/link"`)}
   ${c("dim", `import { LinkProvider } from "${PKG}"`)}
   ${c("dim", `<LinkProvider component={NextLink}>{children}</LinkProvider>`)}

${c("cyan", "4.")} ${c("bold", "Use it")}:
   ${c("dim", `import { Button } from "${PKG}"`)}
   ${c("dim", `import { SignInBlock } from "${PKG}/blocks"`)}

${c("green", "Done.")} Full docs: ${c("cyan", "https://www.substrateui.dev/docs")}
`)
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const cmd = args._[0]

  if (!cmd || cmd === "help") {
    printHelp()
    process.exit(cmd ? 0 : 1)
  }

  if (cmd === "init") {
    console.log(`\n${c("bold", "SubstrateUI init")}\n`)
    const cssPath = resolveCssPath(args.css)
    ensureImports(cssPath, args.yes)
    printNextSteps()
    return
  }

  console.error(c("red", `Unknown command: ${cmd}`))
  printHelp()
  process.exit(1)
}

main()
