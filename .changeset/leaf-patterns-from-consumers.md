---
"@mikenotthepope/substrateui": minor
---

Five patterns consumers were hand-building, from the drift audit in #123.

- `HoneypotField`, the off-screen bait input a public form needs. It is off-screen rather than hidden, and carries `aria-hidden` with `tabIndex={-1}` together, which is what keeps jsx-a11y and axe green on it.
- `PageHeaderBack`, the outline arrow every deeper page put at the start of its bar. `PageHeader` also gains `shrink-0`, which apps were adding back in their own stylesheets.
- `Button` gains `size="icon-sm"`, the 36px square that lines up with `sm` controls. Callers were writing `h-9 w-9 p-0`.
- `Badge` gains `size="xs"`, the tighter tag that rides beside a line of text. Only the padding moves.
- `linkify()` from `/utils`, which turns the URLs in plain text into anchors and returns nodes, so no call site reaches for `dangerouslySetInnerHTML`.
