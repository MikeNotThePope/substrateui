---
"@mikenotthepope/substrateui": minor
---

`EmptyTitle` takes `level={1 | 2 | 3 | 4}` for its heading level. Default is 3, unchanged.

`render={<h1 />}` already did this and still does. The problem is the source it leaves behind: a childless `<h1 />`, which `jsx-a11y/heading-has-content` reports as an empty heading — at every call site, in both the element and function forms of `render`. The rule is wrong about it, and has no option that can be told otherwise. `level` removes the element the rule is wrong about.

Reach for `render` when the title should be something that is not a heading; reach for `level` when it is one.
