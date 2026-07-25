import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineTime,
  TimelineTitle,
  TimelineBody,
} from "@/components/ui/timeline"

/** A single event rendered by {@link ActivityFeedBlock}. */
export interface ActivityItem {
  /** Stable key; falls back to the index when omitted. */
  id?: string
  /** Optional icon marker (e.g. a lucide icon). */
  icon?: React.ComponentType<{ className?: string }>
  time?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
}

/** Props for {@link ActivityFeedBlock}. */
export interface ActivityFeedBlockProps
  extends Omit<React.ComponentPropsWithRef<"section">, "title"> {
  /** Card heading. @default "Recent activity" */
  title?: React.ReactNode
  items: ActivityItem[]
}

/**
 * A dashboard activity feed — a card wrapping a {@link Timeline} of recent
 * events. Drop it into a sidebar or dashboard column to surface audit logs,
 * notifications, or status changes.
 *
 * @example
 * <ActivityFeedBlock
 *   items={[
 *     { icon: GitCommit, time: "2h ago", title: "Deploy succeeded", description: "v1.3.0 is live." },
 *   ]}
 * />
 */
function ActivityFeedBlock({
  title = "Recent activity",
  items,
  className,
  ref,
  ...props
}: ActivityFeedBlockProps) {
  return (
    <section ref={ref} data-slot="activity-feed-block" className={cn(className)} {...props}>
      <Card>
        {title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent>
          <Timeline>
            {items.map((item, i) => (
              <TimelineItem key={item.id ?? i}>
                <TimelineDot icon={item.icon} />
                {item.time && <TimelineTime>{item.time}</TimelineTime>}
                <TimelineTitle className="text-sm">{item.title}</TimelineTitle>
                {item.description && <TimelineBody>{item.description}</TimelineBody>}
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Card>
    </section>
  )
}

export { ActivityFeedBlock }
