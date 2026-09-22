---
"@mikenotthepope/substrateui": minor
---

`Item` takes `render`, so a list of actions can be a list of buttons.

`Item` drew a `div` and nothing else, which meant a row that *does* something
had to be hand-rolled: lavahire's questionnaire builder writes a full-width
`<button>` with twelve utility classes reproducing this component's padding,
hover, focus ring and text alignment
(`app/jobs/[id]/questionnaire/[qid]/question-row.tsx`).

- **`render`** — the row is whatever element you name. `<button />` for a row of
  actions, an anchor or a framework `Link` for a row of destinations, `<li />`
  for a row that has to stay a container because it holds two controls of its
  own. The classes, data attributes and handlers all land on it. A bare
  `<button />` is given `type="button"`, because a row of actions standing in a
  form would otherwise submit it; an explicit `type` is kept.
- **`size`** — `default` is the 36px menu row this always was. `lg` is
  `min-h-11`: 44px, the target size of WCAG 2.2 SC 2.5.5, for a full-width row
  that is itself the control. Measured at 44 on the rendered page at 390, 768
  and 1280, LTR and RTL.
- **`ItemTrailer`** — `ms-auto flex-none`, the slot at the end of the row. It
  ships no responsive behaviour: which of two trailers is the expendable one on
  a phone is a fact about the content.
- **`itemVariants`** — the recipe, published from `/variants` so a server
  component can call it.

Nothing about an existing `Item` changes: it is still a `div`, still `px-3 py-2`,
still hovers. The interactive-only rules (`w-full`, `text-start`) are scoped to
`:where(a, button)`, and the focus ring is `ring-inset` so a row flush against
its neighbours does not draw over them.
