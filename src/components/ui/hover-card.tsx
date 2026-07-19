"use client"

import * as React from "react"
import { PreviewCard as HoverCardPrimitive } from "@base-ui/react/preview-card"

import { cn } from "@/lib/utils"

/** Root hover card component that manages open/close state on hover. */
const HoverCard = HoverCardPrimitive.Root

/**
 * Element that triggers the hover card on mouse enter. Accepts Base UI's
 * `delay`/`closeDelay` props to control open/close timing.
 */
const HoverCardTrigger = HoverCardPrimitive.Trigger

/**
 * Animated popover panel that appears on hover over the trigger.
 *
 * @example
 * <HoverCard>
 *   <HoverCardTrigger>Hover me</HoverCardTrigger>
 *   <HoverCardContent>Details here</HoverCardContent>
 * </HoverCard>
 */
function HoverCardContent({
  className,
  align = "center",
  alignOffset,
  side,
  sideOffset = 4,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof HoverCardPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof HoverCardPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="z-50"
      >
        <HoverCardPrimitive.Popup
          ref={ref}
          data-slot="hover-card-content"
          className={cn(
            "w-64 rounded-lg border-2 bg-popover p-4 text-popover-foreground shadow-hard outline-none data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            className
          )}
          {...props}
        />
      </HoverCardPrimitive.Positioner>
    </HoverCardPrimitive.Portal>
  )
}

export { HoverCard, HoverCardTrigger, HoverCardContent }
