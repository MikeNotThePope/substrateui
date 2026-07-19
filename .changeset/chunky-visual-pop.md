---
"@mikenotthepope/substrateui": minor
---

Visual "pop" overhaul: neubrutalist hard shadows, real surface hierarchy, and press-down interactions across both themes.

- **New hard-shadow tokens**: `--hard-shadow-color` / `--hard-shadow-sm|/|-lg|-amber` exposed as `shadow-hard-sm`, `shadow-hard`, `shadow-hard-lg`, and `shadow-hard-amber` utilities. Light mode drops a warm near-black slab; dark mode extrudes with a border-toned slab (a dark drop is invisible on a near-black ground). Lava theme gets basalt equivalents.
- **Surface hierarchy**: light mode background moves to `warm-100` so cards (`warm-white`) and page surfaces (`warm-50`) genuinely separate; dark mode gains a deeper `warm-975` ground beneath `warm-900` page / `warm-850` card / `warm-800` popover. Same ladder for lava via `basalt-975`.
- **Press mechanics**: solid Button variants and interactive Cards now rest on a hard shadow, lift on hover, and sink flush on press (`prefers-reduced-motion` respected).
- **Token-driven amber**: new `--primary-border`, `--secondary-fill-foreground`, and `--secondary-fill-border` tokens; the amber Button variant no longer needs per-component `dark:` overrides (and now follows theme secondaries, e.g. sulfur under the lava theme).
- **Overlays**: popovers, menus, dialogs, tooltips, and toasts swap soft `shadow-md/lg` for the hard-shadow treatment.
- Light-mode `--secondary`/`--muted` step up to `warm-200`; `--surface-interactive*` follow.
