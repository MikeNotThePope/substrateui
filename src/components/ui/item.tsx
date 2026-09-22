"use client"

import * as React from "react"
import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { itemVariants } from "./item-variants"

/** Props for {@link Item}. */
export interface ItemProps
  extends useRender.ComponentProps<"div">,
    VariantProps<typeof itemVariants> {
  /** Highlights the item as currently selected. */
  active?: boolean
  /** Dims the item and disables pointer events. */
  disabled?: boolean
}

/**
 * One row of a menu or list: an icon slot, a truncating label, a trailer, and
 * hover, active and disabled states.
 *
 * `render` decides what element the row *is*. A row of actions is a list of
 * `button`s, a row of destinations is a list of `a`s, and a row that holds two
 * controls of its own has to stay a container — the same shape in all three
 * cases, which is why this is one prop rather than an `ItemButton` beside an
 * `ItemLink` beside this.
 *
 * @example
 * <Item active><ItemIcon><StarIcon /></ItemIcon><ItemLabel>Favorites</ItemLabel></Item>
 *
 * @example
 * <Item size="lg" render={<button />} onClick={open}>
 *   <ItemIcon>01</ItemIcon>
 *   <ItemLabel>Why do you want to work here?</ItemLabel>
 *   <ItemTrailer>Long text</ItemTrailer>
 * </Item>
 *
 * @prop render - Render a different element, e.g. render={<a href="…" />}.
 * @prop size - Row height: `default` (36px) or `lg` (44px, SC 2.5.5).
 * @prop active - Highlights the item as currently selected
 * @prop disabled - Dims the item and disables pointer events
 */
function Item({
  className,
  active,
  disabled,
  size,
  render,
  ref,
  ...props
}: ItemProps) {
  // A `<button>` with no `type` submits the form it is standing in, and a row
  // of actions inside a form is exactly where this lands. React does not
  // default it and neither does the DOM, so the row does — only when the caller
  // wrote a bare `<button>`, so an explicit `type="submit"` still means what it
  // says.
  const bareButton =
    React.isValidElement(render) &&
    render.type === "button" &&
    (render.props as { type?: string }).type === undefined

  return useRender({
    ref,
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        "data-slot": "item",
        "data-active": active ? "true" : undefined,
        "data-disabled": disabled ? "true" : undefined,
        "aria-disabled": disabled || undefined,
        ...(bareButton ? { type: "button" } : {}),
        className: cn(itemVariants({ size }), className),
      } as useRender.ElementProps<"div">,
      props
    ),
  })
}

/** Shrink-proof leading slot inside an Item: an icon, or a marker that reads like one. */
function ItemIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="item-icon"
      className={cn("shrink-0 [&_svg]:size-4", className)}
      {...props}
    />
  )
}

/** Truncating text label inside an Item. */
function ItemLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="item-label"
      className={cn("truncate", className)}
      {...props}
    />
  )
}

/**
 * Trailing slot inside an Item: pushed to the end of the row, never shrunk.
 *
 * `ms-auto` on the first trailer takes the whole of the free space, so a second
 * one sits beside it rather than drifting back to the middle. What a trailer
 * *holds* is the caller's — a badge, a timestamp, a chevron — and so is whether
 * it survives a narrow screen: this ships no `hidden sm:inline`, because which
 * of two trailers is the expendable one is a fact about the content.
 */
function ItemTrailer({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="item-trailer"
      className={cn("ms-auto flex-none", className)}
      {...props}
    />
  )
}

export { Item, ItemIcon, ItemLabel, ItemTrailer }
