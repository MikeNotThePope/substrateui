"use client"

import * as React from "react"
import { PreviewCard as HoverCardPrimitive } from "@base-ui/react/preview-card"

import { asChildRender } from "@/lib/as-child"
import { cn } from "@/lib/utils"

const HoverCardDelayContext = React.createContext<{
  delay?: number
  closeDelay?: number
}>({})

/**
 * Root hover card component that manages open/close state on hover. Accepts
 * `openDelay`/`closeDelay` (translated to Base UI's `delay`/`closeDelay`,
 * which live on the trigger).
 */
function HoverCard({
  openDelay,
  closeDelay,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Root> & {
  openDelay?: number
  closeDelay?: number
}) {
  const delays = React.useMemo(
    () => ({ delay: openDelay, closeDelay }),
    [openDelay, closeDelay]
  )
  return (
    <HoverCardDelayContext.Provider value={delays}>
      <HoverCardPrimitive.Root {...props} />
    </HoverCardDelayContext.Provider>
  )
}

/** Element that triggers the hover card on mouse enter. */
function HoverCardTrigger({
  asChild,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof HoverCardPrimitive.Trigger> & {
  asChild?: boolean
}) {
  const { delay, closeDelay } = React.useContext(HoverCardDelayContext)
  return (
    <HoverCardPrimitive.Trigger
      delay={delay}
      closeDelay={closeDelay}
      {...asChildRender(asChild, children)}
      {...props}
    />
  )
}

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
