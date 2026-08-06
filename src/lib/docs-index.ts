import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

/**
 * Search index for the docs, built by reading the pages themselves.
 *
 * Every docs page already declares its subject in the `title` and
 * `description` it passes to <DocPage>. Parsing those is what keeps the index
 * honest: there is no second copy of the text to update, and a page that does
 * not exist cannot appear in results.
 *
 * Only ever called from a Server Component that is statically prerendered, so
 * this reads from disk at build time and costs nothing at request time.
 */

const DOCS_DIR = "src/app/docs"

export interface DocsIndexEntry {
  title: string
  description: string
  route: string
  /** Top-level docs area, used to group results. */
  group: string
}

const GROUPS: Array<[prefix: string, label: string]> = [
  ["/docs/components/", "Components"],
  ["/docs/foundations/", "Foundations"],
  ["/docs/accessibility", "Accessibility"],
  ["/docs/layouts/", "Layouts"],
  ["/docs/patterns/", "Patterns"],
  ["/docs/tokens", "Tokens"],
  ["/docs/blocks", "Blocks"],
  ["/docs/templates", "Templates"],
  ["/docs/hooks", "Hooks"],
]

function groupFor(route: string): string {
  for (const [prefix, label] of GROUPS) {
    if (route.startsWith(prefix)) return label
  }
  return "Getting Started"
}

/**
 * Pull the title and description off the page's <DocPage> element.
 *
 * Scoped to a window after the opening tag rather than bounded by the first
 * `>`: at least one description contains JSX in prose ("The <Toaster /> …"),
 * which ends the tag early and loses the attribute.
 */
function parsePage(source: string): { title: string; description: string } | null {
  const open = source.indexOf("<DocPage")
  if (open === -1) return null
  const window = source.slice(open, open + 2000)
  const title = window.match(/\btitle="([^"]*)"/)?.[1]
  const description = window.match(/\bdescription="([^"]*)"/)?.[1]
  if (!title || !description) return null
  return { title, description }
}

/** Decode the handful of HTML entities that appear in page prose. */
function decode(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
}

export function docsIndex(docsDir: string = DOCS_DIR): DocsIndexEntry[] {
  const entries: DocsIndexEntry[] = []

  function walk(dir: string, route: string) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (entry.name.startsWith("_")) continue
        walk(join(dir, entry.name), `${route}/${entry.name}`)
        continue
      }
      if (!/^page\.tsx?$/.test(entry.name)) continue

      const parsed = parsePage(readFileSync(join(dir, entry.name), "utf8"))
      if (!parsed) continue

      entries.push({
        title: decode(parsed.title),
        description: decode(parsed.description),
        route,
        group: groupFor(route),
      })
    }
  }

  walk(docsDir, "/docs")
  return entries.sort((a, b) => a.title.localeCompare(b.title))
}
