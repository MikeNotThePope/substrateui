---
"@mikenotthepope/substrateui": minor
---

Add a `Cascader` component (steal from Ant Design).

Ant Design's `Cascader` is the control for choosing a path through a tree — country → region → city, category → subcategory → item — and it is the last genuinely-missing data-entry primitive. This ports it in the chunky house style.

- Multi-column drill-down: clicking a branch opens the next column, clicking a leaf commits the whole path and closes.
- Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`); `onChange` also hands back the options along the path so you have the labels without re-walking the tree.
- `showSearch` filters against the whole joined path, `clearable` resets the selection, and `changeOnSelect` makes branches selectable too.
- Full keyboard nav — arrows within and across columns, `Home`/`End`, `Escape` to close — with the forward/back arrows and chevrons mirrored in RTL. Columns are labelled listboxes with `aria-expanded`/`aria-haspopup` on branches. Unit-tested, with stories and docs.
