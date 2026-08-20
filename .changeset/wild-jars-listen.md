---
"@mikenotthepope/substrateui": minor
---

`PageHeader size="sm"` stands as tall as `AppShellLogo`, so the shell's top bar is one line.

The bar had no height of its own — `py-3` plus whatever the page put in it — while
the logo block beside it is a fixed `h-16`. The two sit either side of the
sidebar's border, so their bottom edges are meant to read as a single line, and
instead the line stepped across that corner by a different amount on every
screen. In LavaHire: 62px on the jobs list, 66px on the create wizard and the
edit form, 70px on an application detail. Nothing was wrong with any one page,
which is why it survived eleven of them.

The bar now carries `min-h-16` and `py-2`, so the height is what decides and the
padding follows. `min-h-` rather than `h-` because a bar can legitimately be
taller: a `flex-wrap` override or a long title wraps to two rows and grows,
rather than clipping.

Consumers will see short bars get taller — a title-only bar was 54px and is now
64px. A bar already at or above 64px is unchanged in height. `size="default"`,
the band, is untouched: nothing has to line up with it.
