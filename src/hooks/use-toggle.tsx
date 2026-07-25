"use client"

import * as React from "react"

/**
 * Cycles through a list of options (defaults to `[false, true]`). Calling the
 * setter with no argument advances to the next option; calling it with a value
 * jumps to that value.
 *
 * @example
 * const [value, toggle] = useToggle(["ltr", "rtl"] as const)
 * <button onClick={() => toggle()}>{value}</button>
 *
 * @param options - The values to cycle through (default `[false, true]`).
 */
export function useToggle<T>(options: readonly T[] = [false, true] as unknown as readonly T[]) {
  const [[value], setState] = React.useState<T[]>([options[0]])

  const toggle = React.useCallback(
    (next?: T) => {
      setState(([current]) => {
        if (next !== undefined) return [next]
        const index = options.indexOf(current)
        return [options[(index + 1) % options.length]]
      })
    },
    [options]
  )

  return [value, toggle] as const
}
