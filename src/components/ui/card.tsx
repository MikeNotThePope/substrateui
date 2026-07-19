import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Bordered container for grouping related content.
 *
 * @example
 * <Card><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent>Body</CardContent></Card>
 *
 * @prop interactive - Adds hover and click styles when true
 */
function Card({
  className,
  interactive = false,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div"> & { interactive?: boolean }) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        "rounded-lg border-2 bg-card text-card-foreground shadow-hard",
        interactive &&
          "cursor-pointer transition-[transform,box-shadow,border-color] motion-reduce:transition-none hover:border-ring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 motion-reduce:active:translate-x-0 motion-reduce:active:translate-y-0",
        className
      )}
      {...props}
    />
  )
}

/** Top section of a Card containing the title and description. */
function CardHeader({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
}

/** Primary heading inside a CardHeader. */
function CardTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
}

/** Secondary description text inside a CardHeader. */
function CardDescription({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/** Main body area of a Card. */
function CardContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
}

/** Bottom section of a Card, typically for actions. */
function CardFooter({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
