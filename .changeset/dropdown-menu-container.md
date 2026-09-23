---
"@mikenotthepope/substrateui": minor
---

`DropdownMenuContent` takes a `container` prop, passed to Base UI's portal, so an open menu can render inside `<main>` instead of on `<body>`, where axe's `region` rule fails it. The open menu's `aria-hidden-focus` finding is Base UI's focus guards, which axe misreads; the Dropdown Menu docs say why and how to scope the rule with `exclude("[data-base-ui-focus-guard]")`.
