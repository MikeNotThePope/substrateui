"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by Pagination. All keys have English defaults. */
interface PaginationLabels {
  pagination?: string
  previous?: string
  next?: string
  morePages?: string
}

const defaultPaginationLabels: Required<PaginationLabels> = {
  pagination: "pagination",
  previous: "Previous",
  next: "Next",
  morePages: "More pages",
}

/**
 * Navigation container for paginated content.
 *
 * @example
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
 *     <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
 *     <PaginationItem><PaginationNext href="#" /></PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 */
function Pagination({
  className,
  "aria-label": ariaLabel,
  labels: labelsProp,
  ...props
}: React.ComponentProps<"nav"> & { labels?: PaginationLabels }) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultPaginationLabels, ctx.pagination, labelsProp)

  return (
    <nav
      role="navigation"
      aria-label={ariaLabel ?? labels.pagination}
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

/** Flex row container for pagination items. */
function PaginationContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"ul">) {
  return (
    <ul
      ref={ref}
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

/** List item wrapper for a single pagination element. */
function PaginationItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"li">) {
  return (
    <li ref={ref} data-slot="pagination-item" className={cn("", className)} {...props} />
  )
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

/**
 * Styled anchor for an individual page number.
 *
 * @prop isActive - Highlights the link as the current page.
 * @prop size - Button size variant, defaults to "icon".
 */
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

/** "Previous" pagination link with a left chevron icon. */
function PaginationPrevious({
  className,
  label,
  labels: labelsProp,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  /** Visible text label. @default "Previous" */
  label?: string
  labels?: PaginationLabels
}) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultPaginationLabels, ctx.pagination, labelsProp)
  const resolvedLabel = label ?? labels.previous

  return (
    <PaginationLink
      aria-label={props["aria-label"] ?? resolvedLabel}
      size="default"
      data-slot="pagination-previous"
      className={cn("gap-1 ps-2.5", className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>{resolvedLabel}</span>
    </PaginationLink>
  )
}

/** "Next" pagination link with a right chevron icon. */
function PaginationNext({
  className,
  label,
  labels: labelsProp,
  ...props
}: React.ComponentProps<typeof PaginationLink> & {
  /** Visible text label. @default "Next" */
  label?: string
  labels?: PaginationLabels
}) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultPaginationLabels, ctx.pagination, labelsProp)
  const resolvedLabel = label ?? labels.next

  return (
    <PaginationLink
      aria-label={props["aria-label"] ?? resolvedLabel}
      size="default"
      data-slot="pagination-next"
      className={cn("gap-1 pe-2.5", className)}
      {...props}
    >
      <span>{resolvedLabel}</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  )
}

/** Ellipsis indicator representing omitted page numbers. */
function PaginationEllipsis({
  className,
  label,
  labels: labelsProp,
  ...props
}: React.ComponentProps<"span"> & {
  /** Screen-reader text for the ellipsis. @default "More pages" */
  label?: string
  labels?: PaginationLabels
}) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultPaginationLabels, ctx.pagination, labelsProp)
  const resolvedLabel = label ?? labels.morePages
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex h-9 w-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">{resolvedLabel}</span>
    </span>
  )
}

export {
  type PaginationLabels,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
