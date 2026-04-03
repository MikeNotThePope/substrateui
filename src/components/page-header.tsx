import * as React from "react"

import { cn } from "@/lib/utils"
import { Stack } from "@/components/ui/stack"

function PageHeader({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"header">) {
  return (
    <header
      ref={ref}
      data-slot="page-header"
      className={cn("border-b-2 bg-card px-6 py-6", className)}
    >
      <Stack gap="md" {...props} />
    </header>
  )
}

function PageHeaderBreadcrumb({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="page-header-breadcrumb"
      className={className}
      {...props}
    />
  )
}

function PageHeaderContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="page-header-content"
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        className,
      )}
      {...props}
    />
  )
}

function PageHeaderTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"h1">) {
  return (
    <h1
      ref={ref}
      data-slot="page-header-title"
      className={cn("text-2xl font-bold tracking-tight", className)}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"p">) {
  return (
    <p
      ref={ref}
      data-slot="page-header-description"
      className={cn("text-sm text-muted-foreground mt-1", className)}
      {...props}
    />
  )
}

function PageHeaderActions({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="page-header-actions"
      className={cn("flex items-center gap-2 shrink-0", className)}
      {...props}
    />
  )
}

export {
  PageHeader,
  PageHeaderBreadcrumb,
  PageHeaderContent,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
}
