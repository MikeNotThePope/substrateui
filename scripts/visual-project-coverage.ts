// Which spec files under `tests/visual/` a Playwright project actually runs,
// as a pure function over the config's `projects`.
//
// #138: all four projects carried `testIgnore: /themed-pages\.spec\.ts/`, so
// the one spec that renders a named palette ran in none of them, and the
// `visual` job passed by finding nothing. Nothing said so, because from the
// outside a suite that runs zero tests and a suite whose tests all pass look
// the same. The config edit that turns the spec on is a fix a later edit can
// undo in silence, which is how this happened in the first place.
//
// So the rule gets a test rather than a comment:
// `tests/unit/scripts/visual-project-coverage.test.ts` asserts that every
// spec file in `tests/visual/` is run by at least one project. It is a pure
// function over the config object, so it runs in `bun run test` with no
// browser and no dev server.
//
// What it does not do: it says nothing about what a project seeds, whether a
// screenshot is right, or whether the suite runs on a fork's pull request. It
// answers one question, does this file run anywhere, which is the question
// that was answered wrong.

/** The shape Playwright accepts for `testMatch` and `testIgnore`. */
export type FileFilter = string | RegExp | Array<string | RegExp>

/** The part of a Playwright project this module reads. */
export interface ProjectFilters {
  name?: string
  testMatch?: FileFilter
  testIgnore?: FileFilter
}

/** The part of a Playwright config this module reads. */
export interface ConfigFilters {
  testMatch?: FileFilter
  testIgnore?: FileFilter
  projects?: ProjectFilters[]
}

/**
 * Playwright's own default `testMatch`, `**\/*.@(spec|test).?(c|m)[jt]s?(x)`,
 * written as the regular expression it denotes, so this module never has to
 * expand an extglob.
 */
export const DEFAULT_TEST_MATCH = /\.(spec|test)\.(c|m)?[jt]sx?$/

// Brace expansion, character classes and extglobs. Playwright hands string
// patterns to minimatch, which understands all of them; the converter below
// does not, and a filter it silently mis-read would be worse than no check at
// all. Anything in here throws instead.
const UNSUPPORTED_GLOB = /[{}[\]]|[!?*+@]\(/

/**
 * A string filter as the regular expression Playwright matches with. Pure.
 *
 * Playwright prefixes a pattern that does not already start with `**\/`, then
 * matches it against the whole absolute path, case-insensitively. This covers
 * the `*`, `**` and `?` wildcards only. See {@link UNSUPPORTED_GLOB}.
 */
export function globToRegExp(glob: string): RegExp {
  if (UNSUPPORTED_GLOB.test(glob)) {
    throw new Error(
      `visual-project-coverage cannot read the glob ${JSON.stringify(glob)}: ` +
        'it uses brace expansion, a character class or an extglob. Teach ' +
        'globToRegExp about it rather than letting the coverage test pass on a ' +
        'pattern it misread.',
    )
  }

  const pattern = glob.startsWith('**/') ? glob : `**/${glob}`
  let source = '^'
  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i]
    if (char === '*') {
      if (pattern[i + 1] === '*' && pattern[i + 2] === '/') {
        // `**/` also matches nothing, so `**/a.ts` matches a bare `a.ts`.
        source += '(?:.*/)?'
        i += 2
      } else if (pattern[i + 1] === '*') {
        source += '.*'
        i += 1
      } else {
        source += '[^/]*'
      }
    } else if (char === '?') {
      source += '[^/]'
    } else {
      source += char.replace(/[.+^${}()|[\]\\]/g, '\\$&')
    }
  }
  return new RegExp(`${source}$`, 'i')
}

/** Whether `filePath` matches any one of `filter`'s patterns. Pure. */
export function matchesFilter(filePath: string, filter: FileFilter): boolean {
  const patterns = Array.isArray(filter) ? filter : [filter]
  return patterns.some((pattern) => {
    const re = typeof pattern === 'string' ? globToRegExp(pattern) : pattern
    // A /g or /y regex carries `lastIndex` between calls, so the same pattern
    // would answer differently on its second file.
    re.lastIndex = 0
    return re.test(filePath)
  })
}

/**
 * The filters a project runs under. Pure.
 *
 * Playwright takes the first defined of project, config, default for each of
 * the two. It does not merge a project's filter with the config's.
 */
export function filtersFor(
  project: ProjectFilters,
  config: ConfigFilters = {},
): { testMatch: FileFilter; testIgnore: FileFilter } {
  return {
    testMatch: project.testMatch ?? config.testMatch ?? DEFAULT_TEST_MATCH,
    testIgnore: project.testIgnore ?? config.testIgnore ?? [],
  }
}

/** Whether `project` runs the spec at `filePath`. Pure. */
export function projectRuns(
  filePath: string,
  project: ProjectFilters,
  config: ConfigFilters = {},
): boolean {
  const { testMatch, testIgnore } = filtersFor(project, config)
  if (matchesFilter(filePath, testIgnore)) return false
  return matchesFilter(filePath, testMatch)
}

/**
 * The names of every project that runs the spec at `filePath`. Pure.
 *
 * A config with no `projects` runs one anonymous project under the config's
 * own filters, which is Playwright's behaviour; it reports as `''`.
 */
export function projectsRunning(filePath: string, config: ConfigFilters): string[] {
  const projects = config.projects?.length ? config.projects : [{}]
  return projects
    .filter((project) => projectRuns(filePath, project, config))
    .map((project) => project.name ?? '')
}

/**
 * The spec files no project runs. Pure, and empty is the only answer that
 * means the suite is on.
 */
export function specsWithoutProject(specPaths: string[], config: ConfigFilters): string[] {
  return specPaths.filter((specPath) => projectsRunning(specPath, config).length === 0)
}
