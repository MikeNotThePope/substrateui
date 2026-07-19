"use client"

import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"

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
interface ClusterProps extends useRender.ComponentProps<"div"> {
  gap?: Gap
  align?: Align
  justify?: Justify
  wrap?: boolean
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
 * @prop render - Render a different element instead of a div, e.g. render={<section />}
 */
function Cluster({
  gap = "sm",
  align = "center",
  justify = "start",
  wrap = true,
  className,
  render,
  ...props
}: ClusterProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        "data-slot": "cluster",
        className: cn(
          "flex",
          gapMap[gap],
          alignMap[align],
          justifyMap[justify],
          wrap && "flex-wrap",
          className,
        ),
      },
      props
    ),
  })
}

export { Cluster, type ClusterProps }
