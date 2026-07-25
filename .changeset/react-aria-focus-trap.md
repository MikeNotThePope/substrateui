---
"@mikenotthepope/substrateui": minor
---

Add `FocusTrap` and `useFocusTrap` (steal from React Aria).

React Aria's hallmark is rigorous focus management, and its `FocusScope` is the piece every custom overlay needs. This ports that idea as a reusable primitive that works on any region — not just built-in overlays.

- `FocusTrap` component (main entry) and `useFocusTrap` hook (`/hooks` entry).
- Moves focus inside on activation, cycles Tab / Shift+Tab within the region, and restores focus to the previously focused element on deactivation (`restoreFocus`, on by default).
- Dependency-free and SSR-safe. Unit-tested, with a story and docs.
