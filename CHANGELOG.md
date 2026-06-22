# Changelog

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
