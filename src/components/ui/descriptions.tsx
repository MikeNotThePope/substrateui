"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/** A single field in a {@link Descriptions} grid. */
export interface DescriptionsItem {
  /** Stable key for the field. Falls back to the array index. */
  key?: React.Key
  /** The field name shown as the label. */
  label: React.ReactNode
  /** The field value. */
  children: React.ReactNode
  /** How many columns this field spans (clamped to `columns`). Default `1`. */
  span?: number
  /** Extra classes on this field's cell. */
  className?: string
}

/** Props for {@link Descriptions}. */
export interface DescriptionsProps
  extends Omit<React.ComponentPropsWithRef<"div">, "title"> {
  /** Heading shown above the grid. */
  title?: React.ReactNode
  /** Content aligned opposite the title (actions, status, etc.). */
  extra?: React.ReactNode
  /** The fields to render. */
  items: DescriptionsItem[]
  /** Columns per row on `sm` and up (mobile is always one). Default `3`. */
  columns?: number
  /** Draw grid lines and give labels a tinted cell. Default `false`. */
  bordered?: boolean
  /** `"horizontal"` puts the label beside the value, `"vertical"` above it. Default `"horizontal"`. */
  layout?: "horizontal" | "vertical"
  /** Cell size. Default `"md"`. */
  size?: "sm" | "md"
}

/**
 * A read-only grid of label/value fields — the detail view for records,
 * settings, and summaries. Data-driven via `items`; each field can span
 * multiple columns.
 *
 * @example
 * <Descriptions
 *   title="Order #1024"
 *   bordered
 *   items={[
 *     { label: "Customer", children: "Ada Lovelace" },
 *     { label: "Status", children: <Badge>Shipped</Badge> },
 *     { label: "Address", span: 2, children: "12 Analytical Way" },
 *   ]}
 * />
 */
function Descriptions({
  title,
  extra,
  items,
  columns = 3,
  bordered = false,
  layout = "horizontal",
  size = "md",
  className,
  ref,
  ...props
}: DescriptionsProps) {
  const vertical = layout === "vertical"
  const pad = size === "sm" ? "px-3 py-2" : "px-4 py-3"

  return (
    <div
      ref={ref}
      data-slot="descriptions"
      className={cn("w-full", className)}
      {...props}
    >
      {(title || extra) && (
        <div className="mb-3 flex items-center justify-between gap-4">
          {title && (
            <div className="text-base font-semibold text-foreground">{title}</div>
          )}
          {extra && <div className="text-sm text-muted-foreground">{extra}</div>}
        </div>
      )}

      <dl
        data-slot="descriptions-grid"
        style={{ "--desc-cols": columns } as React.CSSProperties}
        className={cn(
          "grid grid-cols-1 sm:grid-cols-[repeat(var(--desc-cols),minmax(0,1fr))]",
          bordered
            ? "gap-px overflow-hidden rounded-lg border-2 border-border bg-border"
            : "gap-x-8 gap-y-4"
        )}
      >
        {items.map((item, i) => {
          const span = Math.max(1, Math.min(item.span ?? 1, columns))
          return (
            <div
              key={item.key ?? i}
              data-slot="descriptions-item"
              style={{ gridColumn: `span ${span} / span ${span}` }}
              className={cn(
                bordered && "bg-background",
                bordered
                  ? vertical
                    ? pad
                    : "flex flex-col sm:flex-row"
                  : vertical
                    ? "flex flex-col gap-1"
                    : "flex flex-col gap-1 sm:flex-row sm:gap-3",
                item.className
              )}
            >
              <dt
                data-slot="descriptions-label"
                className={cn(
                  "text-sm font-medium text-muted-foreground",
                  bordered &&
                    !vertical &&
                    cn(pad, "bg-muted sm:w-40 sm:shrink-0 sm:border-e-2 sm:border-border"),
                  bordered && vertical && "mb-1"
                )}
              >
                {item.label}
              </dt>
              <dd
                data-slot="descriptions-value"
                className={cn(
                  "min-w-0 text-sm text-foreground",
                  bordered && !vertical && cn(pad, "flex-1")
                )}
              >
                {item.children}
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}

export { Descriptions }
