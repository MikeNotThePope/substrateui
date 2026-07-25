"use client"

import * as React from "react"

/**
 * Tracks whether a CSS media query currently matches. SSR-safe: returns
 * `initialValue` until mounted, then the live result.
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 768px)")
 *
 * @param query - A media query string.
 * @param initialValue - Value returned before hydration (default false).
 */
export function useMediaQuery(query: string, initialValue = false): boolean {
  const [matches, setMatches] = React.useState(initialValue)

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  return matches
}
