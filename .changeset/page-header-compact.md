---
"@mikenotthepope/substrateui": minor
---

`PageHeader` takes `size="sm"` — a compact single-row bar for a page inside an app shell, next to the existing full band. Children lay out inline rather than stacked, the card background comes off, and the size reaches `PageHeaderTitle` (20px instead of 24px) and `PageHeaderActions` (which claims the end of the row itself).

Also fixes `PageHeader` spreading its props onto the inner `Stack` instead of the `<header>`, which put `id` and `aria-*` on a div rather than the landmark.
