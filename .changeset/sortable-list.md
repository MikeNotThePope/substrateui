---
"@mikenotthepope/substrateui": minor
---

Add `Sortable` and `SortableItem`: a vertical list whose items reorder by button
or by drag, plus the `reorder` helper both need.

Controlled — it reports `(from, to)` and the caller owns the array, so the same
list can drive form state, a draft saved on submit, or an optimistic write.

The move buttons are the control and the drag grip is a mouse shortcut on top of
them. A grip alone has no keyboard equivalent (WCAG 2.1.1), so `SortableItem`
renders the buttons itself, names each one after its item, and marks the grip
`aria-hidden`. There is no prop to turn them off.
