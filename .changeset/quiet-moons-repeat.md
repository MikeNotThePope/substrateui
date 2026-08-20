---
"@mikenotthepope/substrateui": patch
---

Fix the README's import paths, which named a package that isn't this one.

Every code sample said `from "substrateui"` while the install line above said
`@mikenotthepope/substrateui`. All six would have failed as written, and the
README ships in the npm tarball, so that is what the package page showed. The
exports table, the CLI line, both npm badges and the GitHub link had the same
problem; the two links to the contrast report pointed at a file that is
gitignored, so they were dead in the tarball and on GitHub both.
