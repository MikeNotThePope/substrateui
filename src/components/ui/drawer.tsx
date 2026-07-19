"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import { asChildRender } from "@/lib/as-child"
import { cn } from "@/lib/utils"

/**
 * Root drawer component built on Base UI Drawer; slides up from the bottom of
 * the viewport and can be swiped down to dismiss.
 *
 * @example
 * <Drawer>
 *   <DrawerTrigger>Open</DrawerTrigger>
 *   <DrawerContent><DrawerHeader><DrawerTitle>Title</DrawerTitle></DrawerHeader></DrawerContent>
 * </Drawer>
 */
function Drawer({
  shouldScaleBackground: _shouldScaleBackground,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & {
  /** @deprecated Vaul-era prop; background scaling is no longer applied. */
  shouldScaleBackground?: boolean
}) {
  return <DrawerPrimitive.Root swipeDirection="down" {...props} />
}

/** Button or element that opens the drawer when clicked. */
function DrawerTrigger({
  asChild,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Trigger> & {
  asChild?: boolean
}) {
  return (
    <DrawerPrimitive.Trigger
      {...asChildRender(asChild, children, { button: true })}
      {...props}
    />
  )
}

/** Portals drawer content into document body. */
const DrawerPortal = DrawerPrimitive.Portal

/** Button or element that closes the drawer when clicked. */
function DrawerClose({
  asChild,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Close> & {
  asChild?: boolean
}) {
  return (
    <DrawerPrimitive.Close
      {...asChildRender(asChild, children, { button: true })}
      {...props}
    />
  )
}

/** Semi-transparent backdrop overlay behind the drawer. */
function DrawerOverlay({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Backdrop>) {
  return (
    <DrawerPrimitive.Backdrop
      ref={ref}
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/80 opacity-[calc(1-var(--drawer-swipe-progress))] transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:duration-0 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

/** Drawer panel that slides up from the bottom with a drag handle. */
function DrawerContent({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Popup>) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Viewport className="fixed inset-0 z-50 flex flex-col justify-end">
        <DrawerPrimitive.Popup
          ref={ref}
          data-slot="drawer-content"
          className={cn(
            "mt-24 flex h-auto flex-col rounded-t-[10px] border-2 border-b-0 bg-background outline-none [transform:translateY(var(--drawer-swipe-movement-y))] transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] data-[swiping]:select-none data-[swiping]:duration-0 data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full",
            className
          )}
          {...props}
        >
          <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
          {children}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

/** Container for drawer title and description. */
function DrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("grid gap-1.5 p-4 text-center sm:text-start", className)}
      {...props}
    />
  )
}

/** Container for action buttons at the bottom of the drawer. */
function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  )
}

/** Accessible title heading for the drawer. */
function DrawerTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      ref={ref}
      data-slot="drawer-title"
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
}

/** Accessible description text displayed below the drawer title. */
function DrawerDescription({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      ref={ref}
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
