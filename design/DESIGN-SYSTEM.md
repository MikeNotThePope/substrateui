# SubstrateUI — Design System

**Direction:** Press
**One-line thesis:** The site is a printer's proof sheet — process inks on proof stock, registration
marks, chips that overlap and bleed — because a theme in SubstrateUI *is* an ink: you swap it and the
press underneath doesn't change.
**Client:** SubstrateUI (`@mikenotthepope/substrateui`, v1.14, published to npm) ·
**Job of the interface:** convince a React/Next developer in one screen that the theming layer is
real — that one token map repaints every component — and make them want the themes.

Scope: substrateui.dev **home page** + the shipped **theme palettes** in `src/styles/tokens.css`.
Component internals (border widths, shadow shapes, density) are **not** changed — consumers on v1.x
see no visual break. See Decision log #1.

**"Default" is a role, not a name.** Every theme has a real name — `plum`, `press`, `substrate`,
`lava`, `tundra` — and "default" only says which one you get with no `data-theme` attribute. `plum`
is the palette the library shipped as v1's default; it stays a peer in the deck, and the default role
can move to `press` later without renaming a thing. See Decision log #10.

## Palette

The default theme is `press`: proof stock (cool neutral, hue 264) carrying the three process inks.

| Token | Value | Role |
|---|---|---|
| `--ds-primary` | `oklch(0.505 0.110 232)` `#0077A3` | Process cyan, darkened to carry white text. Buttons, links, focus ring. **Never** as a large flat field — cyan at field scale reads corporate-SaaS. |
| `--ds-primary-hover` | `oklch(0.420 0.092 234)` `#005C7F` | Pressed/hover only. |
| `--ds-primary-ink` | `oklch(0.677 0.131 227.5)` `#00A6D6` | The *undarkened* process cyan. Chips, swatches, dark-mode primary — anywhere it isn't carrying text. |
| `--ds-secondary` | `oklch(0.881 0.181 94)` `#FFD400` | Process yellow. Highlighter, secondary fills, the chip codes' backing. Always takes **ink**, never white. |
| `--ds-mark` | `oklch(0.593 0.239 4.3)` `#E5006D` | Process magenta. **Decorative and brand only** — registration marks, the fan-deck spine, chart-2. Never a status. See Decision log #4. |
| `--ds-surface` | `oklch(0.949 0.003 264.5)` `#EDEEF0` | Proof stock. Page ground. |
| `--ds-surface-raised` | `oklch(0.995 0.001 264)` `#FEFEFF` | Chips and cards sitting on the stock. |
| `--ds-ink` | `oklch(0.178 0.006 271)` `#101114` | Body and display text. |
| `--ds-muted` | `oklch(0.455 0.007 266)` `#6B6C74` | Captions, chip codes, OKLCH readouts. |
| `--ds-rule` | `oklch(0.565 0.007 265)` `#87888F` | Trim lines, registration marks, borders. |
| `--ds-error` | `oklch(0.545 0.200 27)` `#D33A22` | Semantic red. Hue 27 keeps it visibly oranger than the magenta mark. |

Contrast pairs verified ≥ 4.5:1: ink on surface (16.6:1) · ink on surface-raised (18.4:1) ·
white on primary (7.0:1) · ink on secondary (13.2:1) · muted on surface (5.1:1).
UI pairs ≥ 3:1: rule on surface · primary on surface.
CI enforces all 31 pairings per theme, light **and** dark, via `bun run audit:contrast`.

CVD note: cyan / yellow / magenta span the blue–yellow axis, so the triad separates under
protanopia and deuteranopia — same reasoning that put amber (not green) next to plum in `default`.

## Type

- **Display:** Archivo, 700–800, tracking `-0.03em` — headlines and section openers only. Set tight
  and large; never below 24px.
- **Body:** Inter, 400/500, line-height 1.6 — everything you actually read.
- **Utility:** Barlow Condensed, 600, **uppercase**, tracking `0.08em` — chip codes, registration
  labels, eyebrows. This is the tiny type printed on the edge of a real swatch card; it is the
  direction's fingerprint and must stay small (10–13px) or it stops reading as a spec mark.
- **Data:** Martian Mono, 400 — OKLCH triplets and code only.

No serif anywhere. See Decision log #3.

Scale: 0.6875 / 0.8125 / 1 / 1.25 / 1.625 / 2.25 / 3.25 / 5rem · Ratio: ~1.29 · Base: 1rem

## Space & shape

Surface ladder, five rungs: `sunken → stock (ground) → raised → interactive → interactive-hover`.
In **light**, sunken sits below ground. In **dark it cannot** — below near-black there is no
perceptual headroom (dropping sunken from L 0.130 to 0.110 moves its contrast against ground from
1.12 to 1.14, invisible). So in dark, **`--ds-sunken` aliases ground** and recession is expressed by
*not raising*, which is already what the shipped `default` and `lava` themes do with
`--surface-sunken`. Consequence: hover states must use `--ds-interactive`, never `--ds-sunken`, or
they vanish in dark. Dark steps are ground 0.175 → raised 0.285 → interactive 0.340, each ≥ 1.16:1.

Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 72 / 112px (`--ds-space-*`)
Radius: 2px / 3px / 4px — chips are cut, not rounded (`--radius-factor: 0.25` on the shipped theme)
Border weight: 1px hairline for trim/rules, 2px only where a component already ships it
Shadow: **paper lift, not offset block** — `0 1px 0 rgb(16 17 20 / .06), 0 6px 18px -8px rgb(16 17 20 / .28)`.
Depth on this site comes from chips *overlapping* and bleeding off the edge, never from a hard offset
drop shadow. This is how neo-brutalism is retired without the page going flat.

## Motion

Durations 120–220ms · Easing `cubic-bezier(0.2, 0, 0, 1)` (fast in, hard stop — a press plate seating)
What moves: chips lift 2px and gain shadow on hover; the fan deck slides; theme swap cross-fades
surface colors over 220ms; the OKLCH readouts count to their new values.
What never moves: display type, registration marks, trim lines, page layout.
`prefers-reduced-motion` collapses every transition to 0ms and the readouts snap instead of counting.

## Voice

A printer's spec sheet: terse, declarative, numeric. It states what a thing *is* and what it *costs*,
never how you'll feel about it. Sentence case, active verbs, no adjectives that can't be measured.

Samples:
1. Primary CTA — "Install"
2. Hero thesis — "Swap the ink. The press doesn't change."
3. Empty state — "No themes registered. Add one to `ThemeRegistry` and it appears here."
4. Error — "`primary-foreground` on `primary` is 3.1:1. Needs 4.5:1."

## Signature

**The fan deck.** The theme switcher is a physical swatch fan — chips overlapping at the foot of the
hero, each one painted in its own theme's tokens and stamped with its real OKLCH triplet in condensed
caps. Pull one forward and the entire page becomes that chip: stock, inks, radius, motion curve, all
of it. It belongs to this brief and no other because SubstrateUI's themes genuinely *are* swappable
ink — a token map, not a skin — and a fan deck is the one object in the world that means exactly
that. Everything else on the page stays quiet so the deck lands: hairline trim, flat stock, no
gradients, one display size per section.

## Anti-patterns for this project

- No violet/indigo→purple gradients, glow orbs, or glassmorphism. (Client's #1 avoid. Note the
  existing `default` theme is plum — it stays for compat but stops being what the site shows.)
- No hero-two-buttons → 3×2 icon-card grid → code block → CTA → footer. That is the current page's
  skeleton and the client named it explicitly. Sections here are chips and press furniture, not cards.
- No marketing-speak: "Built Different", "Batteries included", "Every decision is intentional" are
  all struck.
- No emoji, no sparkles, no Lucide icon in a rounded square on every heading. Icons only where they
  carry information.
- No warm cream + high-contrast serif + terracotta (AI default #1). Proof stock is *cool* (hue 264)
  and there is no serif in the system — both chosen specifically to stay off that default.
- No near-black page with one acid accent (AI default #2). Press is a light direction; dark mode
  inverts the stock, it doesn't become a neon terminal.

## Decision log

| # | Decision | Verdict | Why |
|---|---|---|---|
| 1 | Replace neo-brutalism inside the shipped components now | rejected | v1.14 is published; `border-2`/`shadow-hard` are in consumers' UIs. Client chose "website first, library follows later" — the site proves the language, a v2 track ports it. |
| 2 | Replace the shipped default palette with Press | rejected | Would be a silent breaking visual change for every existing consumer. `press` is added as a new theme and the site opts into it via `data-theme`; the plum palette stays untouched. One attribute reverses this. |
| 3 | Warm cream stock + editorial serif for the swatch-card feel | rejected | Lands squarely on AI default #1 (cream + serif + terracotta). Press proofs are all-grotesque on cool stock anyway — the truer reference is also the less generic one. |
| 4 | Process magenta as the `destructive`/error token | rejected | Magenta sits at hue 4, a hair off true red; using it semantically makes "delete" and "brand accent" confusable. Magenta is brand-only; error is a distinct hue-27 red. |
| 5 | Three process inks (cyan/magenta/yellow) on cool proof stock | accepted | Genuinely pops, is nowhere near AI's palette, and is honest to the subject — process inks are literally what "swap the ink" means. |
| 6 | Fan-deck theme switcher as the signature | accepted | The one object that means "same press, different ink". Directly demos the product's actual differentiator. |
| 7 | Depth from overlap + paper lift instead of offset hard shadows | accepted | Retires neo-brutalism without flattening the page, and needs no component changes. |
| 8 | Barlow Condensed caps for chip codes | accepted | The fingerprint of a real swatch card. Constrained to 10–13px so it stays a spec mark, not a headline. |
| 9 | Four new/curated themes: `press` (site default), `substrate`, `lava` (kept), `tundra` | accepted | Enough range that the fan deck is a real demo; few enough that each gets a full audited light+dark pass. With `plum` retained that makes five registered themes. |
| 10 | Decouple "default" from "plum" — name the palette, demote "default" to a role | accepted | Client's call, and it's right: naming a palette after its status means the status can never move without a rename. `plum` is now a peer chip in the deck; `[data-theme="default"]` stays as a back-compat alias for published consumers. |
| 11 | Make dark-mode `sunken` darker so it reads against ground | rejected | Measured, not guessed: L 0.130 → 0.110 moves contrast 1.12 → 1.14. There is no headroom below near-black. Sunken aliases ground in dark instead — the shipped themes already do this — and hover moved to a new `--ds-interactive` token so it survives the alias. |
| 12 | Ask the client whether process cyan reads too corporate | rejected | It doesn't, and I knew it did. Asking a question whose answer is already settled spends the client's attention and reads as doubt. Directional calls get made, not surveyed. |
| 13 | Home page as hero + 3×2 feature cards + code block | rejected | The skeleton the client named. Replaced with press furniture: thesis → fan deck → ink-density bar → proof (live UI beside the token map that produced it) → job docket. The docket carries more information than six icon cards and is a real press artifact. |
| 14 | Fan deck beside the headline in a two-column hero | rejected | Five chips need 784px; a hero sidebar gave ~600px and clipped Tundra and Plum. The deck is the signature, so it gets the full measure and the hero is single-column. |
| 15 | Mix ink tints in `oklch` for the density bar | rejected | oklch interpolates hue on the shortest arc, so yellow (h 94) tinted toward cool stock (h 264) swings through green. A tint is less ink on the same paper — `oklab` gives that, no hue rotation. |
| 16 | `--ds-muted` / `--ds-primary-ink` for text on the dark code block | rejected | Both are tuned against light stock; on ink they measured 2.59:1 and 3.47:1 (plum). The block inverts, so its dim colours are mixed from `--ds-stock` toward `--ds-ink` instead — works in every theme without new tokens. |
| 17 | `design/audit.mjs` — contrast check over every pair the mockups use | accepted | 70 pairs × 5 themes, run against `design/tokens.css` directly. Caught #16, which eyeballing did not. Mirrors what `scripts/audit-contrast.ts` will enforce once these become real themes. |

## Port deviations

Recorded when `design/mockups/home.html` was ported to `src/app/page.tsx`. Each is a place the
shipped page knowingly differs from the mockup, with the reason — so the next session doesn't "fix"
them back.

| # | Mockup | Shipped | Why |
|---|---|---|---|
| P1 | Archivo / Inter / Barlow Condensed / Martian Mono | **Archivo** (display) and **Barlow Condensed** (utility caps) shipped as site-only faces. Body stays **DM Sans**, data stays **DM Mono**. | The two characterful roles are delivered. The other two are deliberately not: `--font-sans` and `--font-mono` live in `src/styles/tokens.css` inside `@theme inline`, so they ship to consumers — swapping them would restyle every installation of the package. Inter-vs-DM-Sans and Martian-vs-DM-Mono are also near-zero perceptual gain for a reader, so the trade was all cost. `--font-display` and `--font-utility` are registered in `src/app/globals.css`, which is site-only by existing convention. |
| P2 | Process magenta for registration marks and focus rings | `--primary` | No theme exposes a *third* brand token — themes ship `--primary` and `--secondary-fill` only. `press` defines `--raw-magenta`, but promoting it to a semantic token would give one theme a slot the others lack and break the uniform contract the audit relies on. |
| P3 | Hairline trim, paper-lift shadows | The components' own `border-2` and `shadow-hard` | The agreed "website first" split: component internals are untouched so no consumer breaks. **Finding: it works.** Heavy borders around process inks read as letterpress/risograph rather than as neo-brutalism — the structural language and the palette turn out to be doing different jobs. This weakens, rather than strengthens, the case for a `--border-factor` v2 track. |
| P4 | Ink-density bar shows three process inks | Two brand inks plus the neutral ramp | Follows from P2. Showing the neutral ramp is arguably the better demo anyway: neutrals are the axis people miss, and they genuinely differ per theme (warm cream vs basalt vs cool proof vs graphite vs frost). |

## Post-ship decisions

Made 2026-07-29 after the direction shipped (PRs #65, #67, #68). Both are refusals, recorded so
they are not re-proposed: the evidence that killed them is not visible in the code.

| # | Proposal | Verdict | Evidence |
|---|---|---|---|
| S1 | A `--border-factor` token so themes can thin the components' `border-2`, retiring neo-brutalism inside the library (the "v2 track") | **rejected** | The home page was deliberately built from shipped components with *zero* per-instance overrides, so this question could be answered rather than dodged. Heavy borders around process cyan and yellow read as **letterpress**, not as neo-brutalism — the structural language and the palette turn out to be doing different jobs. The premise that Press needs thin borders is simply wrong. Revisit only if a future theme actually fights the borders; it would touch `border-2` in 59 of 85 components. |
| S2 | Rework `ThemeStrip` so adding a theme stops moving the landing page's height | **rejected — premise expired** | Measured at the visual-test viewport after #67: 5 chips occupy **673px of 1216px available, 543px of headroom** — room for four more themes before any wrap. The original problem came from the old two-column hero squeezing the strip into a narrow column; the Press hero is full-width and fixed it incidentally. Fixing it now would cost a baseline regeneration to solve a problem that does not exist. Revisit at ~9 themes. |

Both were tempting because they sound like diligence. Neither survived a measurement.

| # | Proposal | Verdict | Evidence |
|---|---|---|---|
| S3 | Put the display face on `H1`–`H4` in `src/components/ui/typography.tsx` so the whole site inherits it | **rejected** | `typography.tsx` ships. Consumers have no Archivo file, so they would get the fallback stack — a font-family change to every installation, which is exactly what P1 refused. Delivered site-side instead: one `body :is([data-slot=h1|h2|h3])` rule in `src/app/globals.css`, which is site-only by the same convention. |
| S4 | Include `h4` in the display rule | **rejected** | `H4` renders at `text-xl` = 20px, below the system's 24px display floor. Set in Archivo it stops reading as a headline and starts reading as bolded body. |
| S5 | Scope the display rule to `main` (i.e. docs only) | **rejected** | `/design-system` is in the top nav and its `Center` wrapper is a `div`, so it would have been the one page left in DM Sans. Scoped to `body` instead, with `[data-specimen]` as the opt-out. |

| # | Proposal | Verdict | Evidence |
|---|---|---|---|
| S6 | Rewrite all 91 docs descriptions into the Press voice | **rejected — scoped down** | 60 of them already comply: they are declarative, name what the thing is, and carry no unmeasurable adjective. Rewriting compliant copy is churn that reads as a voice pass without being one, and it puts 91 strings up for review instead of the 31 that were actually wrong. Only the violations were rewritten. |
| S7 | Leave the sample copy inside the blocks demo alone as "consumer content" | **rejected** | It said "batteries fully included", a phrase the anti-patterns strike by name, and it renders on our page in our chrome. A reader does not know which strings we consider example data. |

The voice test used: does the sentence state what the thing **is** or what it **costs**, in words that can
be checked? "Seven variants, four sizes, a 3px press offset" passes. "A versatile button with a
satisfying press animation" does not — neither adjective can be verified, and together they say
nothing the reader could not see. Where a component has a real cost, the description now names it:
`Tabs` says the URL does not change, `HoverCard` says hover-only content needs a touch-reachable
home.

`[data-specimen]` marks a container whose headings are *library output on display* rather than site
chrome — component previews, and the two type-specimen lists on `/docs/tokens/typography` and
`/design-system`. Headings inside it keep `--font-sans`, because that is what a consumer's app
renders; showing them in Archivo would misreport the product. Any new specimen surface needs the
attribute.
