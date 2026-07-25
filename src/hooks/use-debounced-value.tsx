"use client"

import * as React from "react"

/**
 * Returns a debounced copy of `value` that only updates after `delay` ms have
 * passed without a change. Ideal for search inputs and expensive derived work.
 *
 * @example
 * const [query, setQuery] = React.useState("")
 * const debounced = useDebouncedValue(query, 300)
 * // fetch on `debounced`, type against `query`
 *
 * @param value - The value to debounce.
 * @param delay - Debounce delay in ms (default 200).
 */
export function useDebouncedValue<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])

  return debounced
}
