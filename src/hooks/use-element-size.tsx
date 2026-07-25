"use client"

import * as React from "react"

/** Size reported by {@link useElementSize}. */
export interface ElementSize {
  width: number
  height: number
}

/**
 * Observes an element's content-box size with a `ResizeObserver`. Returns a ref
 * to attach and the live `{ width, height }`.
 *
 * @example
 * const [ref, { width }] = useElementSize()
 * <div ref={ref}>{width}px wide</div>
 */
export function useElementSize<T extends HTMLElement = HTMLElement>(): [
  React.RefObject<T | null>,
  ElementSize,
] {
  const ref = React.useRef<T>(null)
  const [size, setSize] = React.useState<ElementSize>({ width: 0, height: 0 })

  React.useEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === "undefined") return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, size]
}
