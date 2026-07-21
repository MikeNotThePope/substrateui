---
"@mikenotthepope/substrateui": minor
---

Replace Radix UI with Base UI (`@base-ui/react`) as the primitive layer for all 28 primitive-backed components. Public component APIs are preserved — including `asChild` (via a local Slot/`withAsChild` shim built on Base UI's `mergeProps`/`render` prop), `type="single" | "multiple"` on Accordion and ToggleGroup, `checked="indeterminate"` on Checkbox, string-valued `onValueChange` on Select, and `number[]` callbacks on Slider — but the rendered DOM changes in ways that can affect custom styling and tests:

- State data attributes change from Radix's `data-state="…"` to Base UI's boolean attributes (`data-open`, `data-closed`, `data-checked`, `data-pressed`, `data-active`, `data-highlighted`, `data-popup-open`, `data-panel-open`, `data-disabled`).
- `--radix-*` CSS variables are replaced by Base UI equivalents (`--transform-origin`, `--available-height`, `--anchor-width`, `--accordion-panel-height`).
- Anchored popups (tooltip, popover, hover card, menus, select) render an extra Positioner element between Portal and Popup.
- Checkbox, Radio, and Switch render `<span>`-based controls with a hidden `<input>` instead of `<button>`, and change-callbacks receive an event-details object as a second argument.
- `useDirection` is now re-exported from Base UI's direction provider; `NavigationMenuIndicator` no longer renders (Base UI positions its arrow inside the popup positioner).
- `@radix-ui/*` packages are no longer dependencies (vaul and cmdk still include their own transitively).
