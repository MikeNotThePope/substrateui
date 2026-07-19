"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Root accordion container that manages expand/collapse state for its items.
 * One item is open at a time by default; set `multiple` to allow several.
 * `value`/`defaultValue` are arrays of open item values.
 */
const Accordion = AccordionPrimitive.Root

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

/** Clickable header that toggles the visibility of its associated AccordionContent. */
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
      className="h-[var(--accordion-panel-height)] overflow-hidden text-sm transition-[height] duration-200 ease-out data-[starting-style]:h-0 data-[ending-style]:h-0"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
