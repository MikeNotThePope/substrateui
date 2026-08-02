---
"@mikenotthepope/substrateui": patch
---

Fix the package failing to build for consumers without `next-themes` installed

`next` and `next-themes` were declared optional peer dependencies, but the built
package did not honour that. `Toaster` imported `useTheme` from `next-themes` at
the top level, and tsup listed `next-themes` as external, so the import survived
into `dist/index.js` as a bare specifier. Because that is the main entry, every
app without `next-themes` failed at build time:

```
[MISSING_EXPORT] "useTheme" is not exported by
"__vite-optional-peer-dep:next-themes:@mikenotthepope/substrateui"
```

`Toaster` needed it only to hand sonner a `"light" | "dark"` string. It now reads
the `.dark` class on `<html>` through `useSyncExternalStore` — the same signal
every other component in the system already responds to, and the one this
library documents as the dark-mode switch. Behaviour is unchanged for
`next-themes` users, since `next-themes` sets that class; the package simply no
longer requires it.

With that import gone, nothing under any published entrypoint imports a
framework, so both peer dependencies are removed rather than made required.
`next/link` and `next/navigation` were never imported by the library at all —
the matches under `src/components/` belong to `theme-toggle` and the `site-*`
files, which are docs-site components and are not re-exported by the organisms
entry. The Next entries also come out of tsup's `external` list: listing them is
what let the stray import through silently, and without them a reintroduced
framework import fails the library build instead of a consumer's.

No API change. `Toaster` takes the same props and renders the same output.
