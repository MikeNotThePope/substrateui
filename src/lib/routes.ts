import { readdirSync } from "node:fs"
import { join } from "node:path"

/**
 * Enumerate every statically routable page under src/app.
 *
 * Derived from the filesystem rather than from a hand-kept list because the
 * hand-kept list is the thing that rots: this site gained 17 docs pages in one
 * pass, and any sitemap maintained separately would still be advertising the
 * old set. Walking the app directory means a new page.tsx is in the sitemap the
 * moment it exists.
 *
 * Only ever called at build time (the sitemap is statically prerendered), so
 * reading from disk here costs nothing at request time.
 */

const APP_DIR = "src/app"

/** Directories App Router treats as private or non-routing. */
function isRoutingSegment(name: string): boolean {
  // _components and friends are private folders; route groups and dynamic or
  // parallel segments would each need their own URL handling, and this site
  // has none — so treat their appearance as "not a static route" rather than
  // silently emitting a literal "[slug]" URL into the sitemap.
  return !name.startsWith("_") && !name.startsWith("(") && !name.startsWith("[") && !name.startsWith("@")
}

export function staticRoutes(appDir: string = APP_DIR): string[] {
  const routes: string[] = []

  function walk(dir: string, urlPath: string) {
    const entries = readdirSync(dir, { withFileTypes: true })

    if (entries.some((e) => e.isFile() && /^page\.tsx?$/.test(e.name))) {
      routes.push(urlPath === "" ? "/" : urlPath)
    }

    for (const entry of entries) {
      if (!entry.isDirectory() || !isRoutingSegment(entry.name)) continue
      walk(join(dir, entry.name), `${urlPath}/${entry.name}`)
    }
  }

  walk(appDir, "")
  return routes.sort()
}

/**
 * Relative importance, used only as a hint to crawlers about which pages to
 * revisit first. The home page leads, the docs entry point and the foundations
 * that everything else refers back to come next, then individual pages.
 */
export function routePriority(route: string): number {
  if (route === "/") return 1
  if (route === "/docs") return 0.9
  if (route === "/docs/tokens" || route.startsWith("/docs/foundations")) return 0.8
  if (route === "/design-system") return 0.5
  return 0.7
}
