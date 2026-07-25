"use client"

import * as React from "react"

/**
 * Returns the value from the previous render. Useful for comparing changes.
 *
 * @example
 * const prevCount = usePrevious(count)
 */
export function usePrevious<T>(value: T): T | undefined {
  // Derive from state (adjusting during render) rather than a ref, so the hook
  // stays pure and compiler-safe.
  const [state, setState] = React.useState<{ value: T; prev: T | undefined }>({
    value,
    prev: undefined,
  })
  if (!Object.is(state.value, value)) {
    setState({ value, prev: state.value })
  }
  return Object.is(state.value, value) ? state.prev : state.value
}

/** Handlers returned by {@link useCounter}. */
export interface CounterHandlers {
  increment: () => void
  decrement: () => void
  set: (value: number) => void
  reset: () => void
}

/**
 * A bounded integer counter with increment/decrement/set/reset — the state
 * behind number inputs, quantity pickers, and steppers.
 *
 * @example
 * const [count, { increment, decrement }] = useCounter(1, { min: 0, max: 10 })
 *
 * @param initial - Starting value (default 0).
 * @param options.min / options.max - Optional clamp bounds.
 */
export function useCounter(
  initial = 0,
  options?: { min?: number; max?: number }
): [number, CounterHandlers] {
  const { min, max } = options ?? {}
  const clamp = React.useCallback(
    (value: number) => {
      let next = value
      if (typeof min === "number") next = Math.max(min, next)
      if (typeof max === "number") next = Math.min(max, next)
      return next
    },
    [min, max]
  )

  const [count, setCount] = React.useState(() => clamp(initial))

  const handlers = React.useMemo<CounterHandlers>(
    () => ({
      increment: () => setCount((c) => clamp(c + 1)),
      decrement: () => setCount((c) => clamp(c - 1)),
      set: (value: number) => setCount(clamp(value)),
      reset: () => setCount(clamp(initial)),
    }),
    [clamp, initial]
  )

  return [count, handlers]
}

/**
 * True once the component has mounted on the client. Use it to gate
 * browser-only UI and avoid SSR hydration mismatches.
 *
 * @example
 * const mounted = useMounted()
 * if (!mounted) return null
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return mounted
}

/**
 * Runs `callback` on a fixed interval while `active` is true. The latest
 * callback is always used without resetting the timer.
 *
 * @example
 * useInterval(() => tick(), 1000, running)
 *
 * @param callback - Function to call each tick.
 * @param delay - Interval in ms.
 * @param active - Whether the interval runs (default true).
 */
export function useInterval(callback: () => void, delay: number, active = true): void {
  const savedCallback = React.useRef(callback)
  React.useEffect(() => {
    savedCallback.current = callback
  })

  React.useEffect(() => {
    if (!active) return
    const id = setInterval(() => savedCallback.current(), delay)
    return () => clearInterval(id)
  }, [delay, active])
}

/**
 * Merges several refs (callback or object) into one ref callback, so a single
 * element can feed multiple hooks (e.g. useElementSize + useClickOutside).
 *
 * @example
 * const merged = useMergedRef(sizeRef, outsideRef)
 * <div ref={merged} />
 */
export function useMergedRef<T>(
  ...refs: (React.Ref<T> | undefined | null)[]
): React.RefCallback<T> {
  return React.useCallback((node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node)
      else if (ref) (ref as React.RefObject<T | null>).current = node
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs)
}
