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
npm install substrateui
```

### CSS Setup

```css
/* globals.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "substrateui/styles.css";
@source "../node_modules/substrateui";
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
import { cn } from "substrateui/utils"
```

## Exports

| Import path | Contents |
|---|---|
| `substrateui` | All 75 UI primitives (Button, Card, Input, Table, etc.) |
| `substrateui/organisms` | App-level patterns (AppShell, PageHeader, PageBody, PageTabs, StatCard) |
| `substrateui/utils` | `cn()` utility (clsx + tailwind-merge) |
| `substrateui/styles.css` | OKLCH token system + Tailwind theme + base styles |

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
- **Forms** — Input, Textarea, Select, NativeSelect, Checkbox, RadioGroup, Switch, Slider, DatePicker, Combobox, InputGroup, InputOTP, SearchField, Field, Fieldset, FormSection, FormActions
- **Data Display** — Card, Table, DataTable, Avatar, Calendar, Carousel, Chart, HoverCard, Item
- **Feedback** — Alert, AlertDialog, Dialog, Progress, Skeleton, Sonner (toast)
- **Overlays** — Sheet, Drawer, Popover, Tooltip, ContextMenu, DropdownMenu, Command
- **Navigation** — Tabs, Breadcrumb, NavigationMenu, Menubar, Pagination, ScrollArea, Sidebar, Collapsible, Accordion
- **Patterns** — AppShell, PageHeader, PageBody, PageTabs, StatCard

## Customization

Override tokens after importing the stylesheet:

```css
/* After importing substrateui/styles.css */
:root {
  --primary: oklch(0.55 0.15 250);  /* Change primary to blue */
}
```

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
