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
  ref,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof SliderPrimitive.Root>,
  "value" | "defaultValue" | "onValueChange"
> & {
  value?: number[]
  defaultValue?: number[]
  onValueChange?: (
    value: number[],
    eventDetails: SliderPrimitive.Root.ChangeEventDetails
  ) => void
}) {
  const thumbCount = (value ?? defaultValue ?? [0]).length
  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      onValueChange={
        onValueChange
          ? (nextValue, eventDetails) =>
              onValueChange(
                Array.isArray(nextValue) ? nextValue : [nextValue],
                eventDetails
              )
          : undefined
      }
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full grow touch-none select-none items-center">
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full border-2 bg-surface-sunken">
          <SliderPrimitive.Indicator className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }, (_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            index={i}
            className="block size-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

export { Slider }
