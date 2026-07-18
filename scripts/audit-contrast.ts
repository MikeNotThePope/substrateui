import { readFileSync, writeFileSync } from "node:fs"
import { wcagContrast, parse, converter } from "culori"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ─── Token extraction ─────────────────────────────────────────────────

type TokenMap = Record<string, string>

/**
 * Parse every top-level CSS block from a stylesheet into
 * { selector, declarations } tuples. Brace-aware so that nested
 * at-rules (like @theme inline { ... }) do not corrupt the scan.
 */
interface CssBlock {
  selector: string
  decls: TokenMap
}

function parseBlocks(css: string): CssBlock[] {
  const blocks: CssBlock[] = []
  let i = 0
  while (i < css.length) {
    // Skip whitespace and /* comments */
    while (i < css.length) {
      if (/\s/.test(css[i])) { i++; continue }
      if (css[i] === "/" && css[i + 1] === "*") {
        const end = css.indexOf("*/", i + 2)
        if (end === -1) return blocks
        i = end + 2
        continue
      }
      break
    }
    if (i >= css.length) break

    // Read selector up to the first `{` or `;`. A top-level `;` means
    // this is a semicolon-terminated at-rule (e.g. @custom-variant,
    // @import) that has no body — skip it and continue.
    const selStart = i
    while (i < css.length && css[i] !== "{" && css[i] !== ";") i++
    if (i >= css.length) break
    if (css[i] === ";") { i++; continue }
    const selector = css.slice(selStart, i).trim()
    i++ // consume {

    // Read body, tracking nested braces
    const bodyStart = i
    let depth = 1
    while (i < css.length && depth > 0) {
      if (css[i] === "{") depth++
      else if (css[i] === "}") depth--
      if (depth > 0) i++
    }
    const body = css.slice(bodyStart, i)
    i++ // consume }

    // At-rules (@theme, @media, @custom-variant...) are skipped for
    // the token map. We only care about style rules that define
    // custom properties at the top level.
    if (selector.startsWith("@")) continue

    const decls: TokenMap = {}
    const declMatches = body.matchAll(/--([a-z0-9-]+):\s*([^;]+);/gi)
    for (const m of declMatches) decls[m[1]] = m[2].trim()
    blocks.push({ selector, decls })
  }
  return blocks
}

/**
 * Collect all declarations from blocks whose selector matches `target`.
 * Returns declarations merged in source order (later overrides earlier).
 */
function mergeMatchingBlocks(blocks: CssBlock[], target: string): TokenMap {
  const out: TokenMap = {}
  for (const b of blocks) {
    if (b.selector === target) Object.assign(out, b.decls)
  }
  return out
}

function resolveValue(name: string, tokens: TokenMap, seen = new Set<string>()): string | null {
  if (seen.has(name)) return null
  seen.add(name)

  const value = tokens[name]
  if (!value) return null

  // Resolve var() references
  const varMatch = value.match(/^var\(--([a-z0-9-]+)\)$/i)
  if (varMatch) {
    return resolveValue(varMatch[1], tokens, seen)
  }

  return value
}

// ─── Themes to audit ──────────────────────────────────────────────────

interface ThemeSpec {
  name: string
  lightSelector: string
  darkSelector: string
}

const THEMES: ThemeSpec[] = [
  { name: "default", lightSelector: ":root", darkSelector: ".dark" },
  { name: "lava", lightSelector: '[data-theme="lava"]', darkSelector: '[data-theme="lava"].dark' },
]

// ─── Pairings to audit ────────────────────────────────────────────────

interface Pairing {
  name: string
  fg: string
  bg: string
  /** "normal" | "large" | "ui" — determines required ratio */
  type: "normal" | "large" | "ui"
  /** If bg has alpha < 1, composite it over this token before measuring. */
  backdrop?: string
}

const pairings: Pairing[] = [
  // Core shadcn pairings
  { name: "foreground on background", fg: "foreground", bg: "background", type: "normal" },
  { name: "card-foreground on card", fg: "card-foreground", bg: "card", type: "normal" },
  { name: "popover-foreground on popover", fg: "popover-foreground", bg: "popover", type: "normal" },
  { name: "primary-foreground on primary", fg: "primary-foreground", bg: "primary", type: "normal" },
  { name: "secondary-foreground on secondary", fg: "secondary-foreground", bg: "secondary", type: "normal" },
  { name: "muted-foreground on muted", fg: "muted-foreground", bg: "muted", type: "normal" },
  { name: "muted-foreground on background", fg: "muted-foreground", bg: "background", type: "normal" },
  { name: "accent-foreground on accent", fg: "accent-foreground", bg: "accent", type: "normal", backdrop: "background" },

  // Sidebar pairings
  { name: "sidebar-foreground on sidebar", fg: "sidebar-foreground", bg: "sidebar", type: "normal" },
  { name: "sidebar-primary-foreground on sidebar-primary", fg: "sidebar-primary-foreground", bg: "sidebar-primary", type: "normal" },
  { name: "sidebar-accent-foreground on sidebar-accent", fg: "sidebar-accent-foreground", bg: "sidebar-accent", type: "normal", backdrop: "sidebar" },

  // SubstrateUI surfaces (foreground should work on all surfaces)
  { name: "foreground on surface-ground", fg: "foreground", bg: "surface-ground", type: "normal" },
  { name: "foreground on surface-page", fg: "foreground", bg: "surface-page", type: "normal" },
  { name: "foreground on surface-raised", fg: "foreground", bg: "surface-raised", type: "normal" },
  { name: "foreground on surface-sunken", fg: "foreground", bg: "surface-sunken", type: "normal" },
  { name: "foreground on surface-interactive", fg: "foreground", bg: "surface-interactive", type: "normal" },

  // Status tokens
  { name: "status-success-text on status-success-surface", fg: "status-success-text", bg: "status-success-surface", type: "normal", backdrop: "background" },
  { name: "status-warning-text on status-warning-surface", fg: "status-warning-text", bg: "status-warning-surface", type: "normal", backdrop: "background" },
  { name: "status-error-text on status-error-surface", fg: "status-error-text", bg: "status-error-surface", type: "normal", backdrop: "background" },
  { name: "status-info-text on status-info-surface", fg: "status-info-text", bg: "status-info-surface", type: "normal", backdrop: "background" },

  // UI element contrast (3:1 minimum)
  { name: "border on background", fg: "border", bg: "background", type: "ui" },
  { name: "border-strong on background", fg: "border-strong", bg: "background", type: "ui" },
  { name: "ring on background", fg: "ring", bg: "background", type: "ui" },
  { name: "border on card", fg: "border", bg: "card", type: "ui" },

  // Status borders (Alert/Toast draw status-X as a border around status-X-surface)
  { name: "status-success on status-success-surface", fg: "status-success", bg: "status-success-surface", type: "ui", backdrop: "background" },
  { name: "status-warning on status-warning-surface", fg: "status-warning", bg: "status-warning-surface", type: "ui", backdrop: "background" },
  { name: "status-error on status-error-surface", fg: "status-error", bg: "status-error-surface", type: "ui", backdrop: "background" },
  { name: "status-info on status-info-surface", fg: "status-info", bg: "status-info-surface", type: "ui", backdrop: "background" },
  { name: "status-success on background", fg: "status-success", bg: "background", type: "ui" },
  { name: "status-warning on background", fg: "status-warning", bg: "background", type: "ui" },
  { name: "status-error on background", fg: "status-error", bg: "background", type: "ui" },
  { name: "status-info on background", fg: "status-info", bg: "background", type: "ui" },

  // Destructive
  { name: "primary-foreground on destructive", fg: "primary-foreground", bg: "destructive", type: "normal" },
]

// Pairings that only apply to the default theme (reference raw palette tokens
// that other themes don't consume directly).
const defaultOnlyPairings: Pairing[] = [
  { name: "warm-900 on amber-500 (light amber button)", fg: "raw-warm-900", bg: "raw-amber-500", type: "normal" },
  { name: "warm-950 on amber-400 (dark amber button)", fg: "raw-warm-950", bg: "raw-amber-400", type: "normal" },
]

// ─── Audit runner ─────────────────────────────────────────────────────

const THRESHOLDS = { normal: 4.5, large: 3, ui: 3 }

interface Result {
  theme: string
  mode: "light" | "dark"
  pairing: Pairing
  ratio: number | null
  pass: boolean
  required: number
}

function audit(): Result[] {
  const cssPath = path.resolve(__dirname, "../src/styles/tokens.css")
  const css = readFileSync(cssPath, "utf8")
  const blocks = parseBlocks(css)

  // Default/root token map: all :root declarations merged.
  const rootTokens = mergeMatchingBlocks(blocks, ":root")

  const results: Result[] = []

  for (const theme of THEMES) {
    // Light tokens: start from :root, then layer theme-specific light overrides.
    const lightTokens: TokenMap = { ...rootTokens }
    if (theme.lightSelector !== ":root") {
      Object.assign(lightTokens, mergeMatchingBlocks(blocks, theme.lightSelector))
    }

    // Dark tokens: start from the theme's light map, then layer
    // default `.dark` overrides, then theme-specific dark overrides.
    // This lets a theme inherit default .dark values for tokens it
    // doesn't explicitly override.
    const darkTokens: TokenMap = { ...lightTokens }
    Object.assign(darkTokens, mergeMatchingBlocks(blocks, ".dark"))
    if (theme.darkSelector !== ".dark") {
      Object.assign(darkTokens, mergeMatchingBlocks(blocks, theme.darkSelector))
    }

    const themePairings =
      theme.name === "default" ? [...pairings, ...defaultOnlyPairings] : pairings

    for (const p of themePairings) {
      const required = THRESHOLDS[p.type]
      const modeTokenPairs: Array<["light" | "dark", TokenMap]> = [
        ["light", lightTokens],
        ["dark", darkTokens],
      ]
      for (const [mode, tokens] of modeTokenPairs) {
        const fg = resolveValue(p.fg, tokens)
        const bg = resolveValue(p.bg, tokens)
        const backdrop = p.backdrop ? resolveValue(p.backdrop, tokens) : null
        const ratio = fg && bg ? computeRatio(fg, bg, backdrop) : null
        results.push({
          theme: theme.name,
          mode,
          pairing: p,
          ratio,
          pass: ratio !== null && ratio >= required,
          required,
        })
      }
    }
  }

  return results
}

function computeRatio(fg: string, bg: string, backdrop?: string | null): number | null {
  try {
    const fgColor = parse(fg)
    const bgColor = parse(bg)
    if (!fgColor || !bgColor) return null

    let effectiveBg = bgColor
    const alpha = bgColor.alpha ?? 1
    if (alpha < 1 && backdrop) {
      const backdropColor = parse(backdrop)
      if (backdropColor) {
        effectiveBg = composite(bgColor, backdropColor)
      }
    }
    return wcagContrast(fgColor, effectiveBg)
  } catch {
    return null
  }
}

// Alpha-composite `over` onto `under` (returns an opaque rgb color).
const toRgb = converter("rgb")
type ParsedColor = NonNullable<ReturnType<typeof parse>>
function composite(over: ParsedColor, under: ParsedColor): ParsedColor {
  const a = over.alpha ?? 1
  const rgbOver = toRgb(over as never) as unknown as { r: number; g: number; b: number }
  const rgbUnder = toRgb(under as never) as unknown as { r: number; g: number; b: number }
  return {
    mode: "rgb",
    r: rgbOver.r * a + rgbUnder.r * (1 - a),
    g: rgbOver.g * a + rgbUnder.g * (1 - a),
    b: rgbOver.b * a + rgbUnder.b * (1 - a),
    alpha: 1,
  } as ParsedColor
}

// ─── Report generation ────────────────────────────────────────────────

function formatThemeLabel(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

function generateReport(results: Result[]): string {
  const lines: string[] = [
    "# SubstrateUI Contrast Audit Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "WCAG AA thresholds: 4.5:1 (normal text), 3:1 (large text / UI elements)",
    "",
  ]

  for (const theme of THEMES) {
    lines.push(`## ${formatThemeLabel(theme.name)} theme`, "")
    for (const mode of ["light", "dark"] as const) {
      lines.push(`### ${mode.charAt(0).toUpperCase() + mode.slice(1)} mode`, "")
      lines.push("| Pairing | Type | Required | Ratio | Status |")
      lines.push("|---|---|---|---|---|")
      const scoped = results.filter((r) => r.theme === theme.name && r.mode === mode)
      for (const r of scoped) {
        const ratioStr = r.ratio !== null ? r.ratio.toFixed(2) : "—"
        const mark = r.pass ? "✅" : "❌"
        lines.push(
          `| ${r.pairing.name} | ${r.pairing.type} | ${r.required}:1 | ${ratioStr} ${mark} | ${
            r.pass ? "PASS" : "REVIEW"
          } |`
        )
      }
      lines.push("")
    }
  }

  const failures = results.filter((r) => !r.pass)
  lines.push("## Summary", "")
  lines.push(`- Total pairings audited: ${results.length}`)
  lines.push(`- Passing: ${results.length - failures.length}`)
  lines.push(`- Failing or incomplete: ${failures.length}`)

  if (failures.length > 0) {
    lines.push("", "## Failures", "")
    for (const r of failures) {
      lines.push(`### [${r.theme} / ${r.mode}] ${r.pairing.name}`, "")
      lines.push(`- Required: ${r.required}:1 (${r.pairing.type})`)
      lines.push(`- Ratio: ${r.ratio?.toFixed(2) ?? "unresolved"}`, "")
    }
  }

  return lines.join("\n")
}

// ─── Main ─────────────────────────────────────────────────────────────

const results = audit()
const report = generateReport(results)
const outPath = path.resolve(__dirname, "../audit-contrast-report.md")
writeFileSync(outPath, report)
console.log(`Wrote ${outPath}`)

// Also emit a JSON manifest for the docs page to render.
// The docs contrast matrix currently only consumes the default theme;
// we keep that shape (light/dark per pairing) for backwards compat and
// ship the full multi-theme results alongside it.
const defaultResults = results.filter((r) => r.theme === "default")
const byPairing = new Map<
  string,
  { light: Result | null; dark: Result | null; pairing: Pairing }
>()
for (const r of defaultResults) {
  const key = r.pairing.name
  const entry = byPairing.get(key) ?? { light: null, dark: null, pairing: r.pairing }
  if (r.mode === "light") entry.light = r
  else entry.dark = r
  byPairing.set(key, entry)
}

const jsonPath = path.resolve(__dirname, "../src/app/docs/accessibility/contrast/contrast-data.json")
const jsonData = {
  generatedAt: new Date().toISOString(),
  results: [...byPairing.values()].map(({ pairing, light, dark }) => ({
    name: pairing.name,
    fg: pairing.fg,
    bg: pairing.bg,
    type: pairing.type,
    backdrop: pairing.backdrop ?? null,
    required: THRESHOLDS[pairing.type],
    light: light?.ratio ?? null,
    dark: dark?.ratio ?? null,
    lightPass: light?.pass ?? false,
    darkPass: dark?.pass ?? false,
  })),
  themes: THEMES.map((t) => ({
    name: t.name,
    results: results
      .filter((r) => r.theme === t.name)
      .map((r) => ({
        mode: r.mode,
        name: r.pairing.name,
        type: r.pairing.type,
        required: r.required,
        ratio: r.ratio,
        pass: r.pass,
      })),
  })),
}
try {
  writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2))
  console.log(`Wrote ${jsonPath}`)
} catch {
  // Directory may not exist yet; ignore.
}

const failures = results.filter((r) => !r.pass)
if (failures.length > 0) {
  console.log(`\n⚠️  ${failures.length} pairing(s) failed or could not be resolved:`)
  for (const r of failures) {
    console.log(`  - [${r.theme}/${r.mode}] ${r.pairing.name}`)
  }
  process.exit(1)
}
console.log("\n✅ All pairings pass WCAG AA across all themes.")
