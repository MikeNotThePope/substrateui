import * as React from "react"

import { cn } from "@/lib/utils"

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  disabled?: boolean
}

/**
 * Interactive list item with active and disabled states, commonly used in menus and lists.
 *
 * @example
 * <Item active onClick={handleClick}><ItemIcon><StarIcon /></ItemIcon><ItemLabel>Favorites</ItemLabel></Item>
 *
 * @prop active - Highlights the item as currently selected
 * @prop disabled - Dims the item and disables pointer events
 */
function Item({ className, active, disabled, ...props }: ItemProps) {
  return (
    <div
      data-slot="item"
      data-active={active ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer transition-colors",
        "hover:bg-surface-interactive",
        "data-[active=true]:bg-surface-interactive data-[active=true]:font-medium",
        "data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

/** Shrink-proof icon wrapper inside an Item. */
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

export { Item, ItemIcon, ItemLabel }
