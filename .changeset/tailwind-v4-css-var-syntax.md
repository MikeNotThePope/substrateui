---
"@mikenotthepope/substrateui": patch
---

Fix Sidebar rendering with no width, and make `AppShellSidebar`'s `collapsed` do something

Three v3-era leftovers, all silent under v4:

`Sidebar` and `Chart` used `w-[--sidebar-width]`. Tailwind v4 dropped the
implicit `var()` in square brackets, so that compiles to `width: --sidebar-width`
— invalid, discarded, and the desktop sidebar rendered with no width at all. The
v4 spelling is `w-(--sidebar-width)`. Same for `--sidebar-width-icon`,
`--skeleton-width`, and Chart's `--color-border` / `--color-bg`.

`Sidebar`'s `floating` and `inset` variants called `theme(spacing.4)` inside
`calc()`, deprecated in v4. Now `var(--spacing)*4`.

`AppShellSidebar` accepted `collapsed` and threw it away. It now narrows the
desktop column to an icon rail and sets `data-collapsed`, so labels can hide with
`group-data-[collapsed]:hidden`. The mobile drawer still ignores it. Rejected:
deleting the prop, which breaks types for anyone already passing it.
