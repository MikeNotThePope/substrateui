"use client"

import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"

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
interface CenterProps extends useRender.ComponentProps<"div"> {
  max?: Max
  padding?: boolean
}

/**
 * Horizontally centers its content with a configurable max-width and optional padding.
 *
 * @example
 * <Center max="lg" padding>Content</Center>
 *
 * @prop max - Max-width breakpoint: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
 * @prop padding - Adds responsive horizontal padding when true
 * @prop render - Render a different element instead of a div, e.g. render={<main />}
 */
function Center({
  max = "2xl",
  padding = true,
  className,
  render,
  ...props
}: CenterProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        "data-slot": "center",
        className: cn(
          "mx-auto w-full",
          maxMap[max],
          padding && "px-4 sm:px-6 lg:px-8",
          className,
        ),
      } as useRender.ElementProps<"div">,
      props
    ),
  })
}

export { Center, type CenterProps }
