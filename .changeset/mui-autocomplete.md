---
"@mikenotthepope/substrateui": minor
---

Upgrade `Combobox` with MUI Autocomplete's niceties.

`Combobox` handled a static, client-filtered option list. Everything MUI's `Autocomplete` adds around that — async sources, values that aren't in the list, grouping, chip overflow — was missing. All of it is additive and opt-in; existing usage is unchanged.

- **Async**: `onInputChange` reports the query so you can fetch for it, `loading` shows a spinner row, and `manualFilter` stops the built-in filter from re-filtering results you already filtered server-side.
- **Free solo**: `freeSolo` offers an "Add …" row when the query matches no option. The value is emitted as typed and still renders in the trigger despite not being in `options`.
- **Grouping**: `groupBy(option)` returns a heading; groups filter down and disappear with their heading when empty.
- **Chips**: `limitTags` collapses a long multi-selection into a count badge instead of growing the trigger, and `clearable` adds a reset button.
- Chip remove buttons now carry an accessible name (`Remove React`) — the docs claimed this and it was not true. Override via `labels.remove`, alongside new `loading`, `clear`, `create`, and `more` label keys.
