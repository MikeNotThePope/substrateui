---
"@mikenotthepope/substrateui": minor
---

Add three themes — `press`, `substrate` and `tundra` — and name the built-in palette `plum`.

**New themes.** Each ships a full OKLCH ramp set plus light and dark semantic
blocks, and owns its own motion curve and corner radius alongside its palette:

- **press** — the three process inks (cyan, magenta, yellow) on cool proof
  stock. Corners are cut rather than rounded (`--radius-factor: 0.25`) and
  motion is fast with a hard stop.
- **substrate** — cold graphite neutrals, a jade primary and instrument amber.
- **tundra** — pale frost neutrals, steel blue and cold rose; square corners
  and the quickest motion of the set.

**`default` is now a role, not a palette name.** The built-in palette is called
`plum`, and "default" means only "the theme you get with no attribute set".
This is backwards compatible: `[data-theme="default"]` still selects the same
palette, and a `"default"` value already in `localStorage` is read as `plum`.
Naming the palette separately from the role means the default can move to
another theme later without renaming anything.

All 31 audited contrast pairings pass in light and dark for every theme.
