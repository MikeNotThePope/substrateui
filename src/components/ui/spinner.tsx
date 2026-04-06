"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by Spinner. All keys have English defaults. */
interface SpinnerLabels {
  loading?: string
}

const defaultSpinnerLabels: Required<SpinnerLabels> = {
  loading: "Loading…",
}

/** Spinner size variants. Use with cn(spinnerVariants({...})) for non-spinner elements. */
const spinnerVariants = cva(
  "rounded-full border-2",
  {
    variants: {
      size: {
        sm: "size-4",
        default: "size-6",
        lg: "size-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

/**
 * An animated loading spinner indicator.
 *
 * @example
 * <Spinner size="lg" />
 *
 * @prop size - The spinner diameter (sm, default, lg).
 */
function Spinner({
  className,
  size,
  labels: labelsProp,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof spinnerVariants> & { labels?: SpinnerLabels }) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultSpinnerLabels, ctx.spinner, labelsProp)

  return (
    <div
      data-slot="spinner"
      role="status"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <span className="sr-only">{labels.loading}</span>
    </div>
  )
}

export { Spinner, spinnerVariants, type SpinnerLabels }
