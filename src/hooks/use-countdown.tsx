"use client"

import * as React from "react"

import { useInterval } from "./use-misc"

const MS_PER = {
  days: 86_400_000,
  hours: 3_600_000,
  minutes: 60_000,
  seconds: 1_000,
} as const

/** Remaining time split into whole units. */
export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/** The live state of a countdown. */
export interface CountdownState extends CountdownParts {
  /** Milliseconds left, clamped at 0. `0` until the first client measurement. */
  total: number
  /**
   * The remainder formatted for the current locale, e.g. `"2 days, 3:04:05"`.
   * Empty string until the countdown has been measured on the client.
   */
  formatted: string
  /** True once the deadline has passed. */
  finished: boolean
  /** False until the first client measurement — see the SSR note on {@link useCountdown}. */
  ready: boolean
}

/** Options for {@link useCountdown}. */
export interface UseCountdownOptions {
  /** Tick rate in milliseconds (default 1000). */
  interval?: number
  /** BCP-47 locale for `formatted`. Defaults to the runtime locale. */
  locale?: string
  /** Called once when the deadline is reached. */
  onFinish?: () => void
}

function splitDuration(total: number): CountdownParts {
  return {
    days: Math.floor(total / MS_PER.days),
    hours: Math.floor(total / MS_PER.hours) % 24,
    minutes: Math.floor(total / MS_PER.minutes) % 60,
    seconds: Math.floor(total / MS_PER.seconds) % 60,
  }
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}

// Typed locally rather than via `declare global`: TypeScript's own
// Intl.DurationFormat types are still ahead of this project's lib, and a global
// augmentation shipped in a library would collide with them once they land.
type DurationFormatCtor = new (
  locale: string | undefined,
  options: { style: "digital"; daysDisplay: "auto"; hoursDisplay: "auto" }
) => { format: (parts: CountdownParts) => string }

const DurationFormat = (Intl as unknown as { DurationFormat?: DurationFormatCtor })
  .DurationFormat

/**
 * Formats a duration the way a clock would. `Intl.DurationFormat` handles the
 * locale (including which digits to use), drops leading units that are zero,
 * and needs no format-string DSL. The manual fallback covers runtimes that
 * predate it.
 */
function formatDuration(parts: CountdownParts, locale?: string): string {
  if (DurationFormat) {
    return new DurationFormat(locale, {
      style: "digital",
      daysDisplay: "auto",
      hoursDisplay: "auto",
    }).format(parts)
  }
  const clock = `${pad(parts.minutes)}:${pad(parts.seconds)}`
  const withHours = parts.hours > 0 ? `${parts.hours}:${clock}` : clock
  return parts.days > 0 ? `${parts.days}:${withHours}` : withHours
}

/**
 * Counts down to a deadline, re-rendering on every tick until it is reached.
 *
 * SSR: the server cannot know what "now" is on the client, so the countdown
 * reports `ready: false` and an empty `formatted` until it has been measured
 * in the browser. That keeps the hydrated markup identical to the server's
 * instead of trading a mismatch warning for a one-second discrepancy.
 *
 * @example
 * const { formatted, finished } = useCountdown(saleEndsAt, {
 *   onFinish: () => refetch(),
 * })
 * return <span>{finished ? "Sale over" : formatted}</span>
 *
 * @param deadline - When the countdown reaches zero.
 * @param options.interval - Tick rate in ms (default 1000).
 * @param options.locale - BCP-47 locale for `formatted`.
 * @param options.onFinish - Fired once when the deadline is reached.
 */
export function useCountdown(
  deadline: Date | number,
  options: UseCountdownOptions = {}
): CountdownState {
  const { interval = 1000, locale, onFinish } = options
  const target = +deadline

  // `null` means "not measured yet" — distinct from a countdown that has
  // genuinely run out, which matters for both `ready` and `onFinish`.
  const [total, setTotal] = React.useState<number | null>(null)

  const onFinishRef = React.useRef(onFinish)
  React.useEffect(() => {
    onFinishRef.current = onFinish
  })

  React.useEffect(() => {
    setTotal(Math.max(0, target - Date.now()))
  }, [target])

  const finished = total !== null && total <= 0
  useInterval(
    () => setTotal(Math.max(0, target - Date.now())),
    interval,
    total !== null && !finished
  )

  // Fire once per deadline, so a re-render (or a new deadline) cannot replay it.
  const firedFor = React.useRef<number | null>(null)
  React.useEffect(() => {
    if (!finished) return
    if (firedFor.current === target) return
    firedFor.current = target
    onFinishRef.current?.()
  }, [finished, target])

  const parts = splitDuration(total ?? 0)
  const formatted = React.useMemo(
    () => (total === null ? "" : formatDuration(splitDuration(total), locale)),
    [total, locale]
  )

  return { ...parts, total: total ?? 0, formatted, finished, ready: total !== null }
}
