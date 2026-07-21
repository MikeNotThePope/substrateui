"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

/** Props accepted by Separator. */
export interface SeparatorProps
  extends React.ComponentPropsWithRef<typeof SeparatorPrimitive> {
  /** When true (default), removes the separator from the accessibility tree. */
  decorative?: boolean
}

/**
 * A visual divider that separates content horizontally or vertically.
 *
 * @example
 * <Separator orientation="horizontal" />
 */
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ref,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive
      ref={ref}
      role={decorative ? "presentation" : undefined}
      orientation={orientation}
      data-slot="separator"
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

