"use client"

import { Sliders } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DirectionToggle } from "@/components/direction-toggle"
import { ThemePicker } from "@/components/theme-picker"
import { ThemeToggle, type ThemeMode } from "@/components/theme-toggle"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by SitePreferences. All keys have English defaults. */
interface SitePreferencesLabels {
  displayPreferences?: string
  theme?: string
  mode?: string
  direction?: string
}

const defaultSitePreferencesLabels: Required<SitePreferencesLabels> = {
  displayPreferences: "Display preferences",
  theme: "Theme",
  mode: "Mode",
  direction: "Direction",
}

/**
 * Wires {@link ThemeToggle} to next-themes.
 *
 * The toggle itself owns no theme state, because it ships and next-themes is
 * not a dependency of what ships — see the note on the component. The five
 * lines that bind the two live here, in the application, which is exactly where
 * the docs tell a consumer to put them.
 *
 * `theme` is undefined until the client has read it, and the toggle renders a
 * same-height placeholder for that, so there is no mount wait to keep here.
 */
function SiteThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <ThemeToggle
      value={theme as ThemeMode | undefined}
      onValueChange={(mode) => setTheme(mode)}
    />
  )
}

export function SitePreferences({ labels: labelsProp }: { labels?: SitePreferencesLabels } = {}) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultSitePreferencesLabels, ctx.sitePreferences, labelsProp)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={labels.displayPreferences}
          />
        }
      >
        <Sliders className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>{labels.theme}</DropdownMenuLabel>
        <div className="px-2 pb-2">
          <ThemePicker />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{labels.mode}</DropdownMenuLabel>
        <div className="px-2 pb-2">
          <SiteThemeToggle />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{labels.direction}</DropdownMenuLabel>
        <div className="px-2 pb-2">
          <DirectionToggle />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export type { SitePreferencesLabels }
