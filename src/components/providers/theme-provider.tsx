"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ComponentProps } from "react"

/**
 * Wraps next-themes ThemeProvider in a client component boundary.
 *
 * next-themes injects an inline <script> via React.createElement("script").
 * React 19 (used by Next.js 16) errors on <script> elements rendered inside
 * client components. Isolating the provider in its own "use client" file is
 * the recommended pattern from the Next.js docs for third-party providers.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
