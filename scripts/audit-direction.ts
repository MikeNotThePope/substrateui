import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const COMPONENT_DIR = "src/components"

// Tailwind physical-direction utilities we want to ban.
// Word-boundary regex so we don't false-positive on arbitrary class names.
// Negative lookbehind on `-from-` / `-to-` skips tw-animate-css slide utilities
// like `slide-in-from-left-2` and `slide-out-to-right-52` which have no logical
// equivalent. Negative lookahead on `/\d` skips fraction values like `left-1/2`
// used for physical centering (paired with `-translate-x-1/2`).
const BANNED_PATTERNS: Array<{ regex: RegExp; name: string; fix: string }> = [
  { regex: /\bpl-\d+(?!\/\d)/g, name: "pl-*", fix: "ps-*" },
  { regex: /\bpr-\d+(?!\/\d)/g, name: "pr-*", fix: "pe-*" },
  { regex: /\bml-\d+(?!\/\d)/g, name: "ml-*", fix: "ms-*" },
  { regex: /\bmr-\d+(?!\/\d)/g, name: "mr-*", fix: "me-*" },
  { regex: /(?<!-from-)(?<!-to-)\bleft-\d+(?!\/\d)/g, name: "left-*", fix: "start-*" },
  { regex: /(?<!-from-)(?<!-to-)\bright-\d+(?!\/\d)/g, name: "right-*", fix: "end-*" },
  { regex: /\bborder-l\b(?!\w)/g, name: "border-l", fix: "border-s" },
  { regex: /\bborder-r\b(?!\w)/g, name: "border-r", fix: "border-e" },
  { regex: /\brounded-l(?:-|\b)(?!\w)/g, name: "rounded-l-*", fix: "rounded-s-*" },
  { regex: /\brounded-r(?:-|\b)(?!\w)/g, name: "rounded-r-*", fix: "rounded-e-*" },
  { regex: /\brounded-tl-/g, name: "rounded-tl-*", fix: "rounded-ss-*" },
  { regex: /\brounded-tr-/g, name: "rounded-tr-*", fix: "rounded-se-*" },
  { regex: /\brounded-bl-/g, name: "rounded-bl-*", fix: "rounded-es-*" },
  { regex: /\brounded-br-/g, name: "rounded-br-*", fix: "rounded-ee-*" },
  { regex: /\btext-left\b/g, name: "text-left", fix: "text-start" },
  { regex: /\btext-right\b/g, name: "text-right", fix: "text-end" },
  { regex: /\bfloat-left\b/g, name: "float-left", fix: "float-start" },
  { regex: /\bfloat-right\b/g, name: "float-right", fix: "float-end" },
]

const files = readdirSync(COMPONENT_DIR, { recursive: true })
  .map(String)
  .filter((entry) => /\.(tsx?|css)$/.test(entry))
  .map((entry) => join(COMPONENT_DIR, entry))
const violations: Array<{ file: string; line: number; match: string; fix: string }> = []

for (const file of files) {
  const content = readFileSync(file, "utf-8")
  const lines = content.split("\n")
  for (let i = 0; i < lines.length; i++) {
    for (const { regex, name, fix } of BANNED_PATTERNS) {
      const matches = lines[i].match(regex)
      if (matches) {
        for (const match of matches) {
          violations.push({ file, line: i + 1, match, fix: `${fix} (replace ${name})` })
        }
      }
    }
  }
}

if (violations.length > 0) {
  console.error(`❌ Found ${violations.length} physical-direction utilities that should be logical:`)
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  ${v.match}  →  ${v.fix}`)
  }
  console.error("\nUse logical properties (ps/pe/ms/me/start/end) so components flip correctly in RTL.")
  console.error("See docs/accessibility/direction for details.")
  process.exit(1)
}

console.log(`✅ No physical-direction utilities found in ${files.length} files.`)
