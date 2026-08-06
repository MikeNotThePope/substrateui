---
"@mikenotthepope/substrateui": minor
---

Add `SkipLink`, a bypass link for keyboard users

A design system that fails its own build over a contrast ratio was shipping no
way to skip past the header — WCAG 2.4.1 Bypass Blocks (Level A), and the one
piece of keyboard navigation that costs a user a keystroke on every single
page. On this site's docs pages that meant tabbing through 100+ sidebar links
to reach the content.

`SkipLink` renders an anchor that is `sr-only` until focused, then appears as a
real control pinned to the top-start corner. It defaults to `#main-content` and
takes its label from `children`, so both the target and the wording are yours
to set.

```tsx
<SkipLink />
<SiteHeader />
<main id="main-content" tabIndex={-1}>…</main>
```

The `tabIndex={-1}` on the target is not optional: without it browsers scroll to
the element but leave focus where it was, so the next Tab press lands back in
the navigation the user was trying to skip. The docs page spells this out.

Uses `:focus` rather than `:focus-visible` — the element is only ever reached by
keyboard, and Safari does not match `:focus-visible` on anchors it has moved
focus to. Positioned with logical properties (`start-4`), so it lands in the
correct corner under RTL.
