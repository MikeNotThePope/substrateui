---
"@mikenotthepope/substrateui": patch
---

Border colour utilities now render. The stylesheet's default `* { border-color: var(--border) }` sat outside any cascade layer, so it beat every `border-<colour>` utility in `@layer utilities`: the destructive, success, warning and info `Alert`, an invalid `Field`'s input and an invalid `FileDropField` all drew the neutral border instead of their status colour. The rule now lives in `@layer base`, after Tailwind's preflight. Elements with no border colour utility still get `var(--border)`. `Toaster`'s status classes move from Tailwind v3's leading `!` to v4's trailing `!`.
