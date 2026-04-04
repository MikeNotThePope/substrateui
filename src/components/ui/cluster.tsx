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

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  baseline: "items-baseline",
} as const

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
} as const

type Gap = keyof typeof gapMap
type Align = keyof typeof alignMap
type Justify = keyof typeof justifyMap

/** Props accepted by the Cluster component. */
interface ClusterProps extends React.ComponentPropsWithRef<"div"> {
  gap?: Gap
  align?: Align
  justify?: Justify
  wrap?: boolean
  asChild?: boolean
}

/**
 * Flexbox layout primitive for horizontal grouping with configurable gap, alignment, and wrapping.
 *
 * @example
 * <Cluster gap="md" justify="between"><Badge>A</Badge><Badge>B</Badge></Cluster>
 *
 * @prop gap - Spacing between items: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
 * @prop align - Cross-axis alignment: "start" | "center" | "end" | "baseline"
 * @prop justify - Main-axis justification: "start" | "center" | "end" | "between"
 * @prop wrap - Enable flex-wrap (default true)
 * @prop asChild - Merge props onto child element instead of rendering a div
 */
function Cluster({
  gap = "sm",
  align = "center",
  justify = "start",
  wrap = true,
  asChild = false,
  className,
  ref,
  ...props
}: ClusterProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="cluster"
      className={cn(
        "flex",
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        wrap && "flex-wrap",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}

export { Cluster, type ClusterProps }
