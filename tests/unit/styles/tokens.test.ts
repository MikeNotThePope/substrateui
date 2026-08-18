import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
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
  '--border-width',
  '--press-depth',
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
