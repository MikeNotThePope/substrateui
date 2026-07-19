# Investigation: migrating from Radix UI to Base UI

_Investigated July 2026 against `@base-ui/react` 1.6.0._

## Verdict

The migration is **feasible with full component coverage** — Base UI 1.6.0 has a stable
equivalent for every Radix primitive this library uses except two trivial ones
(AspectRatio, standalone Label). It is also **a large, breaking change**: every popup
component's part structure, state data-attributes, CSS variables, and animation hooks
change, the `asChild` composition pattern is replaced by a `render` prop, and ~24
component files leak Radix types into their public prop surfaces. This is a major-version
release for `@mikenotthepope/substrateui` and will invalidate most visual regression
baselines. Estimated scope: ~37 component files touched directly, plus stories, docs
pages, and the R2 snapshot set.

## Why consider it at all

- Base UI is built by the Radix team (Colm Tuite) plus Floating UI (James Nelson) and
  Material UI maintainers, under MUI's sponsorship. Radix UI itself has seen minimal
  maintenance since 2024; Base UI is its de-facto successor.
- Stable 1.0 shipped 2025-12-11. Since then it has held a monthly minor-release cadence
  (1.1.0 Jan → 1.6.0 Jun 2026) with breaking changes confined to preview-flagged
  components. The package was renamed from `@base-ui-components/react` to
  `@base-ui/react` — use only the new name.
- One package instead of 26 `@radix-ui/react-*` packages (runtime deps: Floating UI +
  `use-sync-external-store`; peer deps `react >=17`, optional `date-fns` only for its
  date components).
- Base UI ships components Radix never had, which could replace four more of our
  third-party deps (see "Dependency consolidation opportunities").

## Current Radix footprint

From a full codebase inventory:

- **26 `@radix-ui/*` packages**, imported by **37 files** in `src/components/ui/`.
- **`asChild`/Slot**: 106 occurrences across 45 files (components + docs pages +
  stories). `Slot` is imported directly in 8 files (`button`, `breadcrumb`, `sidebar`,
  `grid`, `cluster`, `center`, `stack`, `nav-tabs` — the last also uses `Slottable`).
- **Tailwind selectors keyed to Radix data-attributes**: 42 × `data-[state=…]` in 20
  files, 14 × `data-[side=…]` in 8 files, 10 × `data-[disabled]` in 4 files.
- **`--radix-*` CSS variables**: 18 occurrences in 9 files (`tooltip`, `popover`,
  `combobox`, `hover-card`, `menubar`, `dropdown-menu`, `context-menu`, `select`,
  `navigation-menu`).
- **Public type leakage**: `React.ComponentProps<typeof XPrimitive.Y>` appears 96 times
  in 27 files; ~24 exported component prop types reference Radix primitives directly, so
  consumers' code can observe the swap even where our rendered DOM doesn't change.
- **Transitive Radix**: `vaul` (drawer) and `cmdk` (command) each depend on
  `@radix-ui/react-dialog`. Everything else (`sonner`, `input-otp`, `react-day-picker`,
  `react-resizable-panels`, `embla-carousel-react`, `recharts`) is Radix-free.
- **Not affected**: ~25 pure HTML/CVA components (`alert`, `badge`, `card`, `input`,
  `table`, `typography`, …), unit tests (they drive components via roles/user-events, not
  Radix DOM), and the audit scripts (`audit-direction.ts` etc. don't touch Radix
  internals).

## Component mapping

| Radix package (used here) | Base UI 1.6.0 equivalent | Notes |
|---|---|---|
| react-accordion | `Accordion` | `Content` → `Panel`; `--radix-accordion-content-height` → `--accordion-panel-height` |
| react-alert-dialog | `AlertDialog` | `Overlay` → `Backdrop`; `Action`/`Cancel` → `Close` (with your own buttons) |
| react-aspect-ratio | **none** | Replace with CSS `aspect-ratio` on a plain `div` — Radix's version is a thin wrapper anyway |
| react-avatar | `Avatar` | Direct equivalent (Root/Image/Fallback) |
| react-checkbox | `Checkbox` | Direct equivalent; also gains `CheckboxGroup` |
| react-collapsible | `Collapsible` | `Content` → `Panel` |
| react-context-menu | `ContextMenu` | Full parity incl. checkbox/radio items, groups, submenus |
| react-dialog | `Dialog` | `Overlay` → `Backdrop`; adds `Viewport` part |
| react-direction | `DirectionProvider` (util) | Drop-in for `direction.tsx`; Base UI components read it the same way |
| react-dropdown-menu | `Menu` | Renamed; parts add `Positioner`, `Content` → `Popup`, `Sub` → `SubmenuRoot`/`SubmenuTrigger` |
| react-hover-card | `PreviewCard` | Renamed; same role |
| react-label | **none standalone** | Use `Field.Label` (Base UI's form system) or a plain `<label>`; our `label.tsx` is a one-liner either way |
| react-menubar | `Menubar` | Present |
| react-navigation-menu | `NavigationMenu` | Present; structure differs the most (Popup/Positioner/Viewport model); `--radix-navigation-menu-viewport-*` → `--popup-width/height` |
| react-popover | `Popover` | Adds `Positioner`; `--radix-popover-trigger-width` → `--anchor-width` |
| react-progress | `Progress` | Direct equivalent; `Meter` also available |
| react-radio-group | `RadioGroup` + `Radio` | Item split into `Radio.Root`/`Radio.Indicator` |
| react-scroll-area | `ScrollArea` | Same part names (Root/Viewport/Scrollbar/Thumb/Corner) |
| react-select | `Select` | Adds `Positioner`, `List`; `--radix-select-trigger-width` → `--anchor-width`; note: Base UI aligns the popup over the selected item by default (macOS style) — set `alignItemWithTrigger={false}` for the Radix `position="popper"` look we use |
| react-separator | `Separator` | Direct equivalent |
| react-slider | `Slider` | `Track/Range/Thumb` → `Control/Track/Indicator/Thumb` + `Value` |
| react-slot | `useRender` util / `render` prop | Different composition model — see below |
| react-switch | `Switch` | Direct equivalent |
| react-tabs | `Tabs` | `Content` → `Panel`; adds `Indicator` |
| react-toggle | `Toggle` | Direct equivalent |
| react-toggle-group | `ToggleGroup` | Direct equivalent; `Toolbar` also available |
| react-tooltip | `Tooltip` | Adds `Positioner`; delay props moved to the trigger/provider level |

Coverage: **24 of 26 packages have direct equivalents**; the two gaps (`aspect-ratio`,
`label`) are the two most trivial wrappers in the library.

## The four systematic API changes

### 1. `asChild` → `render` prop

Base UI has no `Slot`/`asChild`. Composition is `<Menu.Trigger render={<MyButton />}>`.
This is our **biggest public API break**: `asChild` appears 106 times and is part of the
documented API of `Button`, `Breadcrumb`, the layout primitives (`Stack`, `Grid`,
`Cluster`, `Center`), `Sidebar`, and `NavTabs`.

Options:

- **a. Adopt `render` everywhere** (Base UI's `useRender` hook makes our own components
  render-prop capable). Cleanest end state, biggest consumer break.
- **b. Keep `@radix-ui/react-slot` solely for our own `asChild` components.** It's a tiny,
  standalone package with no other Radix coupling. Radix-built triggers (`DialogTrigger
  asChild` etc.) still have to move to `render`, but `Button asChild` keeps working.
- **c. Support both** (`asChild` implemented on top of `useRender`) with a deprecation
  cycle.

`nav-tabs.tsx` needs special attention: it uses `Slottable` to split slotted children
around inserted markup, which has no one-line `render` equivalent.

### 2. Popup part structure: `Positioner` + `Popup`

Every floating component gains a `Positioner` part between `Portal` and the content, and
`Content` becomes `Popup` (overlay dialogs: `Overlay` → `Backdrop`). Since our wrappers
are thin shadcn-style pass-throughs that hide part structure from consumers, this is
mostly internal — but `sideOffset`/`align`/`side` props move from Content to Positioner,
so each wrapper's prop plumbing changes.

### 3. Data attributes and CSS variables

| Radix | Base UI |
|---|---|
| `data-[state=open]` / `data-[state=closed]` | `data-[open]` / `data-[closed]` (+ `data-popup-open` on triggers) |
| `data-[state=checked]` | `data-[checked]` / `data-[unchecked]` |
| `data-[disabled]` | `data-[disabled]` (same) |
| `data-[side=…]`, `data-[align=…]` | same names, but on Positioner/Popup |
| `--radix-*-transform-origin` | `--transform-origin` |
| `--radix-*-trigger-width` | `--anchor-width` |
| `--radix-*-content-available-height` | `--available-height` |
| `--radix-accordion-content-height` | `--accordion-panel-height` |
| `--radix-navigation-menu-viewport-*` | `--popup-width` / `--popup-height` |

Mechanical but wide: 42 `data-[state=…]` selectors (≈16 files are Radix-driven; `tabs`,
`page-tabs`, `data-table`, `sidebar` set their own `data-state` attrs and can keep them
or be normalized) plus 18 `--radix-*` var usages.

### 4. Animation model

Radix keeps exiting elements mounted while `animation` runs (`data-[state=closed]` +
`animate-out`). Base UI instead exposes `data-starting-style` / `data-ending-style` and
recommends CSS **transitions**; CSS-animation exit still works via `data-[closed]`.
`tw-animate-css` utilities remain usable — the selector keys change, not the keyframes —
but every open/close animation class string in the popup components needs rewriting, and
this is where visual/behavioral diffs are most likely to creep in.

## Third-party dependencies

Swapping the 26 Radix packages does **not** remove Radix from the dependency tree:
`vaul@1.1.2` and `cmdk@1.1.1` both pull in `@radix-ui/react-dialog`. Two postures:

- **Pragmatic**: accept the transitive Radix dialog inside `vaul`/`cmdk`. Zero extra
  work; the tree temporarily contains both libraries (~30–60 KB of redundant primitives,
  isolated inside those two components).
- **Complete**: also migrate `drawer.tsx` to Base UI's `Drawer` (stable as of 1.5/1.6,
  swipe-dismiss included — it's Base UI's vaul equivalent) and `command`/`combobox` to
  Base UI's `Autocomplete`/`Combobox`. The cmdk swap is a real rewrite (filtering,
  `CommandDialog`, `data-table`/`date-picker` interplay) and should be its own phase.

### Dependency consolidation opportunities (optional, not required)

| Current dep | Base UI 1.6.0 equivalent |
|---|---|
| `vaul` | `Drawer` |
| `sonner` | `Toast` |
| `input-otp` | `OTPField` |
| `cmdk` | `Autocomplete` / `Combobox` (with `Filterable` utilities) |

Each is independent and can be evaluated after the core migration. Base UI also ships a
`Field`/`Fieldset`/`Form` system with validation states (`data-invalid`, `data-touched`,
`data-dirty`) that overlaps with our `field.tsx`/`form-section.tsx` — worth a look but
out of scope for a 1:1 migration.

## Risks

1. **Public API break (semver major).** ~24 files export prop types referencing Radix
   primitives; any consumer importing `SelectProps` etc. or passing `asChild` breaks.
   Requires a major bump via changeset and a migration note in the changelog.
2. **Visual regression baselines.** Portal/Positioner DOM changes and the new animation
   model will diff nearly every popup snapshot. Budget a full Docker regeneration +
   `snapshots:upload` cycle (per `tests/visual/README.md`), and review diffs manually —
   the snapshots can't distinguish "expected new DOM" from "broken."
3. **Behavioral deltas.** Select popup alignment (item-over-trigger by default),
   tooltip delay prop placement, dialog/popover focus + dismiss defaults (`Backdrop`
   isn't required for outside-press dismissal), detached-trigger support changing
   trigger/root wiring. Unit tests are role-based so most should pass, but the drawer
   RTL/portal timing noted in `tests/visual/drawer.behavior.spec.ts` deserves a re-check
   with `DirectionProvider` swapped to Base UI's.
4. **NavigationMenu rewrite.** The one component whose structure differs enough that the
   wrapper is a rewrite, not a rename (shared Popup/Viewport model, different sizing
   vars).
5. **Ecosystem drift.** `components.json` (shadcn CLI) and shadcn-derived class strings
   assume Radix; shadcn's own Base UI support ("radix → base" registry variants) should
   be checked at migration time to crib tested class strings.

## Suggested phasing

1. **Phase 0 — spike** (1 component): migrate `popover.tsx` + its stories end-to-end,
   including animation classes and visual baselines, to validate the pattern and the
   snapshot workflow. Decide the `asChild` policy (option b — keep `react-slot` — is the
   lowest-risk start).
2. **Phase 1 — leaf primitives** (low risk, no popups): `separator`, `label`,
   `aspect-ratio` (CSS), `avatar`, `progress`, `switch`, `checkbox`, `toggle`,
   `toggle-group`, `radio-group`, `slider`, `tabs`, `collapsible`, `accordion`,
   `scroll-area`, `direction`.
3. **Phase 2 — floating components**: `tooltip`, `hover-card` (→ PreviewCard),
   `popover`, `dialog`, `alert-dialog`, `sheet`, `dropdown-menu` (→ Menu),
   `context-menu`, `menubar`, `select`; then composites that sit on them (`combobox`,
   `date-picker`, `data-table`, `command`'s dialog).
4. **Phase 3 — navigation-menu** (rewrite) and the `asChild` end-state decision.
5. **Phase 4 (optional) — dependency consolidation**: vaul → Drawer, sonner → Toast,
   input-otp → OTPField, cmdk → Autocomplete/Combobox.

Phases 1–3 can ship behind one major release; phase 4 items are each independently
releasable afterward.

## Housekeeping the migration must include

- `package.json` `description` + `keywords` mention Radix; README and the docs site
  reference "Radix UI" as a pillar of the system.
- `command.tsx` imports the `DialogProps` **type** from `@radix-ui/react-dialog` — must
  be re-pointed even in the pragmatic posture.
- Changesets: single `major` changeset for the core migration; docs-only follow-ups use
  the `skip-changeset` label.
