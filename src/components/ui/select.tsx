"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

/** Props accepted by Select. */
export interface SelectProps
  extends Omit<
    React.ComponentPropsWithRef<typeof SelectPrimitive.Root<string>>,
    "onValueChange"
  > {
  /** Called with the newly selected value, matching the previous Radix-based API. */
  onValueChange?: (value: string) => void
}

function textContent(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textContent).join("")
  if (React.isValidElement(node)) {
    return textContent((node.props as { children?: React.ReactNode }).children)
  }
  return ""
}

/**
 * Collects `{ value, label }` pairs from SelectItem elements anywhere in the
 * children tree, so the trigger can show the selected item's label while the
 * popup is closed (Base UI otherwise renders the raw value).
 */
function collectItems(
  children: React.ReactNode,
  out: { value: string; label: React.ReactNode }[]
) {
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    const props = child.props as {
      value?: unknown
      children?: React.ReactNode
    }
    if (child.type === SelectItem && typeof props.value === "string") {
      out.push({ value: props.value, label: textContent(props.children) })
      return
    }
    if (props.children) collectItems(props.children, out)
  })
}

/** Root component that manages select state and context. */
function Select({ onValueChange, items, children, ...props }: SelectProps) {
  const derivedItems = React.useMemo(() => {
    if (items) return items
    const collected: { value: string; label: React.ReactNode }[] = []
    collectItems(children, collected)
    return collected.length > 0 ? collected : undefined
  }, [items, children])

  return (
    <SelectPrimitive.Root
      items={derivedItems}
      onValueChange={
        onValueChange && ((value: string | null) => onValueChange(value ?? ""))
      }
      {...props}
    >
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
        "flex h-10 w-full items-center justify-between rounded-md border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background data-placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon render={<ChevronDown className="h-4 w-4 opacity-50" />} />
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
        "flex cursor-default items-center justify-center py-1",
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
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

/** The dropdown popover that contains selectable items. */
function SelectContent({
  className,
  children,
  position = "popper",
  sideOffset = 4,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SelectPrimitive.Popup> & {
  /** "popper" (default) drops below the trigger; "item-aligned" overlays the selected item. */
  position?: "popper" | "item-aligned"
  sideOffset?: number
}) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        alignItemWithTrigger={position === "item-aligned"}
        sideOffset={sideOffset}
        className="z-50"
      >
        <SelectPrimitive.Popup
          ref={ref}
          data-slot="select-content"
          className={cn(
            "relative max-h-(--available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border-2 bg-popover text-popover-foreground shadow-hard data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--transform-origin)",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List
            className={cn(
              "p-1",
              position === "popper" && "w-full min-w-(--anchor-width)"
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
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none hover:bg-surface-interactive data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
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

/** A visual divider between groups of select items. */
function SelectSeparator({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SeparatorPrimitive>) {
  return (
    <SeparatorPrimitive
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
