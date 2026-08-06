"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useFieldControl } from "@/components/ui/field"

/**
 * Styled text input with focus ring, border, and disabled state support.
 *
 * Inside a `Field` it picks up that field's `id`, `aria-describedby` and
 * `aria-invalid`. Anything you pass yourself still wins.
 *
 * @example
 * <Input type="email" placeholder="you@example.com" />
 */
function Input({
  className,
  type,
  ref,
  ...props
}: React.ComponentPropsWithRef<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      {...useFieldControl()}
      className={cn(
        "flex h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:border-e file:border-input file:bg-transparent file:pe-3 file:me-3 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-sunken md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
}

export { Input }
