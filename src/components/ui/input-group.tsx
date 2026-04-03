import * as React from "react"

import { cn } from "@/lib/utils"

function InputGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="input-group"
      className={cn(
        "flex items-center border-2 rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        "[&_input]:border-0 [&_input]:focus-visible:ring-0 [&_input]:focus-visible:ring-offset-0",
        className
      )}
      {...props}
    />
  )
}

function InputGroupPrefix({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="input-group-prefix"
      className={cn("flex items-center pl-3 text-muted-foreground", className)}
      {...props}
    />
  )
}

function InputGroupSuffix({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="input-group-suffix"
      className={cn("flex items-center pr-3 text-muted-foreground", className)}
      {...props}
    />
  )
}

export { InputGroup, InputGroupPrefix, InputGroupSuffix }
