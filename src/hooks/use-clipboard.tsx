"use client"

import * as React from "react"

/** Return value of {@link useClipboard}. */
export interface UseClipboardReturn {
  /** Copy text to the clipboard. */
  copy: (value: string) => Promise<void>
  /** True for `timeout` ms after a successful copy. */
  copied: boolean
  /** Reset `copied` to false immediately. */
  reset: () => void
  /** Set if the last copy attempt threw. */
  error: Error | null
}

/**
 * Copies text to the clipboard and tracks a transient `copied` flag — the
 * standard "click to copy, show a check for 2 seconds" pattern.
 *
 * @example
 * const clipboard = useClipboard({ timeout: 2000 })
 * <Button onClick={() => clipboard.copy(code)}>{clipboard.copied ? "Copied" : "Copy"}</Button>
 *
 * @param options.timeout - How long `copied` stays true, in ms (default 2000).
 */
export function useClipboard({ timeout = 2000 }: { timeout?: number } = {}): UseClipboardReturn {
  const [copied, setCopied] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = React.useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }, [])

  const reset = React.useCallback(() => {
    setCopied(false)
    setError(null)
    clearTimer()
  }, [clearTimer])

  const copy = React.useCallback(
    async (value: string) => {
      try {
        if (!navigator?.clipboard) {
          throw new Error("Clipboard API not available")
        }
        await navigator.clipboard.writeText(value)
        setError(null)
        setCopied(true)
        clearTimer()
        timer.current = setTimeout(() => setCopied(false), timeout)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
        setCopied(false)
      }
    },
    [timeout, clearTimer]
  )

  React.useEffect(() => clearTimer, [clearTimer])

  return { copy, copied, reset, error }
}
