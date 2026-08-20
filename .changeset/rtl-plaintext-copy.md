---
"@mikenotthepope/substrateui": patch
---

Docs site: stop RTL mangling the English copy. With `dir="rtl"` on `<html>`, the bidi algorithm handed every Latin sentence to an RTL paragraph, so trailing punctuation jumped to the wrong end — the hero read ".or don't" and FAQ questions rendered their question mark on the left. Site CSS now sets `unicode-bidi: plaintext`, so each block takes its base direction from its own content while the layout still mirrors.
