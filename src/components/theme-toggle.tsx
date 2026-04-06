"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"

import { Button } from "@/components/ui/button"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by ThemeToggle. All keys have English defaults. */
interface ThemeToggleLabels {
  light?: string
  dark?: string
  system?: string
}

const defaultThemeToggleLabels: Required<ThemeToggleLabels> = {
  light: "Light theme",
  dark: "Dark theme",
  system: "System theme",
}

export function ThemeToggle({ labels: labelsProp }: { labels?: ThemeToggleLabels } = {}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const ctx = useLabels()
  const labels = resolveLabels(defaultThemeToggleLabels, ctx.themeToggle, labelsProp)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-9" />

  return (
    <div className="flex items-center gap-1 border-2 rounded-lg p-1">
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        onClick={() => setTheme("light")}
        aria-label={labels.light}
        aria-pressed={theme === "light"}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        onClick={() => setTheme("dark")}
        aria-label={labels.dark}
        aria-pressed={theme === "dark"}
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        size="icon"
        className="h-7 w-7"
        onClick={() => setTheme("system")}
        aria-label={labels.system}
        aria-pressed={theme === "system"}
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  )
}

export type { ThemeToggleLabels }
