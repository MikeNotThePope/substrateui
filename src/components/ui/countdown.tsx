"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useCountdown, type CountdownState, type UseCountdownOptions } from "@/hooks/use-countdown"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by Countdown. All keys have English defaults. */
interface CountdownLabels {
  /** Accessible name for the timer. */
  remaining?: string
}

const defaultCountdownLabels: Required<CountdownLabels> = {
  remaining: "Time remaining",
}

/** Props for Countdown. */
interface CountdownProps
  extends Omit<React.ComponentPropsWithRef<"span">, "children">,
    UseCountdownOptions {
  /** When the countdown reaches zero. */
  deadline: Date | number
  /** Render the remainder yourself instead of the default formatted string. */
  children?: (state: CountdownState) => React.ReactNode
  labels?: CountdownLabels
}

/** A live countdown to a deadline, ticking once a second.
 *
 * Renders as `role="timer"`, whose implicit `aria-live` is off — a per-second
 * live region would be unusable with a screen reader. The value is read on
 * demand instead, which is why the element carries an accessible name.
 *
 * Server-rendered output is empty until the countdown is measured in the
 * browser; see {@link useCountdown} for why.
 *
 * @example
 * <Countdown deadline={saleEndsAt} onFinish={() => refetch()} />
 *
 * @example
 * <Countdown deadline={launch}>
 *   {({ days, hours, finished }) =>
 *     finished ? "Live now" : `${days}d ${hours}h`}
 * </Countdown>
 *
 * @prop deadline - Date or epoch milliseconds to count down to.
 * @prop interval - Tick rate in ms (default 1000).
 * @prop locale - BCP-47 locale for the formatted remainder.
 * @prop onFinish - Fired once when the deadline is reached.
 * @prop children - Render prop receiving the live countdown state.
 */
function Countdown({
  deadline,
  interval,
  locale,
  onFinish,
  children,
  className,
  labels: labelsProp,
  ref,
  ...props
}: CountdownProps) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultCountdownLabels, ctx.countdown, labelsProp)
  const state = useCountdown(deadline, { interval, locale, onFinish })

  return (
    <span
      ref={ref}
      data-slot="countdown"
      role="timer"
      aria-label={labels.remaining}
      className={cn("font-mono tabular-nums", className)}
      {...props}
    >
      {children ? children(state) : state.formatted}
    </span>
  )
}

export { Countdown, type CountdownProps, type CountdownLabels }
