import * as React from "react"

import { cn } from "@/lib/utils"

/** Semantic h1 heading with bold, tight tracking at 4xl size. */
function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      data-slot="h1"
      className={cn("text-4xl font-bold tracking-tight", className)}
      {...props}
    />
  )
}

/** Semantic h2 heading with semibold weight at 3xl size. */
function H2({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      data-slot="h2"
      className={cn("text-3xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

/** Semantic h3 heading with semibold weight at 2xl size. */
function H3({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="h3"
      className={cn("text-2xl font-semibold", className)}
      {...props}
    />
  )
}

/** Semantic h4 heading with semibold weight at xl size. */
function H4({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      data-slot="h4"
      className={cn("text-xl font-semibold", className)}
      {...props}
    />
  )
}

/** Standard paragraph element with base size and relaxed leading. */
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

/** Lead paragraph rendered in xl muted text for introductory copy. */
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

/** Large semibold text block rendered as a div. */
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

/** Small text element with medium weight and tight leading. */
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

/** Muted paragraph in small size for secondary or helper text. */
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

/** Inline code snippet with monospace font and sunken background. */
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

/** Inline monospace span without background styling. */
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
