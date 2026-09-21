---
"@mikenotthepope/substrateui": minor
---

`Tabs` gains `unstackAt`, for panes that are tabs on a phone and side by side on a laptop.

Below the breakpoint it is the APG tabs pattern: roving `tabIndex`, ArrowLeft/ArrowRight in reading order, Home/End, `aria-controls` and `aria-labelledby`, manual activation unless `TabsList` asks for `activateOnFocus`. At or above it there is no tablist at all — a `tablist` whose panels are all on screen describes a control that is not there. Each label becomes a heading (`headingLevel`, default 3) and each pane a `region` named by that same element, through the same `aria-labelledby`.

Layout is CSS, so it is right in the first frame; the roles are JavaScript, because `role` is not a property a media query can set. Until the width is known the markup is the regions form, which is true at either size. Panes stay mounted across the breakpoint and keep what is inside them.

`Tabs` without `unstackAt` is unchanged — still the Base UI tablist, with a `data-slot="tabs"` on the root it did not have before.
