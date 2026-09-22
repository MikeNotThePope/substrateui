---
"@mikenotthepope/substrateui": minor
---

ChoiceCard: `RadioGroupCard` and `CheckboxCard`, where the whole row is the target

Two new parts, each the Base UI primitive rendered as the card rather than as an
18px box beside a `Label`. The card carries `role="radio"` / `role="checkbox"`,
so a tap anywhere in it answers, and the target is `min-h-11` — 44px on its
short side, WCAG 2.2's enhanced target size (SC 2.5.5) rather than the 24px
minimum (SC 2.5.8). Measured at 56px on the docs page, at 390, 768 and 1280, in
both directions.

Because the control did not move, the keyboard did not either: the group is one
tab stop, arrow keys move and select within it, `Space` toggles a checkbox card,
and the group takes its name from `RadioGroup`.

Each card takes a `description` — a muted second line that becomes the card's
accessible description rather than part of its name. `aria-labelledby` points at
the label alone, so "Two weeks" does not get announced as "Two weeks Ships in a
fortnight". A caller's own `aria-label` wins; a caller's own `aria-describedby`
is appended.

A frozen answer is the same card under `readOnly`, which was already there on
`RadioGroup`, `Radio.Root` and `Checkbox.Root` and needed nothing new: it keeps
the role, the tick and the tab stop, gains `aria-readonly`, and is not dimmed.
`disabled` remains the state that dims, because the option being unavailable and
the answer being final are different claims.

`choiceCardVariants` and `choiceCardMarkVariants` are published from
`/variants`, so a server component can paint the same box.
