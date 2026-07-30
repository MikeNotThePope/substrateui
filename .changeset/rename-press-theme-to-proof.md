---
"@mikenotthepope/substrateui": minor
---

Rename the `press` theme to `proof`. The press is the machine — the components
and the geometry, the part that survives a theme swap — so naming a palette
after it put an ink and the machine under one word. A proof is one ink run on
one stock, which is what a theme actually is.

`data-theme="press"` still resolves to the same palette and is kept as public
API, so nothing breaks for existing consumers. Sites using the docs' theme
picker migrate a stored `press` value to `proof` on read.
