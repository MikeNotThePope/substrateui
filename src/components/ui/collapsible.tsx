"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/** Root component that manages collapsible open/close state. */
const Collapsible = CollapsiblePrimitive.Root

/** Button that toggles the collapsible content visibility. */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

/** Content panel that expands or collapses based on the Collapsible state. */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
