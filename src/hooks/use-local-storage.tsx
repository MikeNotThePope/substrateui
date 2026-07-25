"use client"

import * as React from "react"

/**
 * A `useState` that persists to `localStorage` and stays in sync across tabs
 * and hook instances of the same key. SSR-safe: renders `defaultValue` on the
 * server and hydrates from storage after mount.
 *
 * @example
 * const [theme, setTheme] = useLocalStorage("theme", "system")
 * setTheme("dark")
 *
 * @param key - Storage key.
 * @param defaultValue - Value used before hydration and when nothing is stored.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Keep the latest default in a ref so effects can depend only on `key`
  // without re-subscribing when an inline default changes identity.
  const defaultRef = React.useRef(defaultValue)
  React.useEffect(() => {
    defaultRef.current = defaultValue
  })

  const [value, setValue] = React.useState<T>(defaultValue)

  // Hydrate from storage after mount to avoid an SSR/client mismatch.
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw !== null) setValue(JSON.parse(raw) as T)
    } catch {
      /* ignore malformed / unavailable storage */
    }
  }, [key])

  const set = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved))
          window.dispatchEvent(
            new StorageEvent("storage", { key, newValue: JSON.stringify(resolved) })
          )
        } catch {
          /* ignore write errors (private mode, quota) */
        }
        return resolved
      })
    },
    [key]
  )

  // Keep instances in sync across tabs and within the same document.
  React.useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return
      try {
        setValue(event.newValue === null ? defaultRef.current : (JSON.parse(event.newValue) as T))
      } catch {
        /* ignore malformed values */
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [key])

  return [value, set]
}
