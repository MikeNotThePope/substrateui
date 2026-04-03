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

interface ClusterProps extends React.ComponentPropsWithRef<"div"> {
  gap?: Gap
  align?: Align
  justify?: Justify
  wrap?: boolean
  asChild?: boolean
}

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
