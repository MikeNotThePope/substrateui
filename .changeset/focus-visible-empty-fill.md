---
"@mikenotthepope/substrateui": minor
---

Focus rings no longer fire on a mouse click. Five components declared theirs on `focus:` rather than `focus-visible:` — the Dialog and Sheet close buttons, the Select trigger, Cascader, and Badge — all carrying the same class string character for character, while eleven other components already used the right one. They now match.

Menu items are deliberately untouched: `focus:bg-accent` in ContextMenu, DropdownMenu, Menubar, Select and NavigationMenu is correct, because a menu item takes DOM focus from keyboard roving and `focus-visible:` there would stop the highlight following the arrow keys. SkipLink keeps `focus:` too, and now says why on the line above it.

`Empty` takes `fill` — grow to the parent's height and centre within it, for a 404 or an error screen where the empty state is the whole page. Without it that wrapper is `flex flex-1 items-center justify-center` plus padding, repeated once per such page.
