/**
 * Fails when a component file under src/components/ui/ has no sibling
 * *.stories.tsx. Runs in CI so "every component has a story" is enforced
 * instead of just being a convention.
 *
 * Add a file to IGNORE below if it's a non-visual utility (e.g. a context
 * provider or pure hook wrapper) that genuinely has nothing to story.
 */

import { existsSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

const COMPONENT_DIR = "src/components/ui"

// Files that export utilities rather than renderable components, and
// therefore don't need a stories file. Keep this list short and justified.
const IGNORE = new Set<string>([
  "index.ts",       // barrel export
  "direction.tsx",  // DirectionProvider — exercised via the global toolbar
])

function listComponentFiles(dir: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (!statSync(full).isFile()) continue
    if (IGNORE.has(entry)) continue
    if (entry.endsWith(".stories.tsx")) continue
    if (entry.endsWith(".tsx") || entry.endsWith(".ts")) {
      out.push(entry)
    }
  }
  return out.sort()
}

const files = listComponentFiles(COMPONENT_DIR)
const missing: string[] = []

for (const file of files) {
  const base = file.replace(/\.tsx?$/, "")
  const storyPath = join(COMPONENT_DIR, `${base}.stories.tsx`)
  if (!existsSync(storyPath)) {
    missing.push(file)
  }
}

if (missing.length === 0) {
  console.log(`audit:stories — ${files.length} component(s) checked, all have stories.`)
  process.exit(0)
}

console.error(
  `audit:stories — ${missing.length} component(s) missing a *.stories.tsx sibling:\n`,
)
for (const file of missing) {
  const base = file.replace(/\.tsx?$/, "")
  console.error(`  ${join(COMPONENT_DIR, file)}`)
  console.error(`    → create ${join(COMPONENT_DIR, `${base}.stories.tsx`)}`)
}
console.error(
  "\nAdd a stories file, or add the component to IGNORE in scripts/audit-stories.ts " +
    "if it genuinely has nothing to render.",
)
process.exit(1)
