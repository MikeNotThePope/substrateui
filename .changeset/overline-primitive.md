---
"@mikenotthepope/substrateui": minor
---

Add `Overline`, and a `text-2xs` step for it to sit on

Six components were writing the same eyebrow treatment by hand —
`font-mono uppercase tracking-wider text-muted-foreground` — and had drifted
into four sizes and three weights between them. `Divider`, `Timeline` and
`Table` at `text-xs`, `FooterBlock` at `text-xs font-semibold`, `StatCard` at
`text-sm font-medium`, `Badge` at a raw `text-[11px]`. A table header and a
timeline label are the same thing on the page and were not the same thing in
the code.

`Overline` is that treatment with a name and three sizes. It carries no
semantics of its own — it renders a `span` by default and takes `render` for
whatever the surrounding document actually needs, which is how `FooterBlock`
keeps its `h3` and `StatCard` keeps its `p`.

```tsx
<Overline>Section label</Overline>
<Overline size="2xs">Draft</Overline>
<Overline render={<h3 />}>Resources</Overline>
```

`--text-2xs` (11px) is new, one step below where Tailwind's scale stops. It
pairs a line-height the way every stock step does, so leading arrives with the
size instead of being inherited from whatever the label sits inside.

**Nothing changes visually.** Every migrated site keeps the exact class set it
had — verified by rendering each one and comparing the resulting class sets to
the strings they carried before, not by reading the diff.

**`Badge` deliberately keeps its `text-[11px]`.** It is the reason the 11px step
exists, but it cannot simply swap onto it: an arbitrary font size sets font-size
and nothing else, so the badge's line box comes from its parent, while
`text-2xs` brings its own. Moving it makes the badge a deterministic 24px rather
than 28px inside a `text-sm` context. That is the better behaviour and it is a
real visual change, so it wants its own PR and its own baselines. The reason is
recorded next to the value so the next reader doesn't "fix" it.

Also corrects a stale comment on the radius ladder, which claimed a default
`--radius-factor` of 1. It is 0.25.
