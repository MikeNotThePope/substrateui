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
  stretch: "items-stretch",
} as const

type Gap = keyof typeof gapMap
type Align = keyof typeof alignMap

interface StackProps extends useRender.ComponentProps<"div"> {
  gap?: Gap
  align?: Align
}

/**
 * A vertical flex container with configurable gap and alignment.
 *
 * @example
 * <Stack gap="lg" align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Stack>
 *
 * @prop gap - The spacing between children (none, xs, sm, md, lg, xl, 2xl).
 * @prop align - Cross-axis alignment of children.
 * @prop render - Render a different element instead of a div, e.g. render={<section />}.
 */
function Stack({
  gap = "md",
  align = "stretch",
  className,
  render,
  ...props
}: StackProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        "data-slot": "stack",
        className: cn("flex flex-col", gapMap[gap], alignMap[align], className),
      },
      props
    ),
  })
}

export { Stack, type StackProps }
