"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cluster } from "@/components/ui/cluster"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Stack } from "@/components/ui/stack"
import { Switch } from "@/components/ui/switch"
import { H4, P, Muted } from "@/components/ui/typography"

// Lightness + chroma anchors lifted from the plum ramp that drives the default
// theme. We keep the lightness of each semantic token fixed and rotate hue +
// scale chroma, so any hue produces a ramp with the same contrast relationships
// the design system was audited against.
const ANCHORS = {
  primary: { l: 0.48, cf: 1.0 },
  primaryBorder: { l: 0.35, cf: 0.72 },
  ring: { l: 0.556, cf: 1.03 },
  accent: { l: 0.937, cf: 0.17 },
  darkPrimary: { l: 0.556, cf: 1.03 },
  darkBorder: { l: 0.772, cf: 0.59 },
  darkRing: { l: 0.657, cf: 0.89 },
} as const

function oklch(l: number, chroma: number, cf: number, hue: number) {
  return `oklch(${l} ${(chroma * cf).toFixed(3)} ${hue})`
}

function buildCss(hue: number, chroma: number) {
  const o = (a: { l: number; cf: number }) => oklch(a.l, chroma, a.cf, hue)
  return `:root {
  --primary: ${o(ANCHORS.primary)};
  --primary-foreground: oklch(1 0 0);
  --primary-border: ${o(ANCHORS.primaryBorder)};
  --ring: ${o(ANCHORS.ring)};
  --accent: ${o(ANCHORS.accent)};
}

.dark {
  --primary: ${o(ANCHORS.darkPrimary)};
  --primary-foreground: oklch(1 0 0);
  --primary-border: ${o(ANCHORS.darkBorder)};
  --ring: ${o(ANCHORS.darkRing)};
}`
}

export function ThemeGeneratorClient() {
  const [hue, setHue] = React.useState(314)
  const [chroma, setChroma] = React.useState(0.145)
  const [copied, setCopied] = React.useState(false)

  const css = React.useMemo(() => buildCss(hue, chroma), [hue, chroma])

  // Applied to a wrapper so the sample components below recolor live via CSS
  // variable inheritance — no global stylesheet mutation.
  const previewStyle = {
    "--primary": oklch(ANCHORS.primary.l, chroma, ANCHORS.primary.cf, hue),
    "--primary-foreground": "oklch(1 0 0)",
    "--primary-border": oklch(ANCHORS.primaryBorder.l, chroma, ANCHORS.primaryBorder.cf, hue),
    "--ring": oklch(ANCHORS.ring.l, chroma, ANCHORS.ring.cf, hue),
    "--accent": oklch(ANCHORS.accent.l, chroma, ANCHORS.accent.cf, hue),
  } as React.CSSProperties

  const handleCopy = () => {
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Controls + preview */}
      <Stack gap="lg">
        <Stack gap="md">
          <Field id="tg-hue">
            <Cluster justify="between" align="baseline">
              <FieldLabel>Hue</FieldLabel>
              <Muted className="font-mono text-xs">{Math.round(hue)}°</Muted>
            </Cluster>
            <Slider
              value={[hue]}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => setHue(v[0])}
              aria-label="Primary hue"
            />
          </Field>

          <Field id="tg-chroma">
            <Cluster justify="between" align="baseline">
              <FieldLabel>Chroma</FieldLabel>
              <Muted className="font-mono text-xs">{chroma.toFixed(3)}</Muted>
            </Cluster>
            <Slider
              value={[chroma]}
              min={0}
              max={0.3}
              step={0.005}
              onValueChange={(v) => setChroma(v[0])}
              aria-label="Primary chroma"
            />
          </Field>

          <div
            aria-hidden
            className="h-12 w-full rounded-md border-2 border-primary-border"
            style={{ backgroundColor: oklch(ANCHORS.primary.l, chroma, ANCHORS.primary.cf, hue) }}
          />
        </Stack>

        <div style={previewStyle}>
          <Card>
            <CardHeader>
              <CardTitle>Live preview</CardTitle>
            </CardHeader>
            <CardContent>
              <Stack gap="md">
                <Cluster gap="sm">
                  <Button>Primary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </Cluster>
                <Cluster gap="sm" align="center">
                  <Badge>Badge</Badge>
                  <Switch defaultChecked aria-label="Sample toggle" />
                  <Input placeholder="Focus me for the ring" className="max-w-48" />
                </Cluster>
              </Stack>
            </CardContent>
          </Card>
        </div>
      </Stack>

      {/* Generated CSS */}
      <Stack gap="sm">
        <H4>Generated CSS</H4>
        <P className="text-sm text-muted-foreground">
          Paste this after <code className="font-mono">@import</code>-ing the
          SubstrateUI stylesheet. It overrides only the primary/accent tokens;
          every component recolors automatically, in light and dark mode.
        </P>
        <div className="relative rounded-lg border-2 bg-warm-950 dark:bg-warm-900 overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 end-2 h-8 w-8 text-warm-400 hover:text-warm-100 hover:bg-warm-800"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy CSS"}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <pre className="p-4 pe-12 overflow-x-auto text-sm">
            <code className="font-mono text-warm-200">{css}</code>
          </pre>
        </div>
      </Stack>
    </div>
  )
}
