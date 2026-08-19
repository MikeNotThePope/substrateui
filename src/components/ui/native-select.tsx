"use client"

import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { nativeSelectVariants } from "./native-select-variants"
import { useFieldControl } from "@/components/ui/field"

interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof nativeSelectVariants> {}

/**
 * Styled native HTML select element with a custom chevron indicator.
 *
 * Inside a `Field` it picks up that field's `id`, `aria-describedby` and
 * `aria-invalid`. Anything you pass yourself still wins.
 *
 * @example
 * <NativeSelect size="default">
 *   <option value="a">Option A</option>
 * </NativeSelect>
 *
 * @prop size - Controls the height of the select: "sm", "default", or "lg".
 */
function NativeSelect({
  className,
  size,
  children,
  ...props
}: NativeSelectProps) {
  return (
    <div data-slot="native-select" className="relative">
      <select
        className={cn(nativeSelectVariants({ size }), "pe-8", className)}
        {...useFieldControl()}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute end-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

export { NativeSelect }
