---
"@mikenotthepope/substrateui": patch
---

Make the built-in themes work when they are scoped to a subtree, not just set on the document element. `[data-theme="default"]` now selects the base palette by name (previously the base palette was only "the absence of an attribute", so a default-themed element nested inside another theme inherited that theme), and the lava dark tokens gained the `.dark [data-theme="lava"]` selector that `themeToCss()` already emits for user themes. Nothing changes for a theme applied to `<html>`.
