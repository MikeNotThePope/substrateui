"use client"

import * as React from "react"
import { Menu as DropdownMenuPrimitive } from "@base-ui/react/menu"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"
import { withAsChild } from "@/lib/slot"

/** Root dropdown menu component that manages open/close state. */
const DropdownMenu = DropdownMenuPrimitive.Root

/** Button or element that toggles the dropdown menu. */
const DropdownMenuTrigger = withAsChild(DropdownMenuPrimitive.Trigger)

/** Groups related dropdown menu items together. */
const DropdownMenuGroup = DropdownMenuPrimitive.Group

/** Portals dropdown menu content into document body. */
const DropdownMenuPortal = DropdownMenuPrimitive.Portal

/** Root component for a nested submenu within a dropdown. */
const DropdownMenuSub = DropdownMenuPrimitive.SubmenuRoot

/** Groups radio items so only one can be selected at a time. */
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

/** Menu item that opens a nested submenu on hover or focus. */
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubmenuTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubmenuTrigger
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-highlighted:bg-accent data-popup-open:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        inset && "ps-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ms-auto" />
    </DropdownMenuPrimitive.SubmenuTrigger>
  )
}

/** Animated content panel for a nested submenu. */
function DropdownMenuSubContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Popup>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Positioner className="z-50">
        <DropdownMenuPrimitive.Popup
          ref={ref}
          data-slot="dropdown-menu-sub-content"
          className={cn(
            "min-w-[8rem] overflow-hidden rounded-lg border-2 bg-popover p-1 text-popover-foreground shadow-hard data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            className
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Positioner>
    </DropdownMenuPrimitive.Portal>
  )
}

/**
 * Animated popover panel containing the dropdown menu items.
 *
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuContent><DropdownMenuItem>Action</DropdownMenuItem></DropdownMenuContent>
 * </DropdownMenu>
 */
function DropdownMenuContent({
  className,
  side,
  align,
  sideOffset = 4,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Popup> &
  Pick<
    React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Positioner>,
    "side" | "align" | "sideOffset"
  >) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="z-50"
      >
        <DropdownMenuPrimitive.Popup
          ref={ref}
          data-slot="dropdown-menu-content"
          className={cn(
            "max-h-(--available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-lg border-2 bg-popover p-1 text-popover-foreground shadow-hard data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            className
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Positioner>
    </DropdownMenuPrimitive.Portal>
  )
}

/** Clickable item within a dropdown menu. */
function DropdownMenuItem({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-surface-interactive data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        inset && "ps-8",
        className
      )}
      {...props}
    />
  )
}

/** Menu item with a checkbox indicator for toggling boolean options. */
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none transition-colors data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.CheckboxItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

/** Menu item with a radio indicator for single-select groups. */
function DropdownMenuRadioItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none transition-colors data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.RadioItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

/** Non-interactive label used to title a group of menu items. */
function DropdownMenuLabel({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.GroupLabel> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.GroupLabel
      ref={ref}
      data-slot="dropdown-menu-label"
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "ps-8",
        className
      )}
      {...props}
    />
  )
}

/** Horizontal divider line between groups of menu items. */
function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SeparatorPrimitive>) {
  return (
    <SeparatorPrimitive
      ref={ref}
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

/** Right-aligned keyboard shortcut hint displayed within a menu item. */
function DropdownMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ms-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
