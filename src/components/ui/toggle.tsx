"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "./toggle-variants"

/** A two-state toggle button built on Base UI Toggle.
 *
 * @example
 * <Toggle variant="outline" size="sm"><BoldIcon /></Toggle>
 *
 * @prop variant - Visual style: "default" or "outline".
 * @prop size - Button size: "sm", "default", or "lg".
 */
function Toggle({
  className,
  variant,
  size,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TogglePrimitive> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      ref={ref}
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle }
