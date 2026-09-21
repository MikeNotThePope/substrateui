---
"@mikenotthepope/substrateui": minor
---

Four patterns a consumer had hand-rolled now ship from the system (#123, items 1, 5, 8 and 12).

- **`CornerPanel`** — a round launcher pinned to the bottom corner that swaps for a `role="dialog"`: a full-width bottom sheet under `md`, a 380px card at `md:bottom-5 md:end-5` above. Escape closes it from anywhere inside, focus moves in and comes back to the launcher once React has remounted it, the scrolling body is a named `role="region"` tab stop, and — unlike all three copies it replaces — it traps focus while open. Parts: `CornerPanelTrigger`, `CornerPanelContent`, `CornerPanelHeader`, `CornerPanelTitle`, `CornerPanelClose`, `CornerPanelBody`, `CornerPanelFooter`.
- **`FileDropField`** — an `sr-only` file input inside a dashed `border-2` label with `focus-within:ring-2`, showing the picked file name and swapping to `border-status-error` when invalid. `size` and `icon` are props, because the two copies it replaces had already drifted on exactly those. Unlike a bare file input it also applies `accept` to a drop. Its recipe, `fileDropFieldVariants`, is published from `/variants`.
- **`MessageThread`**, **`MessageThreadItem`** and **`MessageComposer`** — a `role="log"` that opens at its newest message and honours a `#message-<id>` hash (scrolling to that message *and* focusing it), plus a composer built on the real `Textarea` with an `aria-describedby` error line and a `role="status"` note that is in the document from the first render, so it can actually announce.
- **`ThemeToggle`** is now exported, from `/organisms`. It no longer reads `next-themes`: that package is a devDependency rather than an external, so a published build was inlining a private copy of it whose React context no consumer's `ThemeProvider` could fill. The toggle takes `value` and `onValueChange` instead, and the five-line `next-themes` wiring lives in the application. `audit:boundary` now fails the library build if any published entry bundles `next` or `next-themes` again.

`LabelsProvider` gains `cornerPanel`, `fileDropField`, `messageThread` and `themeToggle` keys.
