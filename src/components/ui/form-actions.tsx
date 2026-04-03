import * as React from "react"

import { cn } from "@/lib/utils"
import { Cluster } from "./cluster"

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
      ((child.type as Function).name === "FormActionsPrimary" ||
        (child.type as Function).name === "FormActionsSecondary")
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
