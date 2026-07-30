---
"@mikenotthepope/substrateui": patch
---

Fix `useLocalStorage` setting state on another component mid-render

The `localStorage` write and the `StorageEvent` that syncs other instances both
ran inside the state updater passed to `setValue`. React may invoke an updater
during the render phase, so with two hooks on the same key in two different
components, one instance's update dispatched the event while the other was
rendering — React's "Cannot update a component while rendering a different
component" warning, and a state update in a phase where it isn't safe.

Both side effects move into an effect keyed on the value, leaving the updater
pure. The effect skips writing when storage already holds the serialised value,
which also stops an echo: a value that arrived *from* a storage event would
otherwise be re-announced forever between instances, since `JSON.parse` returns
a fresh object each time and `Object.is` can never settle it.

The hook also no longer writes `defaultValue` over an existing stored value on
mount — the write is gated until the first read has happened.

No API change; `setValue` still accepts a value or an updater function.
