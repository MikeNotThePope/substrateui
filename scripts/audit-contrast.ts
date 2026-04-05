import { readFileSync, writeFileSync } from "node:fs"
import { wcagContrast, parse, converter } from "culori"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ─── Token extraction ─────────────────────────────────────────────────

type TokenMap = Record<string, string>

function extractTokens(css: string): { light: TokenMap; dark: TokenMap } {
  const light: TokenMap = {}
  const dark: TokenMap = {}

  // Find all :root blocks (there are multiple)
  const rootBlocks = [...css.matchAll(/:root\s*\{([^}]+)\}/g)]
  for (const block of rootBlocks) {
    extractDeclarations(block[1], light)
  }

  // Find .dark block
  const darkBlock = css.match(/\.dark\s*\{([^}]+)\}/)
  if (darkBlock) {
    // Dark inherits from light, then overrides
    Object.assign(dark, light)
    extractDeclarations(darkBlock[1], dark)
  }

  return { light, dark }
}

function extractDeclarations(block: string, target: TokenMap): void {
  const decls = block.matchAll(/--([a-z0-9-]+):\s*([^;]+);/gi)
  for (const decl of decls) {
    target[decl[1]] = decl[2].trim()
  }
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

  // Amber button (uses raw palette with explicit dark overrides)
  { name: "warm-900 on amber-500 (light amber button)", fg: "raw-warm-900", bg: "raw-amber-500", type: "normal" },
  { name: "warm-950 on amber-400 (dark amber button)", fg: "raw-warm-950", bg: "raw-amber-400", type: "normal" },

  // UI element contrast (3:1 minimum)
  { name: "border on background", fg: "border", bg: "background", type: "ui" },
  { name: "border-strong on background", fg: "border-strong", bg: "background", type: "ui" },
  { name: "ring on background", fg: "ring", bg: "background", type: "ui" },
  { name: "border on card", fg: "border", bg: "card", type: "ui" },

  // Destructive
  { name: "primary-foreground on destructive", fg: "primary-foreground", bg: "destructive", type: "normal" },
]

// ─── Audit runner ─────────────────────────────────────────────────────

const THRESHOLDS = { normal: 4.5, large: 3, ui: 3 }

interface Result {
  pairing: Pairing
  lightRatio: number | null
  darkRatio: number | null
  lightPass: boolean
  darkPass: boolean
  required: number
}

function audit(): Result[] {
  const cssPath = path.resolve(__dirname, "../src/styles/tokens.css")
  const css = readFileSync(cssPath, "utf8")
  const { light, dark } = extractTokens(css)

  return pairings.map((p) => {
    const required = THRESHOLDS[p.type]
    const lightFg = resolveValue(p.fg, light)
    const lightBg = resolveValue(p.bg, light)
    const darkFg = resolveValue(p.fg, dark)
    const darkBg = resolveValue(p.bg, dark)

    const lightBackdrop = p.backdrop ? resolveValue(p.backdrop, light) : null
    const darkBackdrop = p.backdrop ? resolveValue(p.backdrop, dark) : null

    const lightRatio = lightFg && lightBg ? computeRatio(lightFg, lightBg, lightBackdrop) : null
    const darkRatio = darkFg && darkBg ? computeRatio(darkFg, darkBg, darkBackdrop) : null

    return {
      pairing: p,
      lightRatio,
      darkRatio,
      lightPass: lightRatio !== null && lightRatio >= required,
      darkPass: darkRatio !== null && darkRatio >= required,
      required,
    }
  })
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

function generateReport(results: Result[]): string {
  const lines: string[] = [
    "# SubstrateUI Contrast Audit Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "WCAG AA thresholds: 4.5:1 (normal text), 3:1 (large text / UI elements)",
    "",
    "| Pairing | Type | Required | Light | Dark | Status |",
    "|---|---|---|---|---|---|",
  ]

  for (const r of results) {
    const lightStr = r.lightRatio !== null ? r.lightRatio.toFixed(2) : "—"
    const darkStr = r.darkRatio !== null ? r.darkRatio.toFixed(2) : "—"
    const lightMark = r.lightPass ? "✅" : "❌"
    const darkMark = r.darkPass ? "✅" : "❌"
    lines.push(
      `| ${r.pairing.name} | ${r.pairing.type} | ${r.required}:1 | ${lightStr} ${lightMark} | ${darkStr} ${darkMark} | ${
        r.lightPass && r.darkPass ? "PASS" : "REVIEW"
      } |`
    )
  }

  const failures = results.filter((r) => !r.lightPass || !r.darkPass)
  lines.push("")
  lines.push("## Summary")
  lines.push("")
  lines.push(`- Total pairings audited: ${results.length}`)
  lines.push(`- Passing (light + dark): ${results.length - failures.length}`)
  lines.push(`- Failing or incomplete: ${failures.length}`)

  if (failures.length > 0) {
    lines.push("")
    lines.push("## Failures")
    lines.push("")
    for (const r of failures) {
      lines.push(`### ${r.pairing.name}`)
      lines.push("")
      lines.push(`- Required: ${r.required}:1 (${r.pairing.type})`)
      lines.push(`- Light: ${r.lightRatio?.toFixed(2) ?? "unresolved"}`)
      lines.push(`- Dark: ${r.darkRatio?.toFixed(2) ?? "unresolved"}`)
      lines.push("")
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
const jsonPath = path.resolve(__dirname, "../src/app/docs/accessibility/contrast/contrast-data.json")
const jsonData = {
  generatedAt: new Date().toISOString(),
  results: results.map((r) => ({
    name: r.pairing.name,
    fg: r.pairing.fg,
    bg: r.pairing.bg,
    type: r.pairing.type,
    backdrop: r.pairing.backdrop ?? null,
    required: r.required,
    light: r.lightRatio,
    dark: r.darkRatio,
    lightPass: r.lightPass,
    darkPass: r.darkPass,
  })),
}
try {
  writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2))
  console.log(`Wrote ${jsonPath}`)
} catch {
  // Directory may not exist yet; ignore.
}

const failures = results.filter((r) => !r.lightPass || !r.darkPass)
if (failures.length > 0) {
  console.log(`\n⚠️  ${failures.length} pairing(s) failed or could not be resolved:`)
  for (const r of failures) {
    console.log(`  - ${r.pairing.name}`)
  }
  process.exit(1)
}
console.log("\n✅ All pairings pass WCAG AA.")
