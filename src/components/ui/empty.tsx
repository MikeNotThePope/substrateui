"use client"

import * as React from "react"
import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"

import { cn } from "@/lib/utils"

/** Props accepted by the Empty component. */
export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Claim the height the parent offers, so the state sits in the middle of it. */
  fill?: boolean
}

/**
 * Centered empty state container for when no content is available.
 *
 * By default it is only as tall as its own content, which is right for an empty
 * table or a filtered list with nothing in it — the state sits where the rows
 * would have been.
 *
 * `fill` is for the other case: a 404, an error screen, or a "nothing here yet"
 * page where the empty state *is* the page and belongs in the middle of it.
 * Without it, consumers wrap this in `flex flex-1 items-center justify-center`
 * to get the same result, which is a five-class incantation repeated once per
 * such page. Needs a parent that offers height — a flex column, or anything
 * with a height of its own.
 *
 * @example
 * <Empty>
 *   <EmptyIcon><InboxIcon /></EmptyIcon>
 *   <EmptyTitle>No results</EmptyTitle>
 *   <EmptyDescription>Try adjusting your filters.</EmptyDescription>
 *   <EmptyAction><Button>Reset</Button></EmptyAction>
 * </Empty>
 *
 * @example
 * <Empty fill className="max-w-lg">
 *   <EmptyIcon><CircleAlert /></EmptyIcon>
 *   <EmptyTitle level={1}>This page isn&apos;t available</EmptyTitle>
 * </Empty>
 *
 * @prop fill - Grow to the parent's height and centre within it.
 */
function Empty({ className, fill, ...props }: EmptyProps) {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex w-full flex-col items-center justify-center py-12 px-6 text-center",
        // `mx-auto` as well as `flex-1`: a caller that also sets a max-width is
        // a stretch-aligned child of a flex column, which pins it to the start
        // edge rather than centring it.
        fill && "mx-auto flex-1",
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
export interface EmptyTitleProps extends useRender.ComponentProps<"h3"> {
  /** Which heading this is in the document outline. Defaults to 3. */
  level?: 1 | 2 | 3 | 4
}

/**
 * Heading text for the empty state.
 *
 * Defaults to an `h3`, which is right when the empty state sits inside a page
 * that already has a heading above it. It often doesn't: a 404, an error screen
 * or a "nothing here yet" page has the empty state as its entire content, and
 * the title is that document's `h1`. `level` moves it without giving up the
 * styling, so the outline matches the page instead of the component.
 *
 * Use `level` for a heading and `render` only for something that is not one —
 * a `<p>` in a card that has its own title above. `render={<h1 />}` works and
 * means the same thing, but it puts a childless `<h1 />` in the source, which
 * `jsx-a11y/heading-has-content` reads as an empty heading and reports at every
 * call site. The rule is wrong about it and cannot be told so; `level` removes
 * the element it is wrong about.
 *
 * @example
 * <EmptyTitle>No results</EmptyTitle>
 * <EmptyTitle level={1}>This job isn't accepting applications</EmptyTitle>
 *
 * @prop level - Heading level 1–4. Default 3.
 * @prop render - Render a different element entirely, keeping the styling.
 */
function EmptyTitle({ className, level, render, ...props }: EmptyTitleProps) {
  return useRender({
    defaultTagName: level === undefined ? "h3" : (`h${level}` as "h3"),
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
