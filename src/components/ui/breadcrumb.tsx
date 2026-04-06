"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by Breadcrumb. All keys have English defaults. */
interface BreadcrumbLabels {
  breadcrumb?: string
  more?: string
}

const defaultBreadcrumbLabels: Required<BreadcrumbLabels> = {
  breadcrumb: "breadcrumb",
  more: "More",
}

/**
 * Navigation component showing the user's location in a page hierarchy.
 *
 * @example
 * <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem></BreadcrumbList></Breadcrumb>
 */
function Breadcrumb({
  ref,
  "aria-label": ariaLabel,
  labels: labelsProp,
  ...props
}: React.ComponentPropsWithRef<"nav"> & {
  separator?: React.ReactNode
  labels?: BreadcrumbLabels
}) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultBreadcrumbLabels, ctx.breadcrumb, labelsProp)

  return <nav ref={ref} aria-label={ariaLabel ?? labels.breadcrumb} data-slot="breadcrumb" {...props} />
}

/** Ordered list container for breadcrumb items. */
function BreadcrumbList({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"ol">) {
  return (
    <ol
      ref={ref}
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
}

/** Individual breadcrumb entry wrapping a link or page indicator. */
function BreadcrumbItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"li">) {
  return (
    <li
      ref={ref}
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

/** Clickable link within a breadcrumb item; supports asChild for custom link components. */
function BreadcrumbLink({
  asChild,
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-slot="breadcrumb-link"
      className={cn("text-muted-foreground transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
}

/** Non-interactive label representing the current page in the breadcrumb trail. */
function BreadcrumbPage({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"span">) {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      data-slot="breadcrumb-page"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

/** Visual divider between breadcrumb items; defaults to a chevron icon. */
function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-separator"
      className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

/** Ellipsis indicator used when breadcrumb items are collapsed. */
function BreadcrumbEllipsis({
  className,
  label,
  labels: labelsProp,
  ...props
}: React.ComponentProps<"span"> & {
  /** Screen-reader text for the ellipsis. @default "More" */
  label?: string
  labels?: BreadcrumbLabels
}) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultBreadcrumbLabels, ctx.breadcrumb, labelsProp)
  const resolvedLabel = label ?? labels.more
  return (
    <span
      role="presentation"
      aria-hidden="true"
      data-slot="breadcrumb-ellipsis"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">{resolvedLabel}</span>
    </span>
  )
}

export {
  type BreadcrumbLabels,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
