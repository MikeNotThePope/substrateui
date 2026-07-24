---
"@mikenotthepope/substrateui": minor
---

Expand the layout library with responsive navigation shells.

- Add `NavShell` — a top-navigation layout (sticky header with brand, inline nav, and actions) that collapses into a hamburger-triggered drawer on mobile.
- Add `DashboardShell` — a top + side-navigation layout (full-width header over a sidebar and main region), the classic admin shell, reusing the `AppShell` sidebar parts.
- Make `AppShell` responsive: the sidebar now collapses into a `Sheet` drawer on mobile via the new `AppShellSidebarTrigger`, instead of disappearing below `md`.
- Group full-page layouts under a dedicated **Layouts** docs section, add a docs page for the existing `Sidebar` component, and redirect the old `/docs/patterns/*` shell URLs to `/docs/layouts/*`.
