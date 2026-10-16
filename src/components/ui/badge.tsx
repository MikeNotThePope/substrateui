import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { badgeVariants } from "./badge-variants"

/** Props accepted by the Badge component. */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Whether a theme that marks states with a dot draws one. Caldera does, on
   * every variant; the others draw none either way. Pass `false` for a badge
   * that is not a state, such as a job's detail chip.
   */
  dot?: boolean
}

/**
 * Small label used to highlight status, category, or metadata.
 *
 * @example
 * <Badge variant="success">Active</Badge>
 *
 * @prop variant - Visual style: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "error" | "info"
 * @prop size - "default", or "xs" for the tighter tag that sits inline with text
 * @prop dot - `false` for a badge that is not a state: no dot in Caldera
 */
function Badge({ className, variant, size, dot = true, ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      // Only the opt-out is written, so a badge that never heard of the prop
      // keeps its dot.
      data-dot={dot ? undefined : "false"}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge }
