"use client"

import * as React from "react"
import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"

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
        "flex w-full flex-col items-center justify-center py-12 px-6 text-center",
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

/** Props accepted by EmptyTitle. */
export type EmptyTitleProps = useRender.ComponentProps<"h3">

/**
 * Heading text for the empty state.
 *
 * Defaults to an `h3`, which is right when the empty state sits inside a page
 * that already has a heading above it. It often doesn't: a 404, an error screen
 * or a "nothing here yet" page has the empty state as its entire content, and
 * the title is that document's `h1`. `render` moves it without giving up the
 * styling, so the outline matches the page instead of the component.
 *
 * @example
 * <EmptyTitle>No results</EmptyTitle>
 * <EmptyTitle render={<h1 />}>This job isn't accepting applications</EmptyTitle>
 */
function EmptyTitle({ className, render, ...props }: EmptyTitleProps) {
  return useRender({
    defaultTagName: "h3",
    render,
    props: mergeProps<"h3">(
      {
        className: cn("text-lg font-semibold", className),
        "data-slot": "empty-title",
      } as useRender.ElementProps<"h3">,
      props
    ),
  })
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
