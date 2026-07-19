"use client"

import * as React from "react"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/** Wrapper for an individual menu within the menubar. */
function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Root>) {
  return <MenuPrimitive.Root {...props} />
}

/** Groups related menubar items together. */
function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Group>) {
  return <MenuPrimitive.Group data-slot="menubar-group" {...props} />
}

/** Portal for rendering menubar content outside the DOM hierarchy. */
function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Portal>) {
  return <MenuPrimitive.Portal {...props} />
}

/** Groups menubar radio items for single-selection behavior. */
function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.RadioGroup>) {
  return <MenuPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}

/** Container for a nested submenu within the menubar. */
function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenuPrimitive.SubmenuRoot>) {
  return <MenuPrimitive.SubmenuRoot {...props} />
}

/**
 * Horizontal menubar root component built on Base UI Menubar.
 *
 * @example
 * <Menubar>
 *   <MenubarMenu>
 *     <MenubarTrigger>File</MenubarTrigger>
 *     <MenubarContent>
 *       <MenubarItem>New</MenubarItem>
 *     </MenubarContent>
 *   </MenubarMenu>
 * </Menubar>
 */
function Menubar({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenubarPrimitive>) {
  return (
    <MenubarPrimitive
      ref={ref}
      data-slot="menubar"
      className={cn(
        "flex h-10 items-center space-x-1 rounded-md border-2 bg-background p-1",
        className
      )}
      {...props}
    />
  )
}

/** Button that opens a menubar dropdown. */
function MenubarTrigger({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.Trigger>) {
  return (
    <MenuPrimitive.Trigger
      ref={ref}
      data-slot="menubar-trigger"
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

/** Trigger that opens a nested submenu, displaying a chevron indicator. */
function MenubarSubTrigger({
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
      data-slot="menubar-sub-trigger"
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground",
        inset && "ps-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ms-auto h-4 w-4" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

/** Animated dropdown content for a menubar submenu. */
function MenubarSubContent({
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
          data-slot="menubar-sub-content"
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

/** Animated dropdown content panel for a top-level menubar menu. */
function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  side,
  sideOffset = 8,
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
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="z-50"
      >
        <MenuPrimitive.Popup
          ref={ref}
          data-slot="menubar-content"
          className={cn(
            "min-w-[12rem] overflow-hidden rounded-lg border-2 bg-popover p-1 text-popover-foreground shadow-hard data-[open]:animate-in data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

/** An interactive item within a menubar dropdown. */
function MenubarItem({
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
      data-slot="menubar-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-surface-interactive focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "ps-8",
        className
      )}
      {...props}
    />
  )
}

/** A menubar item with a checkbox indicator for toggling options. */
function MenubarCheckboxItem({
  className,
  children,
  checked,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="menubar-checkbox-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
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

/** A menubar item with a radio indicator for exclusive selection. */
function MenubarRadioItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      data-slot="menubar-radio-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
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
 * Non-interactive label used to title a group of menubar items. Renders a
 * plain element (usable anywhere in the menu, unlike Base UI's GroupLabel,
 * which requires an enclosing Group).
 */
function MenubarLabel({
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
      data-slot="menubar-label"
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "ps-8",
        className
      )}
      {...props}
    />
  )
}

/** Visual divider between groups of menubar items. */
function MenubarSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof MenuPrimitive.Separator>) {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

/** Displays a keyboard shortcut hint aligned to the right of a menubar item. */
function MenubarShortcut({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "ms-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
