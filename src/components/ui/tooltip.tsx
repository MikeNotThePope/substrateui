"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"
import { withAsChild } from "@/lib/slot"

/** Global tooltip configuration provider (delay, skip-delay, etc.). */
const TooltipProvider = TooltipPrimitive.Provider

/** Root tooltip wrapper that manages open state. */
const Tooltip = TooltipPrimitive.Root

/** Element that triggers the tooltip on hover/focus. */
const TooltipTrigger = withAsChild(TooltipPrimitive.Trigger)

/** Animated popover content displayed when the tooltip is open.
 *
 * @example
 * <Tooltip><TooltipTrigger>Hover me</TooltipTrigger><TooltipContent>Tip text</TooltipContent></Tooltip>
 */
function TooltipContent({
  className,
  side,
  align,
  sideOffset = 4,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TooltipPrimitive.Popup> &
  Pick<
    React.ComponentPropsWithRef<typeof TooltipPrimitive.Positioner>,
    "side" | "align" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50"
      >
        <TooltipPrimitive.Popup
          ref={ref}
          data-slot="tooltip-content"
          className={cn(
            "overflow-hidden rounded-md border-2 border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-hard-sm animate-in fade-in-0 zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            className
          )}
          {...props}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
