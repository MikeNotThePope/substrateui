"use client"

import * as React from "react"
import { DocPage } from "../_components/doc-page"
import { H2, Mono, P } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { Grid } from "@/components/ui/grid"
import { useSiteTheme, type Theme } from "@/components/theme-picker"

// ─── Color Data (keyed by active site theme) ──────────────────────────

interface Ramp {
  title: string
  description: string
  prefix: string
  shades: string[]
}

interface ThemeColorData {
  ramps: Ramp[]
  status: Array<{ variable: string; label: string }>
  semantic: Array<{ name: string; light: string; dark: string }>
}

const themeColorData: Record<Theme, ThemeColorData> = {
  plum: {
    ramps: [
      {
        title: "Plum (Primary)",
        description:
          "The primary accent. Used for interactive elements, focus rings, and brand presence.",
        prefix: "plum",
        shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
      },
      {
        title: "Amber (Secondary)",
        description:
          "CVD-safe secondary color. Used for call-to-action buttons and warm highlights.",
        prefix: "amber",
        shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
      },
      {
        title: "Warm Neutrals",
        description:
          "The backbone of the system. Backgrounds, borders, text — all warm-toned for cohesion.",
        prefix: "warm",
        shades: ["50", "100", "200", "300", "350", "400", "450", "500", "600", "700", "800", "850", "900", "950", "975"],
      },
    ],
    status: [
      { variable: "--raw-success", label: "success" },
      { variable: "--raw-warning", label: "warning" },
      { variable: "--raw-error", label: "error" },
      { variable: "--raw-info", label: "info" },
    ],
    semantic: [
      { name: "background", light: "warm-100", dark: "warm-975" },
      { name: "foreground", light: "warm-900", dark: "warm-100" },
      { name: "primary", light: "plum-600", dark: "plum-500" },
      { name: "primary-foreground", light: "white", dark: "white" },
      { name: "secondary", light: "warm-200", dark: "warm-700" },
      { name: "muted", light: "warm-200", dark: "warm-800" },
      { name: "muted-foreground", light: "warm-600", dark: "warm-400" },
      { name: "accent", light: "plum-100", dark: "plum @ 15%" },
      { name: "destructive", light: "error", dark: "error (lighter)" },
      { name: "border", light: "warm-500", dark: "warm-400" },
      { name: "card", light: "warm-white", dark: "warm-850" },
      { name: "ring", light: "plum-500", dark: "plum-400" },
    ],
  },
  proof: {
    ramps: [
      {
        title: "Process Cyan (Primary)",
        description:
          "The first process ink. Darkened through the ramp so mid steps carry white text.",
        prefix: "cyan",
        shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
      },
      {
        title: "Process Yellow (Secondary)",
        description:
          "The third process ink. Always takes dark text, never white.",
        prefix: "yellow",
        shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
      },
      {
        title: "Proof Stock (Neutrals)",
        description:
          "Cool press-room paper. Backgrounds, borders, and text. Process magenta lives outside this set as brand furniture (--raw-magenta).",
        prefix: "proof",
        shades: ["50", "100", "200", "300", "350", "400", "450", "500", "600", "700", "800", "850", "900", "950", "975"],
      },
    ],
    status: [
      { variable: "--status-success", label: "success" },
      { variable: "--status-warning", label: "warning" },
      { variable: "--status-error", label: "error" },
      { variable: "--status-info", label: "info" },
    ],
    semantic: [
      { name: "background", light: "proof-100", dark: "proof-975" },
      { name: "foreground", light: "proof-900", dark: "proof-100" },
      { name: "primary", light: "cyan-700", dark: "cyan-400" },
      { name: "primary-foreground", light: "white", dark: "proof-950" },
      { name: "secondary", light: "proof-200", dark: "proof-700" },
      { name: "muted", light: "proof-200", dark: "proof-800" },
      { name: "muted-foreground", light: "proof-600", dark: "proof-300" },
      { name: "accent", light: "cyan-100", dark: "cyan @ 15%" },
      { name: "destructive", light: "error", dark: "error (lighter)" },
      { name: "border", light: "proof-500", dark: "proof-400" },
      { name: "card", light: "proof-50", dark: "proof-850" },
      { name: "ring", light: "cyan-600", dark: "cyan-400" },
    ],
  },
  substrate: {
    ramps: [
      {
        title: "Jade (Primary)",
        description:
          "A cold instrument green. Interactive elements, focus rings, and brand presence.",
        prefix: "jade",
        shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
      },
      {
        title: "Instrument Amber (Secondary)",
        description:
          "Signal amber, CVD-safe against jade. Call-to-action buttons and highlights.",
        prefix: "instrument",
        shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
      },
      {
        title: "Graphite Neutrals",
        description:
          "Cold, near-neutral grays for a measuring instrument. Backgrounds, borders, and text.",
        prefix: "graphite",
        shades: ["50", "100", "200", "300", "350", "400", "450", "500", "600", "700", "800", "850", "900", "950", "975"],
      },
    ],
    status: [
      { variable: "--status-success", label: "success" },
      { variable: "--status-warning", label: "warning" },
      { variable: "--status-error", label: "error" },
      { variable: "--status-info", label: "info" },
    ],
    semantic: [
      { name: "background", light: "graphite-100", dark: "graphite-975" },
      { name: "foreground", light: "graphite-900", dark: "graphite-100" },
      { name: "primary", light: "jade-700", dark: "jade-400" },
      { name: "primary-foreground", light: "white", dark: "graphite-950" },
      { name: "secondary", light: "graphite-200", dark: "graphite-700" },
      { name: "muted", light: "graphite-200", dark: "graphite-800" },
      { name: "muted-foreground", light: "graphite-600", dark: "graphite-300" },
      { name: "accent", light: "jade-100", dark: "jade @ 15%" },
      { name: "destructive", light: "error", dark: "error (lighter)" },
      { name: "border", light: "graphite-500", dark: "graphite-400" },
      { name: "card", light: "graphite-50", dark: "graphite-850" },
      { name: "ring", light: "jade-600", dark: "jade-400" },
    ],
  },
  tundra: {
    ramps: [
      {
        title: "Steel (Primary)",
        description:
          "Glacial blue, hue drifting colder as lightness falls.",
        prefix: "steel",
        shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
      },
      {
        title: "Cold Rose (Secondary)",
        description:
          "A low-temperature pink. Call-to-action buttons and highlights.",
        prefix: "rose",
        shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
      },
      {
        title: "Frost Neutrals",
        description:
          "Pale ice grays carrying a blue cast. Backgrounds, borders, and text.",
        prefix: "frost",
        shades: ["50", "100", "200", "300", "350", "400", "450", "500", "600", "700", "800", "850", "900", "950", "975"],
      },
    ],
    status: [
      { variable: "--status-success", label: "success" },
      { variable: "--status-warning", label: "warning" },
      { variable: "--status-error", label: "error" },
      { variable: "--status-info", label: "info" },
    ],
    semantic: [
      { name: "background", light: "frost-100", dark: "frost-975" },
      { name: "foreground", light: "frost-900", dark: "frost-100" },
      { name: "primary", light: "steel-700", dark: "steel-400" },
      { name: "primary-foreground", light: "white", dark: "frost-950" },
      { name: "secondary", light: "frost-200", dark: "frost-700" },
      { name: "muted", light: "frost-200", dark: "frost-800" },
      { name: "muted-foreground", light: "frost-600", dark: "frost-300" },
      { name: "accent", light: "steel-100", dark: "steel @ 15%" },
      { name: "destructive", light: "error", dark: "error (lighter)" },
      { name: "border", light: "frost-500", dark: "frost-400" },
      { name: "card", light: "frost-50", dark: "frost-850" },
      { name: "ring", light: "steel-600", dark: "steel-400" },
    ],
  },
  lava: {
    ramps: [
      {
        title: "Magma (Primary)",
        description:
          "The primary accent, following lava's cooling curve — hue slides from yellow to red as lightness falls.",
        prefix: "magma",
        shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"],
      },
      {
        title: "Sulfur (Secondary)",
        description:
          "Vent-crust yellow. Used for call-to-action buttons and warm highlights.",
        prefix: "sulfur",
        shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
      },
      {
        title: "Basalt Neutrals",
        description:
          "Cooled-lava grays, warmed toward the magma hue. Backgrounds, borders, and text.",
        prefix: "basalt",
        shades: ["50", "100", "150", "200", "250", "300", "350", "400", "450", "500", "600", "700", "800", "850", "900", "925", "950", "975", "990"],
      },
    ],
    status: [
      { variable: "--raw-olivine", label: "success" },
      { variable: "--raw-sulfur-700", label: "warning" },
      { variable: "--raw-cherry", label: "error" },
      { variable: "--raw-ijen", label: "info" },
    ],
    semantic: [
      { name: "background", light: "basalt-150", dark: "basalt-990" },
      { name: "foreground", light: "basalt-950", dark: "basalt-50" },
      { name: "primary", light: "magma-700", dark: "magma-500" },
      { name: "primary-foreground", light: "white", dark: "basalt-950" },
      { name: "secondary", light: "basalt-200", dark: "basalt-700" },
      { name: "muted", light: "basalt-200", dark: "basalt-800" },
      { name: "muted-foreground", light: "basalt-700", dark: "basalt-250" },
      { name: "accent", light: "magma-100", dark: "magma @ 15%" },
      { name: "destructive", light: "cherry", dark: "cherry (lighter)" },
      { name: "border", light: "basalt-500", dark: "basalt-500" },
      { name: "card", light: "warm-white", dark: "basalt-850" },
      { name: "ring", light: "magma-600", dark: "magma-400" },
    ],
  },
}

// ─── Swatch ───────────────────────────────────────────────────────────

function Swatch({ variable, label }: { variable: string; label: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(variable)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button onClick={handleClick} className="flex flex-col items-center gap-1 group cursor-pointer">
      <div
        className="w-12 h-12 rounded-md border-2 transition-transform group-hover:scale-110"
        style={{ backgroundColor: `var(${variable})` }}
      />
      <Mono className="text-xs text-muted-foreground">
        {copied ? "Copied!" : label}
      </Mono>
    </button>
  )
}

function SemanticRow({ name, light, dark }: { name: string; light: string; dark: string }) {
  const [copied, setCopied] = React.useState(false)
  const variable = `--${name}`

  const handleClick = () => {
    navigator.clipboard.writeText(variable)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-4 p-3 rounded-lg border-2 hover:bg-muted transition-colors text-left cursor-pointer w-full"
    >
      <div
        className="w-10 h-10 rounded-md border-2 shrink-0"
        style={{ backgroundColor: `var(--${name})` }}
      />
      <div className="flex-1 min-w-0">
        <Mono className="text-sm font-medium">{copied ? "Copied!" : variable}</Mono>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span>Light: {light}</span>
          <span>Dark: {dark}</span>
        </div>
      </div>
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────

export default function ColorsPage() {
  const { theme } = useSiteTheme()
  const data = themeColorData[theme]

  return (
    <DocPage
      title="Colors"
      description="OKLCH-based color system with perceptually uniform scaling and CVD-safe pairings. Showing the active theme — switch themes in the header to compare."
    >
      <Stack gap="xl">
        {/* Palette ramps */}
        {data.ramps.map((ramp) => (
          <section key={ramp.prefix}>
            <H2>{ramp.title}</H2>
            <P className="text-muted-foreground mt-1 mb-4">{ramp.description}</P>
            <Cluster gap="md" className="flex-wrap">
              {ramp.shades.map((shade) => (
                <Swatch key={shade} variable={`--raw-${ramp.prefix}-${shade}`} label={shade} />
              ))}
            </Cluster>
          </section>
        ))}

        {/* Status */}
        <section>
          <H2>Status Colors</H2>
          <Cluster gap="md" className="mt-4">
            {data.status.map((s) => (
              <Swatch key={s.variable} variable={s.variable} label={s.label} />
            ))}
          </Cluster>
        </section>

        {/* Semantic Tokens */}
        <section>
          <H2>Semantic Tokens</H2>
          <P className="text-muted-foreground mt-1 mb-4">
            These tokens are what you actually use in components. They map to the raw palette and flip automatically in dark mode. Click to copy the CSS variable.
          </P>
          <Grid columns={2} gap="sm">
            {data.semantic.map((token) => (
              <SemanticRow key={token.name} {...token} />
            ))}
          </Grid>
        </section>
      </Stack>
    </DocPage>
  )
}
