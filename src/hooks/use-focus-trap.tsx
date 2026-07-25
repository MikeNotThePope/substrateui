"use client"

import * as React from "react"

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",")

function getFocusable(container: HTMLElement): HTMLElement[] {
  // Layout-free visibility check (works in jsdom too): skip elements inside a
  // `hidden` subtree or with `visibility/display:none` inline styles.
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => {
    if (el.closest("[hidden]")) return false
    const style = el.style
    if (style.display === "none" || style.visibility === "hidden") return false
    return true
  })
}

/**
 * Traps keyboard focus within the returned ref'd element while `active` is true.
 * On activation it moves focus inside; Tab / Shift+Tab cycle within the region;
 * on deactivation (or unmount) focus returns to the element that had it before.
 *
 * The reusable focus-management primitive behind modals, menus, and any custom
 * overlay — works on any region, not just built-in overlays.
 *
 * @example
 * const ref = useFocusTrap(open)
 * <div ref={ref} hidden={!open}>…</div>
 *
 * @param active - Whether the trap is engaged (default true).
 * @param options.restoreFocus - Return focus on deactivate (default true).
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  active = true,
  options: { restoreFocus?: boolean } = {}
): React.RefObject<T | null> {
  const { restoreFocus = true } = options
  const ref = React.useRef<T>(null)

  React.useEffect(() => {
    const container = ref.current
    if (!active || !container) return

    const previouslyFocused = document.activeElement as HTMLElement | null

    // Move focus inside the trap.
    const focusables = getFocusable(container)
    if (focusables.length > 0) {
      focusables[0].focus()
    } else {
      container.setAttribute("tabindex", "-1")
      container.focus()
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return
      const items = getFocusable(container)
      if (items.length === 0) {
        event.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const activeEl = document.activeElement

      if (event.shiftKey) {
        if (activeEl === first || !container.contains(activeEl)) {
          event.preventDefault()
          last.focus()
        }
      } else if (activeEl === last || !container.contains(activeEl)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown, true)
    return () => {
      document.removeEventListener("keydown", onKeyDown, true)
      if (restoreFocus && previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus()
      }
    }
  }, [active, restoreFocus])

  return ref
}
