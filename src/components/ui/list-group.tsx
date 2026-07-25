"use client"

import * as React from "react"
import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"

import { cn } from "@/lib/utils"

/**
 * A bordered, divided list of items, links, or buttons inside a single element.
 * Compose with {@link ListGroupItem}.
 *
 * @example
 * <ListGroup>
 *   <ListGroupItem active>Profile</ListGroupItem>
 *   <ListGroupItem render={<Link href="/settings" />}>Settings</ListGroupItem>
 *   <ListGroupItem disabled>Billing</ListGroupItem>
 * </ListGroup>
 */
function ListGroup({ className, ref, ...props }: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="list-group"
      className={cn(
        "w-full overflow-hidden rounded-lg border-2 border-border divide-y-2 divide-border bg-background",
        className
      )}
      {...props}
    />
  )
}

/** Props for {@link ListGroupItem}. */
export interface ListGroupItemProps extends useRender.ComponentProps<"div"> {
  /** Highlights the item as the current selection. */
  active?: boolean
  /** Dims and disables interaction. */
  disabled?: boolean
}

/**
 * A row within a {@link ListGroup}. Render as a link or button with `render`
 * (e.g. `render={<Link href="…" />}`) to make it interactive; interactive rows
 * get hover and focus affordances automatically.
 *
 * @prop active - Marks the row as the current selection.
 * @prop disabled - Dims the row and blocks interaction.
 * @prop render - Render a different element, e.g. render={<a href="…" />}.
 */
function ListGroupItem({
  className,
  active,
  disabled,
  render,
  ref,
  ...props
}: ListGroupItemProps) {
  return useRender({
    ref,
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        "data-slot": "list-group-item",
        "data-active": active ? "" : undefined,
        "aria-current": active ? "true" : undefined,
        "aria-disabled": disabled ? "true" : undefined,
        className: cn(
          "flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors",
          "[&:where(a,button)]:cursor-pointer [&:where(a,button)]:w-full [&:where(a,button)]:text-start",
          "hover:[&:where(a,button)]:bg-accent hover:[&:where(a,button)]:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          active && "bg-accent text-accent-foreground font-medium",
          disabled && "pointer-events-none opacity-50",
          className
        ),
      } as useRender.ElementProps<"div">,
      props
    ),
  })
}

export { ListGroup, ListGroupItem }
