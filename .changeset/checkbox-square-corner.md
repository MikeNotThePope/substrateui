---
"@mikenotthepope/substrateui": patch
---

`Checkbox` and `CheckboxCard`'s mark are square. Both drew bare `rounded`, which is `--radius` (10px) and ignores `--radius-factor`, so an 18px checkbox rendered as a circle, indistinguishable from a radio. They now use `rounded-sm`, which follows each theme's radius factor (1px in the house baseline).
