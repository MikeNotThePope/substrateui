"use client"

import * as React from "react"
import { DocPage } from "../_components/doc-page"
import { H2, H3, Mono, Code, P } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { Grid } from "@/components/ui/grid"
import { Badge } from "@/components/ui/badge"

// ─── Color Data ───────────────────────────────────────────────────────

const plumShades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
const amberShades = ["50", "100", "200", "300", "400", "500", "600", "700", "800"]
const warmShades = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]

const semanticTokens = [
  { name: "background", light: "warm-50", dark: "warm-950" },
  { name: "foreground", light: "warm-900", dark: "warm-100" },
  { name: "primary", light: "plum-600", dark: "plum-500" },
  { name: "primary-foreground", light: "white", dark: "white" },
  { name: "secondary", light: "warm-100", dark: "warm-800" },
  { name: "muted", light: "warm-100", dark: "warm-800" },
  { name: "muted-foreground", light: "warm-600", dark: "warm-400" },
  { name: "accent", light: "plum-100", dark: "plum @ 15%" },
  { name: "destructive", light: "error", dark: "error (lighter)" },
  { name: "border", light: "warm-500", dark: "warm-400" },
  { name: "card", light: "warm-white", dark: "warm-850" },
  { name: "ring", light: "plum-500", dark: "plum-400" },
]

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
  return (
    <DocPage
      title="Colors"
      description="OKLCH-based color system with perceptually uniform scaling and CVD-safe pairings."
    >
      <Stack gap="xl">
        {/* Plum */}
        <section>
          <H2>Plum (Primary)</H2>
          <P className="text-muted-foreground mt-1 mb-4">
            The primary accent. Used for interactive elements, focus rings, and brand presence.
          </P>
          <Cluster gap="md" className="flex-wrap">
            {plumShades.map((shade) => (
              <Swatch key={shade} variable={`--raw-plum-${shade}`} label={shade} />
            ))}
          </Cluster>
        </section>

        {/* Amber */}
        <section>
          <H2>Amber (Secondary)</H2>
          <P className="text-muted-foreground mt-1 mb-4">
            CVD-safe secondary color. Used for call-to-action buttons and warm highlights.
          </P>
          <Cluster gap="md" className="flex-wrap">
            {amberShades.map((shade) => (
              <Swatch key={shade} variable={`--raw-amber-${shade}`} label={shade} />
            ))}
          </Cluster>
        </section>

        {/* Warm Neutrals */}
        <section>
          <H2>Warm Neutrals</H2>
          <P className="text-muted-foreground mt-1 mb-4">
            The backbone of the system. Backgrounds, borders, text — all warm-toned for cohesion.
          </P>
          <Cluster gap="md" className="flex-wrap">
            {warmShades.map((shade) => (
              <Swatch key={shade} variable={`--raw-warm-${shade}`} label={shade} />
            ))}
          </Cluster>
        </section>

        {/* Status */}
        <section>
          <H2>Status Colors</H2>
          <Cluster gap="md" className="mt-4">
            <Swatch variable="--raw-success" label="success" />
            <Swatch variable="--raw-warning" label="warning" />
            <Swatch variable="--raw-error" label="error" />
          </Cluster>
        </section>

        {/* Semantic Tokens */}
        <section>
          <H2>Semantic Tokens</H2>
          <P className="text-muted-foreground mt-1 mb-4">
            These tokens are what you actually use in components. They map to the raw palette and flip automatically in dark mode. Click to copy the CSS variable.
          </P>
          <Grid columns={2} gap="sm">
            {semanticTokens.map((token) => (
              <SemanticRow key={token.name} {...token} />
            ))}
          </Grid>
        </section>
      </Stack>
    </DocPage>
  )
}
