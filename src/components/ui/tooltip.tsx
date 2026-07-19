"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"

/** Global tooltip configuration provider (delay, close-delay, etc.). */
const TooltipProvider = TooltipPrimitive.Provider

/** Root tooltip wrapper that manages open state. */
const Tooltip = TooltipPrimitive.Root

/** Element that triggers the tooltip on hover/focus. */
const TooltipTrigger = TooltipPrimitive.Trigger

/** Animated popover content displayed when the tooltip is open.
 *
 * @example
 * <Tooltip><TooltipTrigger>Hover me</TooltipTrigger><TooltipContent>Tip text</TooltipContent></Tooltip>
 */
function TooltipContent({
  className,
  align,
  side,
  sideOffset = 4,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TooltipPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof TooltipPrimitive.Positioner>,
    "align" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="z-50"
      >
        <TooltipPrimitive.Popup
          ref={ref}
          data-slot="tooltip-content"
          className={cn(
            "overflow-hidden rounded-md border-2 border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-hard-sm animate-in fade-in-0 zoom-in-95 data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            className
          )}
          {...props}
        />
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
