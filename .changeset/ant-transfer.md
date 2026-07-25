---
"@mikenotthepope/substrateui": minor
---

Add a `Transfer` component (steal from Ant Design).

Ant Design's `Transfer` is the standard dual-list picker — assigning permissions, columns, tags, or members — and it is genuinely tedious to hand-roll. This ports it in the chunky house style.

- Data-driven via `dataSource`; controlled (`targetKeys` + `onChange`) or uncontrolled (`defaultTargetKeys`).
- Per-panel search, select-all that respects the current filter, and bulk move in both directions.
- `disabled` items are skipped by select-all and can never be moved; move buttons disable when nothing movable is checked.
- Semantic labelled rows with mixed-state select-all, RTL-safe arrows, and configurable `titles` / `labels`. Unit-tested, with stories and docs.
