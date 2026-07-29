---
"@mikenotthepope/substrateui": patch
---

Put the Press utility face on the docs' spec marks.

Sidebar section labels, props-table column headers and component-preview slug lines now use Barlow
Condensed caps at 12px — the type printed on the edge of a swatch card, and the direction's
fingerprint. Previously only the home page had it.

`Caps` moves out of `src/app/page.tsx` into `src/components/caps.tsx`, which also exports the
treatment as a class string for elements that already exist. Site-only: `--font-utility` is
registered in `src/app/globals.css`, not in `tokens.css`, so it is deliberately absent from the
`organisms` export barrel.
