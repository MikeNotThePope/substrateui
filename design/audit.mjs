import { readFileSync } from "node:fs"
import { wcagContrast, interpolate, formatCss } from "culori"

// Mirrors the mockup's color-mix(in oklab, A pct%, B) for the code block.
const mix = (a, b, pct) => formatCss(interpolate([b, a], "oklab")(pct))

const css = readFileSync("design/tokens.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "")  // comments would land in the selector capture

// Pull each theme block's --ds-* declarations. Selector list means one block can
// serve several selectors (":root, [data-ds-theme=\"press\"]").
const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(m => ({
  sel: m[1].trim(),
  decls: Object.fromEntries([...m[2].matchAll(/(--ds-[a-z0-9-]+):\s*([^;]+);/gi)].map(d => [d[1], d[2].trim()])),
}))

const THEMES = ["press", "substrate", "lava", "tundra", "plum"]

function tokensFor(theme) {
  const out = {}
  for (const b of blocks) {
    if (b.sel.includes(".ds-dark")) continue                 // light only here
    const sels = b.sel.split(",").map(s => s.trim())
    const hit = sels.includes(":root") || sels.includes(`[data-ds-theme="${theme}"]`)
    if (hit) Object.assign(out, b.decls)
  }
  return out
}

const PAIRS = [
  ["ink/stock", "--ds-ink", "--ds-stock", 4.5],
  ["muted/stock", "--ds-muted", "--ds-stock", 4.5],
  ["ink/raised", "--ds-ink", "--ds-raised", 4.5],
  ["muted/raised", "--ds-muted", "--ds-raised", 4.5],
  ["ink/interactive", "--ds-ink", "--ds-interactive", 4.5],
  ["on-primary/primary", "--ds-on-primary", "--ds-primary", 4.5],
  ["on-secondary/secondary", "--ds-on-secondary", "--ds-secondary", 4.5],
  ["badge hover/surface", "--ds-primary-hover", "--ds-primary-surface", 4.5],
  ["code key secondary/ink", "--ds-secondary", "--ds-ink", 4.5],
  ["code val (mixed 55%)", ["mix", "--ds-primary-ink", "--ds-stock", 0.55], "--ds-ink", 4.5],
  ["code cmt (mixed 60%)", ["mix", "--ds-stock", "--ds-ink", 0.60], "--ds-ink", 4.5],
  ["code body stock/ink", "--ds-stock", "--ds-ink", 4.5],
  ["rule/stock (UI)", "--ds-rule", "--ds-stock", 3],
  ["mark/stock (UI focus)", "--ds-mark", "--ds-stock", 3],
]

let fails = 0, total = 0
for (const t of THEMES) {
  const tk = tokensFor(t)
  for (const [name, f, b, need] of PAIRS) {
    total++
    const fg = Array.isArray(f) ? mix(tk[f[1]], tk[f[2]], f[3]) : tk[f]
    if (!fg || !tk[b]) { fails++; console.log(`MISS  ${t.padEnd(10)} ${name.padEnd(26)} ${!fg ? JSON.stringify(f) : b} undefined`); continue }
    const v = wcagContrast(fg, tk[b])
    if (!(v >= need)) { fails++; console.log(`FAIL  ${t.padEnd(10)} ${name.padEnd(26)} ${v.toFixed(2)} < ${need}`) }
  }
}
console.log(fails ? `\n${fails} of ${total} failing` : `all ${total} pairs pass`)
