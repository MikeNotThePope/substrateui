---
"@mikenotthepope/substrateui": patch
---

Fix invalid nested buttons in multi-select `Combobox`

Selection chips rendered their remove button inside the trigger button. A
`<button>` cannot contain another `<button>`, so React threw a hydration error
on every page with a multi-select Combobox, and the remove control was
effectively unreachable — the trigger swallowed the interaction.

Chips now render in a sibling `[data-slot="combobox-chips"]` container that
shares a grid cell with the trigger, so wrapping chips still drive its height
and clicks anywhere else still open the listbox. Each remove button is a real,
focusable button again.

No API change. `limitTags`, `clearable`, and the `labels.remove` / `labels.more`
overrides all behave as before.
