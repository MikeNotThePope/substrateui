"use client"

import { Sliders } from "lucide-react"

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
import { ThemeToggle } from "@/components/theme-toggle"
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

export function SitePreferences({ labels: labelsProp }: { labels?: SitePreferencesLabels } = {}) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultSitePreferencesLabels, ctx.sitePreferences, labelsProp)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={labels.displayPreferences}
        >
          <Sliders className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>{labels.theme}</DropdownMenuLabel>
        <div className="px-2 pb-2">
          <ThemePicker />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{labels.mode}</DropdownMenuLabel>
        <div className="px-2 pb-2">
          <ThemeToggle />
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
