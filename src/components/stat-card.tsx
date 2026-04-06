import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by StatCard. All keys have English defaults. */
interface StatCardLabels {
  increase?: (change: string) => string
  decrease?: (change: string) => string
  change?: (change: string) => string
}

const defaultStatCardLabels: Required<StatCardLabels> = {
  increase: (change) => `Increase of ${change}`,
  decrease: (change) => `Decrease of ${change}`,
  change: (change) => `Change of ${change}`,
}

/** Props for StatCard including title, value, and optional change indicator. */
interface StatCardProps extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ComponentType<{ className?: string }>
  labels?: StatCardLabels
}

/** Color map for stat change indicators keyed by sentiment. */
const changeTypeStyles = {
  positive: "text-status-success-text",
  negative: "text-status-error-text",
  neutral: "text-muted-foreground",
} as const

/** Glyph indicators keyed by sentiment. */
const changeTypeGlyphs = {
  positive: "▲",
  negative: "▼",
  neutral: "•",
} as const

/** Maps changeType to the corresponding label function key. */
const changeTypeLabelKeys = {
  positive: "increase",
  negative: "decrease",
  neutral: "change",
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
  labels: labelsProp,
  ref,
  ...props
}: StatCardProps) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultStatCardLabels, ctx.statCard, labelsProp)

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
                <span aria-hidden="true">{changeTypeGlyphs[changeType]} </span>
                <span className="sr-only">{labels[changeTypeLabelKeys[changeType]](change)} </span>
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

export { StatCard, type StatCardProps, type StatCardLabels }
