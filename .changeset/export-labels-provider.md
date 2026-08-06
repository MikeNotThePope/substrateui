---
"@mikenotthepope/substrateui": minor
---

Export `LabelsProvider`, so translations can be set once

Eighteen components read labels from `LabelsProvider`, but it was exported from
no entrypoint. The only way to translate anything was a `labels` prop on every
instance. It is now exported from the root barrel along with the
`SubstrateUILabels` type.

The interface also named six docs-site components (`site-header`, `theme-picker`,
`direction-toggle`, and friends) that this package doesn't ship. tsup's dts
rollup inlines every reachable type, so those interfaces were landing in the
published `.d.ts`. They now live in a separate, unexported type.

`useLabels` stays unexported — it's for component authors inside the package.
