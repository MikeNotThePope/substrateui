---
"@mikenotthepope/substrateui": minor
---

Add a screen-reader announcer — `useAnnouncer` / `announce` (steal from React Aria).

Async and off-screen feedback ("5 results loaded", "Copied", "Item removed") never reaches screen-reader users when nothing changes where their focus is. React Aria solves this with an imperative live-region announcer; this ports it as a dependency-free primitive.

- `useAnnouncer()` hook returns a stable `{ announce, clear }`; `announce` / `clearAnnouncer` / `destroyAnnouncer` are also exported for imperative, non-React use.
- Manages one shared, visually-hidden ARIA live region for the whole app; `"polite"` (default) and `"assertive"` politeness.
- SSR-safe (no-op without `document`), lazily created on first announce. Exported from the `/hooks` entry, with unit tests and a docs page.
