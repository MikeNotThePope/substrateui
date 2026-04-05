import * as React from "react"

import { cn } from "@/lib/utils"
import { Cluster } from "./cluster"

/**
 * Horizontal action bar for form submit/cancel buttons, separated by a top border.
 *
 * @example
 * <FormActions>
 *   <Button variant="outline">Cancel</Button>
 *   <Button>Save</Button>
 * </FormActions>
 */
function FormActions({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const childArray = React.Children.toArray(children)
  const hasSubComponents = childArray.some(
    (child) =>
      React.isValidElement(child) &&
      typeof child.type === "function" &&
      ((child.type as { name?: string }).name === "FormActionsPrimary" ||
        (child.type as { name?: string }).name === "FormActionsSecondary")
  )

  if (!hasSubComponents) {
    return (
      <div
        data-slot="form-actions"
        className={cn(
          "flex items-center justify-between border-t-2 pt-6 mt-6",
          className
        )}
        {...props}
      >
        <Cluster gap="sm" justify="end" className="ml-auto">
          {children}
        </Cluster>
      </div>
    )
  }

  return (
    <div
      data-slot="form-actions"
      className={cn(
        "flex items-center justify-between border-t-2 pt-6 mt-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/** Left-aligned container for secondary form actions (e.g., delete or reset). */
function FormActionsSecondary({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="form-actions-secondary"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

/** Right-aligned container for primary form actions (e.g., submit). */
function FormActionsPrimary({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="form-actions-primary"
      className={cn("flex items-center gap-2 ml-auto", className)}
      {...props}
    />
  )
}

export { FormActions, FormActionsSecondary, FormActionsPrimary }
