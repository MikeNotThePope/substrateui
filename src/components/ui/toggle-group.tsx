"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { type VariantProps } from "class-variance-authority"

import { asChildRender } from "@/lib/as-child"
import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

type ToggleGroupSingleProps = {
  /** Only one item can be pressed at a time. */
  type: "single"
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

type ToggleGroupMultipleProps = {
  /** Multiple items can be pressed at the same time. */
  type: "multiple"
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

type ToggleGroupProps = Omit<
  React.ComponentPropsWithRef<typeof ToggleGroupPrimitive>,
  "value" | "defaultValue" | "onValueChange" | "multiple"
> &
  VariantProps<typeof toggleVariants> &
  (ToggleGroupSingleProps | ToggleGroupMultipleProps)

function toArrayValue(
  value: string | string[] | undefined
): string[] | undefined {
  if (value === undefined) return undefined
  if (Array.isArray(value)) return value
  return value === "" ? [] : [value]
}

/** A group of toggle buttons that share variant and size context.
 *
 * @example
 * <ToggleGroup type="single" variant="outline"><ToggleGroupItem value="a">A</ToggleGroupItem></ToggleGroup>
 *
 * @prop variant - Visual style applied to all child items.
 * @prop size - Size applied to all child items.
 */
function ToggleGroup({
  className,
  variant,
  size,
  children,
  ref,
  type,
  value,
  defaultValue,
  onValueChange,
  ...props
}: ToggleGroupProps) {
  const multiple = type === "multiple"

  const handleValueChange:
    | React.ComponentProps<typeof ToggleGroupPrimitive>["onValueChange"]
    | undefined =
    onValueChange === undefined
      ? undefined
      : (groupValue) => {
          if (multiple) {
            ;(onValueChange as (value: string[]) => void)(
              groupValue as string[]
            )
          } else {
            ;(onValueChange as (value: string) => void)(
              (groupValue[0] as string) ?? ""
            )
          }
        }

  return (
    <ToggleGroupPrimitive
      ref={ref}
      multiple={multiple}
      value={toArrayValue(value)}
      defaultValue={toArrayValue(defaultValue)}
      onValueChange={handleValueChange}
      data-slot="toggle-group"
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
  asChild,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TogglePrimitive> &
  VariantProps<typeof toggleVariants> & {
    asChild?: boolean
  }) {
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
      {...asChildRender(asChild, children, { button: true })}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
