import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-surface-interactive border-t-primary",
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

function Spinner({
  className,
  size,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof spinnerVariants>) {
  return (
    <div
      data-slot="spinner"
      role="status"
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    >
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export { Spinner, spinnerVariants }
