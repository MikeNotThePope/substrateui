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
  stretch: "items-stretch",
} as const

type Gap = keyof typeof gapMap
type Align = keyof typeof alignMap

interface StackProps extends React.ComponentPropsWithRef<"div"> {
  gap?: Gap
  align?: Align
  asChild?: boolean
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
 * @prop asChild - Merge props onto the child element instead of rendering a div.
 */
function Stack({
  gap = "md",
  align = "stretch",
  asChild = false,
  className,
  ref,
  ...props
}: StackProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="stack"
      className={cn("flex flex-col", gapMap[gap], alignMap[align], className)}
      ref={ref}
      {...props}
    />
  )
}

export { Stack, type StackProps }
