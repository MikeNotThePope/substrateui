import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Badge style variants (default, secondary, destructive, outline, success, warning, error). Use with cn(badgeVariants({...})) for non-div elements. */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 px-2.5 py-0.5 font-mono uppercase tracking-wider text-[11px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-status-success-surface text-status-success-text",
        warning:
          "border-transparent bg-status-warning-surface text-status-warning-text",
        error:
          "border-transparent bg-status-error-surface text-status-error-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

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
 * @prop variant - Visual style: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "error"
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
