import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { badgeVariants } from "./badge-variants"

/** Props accepted by the Badge component. */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Small label used to highlight status, category, or metadata.
 *
 * @example
 * <Badge variant="success">Active</Badge>
 *
 * @prop variant - Visual style: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "error" | "info"
 * @prop size - "default", or "xs" for the tighter tag that sits inline with text
 */
function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div data-slot="badge" className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge }
