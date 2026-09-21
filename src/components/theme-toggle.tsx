"use client"

import * as React from "react"
import { Sun, Moon, Monitor } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
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

/** The three colour-scheme choices the toggle offers. */
export type ThemeMode = "light" | "dark" | "system"

/** Props for the ThemeToggle. */
export interface ThemeToggleProps {
  /**
   * The mode that is currently on. `undefined` renders a placeholder of the
   * same height — which is what to pass while the mode is still unknown, as it
   * is on the server and on the first client render.
   */
  value?: ThemeMode
  /** Called with the mode the user picked. */
  onValueChange?: (mode: ThemeMode) => void
  labels?: ThemeToggleLabels
  className?: string
}

const MODES: Array<{ mode: ThemeMode; key: keyof ThemeToggleLabels; Icon: typeof Sun }> = [
  { mode: "light", key: "light", Icon: Sun },
  { mode: "dark", key: "dark", Icon: Moon },
  { mode: "system", key: "system", Icon: Monitor },
]

/**
 * A three-way colour-scheme control: light, dark, and follow the system. One
 * segmented group of icon buttons, each carrying `aria-pressed`, so which one
 * is on is announced rather than only drawn.
 *
 * **It owns no theme state.** Pass the mode in and take the change back out.
 * That is not a shortcut — it is what keeps this package free of a theming
 * library. An earlier version read `next-themes` directly, and `next-themes` is
 * a devDependency here rather than an external, so a published build would
 * bundle a private second copy of it: `useTheme` would read a React context no
 * consumer's `ThemeProvider` ever fills, return `{ setTheme: () => {}, themes:
 * [] }`, and the toggle would render three unpressed buttons that do nothing,
 * silently. `Toaster` had already been cut loose from the same package for a
 * near-identical reason — see the note in `sonner.tsx`.
 *
 * Wiring it to `next-themes` is five lines, and they belong in the application:
 *
 * ```tsx
 * "use client"
 * import { useTheme } from "next-themes"
 * import { ThemeToggle, type ThemeMode } from "@mikenotthepope/substrateui/organisms"
 *
 * export function ModeToggle() {
 *   const { theme, setTheme } = useTheme()
 *   return <ThemeToggle value={theme as ThemeMode} onValueChange={setTheme} />
 * }
 * ```
 *
 * Before hydration `theme` is `undefined`, and the toggle renders a
 * same-height placeholder rather than three buttons whose pressed state the
 * server could not have known. That is the mount wait, moved to where it is
 * cheap: a caller who *does* know the mode on the server never pays for it.
 *
 * @example
 * <ThemeToggle value={mode} onValueChange={setMode} />
 *
 * @prop value - The mode that is currently on; `undefined` renders a placeholder.
 * @prop onValueChange - Called with the mode the user picked.
 */
export function ThemeToggle({
  value,
  onValueChange,
  labels: labelsProp,
  className,
}: ThemeToggleProps = {}) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultThemeToggleLabels, ctx.themeToggle, labelsProp)

  // Same height as the group below, so nothing shifts when the mode arrives.
  if (!value) {
    return <div data-slot="theme-toggle-placeholder" aria-hidden="true" className="h-9" />
  }

  return (
    <div
      data-slot="theme-toggle"
      className={cn("flex items-center gap-1 rounded-lg border-2 p-1", className)}
    >
      {MODES.map(({ mode, key, Icon }) => (
        <Button
          key={mode}
          type="button"
          variant={value === mode ? "secondary" : "ghost"}
          size="icon"
          className="h-7 w-7"
          onClick={() => onValueChange?.(mode)}
          aria-label={labels[key]}
          aria-pressed={value === mode}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  )
}

export type { ThemeToggleLabels }
