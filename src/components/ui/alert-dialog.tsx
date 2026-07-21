"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"

import { cn } from "@/lib/utils"
import { withAsChild } from "@/lib/slot"
import { buttonVariants } from "@/components/ui/button"

/** Root component that manages alert dialog open/close state. */
const AlertDialog = AlertDialogPrimitive.Root

/** Button that opens the alert dialog. */
const AlertDialogTrigger = withAsChild(AlertDialogPrimitive.Trigger)

/** Portal that renders alert dialog content outside the DOM hierarchy. */
const AlertDialogPortal = AlertDialogPrimitive.Portal

/** Semi-transparent backdrop rendered behind the alert dialog. */
function AlertDialogOverlay({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Backdrop>) {
  return (
    <AlertDialogPrimitive.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/80  data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0",
        className
      )}
      {...props}
      ref={ref}
      data-slot="alert-dialog-overlay"
    />
  )
}

/** Centered modal panel containing the alert dialog body. */
function AlertDialogContent({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Popup>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        ref={ref}
        data-slot="alert-dialog-content"
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-2 bg-card text-card-foreground p-6 shadow-hard-lg duration-200 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-closed:slide-out-to-left-1/2 data-closed:slide-out-to-top-[48%] data-open:slide-in-from-left-1/2 data-open:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

/** Layout wrapper for the title and description at the top of the dialog. */
function AlertDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-start",
        className
      )}
      {...props}
    />
  )
}

/** Layout wrapper for action/cancel buttons at the bottom of the dialog. */
function AlertDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
}

/** Accessible title rendered inside the alert dialog header. */
function AlertDialogTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      data-slot="alert-dialog-title"
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  )
}

/** Accessible description text rendered inside the alert dialog header. */
function AlertDialogDescription({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      data-slot="alert-dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/** Primary confirmation button that closes the dialog on click. */
function AlertDialogAction({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Close>) {
  return (
    <AlertDialogPrimitive.Close
      ref={ref}
      data-slot="alert-dialog-action"
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

/** Secondary cancel button that dismisses the dialog. */
function AlertDialogCancel({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Close>) {
  return (
    <AlertDialogPrimitive.Close
      ref={ref}
      data-slot="alert-dialog-cancel"
      className={cn(
        buttonVariants({ variant: "outline" }),
        "mt-2 sm:mt-0",
        className
      )}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
