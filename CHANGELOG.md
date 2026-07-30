# Changelog

## 1.16.0

### Minor Changes

- [#76](https://github.com/MikeNotThePope/substrateui/pull/76) [`2a5f8a4`](https://github.com/MikeNotThePope/substrateui/commit/2a5f8a4d9c50063bd66ab27fdc8724d971ae5b2b) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Rename `Button variant="amber"` to `variant="secondary-fill"`. `amber` still works.

  "Amber" was the plum palette's name for that slot. Every theme colours it differently — press paints
  it yellow from its own ramp — so the API was asserting a colour the theme system exists to change.
  `secondary-fill` names the token family that actually paints it, and reads against `secondary`, which
  is the tinted surface rather than the saturated fill.

  `amber` is kept as a deprecated alias, resolving to identical classes. A unit test asserts that, so
  the deprecation can't quietly restyle an existing consumer's buttons. Nothing to change on upgrade.

  Also closes a gap in the contrast audit: the secondary-fill button was only ever checked under plum,
  via two raw-ramp pairings. `secondary-fill-foreground on secondary-fill` and
  `secondary-fill-border on background` are now audited for every theme, light and dark. All five pass;
  the per-theme pair count goes 33 → 35.

- [#77](https://github.com/MikeNotThePope/substrateui/pull/77) [`a578712`](https://github.com/MikeNotThePope/substrateui/commit/a578712a6e5e7fa53e0aba48e8b418fc5ab8ce52) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Align plum and lava with the rest of the set on geometry and motion. Both now
  inherit the house baseline — `--radius-factor: 0.25` and a 140ms
  `cubic-bezier(0.2, 0, 0, 1)` transition — instead of plum's stock 1x/150ms and
  lava's swollen 1.5x/300ms. Corners across the default theme go from 6px to
  1.5px at `rounded-md`, and lava is now a palette rather than a structural
  variant; its magma-tinted hard shadow is the only geometry it still owns.
  Substrate (0.4x/160ms) and tundra (0.15x/120ms) are unchanged.

- [#78](https://github.com/MikeNotThePope/substrateui/pull/78) [`de5dc77`](https://github.com/MikeNotThePope/substrateui/commit/de5dc7723df31fffab2008d458c4dcccf2d05dee) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Rename the `press` theme to `proof`. The press is the machine — the components
  and the geometry, the part that survives a theme swap — so naming a palette
  after it put an ink and the machine under one word. A proof is one ink run on
  one stock, which is what a theme actually is.

  `data-theme="press"` still resolves to the same palette and is kept as public
  API, so nothing breaks for existing consumers. Sites using the docs' theme
  picker migrate a stored `press` value to `proof` on read.

### Patch Changes

- [#79](https://github.com/MikeNotThePope/substrateui/pull/79) [`36bbaef`](https://github.com/MikeNotThePope/substrateui/commit/36bbaeff46a4553c2aa7e22abd14fc740aa3b945) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Fix invalid nested buttons in multi-select `Combobox`

  Selection chips rendered their remove button inside the trigger button. A
  `<button>` cannot contain another `<button>`, so React threw a hydration error
  on every page with a multi-select Combobox, and the remove control was
  effectively unreachable — the trigger swallowed the interaction.

  Chips now render in a sibling `[data-slot="combobox-chips"]` container that
  shares a grid cell with the trigger, so wrapping chips still drive its height
  and clicks anywhere else still open the listbox. Each remove button is a real,
  focusable button again.

  No API change. `limitTags`, `clearable`, and the `labels.remove` / `labels.more`
  overrides all behave as before.

- [#71](https://github.com/MikeNotThePope/substrateui/pull/71) [`1a675a0`](https://github.com/MikeNotThePope/substrateui/commit/1a675a0c9b117fed4e3965197ea0dd780a03a170) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Put the Press display face on headings across the whole site, not just the home page.

  `h1`–`h3` rendered as site chrome now take Archivo with the system's -0.03em tracking. `h4` is
  excluded: it renders at 20px and the display face has a 24px floor.

  The rule lives in `src/app/globals.css` rather than in `typography.tsx`, because `typography.tsx`
  ships — consumers have no Archivo file and would have received a font-family change they can't
  serve. No published component's styling changes.

  Headings that are _specimens_ rather than chrome keep `--font-sans`, which is what a consumer's app
  actually renders: component previews and the two type-specimen lists are marked `data-specimen` and
  opt out.

- [#74](https://github.com/MikeNotThePope/substrateui/pull/74) [`7328b79`](https://github.com/MikeNotThePope/substrateui/commit/7328b79c31b5968f3873cf9a108b8ca9e6c769e3) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Give the docs pages press furniture instead of a generic docs header.

  Every docs page now opens with a slug line — registration mark plus the section it belongs to,
  read from the sidebar's own nav data — then the title, then a hairline trim rule marking where the
  sheet's margin ends.

  Component previews lose the three macOS traffic-light dots. They were window-chrome pastiche that
  said nothing about the component; the slug line that replaces them names the plate.

  `RegMark` moves out of `src/app/page.tsx` into `src/components/reg-mark.tsx`. Site-only, like
  `Caps` — not exported from the package.

- [#75](https://github.com/MikeNotThePope/substrateui/pull/75) [`b4bae81`](https://github.com/MikeNotThePope/substrateui/commit/b4bae81fe39e027d0011c56ebbab69153465e81f) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Rewrite the docs descriptions that broke the Press voice.

  31 of the 91 page descriptions leaned on adjectives that can't be checked — "versatile", "satisfying",
  "seamless", "batteries-included", "ideal for", "great for". Those are rewritten to state what the
  component is and what it costs: Button now reads "Seven variants, four sizes, and a 3px press offset
  that collapses under prefers-reduced-motion."

  The other 60 already complied and are untouched.

  Two accuracy fixes ride along: Rating no longer describes its fill as "amber" (that is the plum
  palette's name for a colour every theme sets differently), and the blocks demo copy drops "batteries
  fully included", a phrase the direction strikes by name.

- [#73](https://github.com/MikeNotThePope/substrateui/pull/73) [`a05a2e1`](https://github.com/MikeNotThePope/substrateui/commit/a05a2e1bd0ca603820155e618dad174a82b31339) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Put the Press utility face on the docs' spec marks.

  Sidebar section labels, props-table column headers and component-preview slug lines now use Barlow
  Condensed caps at 12px — the type printed on the edge of a swatch card, and the direction's
  fingerprint. Previously only the home page had it.

  `Caps` moves out of `src/app/page.tsx` into `src/components/caps.tsx`, which also exports the
  treatment as a class string for elements that already exist. Site-only: `--font-utility` is
  registered in `src/app/globals.css`, not in `tokens.css`, so it is deliberately absent from the
  `organisms` export barrel.

## 1.15.1

### Patch Changes

- [#68](https://github.com/MikeNotThePope/substrateui/pull/68) [`3486a99`](https://github.com/MikeNotThePope/substrateui/commit/3486a996db26edf49284a24701d8dea72c081371) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add the Press direction's display and utility typefaces to substrateui.dev.

  Archivo carries the headings and Barlow Condensed carries the small uppercase
  labels — the eyebrows, docket items and swatch codes that give the direction its
  fingerprint.

  Site-only. `--font-sans` and `--font-mono` live in the published `tokens.css` and
  are deliberately untouched, so nothing changes for consumers of the package.

## 1.15.0

### Minor Changes

- [#65](https://github.com/MikeNotThePope/substrateui/pull/65) [`0fc39ce`](https://github.com/MikeNotThePope/substrateui/commit/0fc39ceac82e0d1e44128e6dd61bac4915996853) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add three themes — `press`, `substrate` and `tundra` — and name the built-in palette `plum`.

  **New themes.** Each ships a full OKLCH ramp set plus light and dark semantic
  blocks, and owns its own motion curve and corner radius alongside its palette:

  - **press** — the three process inks (cyan, magenta, yellow) on cool proof
    stock. Corners are cut rather than rounded (`--radius-factor: 0.25`) and
    motion is fast with a hard stop.
  - **substrate** — cold graphite neutrals, a jade primary and instrument amber.
  - **tundra** — pale frost neutrals, steel blue and cold rose; square corners
    and the quickest motion of the set.

  **`default` is now a role, not a palette name.** The built-in palette is called
  `plum`, and "default" means only "the theme you get with no attribute set".
  This is backwards compatible: `[data-theme="default"]` still selects the same
  palette, and a `"default"` value already in `localStorage` is read as `plum`.
  Naming the palette separately from the role means the default can move to
  another theme later without renaming anything.

  All 31 audited contrast pairings pass in light and dark for every theme.

### Patch Changes

- [#67](https://github.com/MikeNotThePope/substrateui/pull/67) [`21cea0b`](https://github.com/MikeNotThePope/substrateui/commit/21cea0bf5da4df61ccce42f2c7be3dd94498fe87) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Redesign the substrateui.dev home page to the Press direction.

  The page is now built from press furniture rather than the usual landing-page
  skeleton: a thesis, the theme strip as the hero object, an ink-density bar of
  tint steps, a proof section pairing a live panel with the token map that
  produced it, and a job docket replacing the feature-card grid.

  Site-only change — no component internals were touched, so nothing changes for
  consumers of the package.

## 1.14.0

### Minor Changes

- [#61](https://github.com/MikeNotThePope/substrateui/pull/61) [`80448e0`](https://github.com/MikeNotThePope/substrateui/commit/80448e0fb119e47e42d31cfc3f4cda404e91392c) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add a `Countdown` component and `useCountdown` hook, stealing the live half of Ant Design's `Statistic`.

  `StatCard` already covered the static metric — a title, a value, a change indicator. What it could not do was count down, so anything time-bound (a sale ending, a token expiring, doors opening) needed a hand-rolled timer. Ant Design's `Statistic.Countdown` is the missing piece; its static `Statistic` sibling is not, and was deliberately skipped rather than duplicated.

  - **`<Countdown deadline={...} />`** ticks once a second and stops at zero. `onFinish` fires exactly once per deadline, not on every subsequent render.
  - **No format-string DSL.** The default output comes from `Intl.DurationFormat`, so it follows the locale and drops units that are still zero — `04:05`, then `3:04:05`, then `2 days, 3:04:05`. Where Ant takes `format="HH:mm:ss"`, this takes a render prop: `children` receives `{ total, days, hours, minutes, seconds, formatted, finished, ready }` and you lay it out yourself.
  - **`useCountdown(deadline, options?)`** is the same logic without the markup, exported from `@mikenotthepope/substrateui/hooks`.
  - **Accessibility**: renders as `role="timer"`, whose implicit `aria-live` is off — a polite live region would read the clock aloud once a second. The timer carries an accessible name instead (`"Time remaining"`, overridable via `labels.remaining`).
  - **SSR**: reports `ready: false` and an empty string until measured in the browser, so hydration cannot mismatch on a value that is different by the time it reaches the client.

  `StatCard`'s `value` prop widens from `string` to `React.ReactNode`, so a countdown drops straight into a metric card without a third component in between. Existing string values are unaffected.

### Patch Changes

- [#64](https://github.com/MikeNotThePope/substrateui/pull/64) [`21e4d83`](https://github.com/MikeNotThePope/substrateui/commit/21e4d83d4dba88a110f734285b459b24878c6ffa) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Make the built-in themes work when they are scoped to a subtree, not just set on the document element. `[data-theme="default"]` now selects the base palette by name (previously the base palette was only "the absence of an attribute", so a default-themed element nested inside another theme inherited that theme), and the lava dark tokens gained the `.dark [data-theme="lava"]` selector that `themeToCss()` already emits for user themes. Nothing changes for a theme applied to `<html>`.

## 1.13.0

### Minor Changes

- [#57](https://github.com/MikeNotThePope/substrateui/pull/57) [`5a25241`](https://github.com/MikeNotThePope/substrateui/commit/5a25241684a6c1c1322ca5031e96de7b62551967) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Upgrade `Combobox` with MUI Autocomplete's niceties.

  `Combobox` handled a static, client-filtered option list. Everything MUI's `Autocomplete` adds around that — async sources, values that aren't in the list, grouping, chip overflow — was missing. All of it is additive and opt-in; existing usage is unchanged.

  - **Async**: `onInputChange` reports the query so you can fetch for it, `loading` shows a spinner row, and `manualFilter` stops the built-in filter from re-filtering results you already filtered server-side.
  - **Free solo**: `freeSolo` offers an "Add …" row when the query matches no option. The value is emitted as typed and still renders in the trigger despite not being in `options`.
  - **Grouping**: `groupBy(option)` returns a heading; groups filter down and disappear with their heading when empty.
  - **Chips**: `limitTags` collapses a long multi-selection into a count badge instead of growing the trigger, and `clearable` adds a reset button.
  - Chip remove buttons now carry an accessible name (`Remove React`) — the docs claimed this and it was not true. Override via `labels.remove`, alongside new `loading`, `clear`, `create`, and `more` label keys.

## 1.12.0

### Minor Changes

- [#55](https://github.com/MikeNotThePope/substrateui/pull/55) [`42f70f8`](https://github.com/MikeNotThePope/substrateui/commit/42f70f82d0a888c6e04a41de00e6cfffdb4d4399) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add a first-class theming API — `createTheme`, `ThemeRegistry`, `useTheme`, `ThemeSelect` (steal from MUI).

  The suite already had a token system and two hand-written palettes in the stylesheet, but no way for a consumer to _define_ a named theme, register it, and swap to it. This ports MUI's `createTheme` / `ThemeProvider` / `useTheme` ergonomics onto the OKLCH token layer.

  - `createTheme({ name, tokens, light, dark, extends })` builds a token map. `ThemeTokens` autocompletes every semantic token name but accepts any custom property, so raw palette steps work too. Theme names are validated so they can't break out of a CSS selector.
  - `ThemeRegistry` owns the active theme: sets `data-theme`, persists to localStorage, and injects the themes' CSS so a new theme needs no stylesheet changes. `injectCss={false}` opts out when you ship it statically.
  - `themeToCss(themes)` renders themes to CSS for build-time use; the dark block targets both a document-level and a scoped placement.
  - `scoped` themes a subtree instead of the document — for preview panes and embedded widgets — and `themeInitScript()` returns an inline-script source that applies the stored theme before first paint.
  - `useTheme()` returns `{ theme, setTheme, themes, resolvedTheme }`; `ThemeSelect` is a ready-made picker over the registered set. Unit-tested, with stories and docs.

## 1.11.0

### Minor Changes

- [#53](https://github.com/MikeNotThePope/substrateui/pull/53) [`717514a`](https://github.com/MikeNotThePope/substrateui/commit/717514a2c87c566c29763018fd9954ae01d6dcc4) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add a `Cascader` component (steal from Ant Design).

  Ant Design's `Cascader` is the control for choosing a path through a tree — country → region → city, category → subcategory → item — and it is the last genuinely-missing data-entry primitive. This ports it in the chunky house style.

  - Multi-column drill-down: clicking a branch opens the next column, clicking a leaf commits the whole path and closes.
  - Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`); `onChange` also hands back the options along the path so you have the labels without re-walking the tree.
  - `showSearch` filters against the whole joined path, `clearable` resets the selection, and `changeOnSelect` makes branches selectable too.
  - Full keyboard nav — arrows within and across columns, `Home`/`End`, `Escape` to close — with the forward/back arrows and chevrons mirrored in RTL. Columns are labelled listboxes with `aria-expanded`/`aria-haspopup` on branches. Unit-tested, with stories and docs.

## 1.10.0

### Minor Changes

- [#51](https://github.com/MikeNotThePope/substrateui/pull/51) [`861a065`](https://github.com/MikeNotThePope/substrateui/commit/861a065bc0ff93dab1f753c716344bd8f820b4ea) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add a `Transfer` component (steal from Ant Design).

  Ant Design's `Transfer` is the standard dual-list picker — assigning permissions, columns, tags, or members — and it is genuinely tedious to hand-roll. This ports it in the chunky house style.

  - Data-driven via `dataSource`; controlled (`targetKeys` + `onChange`) or uncontrolled (`defaultTargetKeys`).
  - Per-panel search, select-all that respects the current filter, and bulk move in both directions.
  - `disabled` items are skipped by select-all and can never be moved; move buttons disable when nothing movable is checked.
  - Semantic labelled rows with mixed-state select-all, RTL-safe arrows, and configurable `titles` / `labels`. Unit-tested, with stories and docs.

## 1.9.0

### Minor Changes

- [#49](https://github.com/MikeNotThePope/substrateui/pull/49) [`dcfcb14`](https://github.com/MikeNotThePope/substrateui/commit/dcfcb1412335b3482008b2a6b2c9a23ce16cfece) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add a screen-reader announcer — `useAnnouncer` / `announce` (steal from React Aria).

  Async and off-screen feedback ("5 results loaded", "Copied", "Item removed") never reaches screen-reader users when nothing changes where their focus is. React Aria solves this with an imperative live-region announcer; this ports it as a dependency-free primitive.

  - `useAnnouncer()` hook returns a stable `{ announce, clear }`; `announce` / `clearAnnouncer` / `destroyAnnouncer` are also exported for imperative, non-React use.
  - Manages one shared, visually-hidden ARIA live region for the whole app; `"polite"` (default) and `"assertive"` politeness.
  - SSR-safe (no-op without `document`), lazily created on first announce. Exported from the `/hooks` entry, with unit tests and a docs page.

## 1.8.0

### Minor Changes

- [#47](https://github.com/MikeNotThePope/substrateui/pull/47) [`5c5aedf`](https://github.com/MikeNotThePope/substrateui/commit/5c5aedf501f87fb64e2e88fdf296101a8f1403fd) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add a `Descriptions` component (steal from Ant Design).

  Ant Design's `Descriptions` is the go-to for read-only detail views — orders, profiles, server summaries — and SubstrateUI had no primitive for label/value records. This ports it in the chunky house style.

  - Data-driven via `items`; each field can `span` multiple columns.
  - `bordered` grid-line look with tinted label cells, plus a borderless variant.
  - `horizontal` / `vertical` layouts, `columns`, `sm`/`md` sizes, and `title` / `extra` header slots.
  - Renders semantic `<dl>` / `<dt>` / `<dd>`, RTL-safe, and collapses to a single column on mobile. Ships with a story and docs.

## 1.7.0

### Minor Changes

- [#45](https://github.com/MikeNotThePope/substrateui/pull/45) [`69f149f`](https://github.com/MikeNotThePope/substrateui/commit/69f149f3acaad519737a7eaf0ec9145548d69b95) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add `FocusTrap` and `useFocusTrap` (steal from React Aria).

  React Aria's hallmark is rigorous focus management, and its `FocusScope` is the piece every custom overlay needs. This ports that idea as a reusable primitive that works on any region — not just built-in overlays.

  - `FocusTrap` component (main entry) and `useFocusTrap` hook (`/hooks` entry).
  - Moves focus inside on activation, cycles Tab / Shift+Tab within the region, and restores focus to the previously focused element on deactivation (`restoreFocus`, on by default).
  - Dependency-free and SSR-safe. Unit-tested, with a story and docs.

## 1.6.0

### Minor Changes

- [#43](https://github.com/MikeNotThePope/substrateui/pull/43) [`d7a5b71`](https://github.com/MikeNotThePope/substrateui/commit/d7a5b71869fec37a3501d51a7a66ab3b42d15d93) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add a `Tree` component (steal from Ant Design).

  A hierarchical tree view for file explorers, nested navigation, and category pickers — Ant Design's signature data-dense strength. Expand/collapse, single selection, and per-node icons, with expanded and selected state controllable or uncontrolled.

  Fully keyboard-navigable following the WAI-ARIA tree pattern (`role="tree"` / `treeitem`, `aria-expanded` / `aria-selected` / `aria-level`, roving `tabindex`): arrows move/expand/collapse, Enter/Space select, Home/End jump. Exported from the main entry with a story, unit tests, and docs.

## 1.5.0

### Minor Changes

- [#41](https://github.com/MikeNotThePope/substrateui/pull/41) [`9efcce1`](https://github.com/MikeNotThePope/substrateui/commit/9efcce1d49a0176a58f8cbe78886d5fcfdffea2e) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add a hooks library (`@mikenotthepope/substrateui/hooks`).

  Borrowing the idea Mantine is best known for: a curated, SSR-safe, tree-shakeable set of React hooks for the state and browser plumbing every app needs — so the monolith ships the logic layer, not just the components.

  - **State** — `useDisclosure`, `useToggle`, `useCounter`, `usePrevious`
  - **Browser/DOM** — `useClipboard`, `useLocalStorage`, `useMediaQuery`, `useClickOutside`, `useHotkeys` (with platform-aware `mod`), `useElementSize`, `useIntersection`, `useIsMobile`
  - **Timing/refs** — `useDebouncedValue`, `useInterval`, `useMounted`, `useMergedRef`

  All are unit-tested and exported from the new `/hooks` entry point.

## 1.4.0

### Minor Changes

- [#39](https://github.com/MikeNotThePope/substrateui/pull/39) [`a8f8f3c`](https://github.com/MikeNotThePope/substrateui/commit/a8f8f3cf9694f271671b772401f4aa9a5ef99698) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Flowbite-inspired expansion: five new components, a categorized blocks library, and a page-templates layer.

  - **New components** — `Timeline`, `Rating` (fractional display + interactive input), `Stepper` (horizontal/vertical), `Banner` (dismissible announcement bar), and `ListGroup`. All exported from the main entry with stories and docs.
  - **Categorized blocks** — the `substrateui/blocks` entry now spans Marketing, Application, Auth, and E-commerce, adding `PricingBlock`, `CtaBlock`, `FooterBlock`, `ActivityFeedBlock` (built on `Timeline`), and `ProductGridBlock` (built on `Rating`).
  - **Page templates** — a new `@mikenotthepope/substrateui/templates` entry with complete, parameterized pages assembled from blocks and shells: `DashboardTemplate` (top bar + collapsible sidebar + stats + activity feed) and `PricingTemplate` (hero + tiers + features + CTA + footer).

## 1.3.0

### Minor Changes

- [#37](https://github.com/MikeNotThePope/substrateui/pull/37) [`6ef088c`](https://github.com/MikeNotThePope/substrateui/commit/6ef088c1d28daba8e98283158e197ab4c8a6c0d1) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Make SubstrateUI a one-stop-shop: blocks, a framework-agnostic Link adapter, an init CLI, and a theme generator.

  - Add a **framework-agnostic Link adapter** — `LinkProvider`, `useLinkComponent`, and a `Link` component exported from the main entry. Wrap your app once with your router's link (Next, React Router, Remix, TanStack) and every suite link — including blocks — routes through client-side navigation, falling back to a plain `<a>` with no provider.
  - Add a **blocks library** at `@mikenotthepope/substrateui/blocks` — full, paste-in compositions: `SignInBlock`, `SignUpBlock`, `StatsBlock`, `HeroBlock`, and `FeatureGridBlock`, built from existing primitives and routed through `LinkProvider`.
  - Add a **zero-dependency `substrateui` CLI** (`npx substrateui init`) that wires the required CSS imports into your global stylesheet in the correct order and prints the font, dark-mode, and router setup. It never copies component source into your repo — upgrades stay a version bump.
  - Add a **Theme Generator** docs tool: dial in a primary hue and chroma, watch components recolor live in light and dark, and copy a drop-in OKLCH token override that preserves the audited contrast relationships.

## 1.2.0

### Minor Changes

- [#35](https://github.com/MikeNotThePope/substrateui/pull/35) [`43fedb7`](https://github.com/MikeNotThePope/substrateui/commit/43fedb7712a9593b5bc0aadede342acc11c88e08) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Expand the layout library with responsive navigation shells.

  - Add `NavShell` — a top-navigation layout (sticky header with brand, inline nav, and actions) that collapses into a hamburger-triggered drawer on mobile.
  - Add `DashboardShell` — a top + side-navigation layout (full-width header over a sidebar and main region), the classic admin shell, reusing the `AppShell` sidebar parts.
  - Make `AppShell` responsive: the sidebar now collapses into a `Sheet` drawer on mobile via the new `AppShellSidebarTrigger`, instead of disappearing below `md`.
  - Group full-page layouts under a dedicated **Layouts** docs section, add a docs page for the existing `Sidebar` component, and redirect the old `/docs/patterns/*` shell URLs to `/docs/layouts/*`.

## 1.1.0

### Minor Changes

- [#31](https://github.com/MikeNotThePope/substrateui/pull/31) [`81f99f5`](https://github.com/MikeNotThePope/substrateui/commit/81f99f509fdf02f28f70a12df718e51789644501) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add themable "feel" tokens and make the lava theme molten. New structural tokens `--motion-duration`, `--motion-ease`, and `--radius-factor` let themes vary motion timing and corner softness, not just color. Defaults are identical to previous rendering. Lava now overrides all three — slower viscous ease-out motion (300ms), corners scaled 1.5x, and hard shadows tinted deep magma instead of gray — so it feels molten rather than merely recolored.

- [#34](https://github.com/MikeNotThePope/substrateui/pull/34) [`b4d60a5`](https://github.com/MikeNotThePope/substrateui/commit/b4d60a5085293d84365fe7bbaa467e7470b027d6) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add optional texture utilities: `texture-noise`, `texture-lines`, and `texture-grid`. Pure-CSS background patterns (SVG grain, hairlines, blueprint grid) with zero dependencies. Line and grid inks derive from the foreground token via color-mix, so they adapt to every theme and mode automatically. Opt-in per element; nothing renders differently unless a class is applied.

## 1.0.0

### Major Changes

- [#26](https://github.com/MikeNotThePope/substrateui/pull/26) [`a1e810d`](https://github.com/MikeNotThePope/substrateui/commit/a1e810d4694c47bdd8a66bb6fed3122789432846) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Migrate the entire component library from Radix UI to Base UI (`@base-ui/react` 1.6.0). All 26 `@radix-ui/*` packages plus `vaul` and `cmdk` are replaced by a single actively-maintained dependency built by the Radix/Floating UI team at MUI. Component names, exports, and part structure are unchanged; the library now exposes Base UI's APIs directly.

  **Composition: `asChild` → `render`**

  The Radix `asChild` prop is gone everywhere. Composition uses Base UI's `render` prop, including on the library's own components (`Button`, `Stack`, `Grid`, `Cluster`, `Center`, `BreadcrumbLink`, `NavTabsLink`, sidebar parts):

  ```tsx
  // before
  <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
  <Button asChild><Link href="/docs">Docs</Link></Button>

  // after
  <DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
  <Button render={<Link href="/docs" />}>Docs</Button>
  ```

  **Value APIs follow Base UI**

  - `Accordion` and `ToggleGroup` drop `type="single" | "multiple"` and `collapsible`; values are always arrays, one item is open/pressed at a time by default, and the `multiple` prop allows several.
  - `Select`: cleared value is `null` instead of `""`; `SelectContent` drops `position` (popover anchoring is the default; `alignItemWithTrigger` opts into the macOS-style overlay).
  - `Checkbox`: `checked="indeterminate"` is replaced by the `indeterminate` prop.
  - Change callbacks (`onCheckedChange`, `onValueChange`, `onOpenChange`, `onPressedChange`) receive `(value, eventDetails)`.
  - `Combobox` drops the deprecated `placeholder`/`searchPlaceholder`/`emptyMessage` props in favor of `labels`.
  - `TooltipProvider` uses Base UI's `delay`/`closeDelay` (formerly `delayDuration`); `HoverCard` delays follow Base UI PreviewCard's API.
  - `Drawer` (now Base UI instead of vaul) drops `shouldScaleBackground`; `Separator` drops `decorative`; `useDirection` takes no argument.

  **Styling hooks follow Base UI**

  State selectors on library components are now Base UI data attributes: `data-[open]`, `data-[closed]`, `data-[checked]`, `data-[pressed]`, `data-[active]`, `data-[popup-open]`, `data-[highlighted]`, `data-[starting-style]`/`data-[ending-style]` — replacing Radix's `data-[state=…]`. CSS variables change accordingly: `--radix-*-trigger-width` → `--anchor-width`, `--radix-*-transform-origin` → `--transform-origin`, `--radix-*-available-height` → `--available-height`, `--radix-accordion-content-height` → `--accordion-panel-height`.

  **Behavioral notes**

  - `Switch`/`RadioGroup`/`Slider` roots render spans with `data-disabled`/`aria-disabled` instead of native disabled buttons.
  - `Command` is rebuilt on Base UI Autocomplete with the same composable API (`heading`, derived item values, `onSelect`); cmdk's `shouldFilter`/custom `filter` are gone and filtering is case-insensitive substring matching.
  - Radix-only content props (`onPointerDownOutside`, `onOpenAutoFocus`, …) no longer exist; use Base UI's equivalents on the corresponding parts.

## 0.5.0

### Minor Changes

- [#19](https://github.com/MikeNotThePope/substrateui/pull/19) [`78746ca`](https://github.com/MikeNotThePope/substrateui/commit/78746caa46488a43ed0d315d8e94eeab2cb9f9ff) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Visual "pop" overhaul: neubrutalist hard shadows, real surface hierarchy, and press-down interactions across both themes.

  - **New hard-shadow tokens**: `--hard-shadow-color` / `--hard-shadow-sm|/|-lg|-amber` exposed as `shadow-hard-sm`, `shadow-hard`, `shadow-hard-lg`, and `shadow-hard-amber` utilities. Light mode drops a warm near-black slab; dark mode extrudes with a border-toned slab (a dark drop is invisible on a near-black ground). Lava theme gets basalt equivalents.
  - **Surface hierarchy**: light mode background moves to `warm-100` so cards (`warm-white`) and page surfaces (`warm-50`) genuinely separate; dark mode gains a deeper `warm-975` ground beneath `warm-900` page / `warm-850` card / `warm-800` popover. Same ladder for lava via `basalt-975`.
  - **Press mechanics**: solid Button variants and interactive Cards now rest on a hard shadow, lift on hover, and sink flush on press (`prefers-reduced-motion` respected).
  - **Token-driven amber**: new `--primary-border`, `--secondary-fill-foreground`, and `--secondary-fill-border` tokens; the amber Button variant no longer needs per-component `dark:` overrides (and now follows theme secondaries, e.g. sulfur under the lava theme).
  - **Overlays**: popovers, menus, dialogs, tooltips, and toasts swap soft `shadow-md/lg` for the hard-shadow treatment.
  - Light-mode `--secondary`/`--muted` step up to `warm-200`; `--surface-interactive*` follow.

- [#15](https://github.com/MikeNotThePope/substrateui/pull/15) [`58e1f7a`](https://github.com/MikeNotThePope/substrateui/commit/58e1f7a6f598589a387d95ccad4d131dc7a8bb80) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add `info` variants to the components that consume status colors: Alert (`variant="info"`), Badge (`variant="info"`), and Toaster (`toast.info()` toasts are now styled with the info status tokens instead of falling back to default styling).

- [#12](https://github.com/MikeNotThePope/substrateui/pull/12) [`ec856c9`](https://github.com/MikeNotThePope/substrateui/commit/ec856c99a0ca2ce1aca2d470b4c92a464b82d4a4) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add Lava theme: magma/sulfur/basalt OKLCH palette with light and dark semantic mappings, enabled via `data-theme="lava"`. Registered in the theme picker and the WCAG contrast audit (all pairings pass AA in both modes).

- [#20](https://github.com/MikeNotThePope/substrateui/pull/20) [`772ed03`](https://github.com/MikeNotThePope/substrateui/commit/772ed0374ccb75309d0fea028ee0461e96d477e9) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Palette audit fixes for both themes (default + lava).

  - **New mid-neutral steps**: `warm-350`/`warm-450` and `basalt-350`/`basalt-450` close the 13–14% lightness gaps between the 300/400/500 steps — giving disabled text, tertiary text, and hover borders proper options. `warm-350`–`warm-450` are exposed as Tailwind utilities alongside the existing scale.
  - **Ramp depth**: new `amber-900` and `sulfur-900` extend the yellow ramps to a true dark step for text-on-amber/sulfur surfaces.
  - **De-duplicated warning**: `--raw-warning` is now an alias of `--raw-amber-600` (they were byte-identical values that could drift apart); light-mode `--status-warning-text` now uses `amber-800` instead of a hand-rolled near-duplicate.
  - **plum-50 reads as plum**: chroma raised from 0.009 to 0.02 — it was within a just-noticeable difference of the warm neutrals.
  - **Sidebar fix**: rail focus shadow used shadcn-upstream `hsl(var(--sidebar-border))`, which wraps an OKLCH value in `hsl()` and silently produced invalid CSS; now uses the variable directly.
  - Docs tokens page updated to match the current ladders (post surface-hierarchy overhaul) and new steps.

- [#14](https://github.com/MikeNotThePope/substrateui/pull/14) [`c34a073`](https://github.com/MikeNotThePope/substrateui/commit/c34a07303d9ac91cd77beef8bd7af3b75cdd775f) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add `--status-info` token family (`--status-info`, `--status-info-surface`, `--status-info-text`) with light/dark values for both the default theme (new `--raw-info` blue) and the lava theme (ijen blue), exposed as `status-info` Tailwind color utilities and covered by the WCAG contrast audit.

### Patch Changes

- [#17](https://github.com/MikeNotThePope/substrateui/pull/17) [`ee810dc`](https://github.com/MikeNotThePope/substrateui/commit/ee810dc5057a48ca407b921f2dceae1015928b9c) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Define the missing `destructive-foreground` token. Button and Badge referenced `text-destructive-foreground`, but the token was never defined, so Tailwind v4 silently dropped the utility and destructive controls inherited the page text color (failing WCAG AA contrast in light mode). The token is now defined in all four theme blocks — white everywhere except Lava dark, whose lighter destructive fill needs near-black — mapped in `@theme inline`, and the contrast audit now checks the pair components actually use.

- [#18](https://github.com/MikeNotThePope/substrateui/pull/18) [`ce66fab`](https://github.com/MikeNotThePope/substrateui/commit/ce66fab65a5fde3e89c4bce0dc5613ae10658eb1) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Remove unused `date-fns` dependency, re-export `useDirection` directly from Radix, and simplify the library build config (esbuild resolves `@/` via tsconfig paths natively).

- [#23](https://github.com/MikeNotThePope/substrateui/pull/23) [`4709287`](https://github.com/MikeNotThePope/substrateui/commit/4709287f8d8f28d6d184f78e03afc1a65e3b381e) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - FormActions: replace physical `ml-auto` with logical `ms-auto` (RTL correctness) and allow the action bar and end-group to wrap on narrow viewports instead of overflowing. The direction audit now also bans `ml-auto`/`mr-auto`, which it previously missed.

- [#16](https://github.com/MikeNotThePope/substrateui/pull/16) [`282bce1`](https://github.com/MikeNotThePope/substrateui/commit/282bce12039b252cb7cf3cf65dcf1c136c17b7f1) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Darken status border colors to meet WCAG 3:1 non-text contrast in light mode: success and warning in the default theme (amber-500 → amber-600), and success, warning (sulfur-500 → sulfur-700), and info in the Lava theme. The contrast audit now checks every status border against its surface and the page background, so regressions fail the build.

## 0.4.0

### Minor Changes

- [#10](https://github.com/MikeNotThePope/substrateui/pull/10) [`2c73ac1`](https://github.com/MikeNotThePope/substrateui/commit/2c73ac1801bcd489b93d8719b0b582de11288f34) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add `NavTabs`, a link-based tab bar for page-level navigation.

  Unlike `Tabs` (which swaps panels client-side), each `NavTabsLink` is a real anchor, so it pairs with server-driven routing (e.g. a `?tab=` query param) to keep tabs bookmarkable and the browser back button working. Supports `active`, `disabled`, an optional `badge`, and `asChild` (to merge onto a framework `<Link>` for soft navigation).

## 0.3.0

### Minor Changes

- [#8](https://github.com/MikeNotThePope/substrateui/pull/8) [`85dbe0c`](https://github.com/MikeNotThePope/substrateui/commit/85dbe0caf040daaf07f080c7d2e16829028e094d) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Add `AuthShell` organism and `PasswordInput` atom.

  `AuthShell` is a centered single-column card layout for authentication pages (sign in, sign up, password reset), with slots for a brand/logo, title, description, body, and footer.

  `PasswordInput` is a drop-in replacement for `Input` on password fields, adding a show/hide visibility toggle. It is i18n-aware via the `passwordInput` labels namespace on `LabelsProvider` (`showPassword` / `hidePassword`).

### Patch Changes

- [#6](https://github.com/MikeNotThePope/substrateui/pull/6) [`36fac85`](https://github.com/MikeNotThePope/substrateui/commit/36fac85fc85bc37d289a4c45d1732719e9c3064b) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Fix today's date misaligning with other days in the Calendar/DatePicker. The "today" highlight now uses an inset ring instead of a border, so it no longer shrinks the cell's content box and shifts the date number.

## 0.2.1

### Patch Changes

- [#3](https://github.com/MikeNotThePope/substrateui/pull/3) [`1b21d12`](https://github.com/MikeNotThePope/substrateui/commit/1b21d126f9626c34285247613c9eb1e296c05b70) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Fix the Spinner so its motion is visible in light mode. The arc (top border)
  previously used a dark plum on a prominent medium-gray track, so it blended in
  and the ring looked static. A dedicated, per-mode `--spinner-track` token now
  gives light mode a subtle light-gray track for the arc to stand out against;
  dark mode is unchanged.

## 0.2.0

### Minor Changes

- [`af7c703`](https://github.com/MikeNotThePope/substrateui/commit/af7c703f53384e6252f9710c3e3762244189c496) Thanks [@MikeNotThePope](https://github.com/MikeNotThePope)! - Export `sidebarMenuButtonVariants` from the Sidebar component. Its JSDoc already documented "use with `cn(sidebarMenuButtonVariants({...}))` for non-button elements" (e.g. a Next.js `Link`), but the variant was never exported. This makes the documented usage possible, matching the existing `buttonVariants` export convention.

All notable changes to SubstrateUI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-04-04

### Added

- Initial release
- 75 UI components built on Radix UI primitives
- 3-layer OKLCH color token system (raw palette → semantic → Tailwind utilities)
- Dark mode via semantic token swap (`.dark` class)
- Layout primitives: Stack, Cluster, Grid, Center, Divider, Spacer
- Form patterns: Field (with context), FormSection, FormActions, Fieldset
- App shell organisms: AppShell, PageHeader, PageBody, PageTabs, StatCard
- Typography system: H1-H4, P, Lead, Large, Small, Muted, Code, Mono
- Data display: DataTable with sorting, filtering, pagination, row selection
- Custom components: Combobox (single/multi), SearchField, InputGroup, ButtonGroup, DatePicker, Kbd, Spinner, Empty, NativeSelect, Item
- Tailwind CSS v4 native (`@theme inline`, CSS-first configuration)
- Full TypeScript support with exported types
- Tree-shakeable ESM exports via three entry points
