# Changelog

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
