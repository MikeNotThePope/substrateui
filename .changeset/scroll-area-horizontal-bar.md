---
"@mikenotthepope/substrateui": patch
---

`ScrollArea` now renders a horizontal scrollbar as well as a vertical one

Horizontally overflowing content scrolled, but with no styled bar — the root is
`overflow-hidden`, so the native one was clipped and the themed one was never
rendered. There was also no way for a caller to add it: `ScrollArea` puts its
children inside the viewport, so a `<ScrollBar orientation="horizontal" />`
passed in would have scrolled along with the content rather than framing it.

Both bars are now assembled inside the component. Base UI drops the bar for an
axis that doesn't overflow, so a vertical-only scroll area is unchanged and the
unused bar costs nothing.

`ScrollBar` stays exported for composing Base UI's primitives directly.
