"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

import { withAsChild } from "@/lib/slot"

/** Root component that manages collapsible open/close state. */
const Collapsible = CollapsiblePrimitive.Root

/** Button that toggles the collapsible content visibility. */
const CollapsibleTrigger = withAsChild(CollapsiblePrimitive.Trigger)

/** Content panel that expands or collapses based on the Collapsible state. */
const CollapsibleContent = CollapsiblePrimitive.Panel

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
