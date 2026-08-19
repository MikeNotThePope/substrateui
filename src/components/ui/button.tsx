"use client"

import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button-variants"

/** Props accepted by the Button component. */
export interface ButtonProps
  extends useRender.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

/**
 * Interactive button with multiple visual variants and sizes.
 *
 * @example
 * <Button variant="outline" size="sm">Click me</Button>
 *
 * @prop variant - Visual style: "default" | "destructive" | "outline" | "secondary" | "secondary-fill" | "ghost" | "link". "amber" is a deprecated alias for "secondary-fill".
 * @prop size - Dimensions: "default" | "sm" | "lg" | "icon"
 * @prop render - Render a different element instead of a button, e.g. render={<a href="…" />}
 */
function Button({ className, variant, size, render, ...props }: ButtonProps) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        className: cn(buttonVariants({ variant, size, className })),
        "data-slot": "button",
      } as useRender.ElementProps<"button">,
      props
    ),
  })
}

export { Button }
