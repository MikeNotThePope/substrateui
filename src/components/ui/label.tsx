"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Label text variants. Use with cn(labelVariants()) for non-label elements. */
const labelVariants = cva(
  "text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

/**
 * Accessible form label rendered as a native `<label>` element.
 *
 * @example
 * <Label htmlFor="email">Email</Label>
 */
function Label({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"label"> & VariantProps<typeof labelVariants>) {
  return (
    <label
      ref={ref}
      data-slot="label"
      className={cn(labelVariants(), className)}
      {...props}
    />
  )
}

export { Label }
