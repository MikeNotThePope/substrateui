import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * tokens.css is the whole theme system, and it has two failure modes that are
 * silent — nothing throws, nothing renders wrong on the theme you happened to
 * be looking at, and the contrast audit cannot see either of them.
 *
 * 1. A semantic token with no `--color-*` mapping. It gets declared once per
 *    theme block, so five or ten times, and no Tailwind utility can reach it.
 *    `--border-default/-strong/-subtle/-accent` and the three `--accent-fill*`
 *    tokens sat like that: 80 declarations, zero consumers. A consumer that
 *    wanted a hairline rule had to write `border-[color:var(--border-subtle)]`
 *    or invent a parallel token, which is what LavaHire did.
 *
 * 2. A token one theme defines and another forgets. CONTRIBUTING warns about
 *    it ("missing mappings fall through to the default theme, creating subtle
 *    cross-theme bugs") but nothing checked. audit-contrast can't: it merges
 *    the default theme underneath each theme on purpose, so a missing token
 *    resolves to plum's value and measures as a pass.
 */

const CSS = readFileSync(
  join(process.cwd(), 'src/styles/tokens.css'),
  'utf8'
)

/** Comments carry `{` and `}` and would corrupt a brace-counting scan. */
const BARE = CSS.replace(/\/\*[\s\S]*?\*\//g, '')

/**
 * Structural tokens. A theme varies color; geometry, motion and shadow
 * offsets are the house baseline and live once on :root. Three themes do
 * override the two feel tokens and --radius-factor, which the themes doc
 * explicitly permits — so they are optional, not part of the contract.
 */
const STRUCTURAL = new Set([
  '--radius',
  '--radius-factor',
  '--motion-duration',
  '--motion-ease',
  '--hard-shadow',
  '--hard-shadow-sm',
  '--hard-shadow-lg',
  '--hard-shadow-amber',
])

/**
 * Tokens that are deliberately not Tailwind color utilities. Both feed raw
 * CSS rather than a class: --hard-shadow-color is interpolated into the
 * --hard-shadow-* definitions, and --spinner-track is read by the spinner's
 * own rule in the base layer.
 */
const NOT_UTILITIES = new Set(['--hard-shadow-color', '--spinner-track'])

/** Every `[data-theme=...]` selector block, keyed by a readable name. */
function themeBlocks(): Map<string, Set<string>> {
  const blocks = new Map<string, Set<string>>()
  const re = /(^|\n)((?:[^{}\n][^{}]*?))\{([^{}]*)\}/g
  let m: RegExpExecArray | null
  while ((m = re.exec(BARE)) !== null) {
    const selector = (m[2] ?? '').trim()
    if (!selector.includes('[data-theme=')) continue
    const decls = new Set(
      [...(m[3] ?? '').matchAll(/(--[\w-]+)\s*:/g)].map((d) => d[1] as string)
    )
    // Skip the raw-palette blocks; only semantic blocks are the contract.
    if ([...decls].every((d) => d.startsWith('--raw-'))) continue
    blocks.set(selector.replace(/\s+/g, ' '), decls)
  }
  return blocks
}

describe('tokens.css — Tailwind reachability', () => {
  const mapped = new Set(
    [...CSS.matchAll(/--color-[\w-]+\s*:\s*var\((--[\w-]+)\)/g)].map(
      (m) => m[1] as string
    )
  )

  it('maps every semantic theme token to a color utility', () => {
    const lava = themeBlocks().get('[data-theme="lava"]')
    expect(lava, 'lava light block not found').toBeDefined()

    const unreachable = [...(lava ?? [])]
      .filter((t) => !t.startsWith('--raw-'))
      .filter((t) => !mapped.has(t) && !NOT_UTILITIES.has(t))
      .sort()

    expect(
      unreachable,
      `These tokens are declared in every theme but have no --color-* mapping ` +
        `in @theme inline, so no Tailwind utility can reach them. Add the ` +
        `mapping, or add the token to NOT_UTILITIES with the reason it is not ` +
        `a class.`
    ).toEqual([])
  })

  it('exposes the border ramp', () => {
    for (const t of [
      '--border-default',
      '--border-strong',
      '--border-subtle',
      '--border-accent',
    ]) {
      expect(mapped.has(t), `${t} has no --color-* mapping`).toBe(true)
    }
  })
})

describe('tokens.css — theme contract', () => {
  it('gives every theme the same token set', () => {
    const blocks = themeBlocks()
    expect(blocks.size).toBeGreaterThanOrEqual(8)

    // The default/plum block is the contract: it is the one every other theme
    // cascades on top of, so anything it declares must be declared everywhere.
    const reference = [...blocks.entries()].find(([sel]) =>
      sel.includes('[data-theme="plum"]')
    )
    expect(reference, 'plum block not found').toBeDefined()
    const [, expected] = reference ?? ['', new Set<string>()]

    const gaps: string[] = []
    for (const [selector, decls] of blocks) {
      const missing = [...expected]
        .filter((t) => !STRUCTURAL.has(t))
        .filter((t) => !decls.has(t))
        .sort()
      if (missing.length > 0) gaps.push(`${selector} is missing ${missing.join(', ')}`)
    }

    expect(
      gaps,
      `A theme that omits a token inherits the default theme's value for it. ` +
        `That renders without error and audit-contrast measures it as a pass, ` +
        `because the audit merges the default underneath each theme.`
    ).toEqual([])
  })

  it('keeps border-strong distinguishable from border-default', () => {
    // These were the same value in lava dark, so "strong" was not stronger.
    const lightness = (token: string, block: string): number => {
      const ref = new RegExp(`${token}:\\s*var\\((--raw-[\\w-]+)\\)`).exec(block)
      const raw = ref?.[1]
      if (raw === undefined) return NaN
      const val = new RegExp(`${raw}:\\s*oklch\\(([\\d.]+)`).exec(CSS)
      return Number(val?.[1] ?? NaN)
    }

    for (const [selector, decls] of themeBlocks()) {
      if (!decls.has('--border-strong') || !decls.has('--border-default')) continue
      const start = BARE.indexOf(selector.split(',')[0] ?? '')
      const block = BARE.slice(start, BARE.indexOf('}', start))
      const strong = lightness('--border-strong', block)
      const base = lightness('--border-default', block)
      if (Number.isNaN(strong) || Number.isNaN(base)) continue
      expect(
        strong,
        `${selector}: --border-strong and --border-default resolve to the same ` +
          `lightness (${String(base)}), so "strong" is indistinguishable.`
      ).not.toBe(base)
    }
  })
})

/**
 * A token nothing reads is a promise that does nothing. `--border-width` and
 * `--press-depth` sat on :root for months while every 2px border was a literal
 * `border-2` and every press a literal `active:translate-*`, and the AI prompt
 * cited `--border-width` as the reason borders are 2px. Overriding either one
 * changed nothing, silently.
 *
 * The reader has to be shipped code: `src/` minus the docs site, stories and
 * tests. A read is `var(--x)` or Tailwind's `utility-(--x)` shorthand, and a
 * read inside tokens.css itself counts: `--hard-shadow-color` is only ever
 * read by the `--hard-shadow-*` values beside it.
 *
 * Two layers are out of scope, each by construction:
 * - `@theme inline` is Tailwind's layer. Its names are read by utility class
 *   (`bg-primary` reads `--color-primary`), never by `var()`. The Tailwind
 *   reachability test above covers it.
 * - `--raw-*` is the palette. Layer 1's own header says components never
 *   reference it; semantic tokens do, and /docs/tokens shows every ramp step
 *   by building its name from a template string no scan can resolve.
 */
const LIBRARY = ['src/components', 'src/hooks', 'src/lib', 'src/styles']

function libraryCorpus(): string {
  const files = LIBRARY.flatMap((dir) =>
    readdirSync(join(process.cwd(), dir), { recursive: true, encoding: 'utf8' })
      .filter((f) => /\.(css|tsx?)$/.test(f) && !/\.(test|stories)\./.test(f))
      .map((f) => join(process.cwd(), dir, f))
  )
  files.push(join(process.cwd(), 'src/variants.ts'))
  return files.map((f) => readFileSync(f, 'utf8')).join('\n')
}

const CORPUS = libraryCorpus()

/** Is `--name` read anywhere in shipped code? */
function isRead(name: string): boolean {
  return new RegExp(`\\(\\s*${name}(?![\\w-])`).test(CORPUS)
}

/**
 * Declared and deliberately read by no shipped code. Each entry is a name a
 * consumer's own code is expected to read.
 */
const CONSUMER_FACING = new Set([
  // A shadcn-expected name. Components added with the shadcn CLI, and
  // stylesheets written against shadcn, read var(--radius). Our own radius
  // scale reads --radius-factor instead.
  '--radius',
])

describe('tokens.css — every token is read', () => {
  const start = BARE.indexOf('@theme inline')
  const end = BARE.indexOf('\n}', start)
  const outsideTheme = BARE.slice(0, start) + BARE.slice(end)
  const declared = new Set(
    [...outsideTheme.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1] as string)
  )

  it('reads every declared custom property somewhere in shipped code', () => {
    expect(start, '@theme inline block not found').toBeGreaterThan(0)

    const unread = [...declared]
      .filter((t) => !t.startsWith('--raw-'))
      .filter((t) => !CONSUMER_FACING.has(t))
      .filter((t) => !isRead(t))
      .sort()

    expect(
      unread,
      `These custom properties are declared in tokens.css and read by no ` +
        `shipped code, so overriding them changes nothing. Delete them, or ` +
        `add them to CONSUMER_FACING with the reason a consumer reads them.`
    ).toEqual([])
  })

  it('keeps CONSUMER_FACING honest', () => {
    for (const t of CONSUMER_FACING) {
      expect(declared.has(t), `${t} is no longer declared`).toBe(true)
      expect(isRead(t), `${t} is read now; drop it from the list`).toBe(false)
    }
  })

  /**
   * ThemeTokenName autocompletes inside createTheme, so its `// Feel` group
   * is the public list of what a theme may vary beyond color. CONTRIBUTING
   * and the AI prompt both repeat it. Each name has to be declared on the
   * :root block of tokens.css and read by shipped code, or the type promises a knob with nothing on
   * the other end.
   */
  it('resolves every // Feel name in ThemeTokenName', () => {
    const THEME = readFileSync(
      join(process.cwd(), 'src/components/ui/theme.tsx'),
      'utf8'
    )
    const from = THEME.indexOf('  // Feel')
    expect(from, '// Feel group not found in ThemeTokenName').toBeGreaterThan(0)
    const group = THEME.slice(from, THEME.indexOf('\n\n', from))
    const feel = [...group.matchAll(/\| "([\w-]+)"/g)].map((m) => `--${m[1] ?? ''}`)
    expect(feel.length).toBeGreaterThan(0)

    // The :root block is the house baseline, so a theme that sets no feel
    // token still gets a value for every one.
    const root = [...themeBlocks().entries()].find(([sel]) =>
      sel.startsWith(':root,')
    )?.[1]
    expect(root, ':root block not found').toBeDefined()

    const broken = feel.filter((t) => !root?.has(t) || !isRead(t))
    expect(
      broken,
      `These // Feel names in ThemeTokenName are not declared on the tokens.css ` +
        `:root block or read by no shipped code, so a theme that sets them ` +
        `changes nothing or has no baseline to fall back to.`
    ).toEqual([])
  })
})

/**
 * The tokens docs page publishes a per-theme table of which raw ramp step each
 * semantic token resolves to. It is hand-maintained prose about machine-readable
 * data, so it drifts the moment a palette moves — silently, because nothing
 * reads it but a human. This pins the two together.
 */
describe('tokens docs page', () => {
  const PAGE = readFileSync(
    join(process.cwd(), 'src/app/docs/tokens/page.tsx'),
    'utf8'
  )

  /** Resolve `--token` inside a theme block to its `family-step` ramp name. */
  function rampStep(token: string, selectorFragment: string): string | null {
    const start = BARE.indexOf(selectorFragment)
    if (start < 0) return null
    const block = BARE.slice(start, BARE.indexOf('}', start))
    const m = new RegExp(`${token}:\\s*var\\(--raw-([\\w-]+)\\)`).exec(block)
    return m?.[1] ?? null
  }

  const THEME_SELECTORS: Record<string, { light: string; dark: string }> = {
    lava: {
      light: '[data-theme="lava"] {',
      dark: '.dark [data-theme="lava"] {',
    },
    proof: {
      light: '[data-theme="proof"], [data-theme="press"] {',
      dark: '.dark [data-theme="proof"]',
    },
    substrate: {
      light: '[data-theme="substrate"] {',
      dark: '.dark [data-theme="substrate"] {',
    },
    tundra: {
      light: '[data-theme="tundra"] {',
      dark: '.dark [data-theme="tundra"] {',
    },
  }

  it('documents the ramp step each semantic token actually resolves to', () => {
    const wrong: string[] = []

    for (const [theme, selectors] of Object.entries(THEME_SELECTORS)) {
      const key = new RegExp(`^  ${theme}: \\{$`, 'm').exec(PAGE)
      expect(key, `no ${theme} entry on the docs page`).not.toBeNull()

      const from = PAGE.indexOf('semantic: [', key?.index ?? 0)
      const table = PAGE.slice(from, PAGE.indexOf('],', from))

      for (const row of table.matchAll(
        /\{ name: "([\w-]+)", light: "([\w-]+)", dark: "([\w-]+)" \}/g
      )) {
        const [, name, light, dark] = row
        for (const [mode, documented] of [
          ['light', light],
          ['dark', dark],
        ] as const) {
          // Rows like "white" or "magma @ 15%" are prose, not ramp steps.
          if (documented === undefined || !/^[a-z]+-\d+$/.test(documented)) continue
          const actual = rampStep(`--${name ?? ''}`, selectors[mode])
          if (actual !== null && actual !== documented) {
            wrong.push(
              `${theme}/${mode} ${name ?? ''}: page says ${documented}, tokens.css says ${actual}`
            )
          }
        }
      }
    }

    expect(
      wrong,
      'The tokens docs page no longer matches tokens.css. Update the ' +
        '`semantic` table for the theme whose palette moved.'
    ).toEqual([])
  })
})

describe('tokens.css — cascade layers', () => {
  /**
   * An unlayered declaration beats every layered one, whatever its
   * specificity. Tailwind v4 emits utilities in `@layer utilities`, so an
   * unlayered `* { border-color }` silently outranked `border-status-error`
   * and every other border colour: Alert, Field and FileDropField drew their
   * error states in the neutral border (#144). Nothing threw; it only showed
   * in a browser.
   */
  it('sets the default border colour in the base layer, not unlayered', () => {
    expect(BARE).toMatch(
      /@layer base\s*\{\s*\*\s*\{\s*border-color:\s*var\(--border\);?\s*\}\s*\}/
    )
    const universal = [...BARE.matchAll(/(?:^|[\s}])\*\s*\{[^{}]*border-color/g)]
    expect(universal, 'a second `*` border-color rule, likely unlayered').toHaveLength(1)
  })
})
