# SubstrateUI

A chunky, opinionated design system for Next.js — OKLCH tokens, Tailwind CSS v4, Base UI primitives.

[![npm version](https://img.shields.io/npm/v/%40mikenotthepope%2Fsubstrateui.svg)](https://www.npmjs.com/package/@mikenotthepope/substrateui)
[![license](https://img.shields.io/npm/l/%40mikenotthepope%2Fsubstrateui.svg)](https://github.com/MikeNotThePope/substrateui/blob/main/LICENSE)

## Status

[![CI](https://github.com/MikeNotThePope/substrateui/actions/workflows/ci.yml/badge.svg)](https://github.com/MikeNotThePope/substrateui/actions/workflows/ci.yml)

- **Docs:** https://www.substrateui.dev/
- **Storybook:** https://www.substrateui.dev/storybook/ — run locally with `bun run storybook`
- **npm:** [`@mikenotthepope/substrateui`](https://www.npmjs.com/package/@mikenotthepope/substrateui)

## Features

- 90 components from atomic Button to organism App Shell
- 3-layer OKLCH color system: raw palette → semantic tokens → Tailwind utilities
- Dark mode as a token swap — zero component changes
- Chunky 2px borders and press-down animations
- CVD-safe plum + amber color pairing
- WCAG AA contrast verified on every token pairing — see the [contrast matrix](https://www.substrateui.dev/docs/accessibility/contrast)
- Built for Tailwind CSS v4 (`@theme inline`, CSS-first config)
- Full TypeScript support with exported types
- Tree-shakeable ESM exports

## Quick Start

```bash
npm install @mikenotthepope/substrateui
```

### CSS Setup

Run the init command to wire the imports in automatically, or add them by hand:

```bash
npx @mikenotthepope/substrateui init
```

```css
/* globals.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "@mikenotthepope/substrateui/styles.css";
@source "../node_modules/@mikenotthepope/substrateui";
```

### Font Setup (recommended)

```tsx
// layout.tsx
import { DM_Sans, DM_Mono } from "next/font/google"

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })
const mono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-mono" })

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### Dark Mode

```tsx
import { ThemeProvider } from "next-themes"

// Wrap your app:
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

### Use Components

```tsx
import { Button, Stack, Card, CardHeader, CardTitle, CardContent } from "@mikenotthepope/substrateui"
import { AppShell, AppShellSidebar, AppShellMain } from "@mikenotthepope/substrateui/organisms"
import { SignInBlock, HeroBlock, StatsBlock } from "@mikenotthepope/substrateui/blocks"
import { cn } from "@mikenotthepope/substrateui/utils"
```

### Framework-agnostic links

Blocks and any navigation you build stay router-agnostic. Wrap your app once
with your framework's link and every SubstrateUI `Link` uses it; with no
provider, links fall back to a plain `<a>`.

```tsx
import NextLink from "next/link"
import { LinkProvider } from "@mikenotthepope/substrateui"

<LinkProvider component={NextLink}>{children}</LinkProvider>
```

## Exports

| Import path | Contents |
|---|---|
| `@mikenotthepope/substrateui` | All UI primitives (Button, Card, Input, Table, etc.) plus the `LinkProvider` adapter |
| `@mikenotthepope/substrateui/organisms` | App-level patterns (AppShell, PageHeader, PageBody, PageTabs, StatCard) |
| `@mikenotthepope/substrateui/blocks` | Full compositions across Marketing, Application, Auth & E-commerce (Hero, FeatureGrid, Pricing, Cta, Footer, Stats, ActivityFeed, SignIn, SignUp, ProductGrid) |
| `@mikenotthepope/substrateui/templates` | Complete assembled pages (DashboardTemplate, PricingTemplate) |
| `@mikenotthepope/substrateui/hooks` | React hooks (useDisclosure, useClipboard, useLocalStorage, useMediaQuery, useHotkeys, useDebouncedValue, useFocusTrap, useAnnouncer, useCountdown, …) |
| `@mikenotthepope/substrateui/utils` | `cn()` utility (clsx + tailwind-merge) |
| `@mikenotthepope/substrateui/variants` | The `cva` class recipes (`buttonVariants`, `badgeVariants`, …) |
| `@mikenotthepope/substrateui/styles.css` | OKLCH token system + Tailwind theme + base styles |

The `/variants` and `/utils` entrypoints are the two with no `"use client"`
boundary, so a **server component** can call `cn()` or a class recipe from
them. The same recipes are exported from the package root for
convenience, and that copy is a client reference — calling it while rendering on
the server throws at request time, which no build or type check catches. When in
doubt, import from `/variants`.

Set up a project with the CLI: `npx @mikenotthepope/substrateui init`.

## Requirements

- React 18+
- Tailwind CSS 4+
- `tw-animate-css` (for animations)
No framework peer dependencies. The library is plain React — it runs under Next.js,
Vite, Remix, or anything else that renders React.

- Dark mode is driven by the `.dark` class on `<html>`. Set it however you like:
  `next-themes`, this package's own `ThemeRegistry`, or three lines of your own.
- Routing goes through `LinkProvider`, so `Link` and the navigation organisms use
  your router without the library importing one.

## Token Architecture

SubstrateUI uses a 3-layer OKLCH color system:

1. **Raw palette** — OKLCH values (`--raw-plum-600`, `--raw-amber-500`, etc.)
2. **Semantic tokens** — Purpose-based mappings (`--primary`, `--surface-raised`, `--status-error`, etc.) with automatic dark mode via `.dark` class
3. **Tailwind utilities** — `@theme inline` maps tokens to `bg-primary`, `text-foreground`, `border-border`, etc.

## Component Categories

The 90 above, grouped the way the docs sidebar groups them — that list is where
the count comes from, so start there when either goes stale.

- **General** (8) — Button, Badge, ButtonGroup, Toggle, ToggleGroup, Kbd, Spinner, Skeleton
- **Typography** (2) — Typography (H1–H4, P, Lead, Large, Small, Muted, Code, Mono), Overline
- **Layout Primitives** (9) — Stack, Cluster, Grid, Center, Divider, Separator, ScrollArea, Resizable, Spacer
- **Forms** (16) — Label, Input, InputGroup, Textarea, Select, NativeSelect, Checkbox, RadioGroup, Switch, Slider, Combobox, Cascader, DatePicker, InputOTP, SearchField, PasswordInput
- **Form Patterns** (5) — Field, Fieldset, FormSection, FormActions, Form
- **Data Display** (19) — Table, DataTable, Card, Avatar, AspectRatio, Calendar, Timeline, Rating, ListGroup, Tree, Descriptions, Transfer, Countdown, StatCard, Chart, Carousel, Accordion, Collapsible, Item
- **Feedback** (5) — Alert, Banner, Progress, Toast, Empty
- **Overlays** (10) — Dialog, Sheet, Drawer, AlertDialog, Popover, Tooltip, HoverCard, ContextMenu, DropdownMenu, Command
- **Navigation** (9) — Tabs, NavTabs, Link, Breadcrumb, Pagination, NavigationMenu, Menubar, Sidebar, Stepper
- **Layouts** (5) — App Shell, Dashboard Shell, Nav Shell, Auth Shell, Page Layout
- **Utilities** (2) — FocusTrap, SkipLink

Two export paths hold things built *from* those, and are not counted among the 90:

- **Blocks** (10) — Hero, FeatureGrid, Pricing, Cta, Footer, Stats, ActivityFeed, SignIn, SignUp, ProductGrid
- **Templates** (2) — DashboardTemplate, PricingTemplate

## Customization

Override tokens after importing the stylesheet:

```css
/* After importing @mikenotthepope/substrateui/styles.css */
:root {
  --primary: oklch(0.55 0.15 250);  /* Change primary to blue */
}
```

### Named themes

Define themes in TypeScript and swap between them at runtime. A theme is a map
of semantic tokens, so every component re-colours itself with no other changes.

```tsx
import { ThemeRegistry, ThemeSelect, createTheme } from "@mikenotthepope/substrateui"

const ocean = createTheme({
  name: "ocean",
  tokens: { ring: "oklch(0.62 0.13 232)" },
  light: { primary: "oklch(0.45 0.12 232)" },
  dark: { primary: "oklch(0.72 0.13 232)" },
})

<ThemeRegistry themes={[ocean]}>
  <ThemeSelect />
  {children}
</ThemeRegistry>
```

`themeToCss()` emits the same tokens as static CSS for build-time themes,
`themeInitScript()` prevents a flash of the default palette on first load, and
`scoped` themes a subtree instead of the whole document. See the
[Theming API docs](https://www.substrateui.dev/docs/foundations/theming).

## Accessibility

SubstrateUI meets WCAG AA contrast requirements (verified by automated audit) and is built on Base UI primitives for robust keyboard and screen reader support.

- [Accessibility documentation](https://www.substrateui.dev/docs/accessibility)
- [Contrast matrix](https://www.substrateui.dev/docs/accessibility/contrast)

Every component ships with accessible defaults. For guidance on specific components, see the "Accessibility" section on each component's documentation page.

## Storybook

Contributors can browse components in isolation, flip between light/dark themes, swap `ltr`/`rtl` direction, and switch the semantic palette from the toolbar.

```bash
bun run storybook        # dev server on http://localhost:6006
bun run build-storybook  # static bundle in ./storybook-static
```

Hosted build: https://www.substrateui.dev/storybook/

## Links

- [GitHub](https://github.com/MikeNotThePope/substrateui)
- [npm](https://www.npmjs.com/package/@mikenotthepope/substrateui)
- [Storybook](https://www.substrateui.dev/storybook/)

## License

MIT
