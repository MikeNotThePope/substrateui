import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const gapMap = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
  "2xl": "gap-12",
} as const

const colsMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
} as const

type Gap = keyof typeof gapMap
type Columns = 1 | 2 | 3 | 4 | 5 | 6 | "auto-fill" | "auto-fit"

interface GridProps extends React.ComponentPropsWithRef<"div"> {
  columns?: Columns
  gap?: Gap
  minChildWidth?: string
  asChild?: boolean
}

/**
 * CSS Grid layout component with configurable columns, gap, and auto-fill/auto-fit modes.
 *
 * @example
 * <Grid columns={3} gap="lg"><Card /><Card /><Card /></Grid>
 * <Grid columns="auto-fill" minChildWidth="200px" gap="md">...</Grid>
 *
 * @prop columns - Number of columns (1-6) or "auto-fill"/"auto-fit"
 * @prop gap - Gap size between grid items
 * @prop minChildWidth - Minimum child width for auto-fill/auto-fit columns
 * @prop asChild - Merge props onto child element via Slot
 */
function Grid({
  columns = 1,
  gap = "md",
  minChildWidth,
  asChild = false,
  className,
  style,
  ref,
  ...props
}: GridProps) {
  const Comp = asChild ? Slot : "div"

  const isAuto = columns === "auto-fill" || columns === "auto-fit"
  const colClass = isAuto
    ? columns === "auto-fill"
      ? "grid-auto-fill"
      : "grid-auto-fit"
    : colsMap[columns]

  return (
    <Comp
      data-slot="grid"
      className={cn("grid", colClass, gapMap[gap], className)}
      style={
        isAuto && minChildWidth
          ? { "--grid-min": minChildWidth, ...style } as React.CSSProperties
          : style
      }
      ref={ref}
      {...props}
    />
  )
}

export { Grid, type GridProps }
