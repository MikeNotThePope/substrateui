"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

/**
 * A range input that allows selecting a numeric value by dragging a thumb along a track.
 *
 * @example
 * <Slider defaultValue={[50]} max={100} step={1} />
 */
function Slider({
  className,
  defaultValue,
  value,
  onValueChange,
  onValueCommit,
  ref,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof SliderPrimitive.Root>,
  "onValueChange"
> & {
  /** Called with the full thumb value array, matching the previous Radix-based API. */
  onValueChange?: (value: number[]) => void
  /** Called with the final value array when the user stops dragging. */
  onValueCommit?: (value: number[]) => void
}) {
  const toValueArray = (v: number | readonly number[]): number[] =>
    Array.isArray(v) ? [...v] : [v as number]
  const currentValue = value ?? defaultValue ?? [0]
  const thumbCount = Array.isArray(currentValue) ? currentValue.length : 1
  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      onValueChange={
        onValueChange && ((v) => onValueChange(toValueArray(v)))
      }
      onValueCommitted={
        onValueCommit && ((v) => onValueCommit(toValueArray(v)))
      }
      className={cn("relative w-full touch-none select-none", className)}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex h-5 w-full items-center">
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full border-2 bg-surface-sunken">
          <SliderPrimitive.Indicator className="bg-primary" />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }, (_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            index={i}
            className="block size-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
