---
"@mikenotthepope/substrateui": patch
---

Correct the component count and category list in the README.

The package page said 75 components and listed them in categories that counted
`H1`–`H4`, `P`, `Lead` and five more typography exports separately, and folded
ten blocks and two templates in among them. It is 90, grouped the way the docs
sidebar groups them. No code changed; the README ships in the tarball, so this
is the only way the npm page gets it.
