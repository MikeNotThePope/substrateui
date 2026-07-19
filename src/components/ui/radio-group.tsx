"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A group of radio inputs where only one can be selected at a time.
 *
 * @example
 * <RadioGroup defaultValue="a">
 *   <RadioGroupItem value="a" />
 *   <RadioGroupItem value="b" />
 * </RadioGroup>
 */
function RadioGroup({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof RadioGroupPrimitive>) {
  return (
    <RadioGroupPrimitive
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
      data-slot="radio-group"
    />
  )
}

/** An individual radio option within a RadioGroup. */
function RadioGroupItem({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof RadioPrimitive.Root>) {
  return (
    <RadioPrimitive.Root
      ref={ref}
      data-slot="radio-group-item"
      className={cn(
        "aspect-square h-[18px] w-[18px] rounded-full border-2 border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
