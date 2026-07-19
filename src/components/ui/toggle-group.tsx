"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

/** A group of toggle buttons that share variant and size context.
 *
 * One item is pressed at a time by default; set `multiple` to allow
 * several. `value`/`defaultValue` are arrays of pressed item values.
 *
 * @example
 * <ToggleGroup variant="outline"><ToggleGroupItem value="a">A</ToggleGroupItem></ToggleGroup>
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
  ...props
}: React.ComponentPropsWithRef<typeof ToggleGroupPrimitive> &
  VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive
      ref={ref}
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
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
