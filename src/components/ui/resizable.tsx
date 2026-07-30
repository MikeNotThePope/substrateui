"use client"

import { GripVertical } from "lucide-react"
import { Group, Panel, Separator } from "react-resizable-panels"

import { cn } from "@/lib/utils"

/**
 * A container that arranges resizable panels in a horizontal or vertical layout.
 *
 * The axis comes from `orientation`, and the Group sets its own `flex-direction`
 * inline to match — so nothing here needs to restate it.
 *
 * It also sets `height: 100%; width: 100%` inline, which beats any class. Size
 * the group by sizing its parent; a `h-48` passed here has no effect.
 *
 * @example
 * <div className="h-48">
 *   <ResizablePanelGroup orientation="horizontal">
 *     <ResizablePanel>Left</ResizablePanel>
 *     <ResizableHandle />
 *     <ResizablePanel>Right</ResizablePanel>
 *   </ResizablePanelGroup>
 * </div>
 */
const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof Group>) => (
  <Group className={className} {...props} />
)

/** A single resizable panel within a ResizablePanelGroup. */
const ResizablePanel = Panel

/**
 * A draggable handle between resizable panels for adjusting their sizes.
 *
 * @example
 * <ResizableHandle withHandle />
 *
 * @prop withHandle - Whether to show a visible grip icon on the handle.
 */
const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean
}) => (
  <Separator
    className={cn(
      // Keyed off the separator's own aria-orientation, which is the axis of
      // the *rule*, not of the group: side-by-side panels are divided by a
      // vertical line. Both cases are stated in full rather than one
      // overriding the other, so neither inherits a width or an inset meant
      // for the other axis.
      "group relative flex items-center justify-center bg-border transition-colors after:absolute hover:bg-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
      // A vertical rule: 1px wide, hit area widened along the inline axis.
      "aria-[orientation=vertical]:w-px aria-[orientation=vertical]:after:inset-y-0 aria-[orientation=vertical]:after:left-1/2 aria-[orientation=vertical]:after:w-1 aria-[orientation=vertical]:after:-translate-x-1/2",
      // A horizontal rule: 1px tall, hit area widened along the block axis.
      "aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:inset-x-0 aria-[orientation=horizontal]:after:top-1/2 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:-translate-y-1/2",
      className
    )}
    {...props}
  >
    {withHandle && (
      // The glyph is drawn vertical, so the pill turns to lie along a
      // horizontal rule. Read off the separator's own aria-orientation through
      // `group`, because the orientation comes from group context and this
      // component is never told it directly.
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border group-aria-[orientation=horizontal]:h-3 group-aria-[orientation=horizontal]:w-4">
        <GripVertical className="h-2.5 w-2.5 group-aria-[orientation=horizontal]:rotate-90" />
      </div>
    )}
  </Separator>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
