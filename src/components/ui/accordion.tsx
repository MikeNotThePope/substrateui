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

/**
 * Clickable header that toggles the visibility of its associated AccordionContent.
 *
 * `detail` is text beside the title that a person selects and copies, such as
 * a date or a reference. Text inside a button cannot be selected, so the detail
 * sits outside it, above the button's hit area, which stretches over the whole
 * header: a click anywhere else on the row still toggles it. With `detail`,
 * `className` styles the row rather than the button.
 */
function AccordionTrigger({
  className,
  children,
  detail,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AccordionPrimitive.Trigger> & {
  detail?: React.ReactNode
}) {
  if (detail === undefined) {
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
  // No press shift here: it would move the detail under a drag selecting it.
  // The chevron stays outside the detail, under the hit area, so a click on it
  // toggles; the header's ring stands in for the button's, which would circle
  // only the title.
  return (
    <AccordionPrimitive.Header
      className={cn(
        "relative flex items-center justify-between gap-3 py-4 has-[[data-slot=accordion-trigger]:focus-visible]:ring-2 has-[[data-slot=accordion-trigger]:focus-visible]:ring-ring [&[data-open]>svg]:rotate-180",
        className
      )}
    >
      <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
        <AccordionPrimitive.Trigger
          ref={ref}
          data-slot="accordion-trigger"
          className="text-start font-medium outline-none hover:underline after:absolute after:inset-0 after:content-['']"
          {...props}
        >
          {children}
        </AccordionPrimitive.Trigger>
        <span
          data-slot="accordion-detail"
          className="relative z-10 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1"
        >
          {detail}
        </span>
      </span>
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
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
