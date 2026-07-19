"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/** Global tooltip configuration provider (delay, skip-delay, etc.). */
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
  sideOffset = 4,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      data-slot="tooltip-content"
      className={cn(
        "z-50 overflow-hidden rounded-md border-2 border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-hard-sm animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
        className
      )}
      {...props}
    />
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
