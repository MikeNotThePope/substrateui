import * as React from "react"

import { cn } from "@/lib/utils"
import { Stack } from "./stack"
import { Grid } from "./grid"

function FormSection({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"fieldset">) {
  return (
    <fieldset
      data-slot="form-section"
      className={cn("space-y-6 border-0 p-0 m-0", className)}
      ref={ref}
      {...props}
    />
  )
}

function FormSectionHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="form-section-header"
      className={cn("space-y-1", className)}
      {...props}
    />
  )
}

function FormSectionTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLLegendElement>) {
  return (
    <legend
      data-slot="form-section-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

function FormSectionDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="form-section-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

interface FormSectionContentProps extends React.ComponentPropsWithRef<"div"> {
  layout?: "stack" | "grid"
}

function FormSectionContent({
  layout = "stack",
  className,
  ref,
  children,
  ...props
}: FormSectionContentProps) {
  if (layout === "grid") {
    return (
      <Grid
        data-slot="form-section-content"
        columns={1}
        gap="md"
        className={cn("md:grid-cols-2", className)}
        ref={ref}
        {...props}
      >
        {children}
      </Grid>
    )
  }

  return (
    <Stack
      data-slot="form-section-content"
      gap="md"
      className={className}
      ref={ref}
      {...props}
    >
      {children}
    </Stack>
  )
}

export {
  FormSection,
  FormSectionHeader,
  FormSectionTitle,
  FormSectionDescription,
  FormSectionContent,
}
