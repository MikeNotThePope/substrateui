"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useFieldControl } from "@/components/ui/field"

/** Multi-line text input with consistent border, focus ring, and disabled styles.
 *
 * It grows with its text (`field-sizing: content`) from an 80px floor to a
 * cap of 18 lines, then scrolls, so a long answer can be reread whole before
 * it is sent without pushing the submit button off for good
 * (MikeNotThePope/lavahire#2414). A browser without `field-sizing` keeps the
 * fixed box it had. A fixed `h-*` from the caller still wins, and `rows` sets
 * nothing while the box grows: the floor and the text decide its height.
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
        "flex field-sizing-content min-h-[80px] max-h-[18lh] w-full rounded-md border-2 border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
}

export { Textarea }
