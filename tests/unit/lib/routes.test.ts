import { describe, it, expect } from 'vitest'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

import { routePriority, staticRoutes } from '@/lib/routes'
import { pageMetadata, SITE_NAME } from '@/lib/site'

/**
 * The sitemap is generated from the filesystem so it cannot drift from the
 * pages that exist. These tests guard the two ways that could break quietly:
 * a route going missing from the sitemap, and a non-route directory leaking
 * into it as a literal URL.
 */

/** Count page.tsx files under src/app, ignoring private folders. */
function countPages(dir: string): number {
  let n = 0
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && /^page\.tsx?$/.test(entry.name)) n++
    else if (entry.isDirectory() && !entry.name.startsWith('_')) {
      n += countPages(join(dir, entry.name))
    }
  }
  return n
}

describe('staticRoutes', () => {
  const routes = staticRoutes()

  it('finds one route per page file', () => {
    expect(routes).toHaveLength(countPages('src/app'))
  })

  it('includes the home page as "/"', () => {
    expect(routes).toContain('/')
  })

  it('includes nested docs routes', () => {
    expect(routes).toContain('/docs')
    expect(routes).toContain('/docs/components/button')
    expect(routes).toContain('/docs/foundations/theming')
  })

  it('emits no private, group, dynamic or parallel segments', () => {
    // A literal "[slug]" or "_components" in the sitemap would be advertising
    // a URL that does not resolve.
    expect(routes.filter((r) => /[[\](@]|\/_/.test(r))).toEqual([])
  })

  it('returns unique, sorted, slash-prefixed routes', () => {
    expect(new Set(routes).size).toBe(routes.length)
    expect([...routes].sort()).toEqual(routes)
    expect(routes.every((r) => r.startsWith('/'))).toBe(true)
  })
})

describe('routePriority', () => {
  it('ranks the home page above the docs entry point above a leaf page', () => {
    expect(routePriority('/')).toBeGreaterThan(routePriority('/docs'))
    expect(routePriority('/docs')).toBeGreaterThan(routePriority('/docs/components/button'))
  })

  it('stays within the range the sitemap protocol allows', () => {
    for (const route of staticRoutes()) {
      expect(routePriority(route)).toBeGreaterThan(0)
      expect(routePriority(route)).toBeLessThanOrEqual(1)
    }
  })
})

describe('pageMetadata', () => {
  const meta = pageMetadata({
    title: 'Button',
    description: 'Triggers an action.',
    route: '/docs/components/button',
  })

  it('sets a canonical URL for the page itself', () => {
    expect(meta.alternates?.canonical).toBe('/docs/components/button')
  })

  it('carries a share image, which a bare openGraph override would drop', () => {
    // The regression this exists for: declaring openGraph per page replaces
    // the parent's object, so og:image silently disappears from every page
    // that sets its own title.
    expect(meta.openGraph?.images).toBeTruthy()
    expect(meta.twitter?.images).toBeTruthy()
  })

  it('qualifies the share title with the site name', () => {
    expect(meta.openGraph?.title).toBe(`Button · ${SITE_NAME}`)
    expect(meta.twitter?.title).toBe(`Button · ${SITE_NAME}`)
  })

  it('leaves the document title unqualified so the layout template applies it', () => {
    // layout.tsx sets template "%s · SubstrateUI"; pre-qualifying here would
    // render "Button · SubstrateUI · SubstrateUI".
    expect(meta.title).toBe('Button')
  })
})
