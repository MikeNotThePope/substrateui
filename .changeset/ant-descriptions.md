---
"@mikenotthepope/substrateui": minor
---

Add a `Descriptions` component (steal from Ant Design).

Ant Design's `Descriptions` is the go-to for read-only detail views — orders, profiles, server summaries — and SubstrateUI had no primitive for label/value records. This ports it in the chunky house style.

- Data-driven via `items`; each field can `span` multiple columns.
- `bordered` grid-line look with tinted label cells, plus a borderless variant.
- `horizontal` / `vertical` layouts, `columns`, `sm`/`md` sizes, and `title` / `extra` header slots.
- Renders semantic `<dl>` / `<dt>` / `<dd>`, RTL-safe, and collapses to a single column on mobile. Ships with a story and docs.
