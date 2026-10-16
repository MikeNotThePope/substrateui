---
"@mikenotthepope/substrateui": patch
---

Caldera: a page header's rule starts and ends where its text does. The header steps in 24px instead of padding its text, so its bottom rule shares the content's edge. Other themes keep the full-width rule.

`CardLink` and `CardRaised` accept a `render` element that arrives as a lazy reference, as React sends one once a server payload row passes 3200 bytes (facebook/react#32392). They threw on it before.
