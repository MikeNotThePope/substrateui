---
"@mikenotthepope/substrateui": patch
---

Mirror the submenu chevrons in RTL

`ContextMenuSubTrigger`, `DropdownMenuSubTrigger`, and `MenubarSubTrigger` each
draw a `ChevronRight` to say a submenu opens that way. The submenu itself is
positioned logically and opens leftward in an RTL locale, but the chevron kept
pointing right — the indicator contradicted the thing it indicates.

All three now carry `rtl:-scale-x-100`, which is what
`docs/rtl-icon-audit.md` has classified them as needing since it was written.
The chevrons were already positioned with `ms-auto`, so nothing else moves.
