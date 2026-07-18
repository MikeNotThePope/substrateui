"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by ThemePicker. All keys have English defaults. */
interface ThemePickerLabels {
  theme?: string
}

const defaultThemePickerLabels: Required<ThemePickerLabels> = {
  theme: "Theme",
}

type Theme = "default" | "lava"

const STORAGE_KEY = "substrateui-theme"
const THEMES: Array<{ value: Theme; label: string }> = [
  { value: "default", label: "Default" },
  { value: "lava", label: "Lava" },
]

const ThemeContext = React.createContext<{
  theme: Theme
  setTheme: (t: Theme) => void
}>({ theme: "default", setTheme: () => {} })

function applyTheme(t: Theme) {
  if (t === "default") {
    document.documentElement.removeAttribute("data-theme")
  } else {
    document.documentElement.setAttribute("data-theme", t)
  }
}

export function SiteThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setThemeState] = React.useState<Theme>("default")

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored && THEMES.some((t) => t.value === stored)) {
      setThemeState(stored)
      applyTheme(stored)
    }
  }, [])

  const setTheme = React.useCallback((t: Theme) => {
    setThemeState(t)
    applyTheme(t)
    localStorage.setItem(STORAGE_KEY, t)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useSiteTheme() {
  return React.useContext(ThemeContext)
}

export function ThemePicker({ labels: labelsProp }: { labels?: ThemePickerLabels } = {}) {
  const { theme, setTheme } = React.useContext(ThemeContext)
  const [mounted, setMounted] = React.useState(false)
  const ctx = useLabels()
  const labels = resolveLabels(defaultThemePickerLabels, ctx.themePicker, labelsProp)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-9 w-24" aria-hidden="true" />

  return (
    <Select value={theme} onValueChange={(v) => setTheme(v as Theme)}>
      <SelectTrigger aria-label={labels.theme} className="h-9 text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {THEMES.map((t) => (
          <SelectItem key={t.value} value={t.value}>
            {t.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export type { Theme, ThemePickerLabels }
