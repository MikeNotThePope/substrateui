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

/** Every theme the site ships. Adding one here is the only edit a new theme
 *  needs on the UI side — the picker, the home page strip, and anything else
 *  that offers a choice all read this list. */
export const SITE_THEMES = [
  { value: "plum", label: "Plum" },
  { value: "press", label: "Press" },
  { value: "substrate", label: "Substrate" },
  { value: "lava", label: "Lava" },
  { value: "tundra", label: "Tundra" },
] as const

type Theme = (typeof SITE_THEMES)[number]["value"]

/** Which theme you get with no attribute set. A role, not a palette name —
 *  moving it is a one-line change because no palette is called "default". */
const DEFAULT_THEME: Theme = "plum"

const STORAGE_KEY = "substrateui-theme"

const ThemeContext = React.createContext<{
  theme: Theme
  setTheme: (t: Theme) => void
}>({ theme: DEFAULT_THEME, setTheme: () => {} })

function applyTheme(t: Theme) {
  if (t === DEFAULT_THEME) {
    document.documentElement.removeAttribute("data-theme")
  } else {
    document.documentElement.setAttribute("data-theme", t)
  }
}

/** Visitors who chose a theme before the plum rename have "default" in
 *  localStorage. It names the same palette, so read it as plum. */
function readStored(raw: string | null): Theme | null {
  const value = raw === "default" ? DEFAULT_THEME : raw
  return SITE_THEMES.some((t) => t.value === value) ? (value as Theme) : null
}

export function SiteThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setThemeState] = React.useState<Theme>(DEFAULT_THEME)

  React.useEffect(() => {
    const stored = readStored(localStorage.getItem(STORAGE_KEY))
    if (stored) {
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
        {SITE_THEMES.map((t) => (
          <SelectItem key={t.value} value={t.value}>
            {t.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export type { Theme, ThemePickerLabels }
