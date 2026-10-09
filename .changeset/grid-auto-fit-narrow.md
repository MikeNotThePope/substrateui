---
"@mikenotthepope/substrateui": patch
---

`grid-auto-fit` and `grid-auto-fill` no longer overflow a container narrower than `--grid-min`. The minimum is now `min(var(--grid-min, 280px), 100%)`, so on a narrow phone column the grid wraps to one full-width track instead of pushing the page sideways.
