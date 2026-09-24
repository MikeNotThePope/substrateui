# Rendered checks

Playwright against a production build (`next build && next start`), in four
projects: `light`, `dark`, `light-rtl` and `dark-rtl`. Each seeds
`localStorage` with its mode and `substrateui-direction`. Nothing here takes a
screenshot, so there are no baselines, no R2 bucket and no secrets.

- `visible.behavior.spec.ts` opens every component and layout docs page, wears
  each palette in `pages.ts` on it, and fails any part a person could not see.
  Its header has the rules.
- `mark-corner.behavior.spec.ts`, `status-border.behavior.spec.ts`,
  `dropdown-menu.behavior.spec.ts` and `drawer.behavior.spec.ts` each pin one behaviour a unit test cannot see,
  because jsdom computes no CSS.

Every project names the spec files it runs, through `testMatch`. A spec file
no project names never runs, and the suite reports green for finding nothing,
which is what #138 was. `tests/unit/scripts/visual-project-coverage.test.ts`
fails when that is true again.

## Running locally

```
bun run test:visual
```

The config starts its own production server. With one already on port 3000
it reuses it. `bun run test:visual:report` opens the last report.

The checks read `[data-specimen-body]`, the example area of
`ComponentPreview`, and nothing outside it. A docs page whose examples sit
outside a `ComponentPreview` is invisible to them.
