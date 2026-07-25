"use client"

import * as React from "react"

/** A single hotkey binding: `[keys, handler]`, e.g. `["mod+K", openSpotlight]`. */
export type HotkeyItem = [string, (event: KeyboardEvent) => void]

/** Parse a hotkey string like "mod+shift+K" into a matcher. */
function matches(event: KeyboardEvent, hotkey: string): boolean {
  const parts = hotkey
    .toLowerCase()
    .split("+")
    .map((p) => p.trim())
  const key = parts[parts.length - 1]
  const mods = new Set(parts.slice(0, -1))

  // "mod" = ⌘ on macOS, Ctrl elsewhere.
  const isMac = typeof navigator !== "undefined" && /Mac|iP(hone|ad|od)/.test(navigator.userAgent)
  const wantCtrl = mods.has("ctrl") || (mods.has("mod") && !isMac)
  const wantMeta = mods.has("meta") || (mods.has("mod") && isMac)

  if (event.ctrlKey !== wantCtrl) return false
  if (event.metaKey !== wantMeta) return false
  if (event.shiftKey !== mods.has("shift")) return false
  if (event.altKey !== mods.has("alt")) return false

  return event.key.toLowerCase() === key
}

/** Should we ignore hotkeys because the user is typing in a field? */
function isEditable(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null
  if (!el) return false
  const tag = el.tagName
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable
}

/**
 * Binds global keyboard shortcuts. Use `mod` for the platform command key
 * (⌘/Ctrl). Shortcuts fired while typing in an input/textarea are ignored
 * unless `ignoreInputs` is false.
 *
 * @example
 * useHotkeys([
 *   ["mod+K", () => setSpotlightOpen(true)],
 *   ["Escape", () => setSpotlightOpen(false)],
 * ])
 *
 * @param hotkeys - Array of `[keys, handler]` bindings.
 * @param options.ignoreInputs - Skip when focus is in a form field (default true).
 */
export function useHotkeys(
  hotkeys: HotkeyItem[],
  options: { ignoreInputs?: boolean } = {}
): void {
  const { ignoreInputs = true } = options
  const hotkeysRef = React.useRef(hotkeys)
  React.useEffect(() => {
    hotkeysRef.current = hotkeys
  })

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (ignoreInputs && isEditable(event.target)) return
      for (const [combo, handler] of hotkeysRef.current) {
        if (matches(event, combo)) {
          event.preventDefault()
          handler(event)
          return
        }
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [ignoreInputs])
}
