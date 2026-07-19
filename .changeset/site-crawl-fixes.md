---
"@mikenotthepope/substrateui": patch
---

FormActions: replace physical `ml-auto` with logical `ms-auto` (RTL correctness) and allow the action bar and end-group to wrap on narrow viewports instead of overflowing. The direction audit now also bans `ml-auto`/`mr-auto`, which it previously missed.
