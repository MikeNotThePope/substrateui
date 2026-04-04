import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const maxMap = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
} as const

type Max = keyof typeof maxMap

/** Props accepted by the Center component. */
interface CenterProps extends React.ComponentPropsWithRef<"div"> {
  max?: Max
  padding?: boolean
  asChild?: boolean
}

/**
 * Horizontally centers its content with a configurable max-width and optional padding.
 *
 * @example
 * <Center max="lg" padding>Content</Center>
 *
 * @prop max - Max-width breakpoint: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
 * @prop padding - Adds responsive horizontal padding when true
 * @prop asChild - Merge props onto child element instead of rendering a div
 */
function Center({
  max = "2xl",
  padding = true,
  asChild = false,
  className,
  ref,
  ...props
}: CenterProps) {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp
      data-slot="center"
      className={cn(
        "mx-auto w-full",
        maxMap[max],
        padding && "px-4 sm:px-6 lg:px-8",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}

export { Center, type CenterProps }
