---
"@mikenotthepope/substrateui": patch
---

Make `Field` actually associate with its control

`Field` generated `id`, `hintId` and `errorId` and stamped them on `FieldLabel`,
`FieldHint` and `FieldError` — but nothing outside `field.tsx` ever read the
context. So `FieldLabel`'s `htmlFor` pointed at an id no element had, and no
input was ever described by its hint or error. Clicking a label did nothing and
screen readers announced neither.

`Input`, `Textarea` and `NativeSelect` now spread a new `useFieldControl()` hook,
which returns the parent `Field`'s `id`, `aria-describedby` and `aria-invalid`.
Outside a `Field` it returns nothing, so standalone use is unchanged.
`aria-describedby` names only ids that are on the page: the hint id appears only
when a `FieldHint` is rendered, and the error id only when the field is in
error.

Rejected: patching `aria-describedby` alone. That leaves the dangling `htmlFor`,
which is the same bug.

**If you put two controls in one `Field`, give each an explicit `id`** — they
now share the field's id otherwise. Anything you pass yourself still wins, since
the hook's props are spread before yours.
