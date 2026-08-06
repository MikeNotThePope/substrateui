"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useFieldControl } from "@/components/ui/field"

/** Multi-line text input with consistent border, focus ring, and disabled styles.
 *
 * Inside a `Field` it picks up that field's `id`, `aria-describedby` and
 * `aria-invalid`. Anything you pass yourself still wins.
 *
 * @example
 * <Textarea placeholder="Enter description..." rows={4} />
 */
function Textarea({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      {...useFieldControl()}
      className={cn(
        "flex min-h-[80px] w-full rounded-md border-2 border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
}

export { Textarea }
