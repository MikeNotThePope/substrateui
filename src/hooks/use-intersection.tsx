"use client"

import * as React from "react"

/**
 * Observes whether the ref'd element intersects the viewport (or a root),
 * returning the latest `IntersectionObserverEntry`. Great for lazy-loading,
 * reveal-on-scroll, and infinite lists.
 *
 * @example
 * const [ref, entry] = useIntersection({ threshold: 0.5 })
 * <section ref={ref} data-visible={entry?.isIntersecting} />
 *
 * @param options - Standard IntersectionObserver options.
 */
export function useIntersection<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
): [React.RefObject<T | null>, IntersectionObserverEntry | null] {
  const ref = React.useRef<T>(null)
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(null)
  const optionsRef = React.useRef(options)
  React.useEffect(() => {
    optionsRef.current = options
  })

  React.useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([observed]) => setEntry(observed),
      optionsRef.current
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, entry]
}
