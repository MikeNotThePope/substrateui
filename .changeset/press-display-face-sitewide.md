---
"@mikenotthepope/substrateui": patch
---

Put the Press display face on headings across the whole site, not just the home page.

`h1`–`h3` rendered as site chrome now take Archivo with the system's -0.03em tracking. `h4` is
excluded: it renders at 20px and the display face has a 24px floor.

The rule lives in `src/app/globals.css` rather than in `typography.tsx`, because `typography.tsx`
ships — consumers have no Archivo file and would have received a font-family change they can't
serve. No published component's styling changes.

Headings that are *specimens* rather than chrome keep `--font-sans`, which is what a consumer's app
actually renders: component previews and the two type-specimen lists are marked `data-specimen` and
opt out.
