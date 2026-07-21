"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"
import { withAsChild } from "@/lib/slot"

/** Root popover component that manages open/close state. */
const Popover = PopoverPrimitive.Root

/** Element that toggles the popover open and closed. */
const PopoverTrigger = withAsChild(PopoverPrimitive.Trigger)

/**
 * Animated floating content panel displayed when a popover is open.
 *
 * @example
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Content here</PopoverContent>
 * </Popover>
 */
function PopoverContent({
  className,
  side,
  align = "center",
  sideOffset = 4,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof PopoverPrimitive.Popup> &
  Pick<
    React.ComponentPropsWithRef<typeof PopoverPrimitive.Positioner>,
    "side" | "align" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50"
      >
        <PopoverPrimitive.Popup
          ref={ref}
          data-slot="popover-content"
          className={cn(
            "w-72 rounded-lg border-2 bg-popover p-4 text-popover-foreground shadow-hard outline-none data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverTrigger, PopoverContent }
