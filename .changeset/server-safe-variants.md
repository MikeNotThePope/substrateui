---
"@mikenotthepope/substrateui": minor
---

Publish the class recipes and `cn()` without a client boundary.

`"use client"` was prepended to every `.js` in `dist`, so `cn()` and all eight
`cva` recipes shipped as client references. Calling one from a server component
threw at request time — `next build`, `tsc` and lint all pass on that bug.

The directive is now written only to built files that actually contain a client
module, decided from the bundler's chunk graph. `substrateui/utils` is
server-safe as a result, and a new `substrateui/variants` entrypoint publishes
`badgeVariants`, `bannerVariants`, `buttonVariants`, `nativeSelectVariants`,
`overlineVariants`, `sidebarMenuButtonVariants`, `spinnerVariants` and
`toggleVariants` with no boundary of their own.

Nothing is removed: the package root still exports every recipe it did before.
