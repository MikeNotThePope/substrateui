"use client"

import * as React from "react"
import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"

import { cn } from "@/lib/utils"

function createHeading(
  tag: "h1" | "h2" | "h3" | "h4",
  headingClassName: string
) {
  return function Heading({
    className,
    render,
    ...props
  }: useRender.ComponentProps<typeof tag>) {
    return useRender({
      defaultTagName: tag,
      render,
      props: mergeProps<typeof tag>(
        {
          className: cn(headingClassName, className),
          "data-slot": tag,
        } as useRender.ElementProps<typeof tag>,
        props
      ),
    })
  }
}

/** Semantic h1 heading with bold, tight tracking at 4xl size. */
const H1 = createHeading("h1", "text-4xl font-bold tracking-tight")

/** Semantic h2 heading with semibold weight at 3xl size. */
const H2 = createHeading("h2", "text-3xl font-semibold tracking-tight")

/** Semantic h3 heading with semibold weight at 2xl size. */
const H3 = createHeading("h3", "text-2xl font-semibold")

/** Semantic h4 heading with semibold weight at xl size. */
const H4 = createHeading("h4", "text-xl font-semibold")

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
