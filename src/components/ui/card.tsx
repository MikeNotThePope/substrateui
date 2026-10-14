import * as React from "react"

import { cn } from "@/lib/utils"

// A Card holding a CardLink is a linked card: the link's hit area stretches
// over the whole card, so a click anywhere opens it, and what sits in
// CardRaised stays above that area, so its text selects and its controls
// click. It lifts on hover and rings when the link has focus. It never presses
// in: `interactive`'s 3px shift moves the text under a drag that is selecting
// it, and the link already paints the pointer where a click opens the card.
// `:has` rather than a prop, so a CardLink cannot stretch past a card that
// forgot to say it holds one.
const LINKED =
  "has-[[data-slot=card-link]]:relative has-[[data-slot=card-link]]:transition-[transform,box-shadow,border-color] has-[[data-slot=card-link]]:motion-reduce:transition-none has-[[data-slot=card-link]]:hover:border-ring has-[[data-slot=card-link]]:hover:-translate-x-0.5 has-[[data-slot=card-link]]:hover:-translate-y-0.5 has-[[data-slot=card-link]]:hover:shadow-hard-lg has-[[data-slot=card-link]]:motion-reduce:hover:translate-x-0 has-[[data-slot=card-link]]:motion-reduce:hover:translate-y-0 has-[[data-slot=card-link]:focus-visible]:ring-2 has-[[data-slot=card-link]:focus-visible]:ring-ring has-[[data-slot=card-link]:focus-visible]:ring-offset-2 has-[[data-slot=card-link]:focus-visible]:ring-offset-background"

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
        LINKED,
        className
      )}
      {...props}
    />
  )
}

/** An element to render as, such as a router's link, given the merged props. */
type Render = React.ReactElement<{ className?: string }>

// cloneElement, not Base UI's useRender: Card renders on the server, and a
// hook would make this module a client one.
function renderAs(
  tag: "a" | "div",
  render: Render | undefined,
  props: Record<string, unknown> & { className?: string }
) {
  if (!render) return React.createElement(tag, props)
  return React.cloneElement(render, {
    ...props,
    className: cn(props.className, render.props.className),
  })
}

/**
 * The card's link, usually its title. Its hit area stretches over the whole
 * Card, so a click anywhere on the card opens it. Pass `render` for a
 * router's link.
 *
 * @example
 * <Card><CardLink href="/jobs/1">Field Volcanologist</CardLink><CardRaised>Hilo, HI</CardRaised></Card>
 */
function CardLink({
  className,
  render,
  ...props
}: React.ComponentPropsWithRef<"a"> & { render?: Render }) {
  return renderAs("a", render, {
    "data-slot": "card-link",
    className: cn(
      "text-foreground no-underline outline-none after:absolute after:inset-0 after:content-['']",
      className
    ),
    ...props,
  })
}

/**
 * Content of a linked Card that sits above its CardLink's hit area: text a
 * person selects and copies, or a control of its own. A click on it does not
 * open the card. Pass `render` to draw it as another element, such as a `<p>`.
 */
function CardRaised({
  className,
  render,
  ...props
}: React.ComponentPropsWithRef<"div"> & { render?: Render }) {
  return renderAs("div", render, {
    "data-slot": "card-raised",
    className: cn("relative z-10", className),
    ...props,
  })
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

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardLink,
  CardRaised,
}
