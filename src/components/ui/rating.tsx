"use client"

import * as React from "react"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

const sizeMap = {
  sm: "size-4",
  md: "size-5",
  lg: "size-7",
} as const

/** Props for the Rating component. */
export interface RatingProps extends Omit<React.ComponentPropsWithRef<"div">, "onChange"> {
  /** Current rating. Supports fractional values in read-only mode (e.g. 3.5). */
  value?: number
  /** Number of stars. @default 5 */
  max?: number
  /** Star size. @default "md" */
  size?: keyof typeof sizeMap
  /** When set, stars become buttons and this fires with the chosen value (1..max). */
  onValueChange?: (value: number) => void
  /** Render as a non-interactive display even without `onValueChange`. @default true when no handler */
  readOnly?: boolean
  /** Accessible label for the group. @default "Rating" */
  label?: string
}

/**
 * A star rating — a fractional-fill display, or an interactive input when
 * `onValueChange` is provided. Filled stars use the amber secondary fill.
 *
 * @example
 * // display
 * <Rating value={4.5} readOnly />
 * // input
 * <Rating value={value} onValueChange={setValue} />
 *
 * @prop value - Current rating (fractional allowed when read-only).
 * @prop max - Number of stars (default 5).
 * @prop size - "sm" | "md" | "lg".
 * @prop onValueChange - Makes the rating interactive; fires with 1..max.
 */
function Rating({
  value = 0,
  max = 5,
  size = "md",
  onValueChange,
  readOnly,
  label = "Rating",
  className,
  ref,
  ...props
}: RatingProps) {
  const [hover, setHover] = React.useState<number | null>(null)
  const interactive = !readOnly && typeof onValueChange === "function"
  const shown = hover ?? value
  const starClass = sizeMap[size]

  if (!interactive) {
    return (
      <div
        ref={ref}
        data-slot="rating"
        role="img"
        aria-label={`${label}: ${value} out of ${max}`}
        className={cn("inline-flex items-center gap-0.5", className)}
        {...props}
      >
        {Array.from({ length: max }, (_, i) => {
          const fill = Math.max(0, Math.min(1, value - i))
          return (
            <span key={i} className={cn("relative inline-block", starClass)}>
              <Star className={cn(starClass, "text-muted-foreground/40")} />
              {fill > 0 && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <Star className={cn(starClass, "fill-secondary-fill text-secondary-fill")} />
                </span>
              )}
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      data-slot="rating"
      role="radiogroup"
      aria-label={label}
      className={cn("inline-flex items-center gap-0.5", className)}
      onMouseLeave={() => setHover(null)}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1
        const filled = shown >= starValue
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={value === starValue}
            aria-label={`${starValue} ${starValue === 1 ? "star" : "stars"}`}
            className="rounded-sm transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-[1px] motion-reduce:transition-none motion-reduce:hover:scale-100"
            onMouseEnter={() => setHover(starValue)}
            onFocus={() => setHover(starValue)}
            onBlur={() => setHover(null)}
            onClick={() => onValueChange?.(starValue)}
          >
            <Star
              className={cn(
                starClass,
                filled
                  ? "fill-secondary-fill text-secondary-fill"
                  : "text-muted-foreground/40"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

export { Rating }
