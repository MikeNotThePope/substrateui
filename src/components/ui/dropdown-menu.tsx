"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/** Root dropdown menu component that manages open/close state. */
const DropdownMenu = MenuPrimitive.Root

/** Button or element that toggles the dropdown menu. */
const DropdownMenuTrigger = MenuPrimitive.Trigger

/** Groups related dropdown menu items together. */
const DropdownMenuGroup = MenuPrimitive.Group

/** Portals dropdown menu content into document body. */
const DropdownMenuPortal = MenuPrimitive.Portal

/** Root component for a nested submenu within a dropdown. */
const DropdownMenuSub = MenuPrimitive.SubmenuRoot

/** Groups radio items so only one can be selected at a time. */
const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup

/** Menu item that opens a nested submenu on hover or focus. */
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.SubmenuTrigger> & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[highlighted]:bg-accent data-[popup-open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        inset && "ps-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ms-auto rtl:-scale-x-100" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

/** Animated content panel for a nested submenu. */
function DropdownMenuSubContent({
  className,
  sideOffset = 0,
  alignOffset = -4,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof MenuPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="z-50"
      >
        <MenuPrimitive.Popup
          ref={ref}
          data-slot="dropdown-menu-sub-content"
          className={cn(
            "min-w-[8rem] overflow-hidden rounded-lg border-2 bg-popover p-1 text-popover-foreground shadow-hard data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

/**
 * Animated popover panel containing the dropdown menu items.
 *
 * `positionMethod` is the CSS `position` the popup is placed with, and it has
 * to match the anchor's coordinate space. The default, `"absolute"`, measures
 * the popup in document coordinates, which is right for a trigger that scrolls
 * with the page. A trigger pinned with `position: fixed`, a corner launcher
 * say, is anchored in viewport coordinates instead, and the two agree only
 * while the page is scrolled to the top. Pass `positionMethod="fixed"` there.
 *
 * `container` is the element the popup portals into, `<body>` by default. A
 * popup on `<body>` sits outside every landmark, which axe's `region` rule
 * reports; pass an element inside `<main>` to keep it in one. Submenus portal
 * into their parent menu's portal, so they follow it.
 *
 * Open, the menu also fails axe's `aria-hidden-focus`, and the rule is wrong
 * about it. Base UI brackets the trigger and the popup with
 * `<span aria-hidden tabindex="0" data-base-ui-focus-guard>`: a sentinel that
 * takes Tab, closes the menu and hands focus on at once. Nothing rests on
 * one. axe knows the pattern (its check downgrades an element with an
 * `onfocus` handler to "needs review"), but it reads the DOM property, and
 * React attaches the handler at the root, so axe sees none. No prop turns the
 * guards off. Without `tabindex`, Tab walks past and leaves the menu open
 * behind it; without `aria-hidden`, screen readers announce empty spans.
 * Scope the rule instead: `exclude("[data-base-ui-focus-guard]")`. Measured
 * on Base UI 1.6.0 with axe-core 4.13.0; 1.8.0 renders the same guards (#160).
 *
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuContent><DropdownMenuItem>Action</DropdownMenuItem></DropdownMenuContent>
 * </DropdownMenu>
 */
function DropdownMenuContent({
  className,
  align = "center",
  alignOffset,
  side,
  sideOffset = 4,
  positionMethod,
  container,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof MenuPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset" | "positionMethod"
  > &
  Pick<React.ComponentProps<typeof MenuPrimitive.Portal>, "container">) {
  return (
    <MenuPrimitive.Portal container={container}>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        positionMethod={positionMethod}
        className="z-50"
      >
        <MenuPrimitive.Popup
          ref={ref}
          data-slot="dropdown-menu-content"
          className={cn(
            "max-h-(--available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-lg border-2 bg-popover p-1 text-popover-foreground shadow-hard data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

/** Clickable item within a dropdown menu. */
function DropdownMenuItem({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.Item> & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-surface-interactive focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
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
}: React.ComponentPropsWithRef<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <Check className="h-4 w-4" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

/** Menu item with a radio indicator for single-select groups. */
function DropdownMenuRadioItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

/**
 * Non-interactive label used to title a group of menu items. Renders a plain
 * element (usable anywhere in the menu, unlike Base UI's GroupLabel, which
 * requires an enclosing Group).
 */
function DropdownMenuLabel({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div"> & {
  inset?: boolean
}) {
  return (
    <div
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
}: React.ComponentPropsWithRef<typeof MenuPrimitive.Separator>) {
  return (
    <MenuPrimitive.Separator
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
