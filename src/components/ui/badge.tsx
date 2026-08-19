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
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }
