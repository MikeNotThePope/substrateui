"use client"

import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import { badgeVariants } from "./badge"

/** Horizontal, link-based tab bar for page-level navigation.
 *
 * Unlike Tabs (which swaps panels client-side), each NavTabsLink is a real
 * anchor — pair it with server-driven routing (e.g. a `?tab=` query param) so
 * tabs stay bookmarkable and the browser back button works.
 *
 * @example
 * <NavTabs>
 *   <NavTabsLink asChild active><Link href="?tab=a">A</Link></NavTabsLink>
 *   <NavTabsLink asChild><Link href="?tab=b">B</Link></NavTabsLink>
 * </NavTabs>
 */
function NavTabs({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<"nav">) {
  return (
    <nav
      ref={ref}
      data-slot="nav-tabs"
      className={cn(
        "flex items-center gap-1 overflow-x-auto border-b-2 border-border",
        className
      )}
      {...props}
    />
  )
}

/** Props accepted by NavTabsLink. */
export interface NavTabsLinkProps extends React.ComponentPropsWithRef<"a"> {
  /** Marks this tab as the current one (underline + aria-current). */
  active?: boolean
  /** Dims the tab and blocks interaction. */
  disabled?: boolean
  /** Optional trailing count/status pill. */
  badge?: React.ReactNode
  /** Merge props onto the child element (e.g. a Next.js `<Link>`) instead of rendering an `<a>`. */
  asChild?: boolean
}

/**
 * A single tab within NavTabs. Renders an `<a>` by default, or merges onto its
 * child via `asChild` (so you can pass a framework `<Link>` for soft navigation).
 *
 * @prop active - Current tab: draws the underline and sets aria-current="page"
 * @prop disabled - Dims and blocks interaction (aria-disabled)
 * @prop badge - Optional trailing count/status pill
 * @prop asChild - Merge props onto the child element instead of rendering an <a>
 */
function NavTabsLink({
  className,
  active,
  disabled,
  badge,
  asChild = false,
  children,
  ref,
  ...props
}: NavTabsLinkProps) {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      ref={ref}
      data-slot="nav-tabs-link"
      data-active={active ? "" : undefined}
      aria-current={active ? "page" : undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        "-mb-[2px] inline-flex items-center gap-2 whitespace-nowrap rounded-t-md border-b-2 border-transparent px-3 py-2 text-sm font-medium text-muted-foreground ring-offset-background transition-colors transition-transform hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-[1.5px] data-[active]:border-primary data-[active]:text-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {badge != null && (
        <span className={cn(badgeVariants({ variant: "secondary" }))}>
          {badge}
        </span>
      )}
    </Comp>
  )
}

export { NavTabs, NavTabsLink }
