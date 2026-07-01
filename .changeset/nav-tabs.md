---
"@mikenotthepope/substrateui": minor
---

Add `NavTabs`, a link-based tab bar for page-level navigation.

Unlike `Tabs` (which swaps panels client-side), each `NavTabsLink` is a real anchor, so it pairs with server-driven routing (e.g. a `?tab=` query param) to keep tabs bookmarkable and the browser back button working. Supports `active`, `disabled`, an optional `badge`, and `asChild` (to merge onto a framework `<Link>` for soft navigation).
