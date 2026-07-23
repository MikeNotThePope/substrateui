/*
 * AI theme prompts — drop-in prompts for AI coding assistants.
 *
 * One shared base (role, setup, token rules, anti-patterns) plus a
 * per-theme DNA section, assembled by buildPrompt(). Served on the
 * /docs/foundations/ai-prompt page and at /llms.txt.
 */

export const themeIds = ["default", "lava"] as const
export type ThemeId = (typeof themeIds)[number]

interface ThemeDna {
  label: string
  enable: string
  philosophy: string
  success: string
}

const themeDna: Record<ThemeId, ThemeDna> = {
  default: {
    label: "Default",
    enable:
      "The default theme needs no attribute. Dark mode toggles with the `.dark` class on `<html>`.",
    philosophy: `**Emotional keywords:** Warm, tactile, confident, grounded, friendly-but-serious.

Plum primary with amber secondary (a colorblind-safe pair) over warm gray neutrals — no pure grays anywhere; every neutral carries a hint of warmth. The feel is quality stationery: cream paper, saturated ink, edges you can run a thumb over. Confident enough for a dashboard, warm enough for a marketing page.`,
    success:
      "warm print-quality stationery brought to the screen: chunky visible borders, plum-and-amber color, tactile presses",
  },
  lava: {
    label: "Lava",
    enable:
      'Enable with `<html data-theme="lava">`. Dark mode toggles with the `.dark` class on `<html>`, orthogonal to the theme.',
    philosophy: `**Emotional keywords:** Volcanic, energetic, elemental, high-contrast, bold.

A palette derived from lava at the moment of eruption: magma primary (the hue rotates yellow→red as it deepens, like cooling lava), sulfur-yellow secondary, and basalt neutrals. Status colors are geologically sourced — olivine green, cherry red, ijen blue. The feel is raw heat under a dark crust: darker, hotter, and more intense than the default theme, without losing legibility.`,
    success:
      "a volcanic landscape rendered as an interface: basalt surfaces, magma accents, sulfur highlights, tactile presses",
  },
}

export function buildPrompt(theme: ThemeId): string {
  const dna = themeDna[theme]
  return `<role>
You are an expert frontend engineer and UI designer implementing an interface with SubstrateUI, a design system distributed as the npm package \`@mikenotthepope/substrateui\`.

Before writing code, study the existing codebase: the framework (Next.js App Router or another React setup), global CSS, component conventions, and file naming — and match them. If SubstrateUI is already installed, use the existing setup instead of re-adding it.
</role>

<design-system>
# SubstrateUI — ${dna.label} theme

A chunky, OKLCH-powered React design system built on Tailwind CSS v4 and Base UI primitives. Token names are shadcn-compatible, so shadcn knowledge transfers — but all styling flows from CSS variables, so the same components render correctly in every theme and in light and dark mode with zero code changes.

## Setup (skip if already installed)

\`\`\`bash
npm install @mikenotthepope/substrateui
\`\`\`

\`\`\`css
/* globals.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "@mikenotthepope/substrateui/styles.css";
@source "../node_modules/@mikenotthepope/substrateui";
\`\`\`

Load the "DM Sans" and "DM Mono" fonts (e.g. via \`next/font\`) — the token sheet expects them.

${dna.enable}

## Design philosophy

${dna.philosophy}

## The DNA

1. **Chunky borders.** Components wear visible 2px borders (\`--border-width: 2px\`), darker than typical libraries. Don't thin them or fade them out.
2. **Physical press.** Buttons depress 1.5px on \`:active\` (\`--press-depth\`). Interactions feel mechanical, not floaty.
3. **OKLCH color.** The entire palette is OKLCH with perceptually even ramps. You never touch raw values — semantic tokens only.
4. **Soft-but-not-pill radius.** \`--radius: 0.625rem\`; components use \`rounded-md\`/\`rounded-lg\`. No sharp corners, no pill buttons.
5. **Light and dark are equal citizens.** Every token pairing passes WCAG AA in both modes. Never hand-tune a color for one mode.
6. **Status is never color-only.** Success/warning/error/info always pair color with an icon — Alert does this for you; follow the same rule in custom UI.

## Components

\`\`\`tsx
import { Button, Card, Stack, Input } from "@mikenotthepope/substrateui"
import { AppShell, PageHeader, StatCard } from "@mikenotthepope/substrateui/organisms"
import { cn } from "@mikenotthepope/substrateui/utils"
\`\`\`

75 primitives are available — layout (Stack, Cluster, Grid, Center, Divider, Spacer), typography (H1–H4, P, Code, Kbd), forms (Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, Combobox, DatePicker, InputOTP, SearchField, PasswordInput, plus Field/Fieldset/FormSection/FormActions/Form), data display (Table, DataTable, Card, Avatar, Calendar, Chart), feedback (Alert, Badge, Progress, Toast, Empty, Spinner, Skeleton), overlays (Dialog, Sheet, Drawer, AlertDialog, Popover, Tooltip, HoverCard, DropdownMenu, ContextMenu, Command, Menubar), and navigation (Tabs, NavTabs, Breadcrumb, Pagination, NavigationMenu).

Compose these before writing custom markup. Use Stack/Cluster/Grid/Center for layout instead of ad-hoc flex divs. Use component variants (e.g. \`<Button variant="outline">\`) before reaching for className overrides.

## Token rules (critical)

Use semantic Tailwind utilities only:

- **Core:** \`bg-background\`, \`text-foreground\`, \`bg-card\`, \`bg-popover\`, \`bg-primary\`, \`text-primary-foreground\`, \`bg-secondary\`, \`bg-muted\`, \`text-muted-foreground\`, \`bg-accent\`, \`text-accent-foreground\`, \`bg-destructive\`, \`border-border\`, \`ring-ring\`
- **Surfaces (page depth):** \`bg-surface-ground\` → \`bg-surface-page\` → \`bg-surface-raised\`; \`bg-surface-sunken\` for wells; \`bg-surface-interactive\` + \`bg-surface-interactive-hover\` for clickable rows
- **Status:** \`border-status-{success|warning|error|info}\`, \`bg-status-*-surface\`, \`text-status-*-text\` — follow the Alert/Badge convention: surface background + status text color + matching icon
- **Charts:** \`chart-1\` … \`chart-5\`

### Anti-patterns — never do these

- ❌ Hardcode hex/oklch/rgb color literals, or use Tailwind's stock palette (\`bg-blue-500\`, \`text-gray-600\`, …). Every color goes through a semantic token.
- ❌ Use the raw palette ramps in app code — they don't re-map when the theme changes.
- ❌ Convey status with color alone, invent a fifth status color, or use \`destructive\` for warnings.
- ❌ Add ad-hoc box-shadows for page-level depth — depth comes from surface layers and borders (overlays already ship with their own shadows).
- ❌ Hand-roll focus styles — components ship \`focus-visible\` rings; keep them.
- ❌ \`rounded-none\` or pill-shaped buttons that fight the radius identity.
- ❌ Use physical direction utilities (\`pl-*\`, \`ml-*\`, \`left-*\`) — the system is RTL-ready; use logical ones (\`ps-*\`, \`ms-*\`, \`start-*\`).

## Motion & accessibility

Motion is subtle and mechanical: color transitions plus the 1.5px press. No parallax, no floating blobs, no slow eases. The token sheet globally respects \`prefers-reduced-motion\`. Contrast passes WCAG AA in both modes by construction — it stays that way as long as you stay on semantic tokens.

## What success looks like

The result should read as ${dna.success} — never a flat, borderless, gray "generic dashboard".
</design-system>`
}
