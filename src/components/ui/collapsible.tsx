"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

import { asChildRender } from "@/lib/as-child"

/** Root component that manages collapsible open/close state. */
const Collapsible = CollapsiblePrimitive.Root

/** Button that toggles the collapsible content visibility. */
function CollapsibleTrigger({
  asChild,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof CollapsiblePrimitive.Trigger> & {
  asChild?: boolean
}) {
  return (
    <CollapsiblePrimitive.Trigger
      {...asChildRender(asChild, children, { button: true })}
      {...props}
    />
  )
}

/** Content panel that expands or collapses based on the Collapsible state. */
const CollapsibleContent = CollapsiblePrimitive.Panel

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
