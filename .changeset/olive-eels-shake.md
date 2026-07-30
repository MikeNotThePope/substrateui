---
"@mikenotthepope/substrateui": minor
---

Align plum and lava with the rest of the set on geometry and motion. Both now
inherit the house baseline — `--radius-factor: 0.25` and a 140ms
`cubic-bezier(0.2, 0, 0, 1)` transition — instead of plum's stock 1x/150ms and
lava's swollen 1.5x/300ms. Corners across the default theme go from 6px to
1.5px at `rounded-md`, and lava is now a palette rather than a structural
variant; its magma-tinted hard shadow is the only geometry it still owns.
Substrate (0.4x/160ms) and tundra (0.15x/120ms) are unchanged.
