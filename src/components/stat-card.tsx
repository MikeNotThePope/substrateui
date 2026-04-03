import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon?: React.ComponentType<{ className?: string }>
}

const changeTypeStyles = {
  positive: "text-status-success-text",
  negative: "text-status-error-text",
  neutral: "text-muted-foreground",
} as const

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
