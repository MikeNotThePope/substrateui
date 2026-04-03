import * as React from "react"

import { cn } from "@/lib/utils"

const sizeMap = {
  none: "0px",
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
} as const

type Size = keyof typeof sizeMap

interface SpacerProps extends React.ComponentPropsWithRef<"div"> {
  size?: Size
  axis?: "horizontal" | "vertical"
}

function Spacer({
  size,
  axis = "vertical",
  className,
  style,
  ...props
}: SpacerProps) {
  if (size === undefined) {
    return (
      <div
        data-slot="spacer"
        className={cn("flex-1", className)}
        {...props}
      />
    )
  }

  const dimension = sizeMap[size]
  const sizeStyle =
    axis === "horizontal"
      ? { width: dimension, minWidth: dimension }
      : { height: dimension, minHeight: dimension }

  return (
    <div
      data-slot="spacer"
      className={className}
      style={{ ...sizeStyle, ...style }}
      {...props}
    />
  )
}

export { Spacer, type SpacerProps }
