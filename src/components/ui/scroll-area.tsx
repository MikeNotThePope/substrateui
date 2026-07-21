"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"

import { cn } from "@/lib/utils"

/**
 * A scrollable area with custom styled scrollbars.
 *
 * @example
 * <ScrollArea className="h-72">
 *   <div>Scrollable content</div>
 * </ScrollArea>
 */
function ScrollArea({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      data-slot="scroll-area"
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

/** A styled scrollbar track and thumb, used internally by ScrollArea. */
function ScrollBar({
  className,
  orientation = "vertical",
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      orientation={orientation}
      data-slot="scroll-bar"
      className={cn(
        "flex touch-none select-none opacity-0 transition-[colors,opacity] data-hovering:opacity-100 data-scrolling:opacity-100",
        orientation === "vertical" &&
          "h-full w-2.5 border-s border-s-transparent p-[1px]",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border hover:bg-muted-foreground" />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
