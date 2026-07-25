import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { Badge } from "./badge"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Stack } from "./stack"
import { Cluster } from "./cluster"
import {
  ThemeRegistry,
  ThemeSelect,
  createTheme,
  themeToCss,
  useTheme,
} from "./theme"

const ocean = createTheme({
  name: "ocean",
  tokens: { ring: "oklch(0.62 0.13 232)" },
  light: {
    primary: "oklch(0.45 0.12 232)",
    "primary-border": "oklch(0.30 0.09 232)",
    accent: "oklch(0.93 0.04 232)",
    "accent-foreground": "oklch(0.35 0.10 232)",
    "border-accent": "oklch(0.52 0.12 232)",
  },
  dark: {
    primary: "oklch(0.72 0.13 232)",
    "primary-foreground": "oklch(0.20 0.04 232)",
    "primary-border": "oklch(0.85 0.09 232)",
    accent: "oklch(0.32 0.07 232)",
    "accent-foreground": "oklch(0.90 0.05 232)",
    "border-accent": "oklch(0.66 0.12 232)",
  },
})

const moss = createTheme({
  name: "moss",
  label: "Moss",
  extends: ocean,
  tokens: { ring: "oklch(0.60 0.12 148)" },
  light: {
    primary: "oklch(0.43 0.11 148)",
    "primary-border": "oklch(0.29 0.08 148)",
    accent: "oklch(0.93 0.04 148)",
    "accent-foreground": "oklch(0.34 0.09 148)",
    "border-accent": "oklch(0.50 0.11 148)",
  },
  dark: {
    primary: "oklch(0.74 0.13 148)",
    "primary-foreground": "oklch(0.19 0.04 148)",
    "primary-border": "oklch(0.86 0.09 148)",
    accent: "oklch(0.31 0.06 148)",
    "accent-foreground": "oklch(0.90 0.05 148)",
    "border-accent": "oklch(0.64 0.11 148)",
  },
})

const meta: Meta<typeof ThemeSelect> = {
  title: "Foundations/Theme",
  component: ThemeSelect,
}

export default meta
type Story = StoryObj<typeof ThemeSelect>

function Swatches() {
  const { theme, resolvedTheme, themes } = useTheme()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active theme: {resolvedTheme?.label ?? "Default"}</CardTitle>
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

export const Default: Story = {
  render: () => (
    <ThemeRegistry themes={[ocean, moss]}>
      <Stack gap="md" className="w-96">
        <ThemeSelect className="h-9 w-40 text-sm" />
        <Swatches />
      </Stack>
    </ThemeRegistry>
  ),
}

export const WithDefaultTheme: Story = {
  render: () => (
    <ThemeRegistry themes={[ocean, moss]} defaultTheme="moss" persist={false}>
      <Stack gap="md" className="w-96">
        <ThemeSelect className="h-9 w-40 text-sm" />
        <Swatches />
      </Stack>
    </ThemeRegistry>
  ),
}

export const GeneratedCss: Story = {
  render: () => (
    <pre className="max-w-2xl overflow-x-auto rounded-md border-2 bg-surface-sunken p-4 text-xs">
      {themeToCss(ocean)}
    </pre>
  ),
}
