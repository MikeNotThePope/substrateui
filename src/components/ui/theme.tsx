"use client"

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Tokens ───────────────────────────────────────────────────────────

/**
 * The semantic tokens a theme may override. These are the names the
 * stylesheet's `@theme inline` block maps to Tailwind utilities, so setting
 * one re-colours every component that uses it.
 */
export type ThemeTokenName =
  // Core
  | "background"
  | "foreground"
  | "card"
  | "card-foreground"
  | "popover"
  | "popover-foreground"
  | "primary"
  | "primary-foreground"
  | "primary-border"
  | "secondary"
  | "secondary-foreground"
  | "muted"
  | "muted-foreground"
  | "accent"
  | "accent-foreground"
  | "destructive"
  | "destructive-foreground"
  | "border"
  | "input"
  | "ring"
  // Surfaces
  | "surface-ground"
  | "surface-page"
  | "surface-raised"
  | "surface-sunken"
  | "surface-interactive"
  | "surface-interactive-hover"
  // Borders
  | "border-default"
  | "border-strong"
  | "border-subtle"
  | "border-accent"
  // Accent and secondary fills
  | "accent-fill"
  | "accent-fill-hover"
  | "accent-surface"
  | "secondary-fill"
  | "secondary-fill-hover"
  | "secondary-fill-foreground"
  | "secondary-fill-border"
  | "secondary-surface"
  | "secondary-text"
  // Status
  | "status-success"
  | "status-success-surface"
  | "status-success-text"
  | "status-warning"
  | "status-warning-surface"
  | "status-warning-text"
  | "status-error"
  | "status-error-surface"
  | "status-error-text"
  | "status-info"
  | "status-info-surface"
  | "status-info-text"
  // Chart
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-5"
  // Sidebar
  | "sidebar"
  | "sidebar-foreground"
  | "sidebar-primary"
  | "sidebar-primary-foreground"
  | "sidebar-accent"
  | "sidebar-accent-foreground"
  | "sidebar-border"
  | "sidebar-ring"
  // Feel
  | "hard-shadow-color"
  | "spinner-track"
  | "motion-duration"
  | "motion-ease"
  | "radius-factor"

/**
 * A token map. The known names above autocomplete; any other custom property
 * is still accepted, so raw palette steps and bespoke tokens work too.
 */
export type ThemeTokens = Partial<
  Record<ThemeTokenName | (string & Record<never, never>), string>
>

/** A named theme: one token map per colour scheme. */
export interface Theme {
  /** Used as the `data-theme` attribute value. */
  name: string
  /** Human-readable name, shown by {@link ThemeSelect}. */
  label: string
  light: ThemeTokens
  dark: ThemeTokens
}

/** Input to {@link createTheme}. */
export interface ThemeConfig {
  /** Becomes the `data-theme` value — letters, digits, `-` and `_` only. */
  name: string
  /** Defaults to a title-cased `name`. */
  label?: string
  /** Start from another theme's tokens and override them. */
  extends?: Theme
  /** Tokens applied to both schemes. */
  tokens?: ThemeTokens
  /** Tokens applied to the light scheme only, overriding `tokens`. */
  light?: ThemeTokens
  /** Tokens applied to the dark scheme only, overriding `tokens`. */
  dark?: ThemeTokens
}

const SAFE_NAME = /^[a-zA-Z0-9_-]+$/

function titleCase(name: string) {
  return name
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

/**
 * Builds a theme from token overrides. Nothing is computed or validated
 * beyond the name — the tokens are whatever CSS values you give them, so
 * OKLCH, hex, and `var(--raw-*)` references all work.
 *
 * @example
 * const ocean = createTheme({
 *   name: "ocean",
 *   tokens: { ring: "oklch(0.6 0.13 230)" },
 *   light: { primary: "oklch(0.45 0.12 230)" },
 *   dark: { primary: "oklch(0.72 0.13 230)" },
 * })
 */
export function createTheme(config: ThemeConfig): Theme {
  if (!SAFE_NAME.test(config.name)) {
    throw new Error(
      `createTheme: "${config.name}" is not a valid theme name — use letters, digits, "-" or "_".`
    )
  }
  const base = config.extends
  return {
    name: config.name,
    label: config.label ?? titleCase(config.name),
    light: { ...base?.light, ...config.tokens, ...config.light },
    dark: { ...base?.dark, ...config.tokens, ...config.dark },
  }
}

function declarations(tokens: ThemeTokens) {
  return Object.entries(tokens)
    .filter(([, value]) => value != null && value !== "")
    .map(([key, value]) => `  --${key.replace(/^--/, "")}: ${value};`)
    .join("\n")
}

/**
 * Renders themes to CSS. Emitting this into your stylesheet at build time is
 * the fastest path — {@link ThemeRegistry} can inject it at runtime instead,
 * but static CSS is available on the very first paint.
 */
export function themeToCss(themes: Theme | Theme[]): string {
  const list = Array.isArray(themes) ? themes : [themes]
  const blocks: string[] = []
  for (const theme of list) {
    const light = declarations(theme.light)
    const dark = declarations(theme.dark)
    if (light) blocks.push(`[data-theme="${theme.name}"] {\n${light}\n}`)
    // Two selectors so both placements work: the attribute on the same element
    // as `.dark` (the document element), and a scoped element inside a dark
    // root. Either way this outranks the light block.
    if (dark) {
      blocks.push(
        `[data-theme="${theme.name}"].dark,\n.dark [data-theme="${theme.name}"] {\n${dark}\n}`
      )
    }
  }
  return blocks.join("\n\n")
}

/** The theme name that means "the stylesheet's built-in palette". */
export const BASE_THEME = "default"

const DEFAULT_STORAGE_KEY = "substrateui-theme"

/**
 * The source of a tiny script that applies the stored theme before first
 * paint. Run it as an inline `<script>` in your document head — anything
 * later than that and the default palette flashes first.
 *
 * @example
 * <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
 */
export function themeInitScript({
  storageKey = DEFAULT_STORAGE_KEY,
  defaultTheme = BASE_THEME,
}: { storageKey?: string; defaultTheme?: string } = {}): string {
  return `(function(){try{var t=localStorage.getItem(${JSON.stringify(storageKey)})||${JSON.stringify(defaultTheme)};document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`
}

// ─── Registry ─────────────────────────────────────────────────────────

interface ThemeContextValue {
  /** The active theme's name. */
  theme: string
  setTheme: (name: string) => void
  /** Every registered theme, in the order given. */
  themes: Theme[]
  /** The active {@link Theme}, or undefined while the base palette is active. */
  resolvedTheme?: Theme
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

/** Props for {@link ThemeRegistry}. */
export interface ThemeRegistryProps {
  /** Themes made available to {@link useTheme} and {@link ThemeSelect}. */
  themes?: Theme[]
  /** Applied when nothing is stored. Defaults to the base palette. */
  defaultTheme?: string
  /** localStorage key. */
  storageKey?: string
  /** Persist the choice across reloads. */
  persist?: boolean
  /** Inject `themeToCss(themes)` into the head. Turn off if you ship it in CSS. */
  injectCss?: boolean
  /**
   * Theme a subtree instead of the whole document: renders a wrapper element
   * carrying `data-theme` and leaves the document element alone.
   */
  scoped?: boolean
  /** Classes for the wrapper element rendered when `scoped` is set. */
  className?: string
  children: React.ReactNode
}

/**
 * Registers named themes and owns the active one. Sets `data-theme` on the
 * document element, persists the choice, and (by default) injects the themes'
 * CSS so a theme works with no stylesheet changes.
 *
 * Pair it with {@link themeInitScript} to avoid a flash of the default palette
 * on first load.
 *
 * @example
 * <ThemeRegistry themes={[ocean, forest]} defaultTheme="ocean">
 *   {children}
 * </ThemeRegistry>
 */
export function ThemeRegistry({
  themes = [],
  defaultTheme = BASE_THEME,
  storageKey = DEFAULT_STORAGE_KEY,
  persist = true,
  injectCss = true,
  scoped = false,
  className,
  children,
}: ThemeRegistryProps) {
  const [theme, setThemeState] = React.useState(defaultTheme)

  // Recomputed each render on purpose: the effect below keys off the CSS text,
  // so an inline `themes={[...]}` array does not re-inject the style tag.
  const css = injectCss ? themeToCss(themes) : ""

  React.useInsertionEffect(() => {
    if (!css) return
    const style = document.createElement("style")
    style.dataset.substrateuiThemes = "true"
    style.textContent = css
    document.head.append(style)
    return () => style.remove()
  }, [css])

  // Adopt whatever the init script (or a previous session) already chose.
  React.useEffect(() => {
    const stored = persist ? localStorage.getItem(storageKey) : null
    const next = stored ?? defaultTheme
    setThemeState(next)
    if (!scoped) document.documentElement.setAttribute("data-theme", next)
  }, [persist, storageKey, defaultTheme, scoped])

  const setTheme = React.useCallback(
    (name: string) => {
      setThemeState(name)
      if (!scoped) document.documentElement.setAttribute("data-theme", name)
      if (persist) localStorage.setItem(storageKey, name)
    },
    [persist, storageKey, scoped]
  )

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      themes,
      resolvedTheme: themes.find((t) => t.name === theme),
    }),
    [theme, setTheme, themes]
  )

  return (
    <ThemeContext.Provider value={value}>
      {scoped ? (
        <div data-slot="theme-scope" data-theme={theme} className={className}>
          {children}
        </div>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  )
}

/**
 * Reads the active theme and the registered set.
 *
 * @example
 * const { theme, setTheme, themes } = useTheme()
 */
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a <ThemeRegistry>.")
  }
  return context
}

// ─── Picker ───────────────────────────────────────────────────────────

/** Props for {@link ThemeSelect}. */
export interface ThemeSelectProps {
  /** Accessible name for the trigger. */
  label?: string
  /** Label for the built-in palette option. */
  baseLabel?: string
  /** Offer the built-in palette alongside the registered themes. */
  includeBase?: boolean
  className?: string
}

/**
 * A ready-made picker over the themes registered with {@link ThemeRegistry}.
 *
 * @example
 * <ThemeSelect />
 */
export function ThemeSelect({
  label = "Theme",
  baseLabel = "Default",
  includeBase = true,
  className,
}: ThemeSelectProps) {
  const { theme, setTheme, themes } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  // The stored theme is only known on the client; render a placeholder of the
  // same size until then so the first paint does not shift.
  if (!mounted) return <div className={className} aria-hidden="true" />

  const options = [
    ...(includeBase ? [{ name: BASE_THEME, label: baseLabel }] : []),
    ...themes.map((t) => ({ name: t.name, label: t.label })),
  ]

  return (
    <Select value={theme} onValueChange={(value) => setTheme(value as string)}>
      <SelectTrigger aria-label={label} className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.name} value={option.name}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
