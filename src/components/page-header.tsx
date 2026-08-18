"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Stack } from "@/components/ui/stack"

/** How much room the header takes, and therefore how its children lay out. */
type PageHeaderSize = "default" | "sm"

/**
 * The size flows to `PageHeaderTitle` and `PageHeaderActions` so a caller sets it
 * once. Same shape as `ToggleGroup`, and the reason this file carries
 * `"use client"` — `Stack` already does, so the bundle cost is nil.
 */
const PageHeaderSizeContext = React.createContext<PageHeaderSize>("default")

/** Props accepted by the PageHeader component. */
interface PageHeaderProps extends React.ComponentPropsWithRef<"header"> {
  /** `default` is a full band; `sm` is a compact single-row bar. */
  size?: PageHeaderSize
}

/** Page-level header with a bottom border and a stacked layout.
 *
 * `default` is a band: card background, generous padding, children stacked so a
 * breadcrumb, a title block and its actions each get a row.
 *
 * `size="sm"` is the bar an app shell wants above a working page — one row, no
 * background of its own, a title that sits beside its status rather than over
 * it. Children lay out inline, so a back button, the title and a badge are
 * siblings; `PageHeaderActions` moves itself to the far end.
 *
 * @example
 * <PageHeader><PageHeaderContent><PageHeaderTitle>Dashboard</PageHeaderTitle></PageHeaderContent></PageHeader>
 *
 * @example
 * <PageHeader size="sm">
 *   <PageHeaderTitle>Senior engineer</PageHeaderTitle>
 *   <Badge>Published</Badge>
 *   <PageHeaderActions><Button>Edit</Button></PageHeaderActions>
 * </PageHeader>
 *
 * @prop size - `default` (band) or `sm` (compact bar).
 */
function PageHeader({
  className,
  size = "default",
  children,
  ref,
  ...props
}: PageHeaderProps) {
  return (
    <PageHeaderSizeContext.Provider value={size}>
      <header
        ref={ref}
        data-slot="page-header"
        data-size={size}
        className={cn(
          "border-b-2",
          size === "sm"
            ? "flex items-center gap-3 px-6 py-3"
            : "bg-card px-6 py-6",
          className
        )}
        {...props}
      >
        {size === "sm" ? children : <Stack gap="md">{children}</Stack>}
      </header>
    </PageHeaderSizeContext.Provider>
  )
}

/** Container for breadcrumb navigation above the page title. */
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

/** Flex row that spaces the title area and actions apart responsively. */
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

/** Primary page heading rendered as a bold h1. */
function PageHeaderTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"h1">) {
  const size = React.useContext(PageHeaderSizeContext)

  return (
    <h1
      ref={ref}
      data-slot="page-header-title"
      className={cn(
        size === "sm" ? "text-xl" : "text-2xl",
        "font-bold tracking-tight",
        className,
      )}
      {...props}
    />
  )
}

/** Short muted description text displayed below the page title. */
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

/** Container for action buttons aligned to the end of the header. */
function PageHeaderActions({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  const size = React.useContext(PageHeaderSizeContext)

  return (
    <div
      ref={ref}
      data-slot="page-header-actions"
      // In a band the actions are the second child of a justify-between row, so
      // they are already at the end. In a bar they are one sibling among
      // several and have to claim the space themselves.
      className={cn(
        "flex items-center gap-2 shrink-0",
        size === "sm" && "ms-auto",
        className,
      )}
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
