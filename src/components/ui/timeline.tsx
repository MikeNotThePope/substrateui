import * as React from "react"

import { cn } from "@/lib/utils"
import { overlineVariants } from "./overline-variants"

/**
 * Vertical timeline for chronological data — activity feeds, changelogs, order
 * tracking, audit logs. Compose with `TimelineItem` and its slots.
 *
 * @example
 * <Timeline>
 *   <TimelineItem>
 *     <TimelineDot />
 *     <TimelineTime>March 2026</TimelineTime>
 *     <TimelineTitle>Shipped v1.3</TimelineTitle>
 *     <TimelineBody>Blocks, CLI, and theme generator landed.</TimelineBody>
 *   </TimelineItem>
 * </Timeline>
 */
function Timeline({ className, ref, ...props }: React.ComponentPropsWithRef<"ol">) {
  return (
    <ol
      ref={ref}
      data-slot="timeline"
      className={cn("relative ms-3 border-s-2 border-border", className)}
      {...props}
    />
  )
}

/** A single event in a {@link Timeline}. */
function TimelineItem({ className, ref, ...props }: React.ComponentPropsWithRef<"li">) {
  return (
    <li
      ref={ref}
      data-slot="timeline-item"
      className={cn("mb-8 ms-6 last:mb-0", className)}
      {...props}
    />
  )
}

/** Props for {@link TimelineDot}. */
export interface TimelineDotProps extends React.ComponentPropsWithRef<"span"> {
  /** Optional icon rendered inside the marker instead of a solid dot. */
  icon?: React.ComponentType<{ className?: string }>
}

/**
 * The marker sitting on the timeline's rail. Renders a solid dot by default, or
 * an icon in a ringed badge when `icon` is provided.
 */
function TimelineDot({ className, icon: Icon, ref, ...props }: TimelineDotProps) {
  return (
    <span
      ref={ref}
      data-slot="timeline-dot"
      aria-hidden="true"
      className={cn(
        "absolute -start-[9px] mt-1.5 flex size-4 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground [&_svg]:size-2.5",
        Icon &&
          "-start-3 size-6 bg-accent text-accent-foreground [&_svg]:size-3.5",
        className
      )}
      {...props}
    >
      {Icon && <Icon />}
    </span>
  )
}

/** Timestamp line for a {@link TimelineItem}. */
function TimelineTime({ className, ref, ...props }: React.ComponentPropsWithRef<"time">) {
  return (
    <time
      ref={ref}
      data-slot="timeline-time"
      className={cn(
        "mb-1 block",
        overlineVariants(),
        className
      )}
      {...props}
    />
  )
}

/** Heading for a {@link TimelineItem}. */
function TimelineTitle({ className, ref, ...props }: React.ComponentPropsWithRef<"h3">) {
  return (
    <h3
      ref={ref}
      data-slot="timeline-title"
      className={cn("text-base font-semibold text-foreground", className)}
      {...props}
    />
  )
}

/** Body copy for a {@link TimelineItem}. */
function TimelineBody({ className, ref, ...props }: React.ComponentPropsWithRef<"p">) {
  return (
    <p
      ref={ref}
      data-slot="timeline-body"
      className={cn("mt-1 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Timeline, TimelineItem, TimelineDot, TimelineTime, TimelineTitle, TimelineBody }
