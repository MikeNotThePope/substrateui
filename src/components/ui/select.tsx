"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Recursively collects `{ value, label }` pairs from SelectItem elements so
 * SelectValue can display the selected item's label while the popup is
 * closed (Base UI resolves labels from Root's `items`, unlike Radix, which
 * registered mounted items).
 */
function collectItems(
  children: React.ReactNode,
  acc: Array<{ value: unknown; label: React.ReactNode }>
) {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    const props = child.props as {
      value?: unknown
      label?: React.ReactNode
      children?: React.ReactNode
    }
    if (child.type === SelectItem && props.value !== undefined) {
      acc.push({ value: props.value, label: props.label ?? props.children })
      return
    }
    if (props.children) collectItems(props.children, acc)
  })
}

/** Root component that manages select state and context. */
function Select<Value = string, Multiple extends boolean | undefined = false>({
  items,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root<Value, Multiple>>) {
  const derivedItems = React.useMemo(() => {
    if (items) return items
    const acc: Array<{ value: unknown; label: React.ReactNode }> = []
    collectItems(children, acc)
    return acc.length > 0
      ? (acc as React.ComponentProps<typeof SelectPrimitive.Root<Value>>["items"])
      : undefined
  }, [items, children])
  return (
    <SelectPrimitive.Root items={derivedItems} {...props}>
      {children}
    </SelectPrimitive.Root>
  )
}

/** Groups related select items with an optional label. */
const SelectGroup = SelectPrimitive.Group

/** Renders the currently selected value or placeholder text. */
const SelectValue = SelectPrimitive.Value

/**
 * The button that toggles the select dropdown.
 *
 * @example
 * <Select>
 *   <SelectTrigger><SelectValue placeholder="Pick one" /></SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="a">Option A</SelectItem>
 *   </SelectContent>
 * </Select>
 */
function SelectTrigger({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      data-slot="select-trigger"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={<ChevronDown className="h-4 w-4 opacity-50" />}
      />
    </SelectPrimitive.Trigger>
  )
}

/** A button shown at the top of the dropdown to scroll content upward. */
function SelectScrollUpButton({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      ref={ref}
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-[1] flex w-full cursor-default items-center justify-center bg-popover py-1",
        className
      )}
      {...props}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

/** A button shown at the bottom of the dropdown to scroll content downward. */
function SelectScrollDownButton({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      ref={ref}
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-[1] flex w-full cursor-default items-center justify-center bg-popover py-1",
        className
      )}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

/**
 * The dropdown popover that contains selectable items. Anchors below the
 * trigger like every other popover; pass `alignItemWithTrigger` to use Base
 * UI's macOS-style selected-item overlay instead.
 */
function SelectContent({
  className,
  children,
  side,
  sideOffset,
  align,
  alignOffset,
  alignItemWithTrigger = false,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof SelectPrimitive.Positioner>,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        alignItemWithTrigger={alignItemWithTrigger}
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="z-50 select-none"
      >
        <SelectPrimitive.Popup
          ref={ref}
          data-slot="select-content"
          className={cn(
            "relative max-h-(--available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border-2 bg-popover text-popover-foreground shadow-hard data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            !alignItemWithTrigger &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List
            className={cn(
              "p-1",
              !alignItemWithTrigger && "w-full min-w-(--anchor-width)"
            )}
          >
            {children}
          </SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

/** A non-interactive label for a group of select items. */
function SelectLabel({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.GroupLabel>) {
  return (
    <SelectPrimitive.GroupLabel
      ref={ref}
      data-slot="select-label"
      className={cn("py-1.5 ps-8 pe-2 text-sm font-semibold", className)}
      {...props}
    />
  )
}

/** A selectable option within the select dropdown. */
function SelectItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none hover:bg-surface-interactive focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

/**
 * A visual divider between groups of select items. Renders a plain element
 * (Base UI's select has no separator part).
 */
function SelectSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-muted", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
