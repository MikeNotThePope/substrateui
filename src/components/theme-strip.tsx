"use client"

import { Check } from "lucide-react"

import { SITE_THEMES, useSiteTheme } from "@/components/theme-picker"
import { cn } from "@/lib/utils"

/**
 * The hero's theme switcher: one chip per registered theme, each chip scoped
 * to the theme it selects (`data-theme`) so it paints itself in that theme's
 * own tokens. Nothing here names a palette — add a theme to `SITE_THEMES`
 * and a chip appears, already the right colour.
 */
export function ThemeStrip({ className }: { className?: string }) {
  const { theme, setTheme } = useSiteTheme()

  return (
    <div role="group" aria-label="Theme" className={cn("flex flex-wrap items-center gap-2", className)}>
      {SITE_THEMES.map((t) => {
        const active = theme === t.value
        return (
          <button
            key={t.value}
            type="button"
            data-theme={t.value}
            aria-pressed={active}
            onClick={() => setTheme(t.value)}
            className={cn(
              "flex items-center gap-2 rounded-md border-2 bg-card px-2.5 py-1.5 text-xs font-medium text-card-foreground",
              "transition-[transform,box-shadow] motion-reduce:transition-none",
              active
                ? "shadow-hard-sm"
                : "opacity-80 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:opacity-100 hover:shadow-hard-sm motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0"
            )}
          >
            <span aria-hidden className="flex gap-1">
              <span className="h-4 w-4 rounded-xs border-2 border-border bg-primary" />
              <span className="h-4 w-4 rounded-xs border-2 border-border bg-secondary-fill" />
              <span className="h-4 w-4 rounded-xs border-2 border-border bg-accent" />
            </span>
            {t.label}
            {active && <Check aria-hidden className="h-3.5 w-3.5" />}
          </button>
        )
      })}
    </div>
  )
}
