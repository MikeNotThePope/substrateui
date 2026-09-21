---
"@mikenotthepope/substrateui": minor
---

`Sheet`: a `dockAt` breakpoint, above which the sheet stops being an overlay

`<Sheet dockAt="lg">` is a modal drawer below the breakpoint and a column in
the page at or above it. The docked form is an `<aside>`, a `complementary`
landmark named by its `SheetTitle`, with no scrim, no focus trap, no Escape
and no close button, because none of those describe a panel that is already on
screen. The trigger is `hidden` and `inert` there, and carries neither
`aria-expanded` nor `aria-controls`: a control that controls nothing should not
report that it is collapsed.

Below the breakpoint the drawer keeps everything it had, plus the three
attributes the trigger earned, and its scrim is `bg-background/80`. Because the
rail is rendered whenever the drawer is not, `aria-controls` points at an
element that is really in the document rather than at one that appears on open.
`SheetContent` must be `side="left"` or `side="right"` to dock.

A `Sheet` without `dockAt` is unchanged.
