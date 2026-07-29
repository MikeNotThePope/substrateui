---
"@mikenotthepope/substrateui": minor
---

Rename `Button variant="amber"` to `variant="secondary-fill"`. `amber` still works.

"Amber" was the plum palette's name for that slot. Every theme colours it differently — press paints
it yellow from its own ramp — so the API was asserting a colour the theme system exists to change.
`secondary-fill` names the token family that actually paints it, and reads against `secondary`, which
is the tinted surface rather than the saturated fill.

`amber` is kept as a deprecated alias, resolving to identical classes. A unit test asserts that, so
the deprecation can't quietly restyle an existing consumer's buttons. Nothing to change on upgrade.

Also closes a gap in the contrast audit: the secondary-fill button was only ever checked under plum,
via two raw-ramp pairings. `secondary-fill-foreground on secondary-fill` and
`secondary-fill-border on background` are now audited for every theme, light and dark. All five pass;
the per-theme pair count goes 33 → 35.
