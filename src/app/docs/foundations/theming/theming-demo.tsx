"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cluster } from "@/components/ui/cluster"
import { Stack } from "@/components/ui/stack"
import {
  ThemeRegistry,
  ThemeSelect,
  createTheme,
  themeToCss,
  useTheme,
} from "@/components/ui/theme"

const ocean = createTheme({
  name: "ocean",
  tokens: { ring: "oklch(0.62 0.13 232)" },
  light: {
    primary: "oklch(0.45 0.12 232)",
    "primary-border": "oklch(0.30 0.09 232)",
    accent: "oklch(0.93 0.04 232)",
    "accent-foreground": "oklch(0.35 0.10 232)",
    "border-accent": "oklch(0.52 0.12 232)",
    "accent-fill": "oklch(0.45 0.12 232)",
    "accent-fill-hover": "oklch(0.38 0.11 232)",
  },
  dark: {
    primary: "oklch(0.72 0.13 232)",
    "primary-foreground": "oklch(0.20 0.04 232)",
    "primary-border": "oklch(0.85 0.09 232)",
    accent: "oklch(0.32 0.07 232)",
    "accent-foreground": "oklch(0.90 0.05 232)",
    "border-accent": "oklch(0.66 0.12 232)",
    "accent-fill": "oklch(0.72 0.13 232)",
    "accent-fill-hover": "oklch(0.79 0.12 232)",
  },
})

const moss = createTheme({
  name: "moss",
  extends: ocean,
  tokens: { ring: "oklch(0.60 0.12 148)" },
  light: {
    primary: "oklch(0.43 0.11 148)",
    "primary-border": "oklch(0.29 0.08 148)",
    accent: "oklch(0.93 0.04 148)",
    "accent-foreground": "oklch(0.34 0.09 148)",
    "border-accent": "oklch(0.50 0.11 148)",
    "accent-fill": "oklch(0.43 0.11 148)",
    "accent-fill-hover": "oklch(0.36 0.10 148)",
  },
  dark: {
    primary: "oklch(0.74 0.13 148)",
    "primary-foreground": "oklch(0.19 0.04 148)",
    "primary-border": "oklch(0.86 0.09 148)",
    accent: "oklch(0.31 0.06 148)",
    "accent-foreground": "oklch(0.90 0.05 148)",
    "border-accent": "oklch(0.64 0.11 148)",
    "accent-fill": "oklch(0.74 0.13 148)",
    "accent-fill-hover": "oklch(0.81 0.12 148)",
  },
})

function Preview() {
  const { theme, resolvedTheme, themes } = useTheme()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{resolvedTheme?.label ?? "Default"}</CardTitle>
      </CardHeader>
      <CardContent>
        <Stack gap="md">
          <Cluster gap="sm">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Badge>Badge</Badge>
          </Cluster>
          <p className="font-mono text-sm text-muted-foreground">
            data-theme=&quot;{theme}&quot; · {themes.length} registered
          </p>
        </Stack>
      </CardContent>
    </Card>
  )
}

export function ThemingDemo() {
  return (
    // scoped + persist={false} so the demo themes this box only and leaves the
    // docs site's own theme alone.
    <ThemeRegistry
      themes={[ocean, moss]}
      defaultTheme="ocean"
      scoped
      persist={false}
      className="w-full max-w-md"
    >
      <Stack gap="md">
        <ThemeSelect className="h-9 w-44 text-sm" />
        <Preview />
      </Stack>
    </ThemeRegistry>
  )
}

export function GeneratedCssDemo() {
  return (
    <pre className="max-h-72 w-full overflow-auto rounded-md border-2 bg-surface-sunken p-4 text-xs">
      {themeToCss(ocean)}
    </pre>
  )
}
