"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { cn } from "@/lib/utils"

/**
 * Horizontal progress bar indicating completion percentage.
 *
 * @example
 * <Progress value={60} />
 *
 * @prop value - Current progress from 0 to 100.
 */
function Progress({
  className,
  value,
  ref,
  ...props
}: Omit<React.ComponentPropsWithRef<typeof ProgressPrimitive.Root>, "value"> & {
  value?: number | null
}) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      value={value ?? null}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full border-2 bg-surface-sunken",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator className="h-full bg-primary transition-all" />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
