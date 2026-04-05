import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Alert style variants (default, destructive, success, warning). Use with cn(alertVariants({...})) for non-div elements. */
const alertVariants = cva(
  "relative w-full rounded-lg border-2 p-4 [&>svg~*]:ps-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:start-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-status-error bg-status-error-surface text-status-error-text [&>svg]:text-status-error-text",
        success:
          "border-status-success bg-status-success-surface text-status-success-text [&>svg]:text-status-success-text",
        warning:
          "border-status-warning bg-status-warning-surface text-status-warning-text [&>svg]:text-status-warning-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Displays a callout message to attract user attention.
 *
 * @example
 * <Alert variant="destructive"><AlertTitle>Error</AlertTitle></Alert>
 *
 * @prop variant - Visual style: "default" | "destructive" | "success" | "warning"
 */
function Alert({
  className,
  variant,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      ref={ref}
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

/** Heading rendered inside an Alert. */
function AlertTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"h5">) {
  return (
    <h5
      ref={ref}
      data-slot="alert-title"
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
}

/** Body text rendered inside an Alert. */
function AlertDescription({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
