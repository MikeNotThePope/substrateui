import { readdirSync } from 'node:fs'
import { join } from 'node:path'

import { describe, it, expect } from 'vitest'

import playwrightConfig from '../../../playwright.config'
import {
  DEFAULT_TEST_MATCH,
  filtersFor,
  globToRegExp,
  matchesFilter,
  projectRuns,
  projectsRunning,
  specsWithoutProject,
} from '../../../scripts/visual-project-coverage'

/**
 * The guard from #138. `themed-pages.spec.ts` sat behind four
 * `testIgnore: /themed-pages\.spec\.ts/` lines, one per project, so no project
 * ran it and the `visual` job went green on an empty suite for as long as
 * nobody looked. The first test here is the one that matters: every spec file
 * in `tests/visual/` has to be run by at least one project. The rest pin the
 * matching rules it leans on.
 */

const VISUAL_DIR = join(process.cwd(), 'tests/visual')

/** Every spec file under `tests/visual/`, as the absolute paths Playwright
 *  matches its filters against. Read from disk on purpose: a spec added next
 *  year is covered by this test without anyone remembering to list it. */
function visualSpecPaths(): string[] {
  return readdirSync(VISUAL_DIR, { recursive: true, encoding: 'utf8' })
    .map((name) => join(VISUAL_DIR, name))
    .filter((path) => DEFAULT_TEST_MATCH.test(path))
    .sort()
}

describe('every visual spec is run by some project', () => {
  const specPaths = visualSpecPaths()

  it('finds the spec files to check', () => {
    // A directory read that quietly returns nothing would make the assertion
    // below vacuous, which is the exact failure this file exists to catch.
    expect(specPaths.length).toBeGreaterThan(0)
    expect(specPaths.map((p) => p.slice(VISUAL_DIR.length + 1))).toContain('themed-pages.spec.ts')
  })

  it('leaves no spec file behind', () => {
    const orphans = specsWithoutProject(specPaths, playwrightConfig).map((p) =>
      p.slice(VISUAL_DIR.length + 1),
    )
    expect(
      orphans,
      'No project in playwright.config.ts runs these spec files, so they report ' +
        'green without running. Add them to a project\'s testMatch.',
    ).toEqual([])
  })

  it('runs themed-pages.spec.ts under exactly one project, which is the lava one', () => {
    // Its five pages are scoped deliberately: one palette, five baselines, not
    // the whole docs site times another theme.
    expect(projectsRunning(join(VISUAL_DIR, 'themed-pages.spec.ts'), playwrightConfig)).toEqual([
      'lava',
    ])
  })
})

describe('projectRuns', () => {
  const spec = '/repo/tests/visual/themed-pages.spec.ts'

  it('matches on the default testMatch when a project sets none', () => {
    expect(projectRuns(spec, { name: 'light' })).toBe(true)
    expect(projectRuns('/repo/tests/visual/helpers.ts', { name: 'light' })).toBe(false)
  })

  it('lets testIgnore win over testMatch', () => {
    expect(projectRuns(spec, { name: 'light', testIgnore: /themed-pages\.spec\.ts/ })).toBe(false)
  })

  it('narrows to a project testMatch', () => {
    expect(projectRuns(spec, { name: 'lava', testMatch: /themed-pages\.spec\.ts/ })).toBe(true)
    expect(projectRuns(spec, { name: 'light', testMatch: /components\.spec\.ts/ })).toBe(false)
  })

  it('takes the config filter only when the project defines none', () => {
    const config = { testIgnore: /themed-pages\.spec\.ts/ }
    expect(projectRuns(spec, { name: 'light' }, config)).toBe(false)
    expect(projectRuns(spec, { name: 'lava', testIgnore: [] }, config)).toBe(true)
  })
})

describe('specsWithoutProject', () => {
  const specs = ['/repo/tests/visual/a.spec.ts', '/repo/tests/visual/b.spec.ts']

  it('names the spec every project ignores', () => {
    const config = {
      projects: [
        { name: 'one', testIgnore: /b\.spec\.ts/ },
        { name: 'two', testIgnore: /b\.spec\.ts/ },
      ],
    }
    expect(specsWithoutProject(specs, config)).toEqual(['/repo/tests/visual/b.spec.ts'])
  })

  it('is satisfied by a single project covering the file', () => {
    const config = {
      projects: [
        { name: 'one', testMatch: /a\.spec\.ts/ },
        { name: 'two', testMatch: /b\.spec\.ts/ },
      ],
    }
    expect(specsWithoutProject(specs, config)).toEqual([])
  })

  it('reads a config with no projects as one anonymous project', () => {
    expect(specsWithoutProject(specs, {})).toEqual([])
    expect(specsWithoutProject(specs, { testIgnore: /b\.spec\.ts/ })).toEqual([
      '/repo/tests/visual/b.spec.ts',
    ])
  })
})

describe('filtersFor', () => {
  it("falls back to Playwright's default testMatch and an empty testIgnore", () => {
    expect(filtersFor({})).toEqual({ testMatch: DEFAULT_TEST_MATCH, testIgnore: [] })
  })
})

describe('globToRegExp', () => {
  it('anchors a bare pattern the way Playwright does', () => {
    expect(matchesFilter('/repo/tests/visual/a.spec.ts', '*.spec.ts')).toBe(true)
    expect(matchesFilter('/repo/tests/visual/a.spec.ts', 'tests/visual/a.spec.ts')).toBe(true)
    expect(matchesFilter('/repo/tests/visual/a.spec.ts', '*.spec.tsx')).toBe(false)
  })

  it('keeps * inside one path segment and ** across them', () => {
    expect(matchesFilter('/repo/tests/visual/nested/a.spec.ts', '**/visual/*.spec.ts')).toBe(false)
    expect(matchesFilter('/repo/tests/visual/nested/a.spec.ts', '**/visual/**/*.spec.ts')).toBe(true)
  })

  it('treats a dot as a literal', () => {
    expect(globToRegExp('**/a.spec.ts').test('/repo/axspecxts')).toBe(false)
  })

  it('refuses a pattern it would have to guess at', () => {
    expect(() => globToRegExp('**/*.@(spec|test).ts')).toThrow(/cannot read the glob/)
    expect(() => globToRegExp('**/{a,b}.spec.ts')).toThrow(/cannot read the glob/)
  })
})

describe('matchesFilter', () => {
  it('answers the same on a global regex twice running', () => {
    const filter = /\.spec\.ts/g
    expect(matchesFilter('/repo/tests/visual/a.spec.ts', filter)).toBe(true)
    expect(matchesFilter('/repo/tests/visual/a.spec.ts', filter)).toBe(true)
  })

  it('is false for an empty filter list', () => {
    expect(matchesFilter('/repo/tests/visual/a.spec.ts', [])).toBe(false)
  })
})
