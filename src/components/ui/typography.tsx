import * as React from "react"

import { cn } from "@/lib/utils"

function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      data-slot="h1"
      className={cn("text-4xl font-bold tracking-tight", className)}
      {...props}
    />
  )
}

function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      data-slot="h2"
      className={cn("text-3xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="h3"
      className={cn("text-2xl font-semibold", className)}
      {...props}
    />
  )
}

function H4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      data-slot="h4"
      className={cn("text-xl font-semibold", className)}
      {...props}
    />
  )
}

function P({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="p"
      className={cn("text-base leading-7", className)}
      {...props}
    />
  )
}

function Lead({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="lead"
      className={cn("text-xl text-muted-foreground", className)}
      {...props}
    />
  )
}

function Large({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="large"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

function Small({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      data-slot="small"
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  )
}

function Muted({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="muted"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function Code({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      data-slot="code"
      className={cn(
        "font-mono text-sm bg-surface-sunken rounded px-[0.3rem] py-[0.2rem]",
        className
      )}
      {...props}
    />
  )
}

function Mono({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="mono"
      className={cn("font-mono text-sm", className)}
      {...props}
    />
  )
}

export { H1, H2, H3, H4, P, Lead, Large, Small, Muted, Code, Mono }
