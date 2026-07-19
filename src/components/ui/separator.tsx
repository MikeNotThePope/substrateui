"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

/**
 * A visual divider that separates content horizontally or vertically.
 *
 * @example
 * <Separator orientation="horizontal" />
 */
function Separator({
  className,
  orientation = "horizontal",
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SeparatorPrimitive>) {
  return (
    <SeparatorPrimitive
      ref={ref}
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
