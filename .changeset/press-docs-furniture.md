---
"@mikenotthepope/substrateui": patch
---

Give the docs pages press furniture instead of a generic docs header.

Every docs page now opens with a slug line — registration mark plus the section it belongs to,
read from the sidebar's own nav data — then the title, then a hairline trim rule marking where the
sheet's margin ends.

Component previews lose the three macOS traffic-light dots. They were window-chrome pastiche that
said nothing about the component; the slug line that replaces them names the plate.

`RegMark` moves out of `src/app/page.tsx` into `src/components/reg-mark.tsx`. Site-only, like
`Caps` — not exported from the package.
