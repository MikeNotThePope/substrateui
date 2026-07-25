"use client"

import * as React from "react"

/**
 * Calls `handler` when a pointer event occurs outside the returned ref'd
 * element. Useful for closing custom popovers, menus, and pickers.
 *
 * @example
 * const ref = useClickOutside(() => setOpen(false))
 * <div ref={ref}>…</div>
 *
 * @param handler - Called on an outside pointerdown.
 * @param events - Event names to listen for (default `["mousedown", "touchstart"]`).
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  events: string[] = ["mousedown", "touchstart"]
): React.RefObject<T | null> {
  const ref = React.useRef<T>(null)
  const handlerRef = React.useRef(handler)
  const eventsRef = React.useRef(events)
  React.useEffect(() => {
    handlerRef.current = handler
    eventsRef.current = events
  })

  React.useEffect(() => {
    const names = eventsRef.current
    const listener = (event: Event) => {
      const el = ref.current
      if (el && !el.contains(event.target as Node)) {
        handlerRef.current()
      }
    }
    names.forEach((name) => document.addEventListener(name, listener))
    return () => names.forEach((name) => document.removeEventListener(name, listener))
  }, [])

  return ref
}
