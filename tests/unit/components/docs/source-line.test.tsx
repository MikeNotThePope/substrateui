import { describe, it, expect, vi, afterEach } from 'vitest'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

import { sourcesFor, hrefFor } from '@/app/docs/_components/source-line'

/**
 * The source line builds a GitHub URL out of a repo-relative path, and nothing
 * about that path is checked at runtime — a wrong one renders as a confident
 * link to a 404. Two ways it rots:
 *
 *   1. `/docs/components/<slug>` derives `src/components/ui/<slug>.tsx`, so
 *      renaming or moving a component silently breaks its page's link.
 *   2. The explicit map is hand-maintained, so moving any file it names does
 *      the same.
 *
 * These walk the real routes and assert every path resolves on disk. Renaming a
 * component now fails here instead of shipping a dead link.
 */

const DOCS_DIR = join(process.cwd(), 'src/app/docs')

/** Every real docs route, derived from the App Router's own page.tsx files. */
function docsRoutes(dir = DOCS_DIR): string[] {
  const routes: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      // `_components` is a private folder — not a route.
      if (!entry.startsWith('_') && !entry.startsWith('(')) routes.push(...docsRoutes(full))
    } else if (entry === 'page.tsx') {
      const rel = relative(DOCS_DIR, dir).split(sep).filter(Boolean).join('/')
      routes.push(rel ? `/docs/${rel}` : '/docs')
    }
  }
  return routes.sort()
}

const routes = docsRoutes()

describe('source line', () => {
  it('finds the docs routes at all', () => {
    // Guards the guard: a walker that silently returns [] would make every
    // assertion below vacuous.
    expect(routes.length).toBeGreaterThan(50)
    expect(routes).toContain('/docs/components/kbd')
  })

  it.each(routes)('%s links only to files that exist', (route) => {
    for (const path of sourcesFor(route)) {
      // A trailing slash marks a directory (linked as a GitHub tree).
      const onDisk = join(process.cwd(), path.endsWith('/') ? path.slice(0, -1) : path)
      expect(existsSync(onDisk), `${route} → ${path} does not exist`).toBe(true)
      expect(statSync(onDisk).isDirectory()).toBe(path.endsWith('/'))
    }
  })

  it('gives every component page a source', () => {
    const componentRoutes = routes.filter((r) => r.startsWith('/docs/components/'))
    expect(componentRoutes.length).toBeGreaterThan(60)
    for (const route of componentRoutes) {
      expect(sourcesFor(route), `${route} has no source`).toHaveLength(1)
    }
  })

  it('renders nothing for pages that document a composition, not a file', () => {
    // Naming one arbitrary member of the set as "the source" would be a lie.
    for (const route of ['/docs', '/docs/accessibility', '/docs/patterns/forms']) {
      expect(sourcesFor(route)).toEqual([])
    }
  })

  it('ignores a trailing slash on the route', () => {
    expect(sourcesFor('/docs/components/kbd/')).toEqual(sourcesFor('/docs/components/kbd'))
  })
})

describe('source line — which tree it links into', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  /** The ref is read once at module load, so each case needs a fresh import. */
  async function freshHrefFor() {
    vi.resetModules()
    return (await import('@/app/docs/_components/source-line')).hrefFor
  }

  it('links a file as a blob and a directory as a tree', () => {
    expect(hrefFor('src/components/ui/kbd.tsx')).toContain('/blob/')
    expect(hrefFor('src/hooks/')).toContain('/tree/')
    // The trailing slash marks the directory; it must not survive into the URL.
    expect(hrefFor('src/hooks/')).toMatch(/\/src\/hooks$/)
  })

  it('pins to the commit the site was built from', async () => {
    // Vercel freezes this into the client bundle at `next build`, so the link
    // describes the tree the page was generated from rather than whatever main
    // has become since.
    vi.stubEnv('NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA', 'abc1234')
    const href = (await freshHrefFor())('src/components/ui/kbd.tsx')
    expect(href).toContain('/blob/abc1234/')
    expect(href).not.toContain('/blob/main/')
  })

  it('lets an explicit ref win over the build commit', async () => {
    vi.stubEnv('NEXT_PUBLIC_SOURCE_REF', 'v1.2.3')
    vi.stubEnv('NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA', 'abc1234')
    expect((await freshHrefFor())('src/components/ui/kbd.tsx')).toContain('/blob/v1.2.3/')
  })

  it('falls back to main when the build commit is unset or empty', async () => {
    // Vercel hands over "" rather than undefined when system env vars are off.
    vi.stubEnv('NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA', '')
    expect((await freshHrefFor())('src/components/ui/kbd.tsx')).toContain('/blob/main/')
  })
})
