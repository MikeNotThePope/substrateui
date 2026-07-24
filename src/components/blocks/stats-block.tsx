import * as React from "react"

import { cn } from "@/lib/utils"
import { Grid } from "@/components/ui/grid"
import { StatCard, type StatCardProps } from "@/components/stat-card"

/** A single metric rendered by {@link StatsBlock}. */
export interface StatItem
  extends Pick<StatCardProps, "title" | "value" | "change" | "changeType" | "icon"> {
  /** Stable key; falls back to `title` when omitted. */
  id?: string
}

/** Props for {@link StatsBlock}. */
export interface StatsBlockProps extends React.ComponentPropsWithRef<"section"> {
  /** The metrics to display. */
  stats: StatItem[]
  /** Minimum width per card before wrapping to a new row. @default "220px" */
  minCardWidth?: string
}

/**
 * A responsive row of key metrics — the dashboard header you paste at the top of
 * an analytics page. Auto-fits as many {@link StatCard}s per row as will fit,
 * wrapping on smaller screens without media queries.
 *
 * @example
 * <StatsBlock
 *   stats={[
 *     { title: "Revenue", value: "$48.2k", change: "+12%", changeType: "positive" },
 *     { title: "Active users", value: "2,340", change: "+3%", changeType: "positive" },
 *     { title: "Churn", value: "1.2%", change: "-0.4%", changeType: "negative" },
 *   ]}
 * />
 */
function StatsBlock({ stats, minCardWidth = "220px", className, ref, ...props }: StatsBlockProps) {
  return (
    <section ref={ref} data-slot="stats-block" className={cn(className)} {...props}>
      <Grid columns="auto-fit" minChildWidth={minCardWidth} gap="md">
        {stats.map((stat) => (
          <StatCard
            key={stat.id ?? stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
          />
        ))}
      </Grid>
    </section>
  )
}

export { StatsBlock }
