# Changelog

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
