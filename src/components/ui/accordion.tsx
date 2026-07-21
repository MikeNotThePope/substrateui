"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/** Props accepted by Accordion. */
export interface AccordionProps
  extends Omit<
    React.ComponentPropsWithRef<typeof AccordionPrimitive.Root>,
    "value" | "defaultValue" | "onValueChange" | "multiple"
  > {
  /** Expansion mode: "single" allows one open item, "multiple" allows many. */
  type?: "single" | "multiple"
  /** Open item value(s): a string for type="single", an array for type="multiple". */
  value?: string | string[]
  defaultValue?: string | string[]
  /** Called with a string for type="single", an array for type="multiple". */
  onValueChange?: (value: string & string[]) => void
  /** For type="single": whether the open item can be closed again. Kept for API compatibility. */
  collapsible?: boolean
}

function toArray(value: string | string[] | undefined): string[] | undefined {
  if (value === undefined) return undefined
  return Array.isArray(value) ? value : value === "" ? [] : [value]
}

/** Root accordion container that manages expand/collapse state for its items. */
function Accordion({
  type = "single",
  value,
  defaultValue,
  onValueChange,
  collapsible,
  ref,
  ...props
}: AccordionProps) {
  // Swallowed: Base UI accordions are always collapsible.
  void collapsible
  return (
    <AccordionPrimitive.Root
      ref={ref}
      data-slot="accordion"
      multiple={type === "multiple"}
      value={toArray(value)}
      defaultValue={toArray(defaultValue)}
      onValueChange={
        onValueChange &&
        ((openValues: unknown[]) => {
          const values = openValues as string[]
          onValueChange(
            (type === "multiple" ? values : (values[0] ?? "")) as string &
              string[]
          )
        })
      }
      {...props}
    />
  )
}

/** A single collapsible section within an Accordion. */
function AccordionItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn("border-b-2", className)}
      {...props}
    />
  )
}

/** Clickable header that toggles the visibility of its associated AccordionPanel. */
function AccordionTrigger({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all active:translate-y-[1.5px] transition-transform hover:underline [&[data-panel-open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/** Animated collapsible content panel revealed by its sibling AccordionTrigger. */
function AccordionContent({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AccordionPrimitive.Panel>) {
  return (
    <AccordionPrimitive.Panel
      ref={ref}
      data-slot="accordion-content"
      className="h-[var(--accordion-panel-height)] overflow-hidden text-sm transition-[height] duration-200 ease-out data-starting-style:h-0 data-ending-style:h-0"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
