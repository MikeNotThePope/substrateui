"use client"

import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { asChildRender } from "@/lib/as-child"
import { cn } from "@/lib/utils"

/** Root component that manages context menu open/close state. */
const ContextMenu = ContextMenuPrimitive.Root

/** Area that opens the context menu on right-click. */
function ContextMenuTrigger({
  asChild,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Trigger> & {
  asChild?: boolean
}) {
  return (
    <ContextMenuPrimitive.Trigger
      {...asChildRender(asChild, children)}
      {...props}
    />
  )
}

/** Groups related context menu items together. */
const ContextMenuGroup = ContextMenuPrimitive.Group

/** Portal that renders context menu content outside the DOM hierarchy. */
const ContextMenuPortal = ContextMenuPrimitive.Portal

/** Root for a nested sub-menu within the context menu. */
const ContextMenuSub = ContextMenuPrimitive.SubmenuRoot

/** Groups mutually exclusive radio items in the context menu. */
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

/** Item that opens a nested sub-menu on hover. */
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.SubmenuTrigger> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      ref={ref}
      data-slot="context-menu-sub-trigger"
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground",
        inset && "ps-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ms-auto h-4 w-4" />
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

/** Dropdown panel for a nested sub-menu. */
function ContextMenuSubContent({
  className,
  sideOffset = 0,
  alignOffset = -4,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof ContextMenuPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="z-50"
      >
        <ContextMenuPrimitive.Popup
          ref={ref}
          data-slot="context-menu-sub-content"
          className={cn(
            "min-w-[8rem] overflow-hidden rounded-lg border-2 bg-popover p-1 text-popover-foreground shadow-hard data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            className
          )}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

/** Positioned dropdown panel containing the context menu items. */
function ContextMenuContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Popup>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner className="z-50">
        <ContextMenuPrimitive.Popup
          ref={ref}
          data-slot="context-menu-content"
          className={cn(
            "max-h-(--available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-lg border-2 bg-popover p-1 text-popover-foreground shadow-hard animate-in fade-in-80 data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            className
          )}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  )
}

/** Clickable action item within the context menu. */
function ContextMenuItem({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      data-slot="context-menu-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-surface-interactive focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "ps-8",
        className
      )}
      {...props}
    />
  )
}

/** Context menu item with a toggleable checkbox indicator. */
function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="context-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <Check className="h-4 w-4" />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
}

/** Context menu item with a radio indicator for single-select groups. */
function ContextMenuRadioItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.RadioItem>) {
  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      data-slot="context-menu-radio-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.RadioItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
}

/**
 * Non-interactive label used to title a group of context menu items. Renders a
 * plain element (usable anywhere in the menu, unlike Base UI's GroupLabel,
 * which requires an enclosing Group).
 */
function ContextMenuLabel({
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
      data-slot="context-menu-label"
      className={cn(
        "px-2 py-1.5 text-sm font-semibold text-foreground",
        inset && "ps-8",
        className
      )}
      {...props}
    />
  )
}

/** Horizontal divider between context menu sections. */
function ContextMenuSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

/** Keyboard shortcut hint displayed alongside a context menu item. */
function ContextMenuShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ms-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
