---
"@mikenotthepope/substrateui": minor
---

Add `CopyChip`: a value and a copy icon in one outlined inline chip, for a value set inside a sentence ("Type <chip> to confirm"). Its name is the value, so a label it sits in still reads as the sentence; "Copy" is its description. `breakAfter` names the one place the value may wrap. The icon flips to a check for two seconds and "Copied" is announced; a refused clipboard selects the value instead.
