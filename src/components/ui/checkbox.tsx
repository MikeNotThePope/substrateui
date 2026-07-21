"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

/** Checked state accepted by Checkbox: boolean or "indeterminate" (mixed). */
export type CheckedState = boolean | "indeterminate"

/** Props accepted by Checkbox. */
export interface CheckboxProps
  extends Omit<
    React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root>,
    "checked" | "defaultChecked"
  > {
  checked?: CheckedState
  defaultChecked?: CheckedState
}

/**
 * A toggleable checkbox input with checked/unchecked states.
 *
 * @example
 * <Checkbox checked={checked} onCheckedChange={setChecked} />
 */
function Checkbox({
  className,
  checked,
  defaultChecked,
  indeterminate,
  ref,
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox"
      checked={checked === "indeterminate" ? undefined : checked}
      defaultChecked={
        defaultChecked === "indeterminate" ? undefined : defaultChecked
      }
      indeterminate={
        indeterminate ??
        (checked === "indeterminate" || defaultChecked === "indeterminate")
      }
      className={cn(
        "grid place-content-center peer h-[18px] w-[18px] shrink-0 rounded border-2 border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-primary data-checked:border-primary data-checked:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("grid place-content-center text-current")}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
