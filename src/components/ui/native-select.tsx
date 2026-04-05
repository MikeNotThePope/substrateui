import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/** Size variants for the native select element. Use with cn(nativeSelectVariants({...})) for non-select elements. */
const nativeSelectVariants = cva(
  "w-full border-2 rounded-md bg-background px-3 text-sm appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-9",
        default: "h-10",
        lg: "h-11",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof nativeSelectVariants> {}

/**
 * Styled native HTML select element with a custom chevron indicator.
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
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute end-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  )
}

export { NativeSelect, nativeSelectVariants }
