"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

/** Root component that manages collapsible open/close state. */
const Collapsible = CollapsiblePrimitive.Root

/** Button that toggles the collapsible content visibility. */
const CollapsibleTrigger = CollapsiblePrimitive.Trigger

/** Content panel that expands or collapses based on the Collapsible state. */
const CollapsibleContent = CollapsiblePrimitive.Panel

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
