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
  default: {
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
        shades: ["50", "100", "200", "300", "350", "400", "450", "500", "600", "700", "800", "850", "900", "950", "975"],
      },
    ],
    status: [
      { variable: "--raw-olivine", label: "success" },
      { variable: "--raw-sulfur-700", label: "warning" },
      { variable: "--raw-cherry", label: "error" },
      { variable: "--raw-ijen", label: "info" },
    ],
    semantic: [
      { name: "background", light: "basalt-100", dark: "basalt-975" },
      { name: "foreground", light: "basalt-900", dark: "basalt-100" },
      { name: "primary", light: "magma-700", dark: "magma-500" },
      { name: "primary-foreground", light: "white", dark: "basalt-950" },
      { name: "secondary", light: "basalt-200", dark: "basalt-700" },
      { name: "muted", light: "basalt-200", dark: "basalt-800" },
      { name: "muted-foreground", light: "basalt-600", dark: "basalt-300" },
      { name: "accent", light: "magma-100", dark: "magma @ 15%" },
      { name: "destructive", light: "cherry", dark: "cherry (lighter)" },
      { name: "border", light: "basalt-500", dark: "basalt-400" },
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
