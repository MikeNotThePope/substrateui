import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Centered empty state container for when no content is available.
 *
 * @example
 * <Empty>
 *   <EmptyIcon><InboxIcon /></EmptyIcon>
 *   <EmptyTitle>No results</EmptyTitle>
 *   <EmptyDescription>Try adjusting your filters.</EmptyDescription>
 *   <EmptyAction><Button>Reset</Button></EmptyAction>
 * </Empty>
 */
function Empty({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6 text-center",
        className
      )}
      {...props}
    />
  )
}

/** Icon container displayed above the empty state title. */
function EmptyIcon({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="empty-icon"
      className={cn("text-muted-foreground mb-4 [&_svg]:size-12", className)}
      {...props}
    >
      {children}
    </div>
  )
}

/** Heading text for the empty state. */
function EmptyTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="empty-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

/** Muted description text below the empty state title. */
function EmptyDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="empty-description"
      className={cn(
        "text-sm text-muted-foreground max-w-sm mx-auto mt-1",
        className
      )}
      {...props}
    />
  )
}

/** Container for a call-to-action button in the empty state. */
function EmptyAction({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="empty-action"
      className={cn("mt-4", className)}
      {...props}
    />
  )
}

export { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyAction }
