---
"@mikenotthepope/substrateui": minor
---

Retune the lava palette for text contrast, and make the border ramp reachable

Lava's consumer had been overriding 23 of the theme's 66 tokens in its own
`globals.css` for months. The overrides were good — muted text on a card went
6.95:1 → 9.87:1 in light and 7.77:1 → 9.99:1 in dark, and body text improved
across the board. They are promoted here so every lava consumer gets them, and
so they finally sit under `audit:contrast`, which only ever reads this file. A
palette forked downstream is a palette nobody is checking.

Not all of it survived the audit. The same override softened `--border` from
basalt-500 to `oklch(0.7 0.008 50)`, which reads as 2.08:1 against the page and
2.63:1 against a card — below the 3:1 that WCAG 1.4.11 asks of non-text UI.
`--input` carries the same value, so that reached every text field, where the
border is the only thing identifying the control. Light border stays at
basalt-500. Dark moves basalt-400 → basalt-500, which keeps most of the
softening the override was after and still clears the floor at 4.26:1 on the
page and 3.20:1 on a card. That last figure is the tightest margin in the theme
and is deliberate rather than accidental.

**`--border-default`, `--border-strong`, `--border-subtle` and `--border-accent`
now have `--color-*` mappings**, along with `--accent-fill`,
`--accent-fill-hover` and `--accent-surface`. All seven had been declared once
per theme block since the ramp was introduced — 70 declarations — with no
Tailwind utility able to reach any of them. A consumer wanting a hairline rule
had to write `border-[color:var(--border-subtle)]`, or invent a parallel token,
which is what happened.

```tsx
<div className="border-t border-subtle" />   // now resolves
```

`--border-subtle` is decorative and deliberately exempt from 3:1. A rule that
clears 3:1 is as heavy as `--border` and stops reading as a divider. What keeps
that safe is the rule that a control must never rely on `--border-subtle` as its
only boundary — reach for `--border` or `--border-strong` for anything that
identifies a control.

**`--border-strong` was identical to `--border-default` in every theme's dark
block** — warm-400, proof-400, graphite-400, frost-400 and basalt-400, each
equal to its own default. "Strong" was not stronger in dark mode anywhere in the
system. It went unnoticed because nothing could consume the token until this
change gave it a utility. All five now sit two ramp steps lighter than their
default, mirroring what the light blocks already did in the other direction.

A new `tests/unit/styles/tokens.test.ts` pins the three things that were failing
silently: every semantic token has a `--color-*` mapping or an explicit reason
it doesn't, every theme declares the full token set, and `--border-strong` never
collapses onto `--border-default`. `audit:contrast` could not have caught the
second one — it merges the default theme underneath each theme on purpose, so an
omitted token resolves to plum's value and measures as a pass. It also pins the
tokens docs page against `tokens.css`, since that table is hand-maintained prose
about machine-readable data and drifted the moment this palette moved.
