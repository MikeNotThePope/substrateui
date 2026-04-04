import * as React from "react"

import { cn } from "@/lib/utils"

interface DividerProps extends React.ComponentPropsWithRef<"div"> {
  orientation?: "horizontal" | "vertical"
  label?: string
}

/**
 * Visual separator rendered as a horizontal rule, vertical line, or labeled divider.
 *
 * @example
 * <Divider />
 * <Divider label="OR" />
 * <Divider orientation="vertical" />
 *
 * @prop orientation - "horizontal" (default) or "vertical"
 * @prop label - Optional centered text within a horizontal divider
 */
function Divider({
  orientation = "horizontal",
  label,
  className,
  ref,
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        data-slot="divider"
        role="separator"
        aria-orientation="vertical"
        className={cn("border-l-2 border-border self-stretch", className)}
        ref={ref}
        {...props}
      />
    )
  }

  if (label) {
    return (
      <div
        data-slot="divider"
        role="separator"
        aria-orientation="horizontal"
        className={cn("flex items-center w-full", className)}
        ref={ref}
        {...props}
      >
        <div className="flex-1 border-t-2 border-border" />
        <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider px-3">
          {label}
        </span>
        <div className="flex-1 border-t-2 border-border" />
      </div>
    )
  }

  return (
    <hr
      data-slot="divider"
      className={cn("border-t-2 border-border w-full", className)}
      ref={ref as React.Ref<HTMLHRElement>}
      {...(props as React.ComponentPropsWithRef<"hr">)}
    />
  )
}

export { Divider, type DividerProps }
