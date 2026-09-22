---
"@mikenotthepope/substrateui": minor
---

ChoiceCard: `RadioGroupCard` and `CheckboxCard`, where the whole row is the target

Two new parts, each the Base UI primitive rendered as the card rather than as an
18px box beside a `Label`. The card carries `role="radio"` / `role="checkbox"`,
so a tap anywhere in it answers, and the target is `min-h-11` — 44px on its
short side, WCAG 2.2's enhanced target size (SC 2.5.5) rather than the 24px
minimum (SC 2.5.8). Measured at 56px on the docs page, at 390, 768 and 1280, in
both directions. The hand-rolled rows this replaces measured 36px, so this is a
change of look rather than a like-for-like port.

Because the control did not move, the keyboard did not either: the group is one
tab stop, arrow keys move and select within it, `Space` toggles a checkbox card,
and the group takes its name from `RadioGroup`.

Each card takes a `description` — a muted second line that becomes the card's
accessible description rather than part of its name. `aria-labelledby` points at
the label alone, so "Two weeks" does not get announced as "Two weeks Ships in a
fortnight". A caller's own `aria-label` wins; a caller's own `aria-describedby`
is appended.

Two ways to stop being answerable, because they are not the same claim. A
**submitted answer** is `readOnly`, which was already there on `RadioGroup`,
`Radio.Root` and `Checkbox.Root` and needed nothing new: the role, the tick and
the tab stop stay, `aria-readonly` arrives. A **picture of a form** — a staff
preview, a published record waiting on answers — is `presentational`: no role,
no ARIA state, no tab stop and no group needed around it, because a
`radiogroup` nobody can answer is a tab stop that leads nowhere and a question
announced to a reader who was not asked it. `selected` fills the mark there,
since there is no control to read it from.

Neither dims. `disabled` remains the one state that does, because an option
being unavailable, an answer being final and a form being a picture are three
different claims. Every mode comes off one recipe, so the control and the
picture of it cannot drift apart.

`choiceCardVariants` and `choiceCardMarkVariants` are published from
`/variants`, so a server component can paint the same box.
