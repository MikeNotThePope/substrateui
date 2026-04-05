import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

/** Props for StatCard including title, value, and optional change indicator. */
interface StatCardProps extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ComponentType<{ className?: string }>
}

/** Color map for stat change indicators keyed by sentiment. */
const changeTypeStyles = {
  positive: "text-status-success-text",
  negative: "text-status-error-text",
  neutral: "text-muted-foreground",
} as const

/** Non-color sentiment indicators (prefixed glyphs + screen-reader text). */
const changeTypeIndicators = {
  positive: { glyph: "▲", label: "Increase of" },
  negative: { glyph: "▼", label: "Decrease of" },
  neutral: { glyph: "•", label: "Change of" },
} as const

/** Card displaying a key metric with title, value, optional change badge, and icon.
 *
 * @example
 * <StatCard title="Revenue" value="$12,345" change="+12%" changeType="positive" />
 *
 * @prop title - Metric label displayed in uppercase monospace.
 * @prop value - Primary numeric or text value.
 * @prop change - Optional change indicator text (e.g. "+5%").
 * @prop changeType - Color coding: "positive", "negative", or "neutral".
 * @prop icon - Optional icon component displayed at top-right.
 */
function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  className,
  ref,
  ...props
}: StatCardProps) {
  return (
    <Card ref={ref} data-slot="stat-card" className={className} {...props}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground font-mono uppercase tracking-wider">
              {title}
            </p>
            <p className="text-3xl font-bold tracking-tight mt-1">{value}</p>
            {change && (
              <p className={cn("text-xs font-mono mt-1", changeTypeStyles[changeType])}>
                <span aria-hidden="true">{changeTypeIndicators[changeType].glyph} </span>
                <span className="sr-only">{changeTypeIndicators[changeType].label} </span>
                {change}
              </p>
            )}
          </div>
          {Icon && <Icon className="text-muted-foreground size-5" />}
        </div>
      </CardContent>
    </Card>
  )
}

export { StatCard, type StatCardProps }
