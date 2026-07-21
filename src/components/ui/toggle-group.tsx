"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

/** Props accepted by ToggleGroup. */
export interface ToggleGroupProps
  extends Omit<
      React.ComponentPropsWithRef<typeof ToggleGroupPrimitive>,
      "value" | "defaultValue" | "onValueChange" | "multiple"
    >,
    VariantProps<typeof toggleVariants> {
  /** Selection mode: "single" allows one pressed item, "multiple" allows many. */
  type?: "single" | "multiple"
  /** Pressed value(s): a string for type="single", an array for type="multiple". */
  value?: string | string[]
  defaultValue?: string | string[]
  /** Called with a string for type="single", an array for type="multiple". */
  onValueChange?: (value: string & string[]) => void
}

function toArray(value: string | string[] | undefined): string[] | undefined {
  if (value === undefined) return undefined
  return Array.isArray(value) ? value : value === "" ? [] : [value]
}

/** A group of toggle buttons that share variant and size context.
 *
 * @example
 * <ToggleGroup type="single" variant="outline"><ToggleGroupItem value="a">A</ToggleGroupItem></ToggleGroup>
 *
 * @prop type - Selection mode: "single" (default) or "multiple".
 * @prop variant - Visual style applied to all child items.
 * @prop size - Size applied to all child items.
 */
function ToggleGroup({
  className,
  variant,
  size,
  type = "single",
  value,
  defaultValue,
  onValueChange,
  children,
  ref,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      ref={ref}
      data-slot="toggle-group"
      multiple={type === "multiple"}
      value={toArray(value)}
      defaultValue={toArray(defaultValue)}
      onValueChange={
        onValueChange &&
        ((groupValue: unknown[]) => {
          const values = groupValue as string[]
          onValueChange(
            (type === "multiple" ? values : (values[0] ?? "")) as string &
              string[]
          )
        })
      }
      className={cn("flex items-center justify-center gap-1", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

/** Individual toggle item within a ToggleGroup. */
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TogglePrimitive> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <TogglePrimitive
      ref={ref}
      data-slot="toggle-group-item"
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem }
