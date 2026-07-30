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

  // Nothing may be written to storage until the first read has happened, or
  // mounting would persist `defaultValue` over whatever was already stored.
  const hydrated = React.useRef(false)

  // Hydrate from storage after mount to avoid an SSR/client mismatch.
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw !== null) setValue(JSON.parse(raw) as T)
    } catch {
      /* ignore malformed / unavailable storage */
    }
    hydrated.current = true
  }, [key])

  // Persist in an effect rather than inside the state updater. React may run an
  // updater during the render phase, and these two lines are side effects: with
  // two hooks on one key, the dispatch below reached the other instance's
  // listener mid-render and set state on a component that was not the one
  // rendering — React's "Cannot update a component while rendering a different
  // component" warning. Updaters have to stay pure; effects are where writes go.
  React.useEffect(() => {
    if (!hydrated.current) return
    try {
      const json = JSON.stringify(value)
      // Also the echo guard. A value that arrived *from* a storage event is
      // already the stored one, so re-announcing it would bounce between
      // instances forever — Object.is can't stop it, since JSON.parse hands
      // back a fresh object every time.
      if (window.localStorage.getItem(key) === json) return
      window.localStorage.setItem(key, json)
      window.dispatchEvent(new StorageEvent("storage", { key, newValue: json }))
    } catch {
      /* ignore write errors (private mode, quota) */
    }
  }, [key, value])

  const set = React.useCallback((next: T | ((prev: T) => T)) => {
    setValue(next)
  }, [])

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
