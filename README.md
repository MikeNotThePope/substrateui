# SubstrateUI

A chunky, opinionated design system for Next.js — OKLCH tokens, Tailwind CSS v4, Base UI primitives.

[![npm version](https://img.shields.io/npm/v/substrateui.svg)](https://www.npmjs.com/package/substrateui)
[![license](https://img.shields.io/npm/l/substrateui.svg)](https://github.com/substrateui/substrateui/blob/main/LICENSE)

<!-- Replace <OWNER>/<REPO> with the GitHub owner/repo once the repo is pushed,
     and <VERCEL-PRODUCTION-URL> with the production URL after Vercel deploys. -->
## Status

[![CI](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml/badge.svg)](https://github.com/<OWNER>/<REPO>/actions/workflows/ci.yml)

- **Docs:** <VERCEL-PRODUCTION-URL>
- **Storybook:** https://substrateui.dev/storybook/ — run locally with `bun run storybook`
- **npm:** `@substrateui/core` (not yet published)

## Features

- 75 components from atomic Button to organism App Shell
- 3-layer OKLCH color system: raw palette → semantic tokens → Tailwind utilities
- Dark mode as a token swap — zero component changes
- Chunky 2px borders and press-down animations
- CVD-safe plum + amber color pairing
- WCAG AA contrast verified on every token pairing — see [contrast report](./audit-contrast-report.md)
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
npx substrateui init
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
import { Button, Stack, Card, CardHeader, CardTitle, CardContent } from "substrateui"
import { AppShell, AppShellSidebar, AppShellMain } from "substrateui/organisms"
import { SignInBlock, HeroBlock, StatsBlock } from "substrateui/blocks"
import { cn } from "substrateui/utils"
```

### Framework-agnostic links

Blocks and any navigation you build stay router-agnostic. Wrap your app once
with your framework's link and every SubstrateUI `Link` uses it; with no
provider, links fall back to a plain `<a>`.

```tsx
import NextLink from "next/link"
import { LinkProvider } from "substrateui"

<LinkProvider component={NextLink}>{children}</LinkProvider>
```

## Exports

| Import path | Contents |
|---|---|
| `substrateui` | All UI primitives (Button, Card, Input, Table, etc.) plus the `LinkProvider` adapter |
| `substrateui/organisms` | App-level patterns (AppShell, PageHeader, PageBody, PageTabs, StatCard) |
| `substrateui/blocks` | Full compositions across Marketing, Application, Auth & E-commerce (Hero, FeatureGrid, Pricing, Cta, Footer, Stats, ActivityFeed, SignIn, SignUp, ProductGrid) |
| `substrateui/templates` | Complete assembled pages (DashboardTemplate, PricingTemplate) |
| `substrateui/hooks` | React hooks (useDisclosure, useClipboard, useLocalStorage, useMediaQuery, useHotkeys, useDebouncedValue, useFocusTrap, useAnnouncer, useCountdown, …) |
| `substrateui/utils` | `cn()` utility (clsx + tailwind-merge) |
| `substrateui/styles.css` | OKLCH token system + Tailwind theme + base styles |

Set up a project with the CLI: `npx substrateui init`.

## Requirements

- React 18+
- Tailwind CSS 4+
- `tw-animate-css` (for animations)
- `next-themes` (optional, for dark mode toggle)
- `next` 15+ (optional, only for `substrateui/organisms` which use `next/link`)

## Token Architecture

SubstrateUI uses a 3-layer OKLCH color system:

1. **Raw palette** — OKLCH values (`--raw-plum-600`, `--raw-amber-500`, etc.)
2. **Semantic tokens** — Purpose-based mappings (`--primary`, `--surface-raised`, `--status-error`, etc.) with automatic dark mode via `.dark` class
3. **Tailwind utilities** — `@theme inline` maps tokens to `bg-primary`, `text-foreground`, `border-border`, etc.

## Component Categories

- **General** — Button, ButtonGroup, Badge, Kbd, Spinner, Empty
- **Typography** — H1-H4, P, Lead, Large, Small, Muted, Code, Mono
- **Layout** — Stack, Cluster, Grid, Center, Divider, Spacer, Separator, AspectRatio, ResizablePanels
- **Forms** — Input, Textarea, Select, NativeSelect, Checkbox, RadioGroup, Switch, Slider, DatePicker, Combobox, Cascader, InputGroup, InputOTP, SearchField, Field, Fieldset, FormSection, FormActions
- **Data Display** — Card, Table, DataTable, Avatar, Calendar, Carousel, Chart, HoverCard, Item, Timeline, Rating, ListGroup, Tree, Descriptions, Transfer, Countdown
- **Feedback** — Alert, Banner, AlertDialog, Dialog, Progress, Skeleton, Sonner (toast)
- **Overlays** — Sheet, Drawer, Popover, Tooltip, ContextMenu, DropdownMenu, Command
- **Navigation** — Tabs, Breadcrumb, NavigationMenu, Menubar, Pagination, ScrollArea, Sidebar, Collapsible, Accordion, Stepper
- **Patterns** — AppShell, PageHeader, PageBody, PageTabs, StatCard
- **Blocks** — Hero, FeatureGrid, Pricing, Cta, Footer, Stats, ActivityFeed, SignIn, SignUp, ProductGrid
- **Templates** — DashboardTemplate, PricingTemplate

## Customization

Override tokens after importing the stylesheet:

```css
/* After importing substrateui/styles.css */
:root {
  --primary: oklch(0.55 0.15 250);  /* Change primary to blue */
}
```

### Named themes

Define themes in TypeScript and swap between them at runtime. A theme is a map
of semantic tokens, so every component re-colours itself with no other changes.

```tsx
import { ThemeRegistry, ThemeSelect, createTheme } from "substrateui"

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
[Theming API docs](https://substrateui.dev/docs/foundations/theming).

## Accessibility

SubstrateUI meets WCAG AA contrast requirements (verified by automated audit) and is built on Base UI primitives for robust keyboard and screen reader support.

- [Accessibility documentation](https://substrateui.dev/docs/accessibility)
- [Contrast audit report](./audit-contrast-report.md)

Every component ships with accessible defaults. For guidance on specific components, see the "Accessibility" section on each component's documentation page.

## Storybook

Contributors can browse components in isolation, flip between light/dark themes, swap `ltr`/`rtl` direction, and switch the semantic palette from the toolbar.

```bash
bun run storybook        # dev server on http://localhost:6006
bun run build-storybook  # static bundle in ./storybook-static
```

Hosted build: https://substrateui.dev/storybook/

## Links

- [GitHub](https://github.com/substrateui/substrateui)
- [npm](https://www.npmjs.com/package/substrateui)
- [Storybook](https://substrateui.dev/storybook/)

## License

MIT
