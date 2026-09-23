---
"@mikenotthepope/substrateui": patch
---

Remove the unused `--border-width` and `--press-depth` tokens from `styles.css`. No component read either one: borders are the literal `border-2` class and press offsets are literal `active:translate-*` values, so overriding them never changed anything. CONTRIBUTING now states the real theme contract, color plus the `// Feel` names in `ThemeTokenName`, and a unit test fails if tokens.css declares a token no shipped code reads or a feel name stops resolving.
