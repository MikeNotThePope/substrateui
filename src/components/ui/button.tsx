import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Button style variants (variant + size). Use with cn(buttonVariants({...})) for non-button elements. */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors active:translate-y-[1.5px] motion-reduce:active:translate-y-0 transition-transform motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-2 border-transparent hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground border-2 border-transparent hover:bg-destructive/90",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-transparent hover:bg-secondary/80",
        amber:
          "bg-amber-500 text-warm-900 border-2 border-amber-600 hover:bg-amber-400 dark:bg-amber-400 dark:text-warm-950 dark:border-amber-500 dark:hover:bg-amber-300",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/** Props accepted by the Button component. */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

/**
 * Interactive button with multiple visual variants and sizes.
 *
 * @example
 * <Button variant="outline" size="sm">Click me</Button>
 *
 * @prop variant - Visual style: "default" | "destructive" | "outline" | "secondary" | "amber" | "ghost" | "link"
 * @prop size - Dimensions: "default" | "sm" | "lg" | "icon"
 * @prop asChild - Merge props onto child element instead of rendering a button
 */
function Button({
  className,
  variant,
  size,
  asChild = false,
  ref,
  ...props
}: ButtonProps & React.ComponentPropsWithRef<"button">) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
}

export { Button, buttonVariants }
