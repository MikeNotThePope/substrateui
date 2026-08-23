---
"@mikenotthepope/substrateui": patch
---

Fix `FormActions` collapsing its left/right split in production builds. It
detected `FormActionsSecondary` and `FormActionsPrimary` by reading
`child.type.name`, which a minifier sets to `""` — so the split rendered
correctly under `next dev` and shipped as one end-aligned pile. The children
are now compared by reference.
