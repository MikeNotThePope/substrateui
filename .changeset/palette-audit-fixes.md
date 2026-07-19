---
"@mikenotthepope/substrateui": minor
---

Palette audit fixes for both themes (default + lava).

- **New mid-neutral steps**: `warm-350`/`warm-450` and `basalt-350`/`basalt-450` close the 13–14% lightness gaps between the 300/400/500 steps — giving disabled text, tertiary text, and hover borders proper options. `warm-350`–`warm-450` are exposed as Tailwind utilities alongside the existing scale.
- **Ramp depth**: new `amber-900` and `sulfur-900` extend the yellow ramps to a true dark step for text-on-amber/sulfur surfaces.
- **De-duplicated warning**: `--raw-warning` is now an alias of `--raw-amber-600` (they were byte-identical values that could drift apart); light-mode `--status-warning-text` now uses `amber-800` instead of a hand-rolled near-duplicate.
- **plum-50 reads as plum**: chroma raised from 0.009 to 0.02 — it was within a just-noticeable difference of the warm neutrals.
- **Sidebar fix**: rail focus shadow used shadcn-upstream `hsl(var(--sidebar-border))`, which wraps an OKLCH value in `hsl()` and silently produced invalid CSS; now uses the variable directly.
- Docs tokens page updated to match the current ladders (post surface-hierarchy overhaul) and new steps.
