"use client"

import * as React from "react"
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

type Theme = "default"

const STORAGE_KEY = "substrateui-theme"
const THEMES: Array<{ value: Theme; label: string }> = [
  { value: "default", label: "Default" },
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
    if (stored === "default") {
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

export function ThemePicker({ labels: labelsProp }: { labels?: ThemePickerLabels } = {}) {
  const { theme, setTheme } = React.useContext(ThemeContext)
  const [mounted, setMounted] = React.useState(false)
  const ctx = useLabels()
  const labels = resolveLabels(defaultThemePickerLabels, ctx.themePicker, labelsProp)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-9 w-24" aria-hidden="true" />

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
      aria-label={labels.theme}
      className="h-9 rounded-lg border-2 px-3 text-sm bg-background text-foreground"
    >
      {THEMES.map((t) => (
        <option key={t.value} value={t.value}>
          {t.label}
        </option>
      ))}
    </select>
  )
}

export type { ThemePickerLabels }
