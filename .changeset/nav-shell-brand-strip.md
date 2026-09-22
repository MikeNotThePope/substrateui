---
"@mikenotthepope/substrateui": minor
---

`NavShell`: a `NavShellBrandStrip` header for shells with no navigation

`NavShellBrandStrip` is the other header part, for an application with one
destination: a full-bleed `<header>` with the mark flush against the inline
start edge, the actions at the end, and no navigation in it at all. It sits in
the same slot as `NavShellHeader` inside the same `NavShell`, and
`NavShellBrand`, `NavShellActions` and `NavShellMain` are the same parts inside
either.

It is a `banner` and nothing else. There is no `<nav>` and no
`aria-label="Primary"`, because a navigation landmark promises a list of
destinations and this strip has a mark and a sign-out button. That is enforced
rather than documented: `NavShellNav` and `NavShellMobileNav` throw inside the
strip and name `NavShellHeader` as the part to use instead. It is not a
`toolbar` either, so every action keeps its own tab stop.

It is a part rather than a `variant` prop because `NavShellHeader` renders two
elements and the strip renders one: nothing reaches the viewport edge from
inside a `max-w-6xl` centred column, and a prop that deletes an element is two
components wearing one name. Unlike `NavShellHeader` the strip does not stick,
is opaque, is `h-15` rather than `h-14`, and pads its end only.

`NavShellMain` now defaults to `id="main-content"`, `tabIndex={-1}` and
`outline-none`, so it is the target `SkipLink` already looks for with no wiring.
Without the `tabIndex` the browser scrolls to the anchor and leaves focus where
it was, so the next Tab lands back in the header the reader asked to bypass.
Both are ordinary props, so a page with a different target overrides them.

`NavShellHeader`, `NavShellNav` and `NavShellMobileNav` outside a strip are
unchanged.
