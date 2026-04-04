import * as React from "react"

import { cn } from "@/lib/utils"
import { Stack } from "./stack"

type Gap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

interface FormProps extends React.ComponentPropsWithRef<"form"> {
  gap?: Gap
}

/**
 * Form element with vertical stack layout and configurable gap spacing.
 *
 * @example
 * <Form gap="lg" onSubmit={handleSubmit}><Field>...</Field></Form>
 *
 * @prop gap - Vertical spacing between children (default "xl")
 */
function Form({
  gap = "xl",
  className,
  children,
  ref,
  ...props
}: FormProps) {
  return (
    <form
      data-slot="form"
      className={cn(className)}
      ref={ref}
      {...props}
    >
      <Stack gap={gap}>{children}</Stack>
    </form>
  )
}

export { Form }
