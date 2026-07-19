"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"

import { asChildRender } from "@/lib/as-child"
import { cn } from "@/lib/utils"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by Dialog. All keys have English defaults. */
interface DialogLabels {
  close?: string
}

const defaultDialogLabels: Required<DialogLabels> = {
  close: "Close",
}

/** Root dialog component that manages open/close state. */
const Dialog = DialogPrimitive.Root

/** Button or element that opens the dialog when clicked. */
function DialogTrigger({
  asChild,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Trigger> & {
  asChild?: boolean
}) {
  return (
    <DialogPrimitive.Trigger
      {...asChildRender(asChild, children, { button: true })}
      {...props}
    />
  )
}

/** Portals dialog content into document body. */
const DialogPortal = DialogPrimitive.Portal

/** Button or element that closes the dialog when clicked. */
function DialogClose({
  asChild,
  children,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Close> & {
  asChild?: boolean
}) {
  return (
    <DialogPrimitive.Close
      {...asChildRender(asChild, children, { button: true })}
      {...props}
    />
  )
}

/** Semi-transparent backdrop overlay behind the dialog. */
function DialogOverlay({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Backdrop>) {
  return (
    <DialogPrimitive.Backdrop
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * Centered dialog panel with overlay, close button, and animated transitions.
 *
 * @example
 * <Dialog>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogContent><DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader></DialogContent>
 * </Dialog>
 */
function DialogContent({
  className,
  children,
  labels: labelsProp,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Popup> & { labels?: DialogLabels }) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultDialogLabels, ctx.dialog, labelsProp)

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        ref={ref}
        data-slot="dialog-content"
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-2 bg-card text-card-foreground p-6 shadow-hard-lg duration-200 data-[open]:animate-in data-[closed]:animate-out data-[closed]:fade-out-0 data-[open]:fade-in-0 data-[closed]:zoom-out-95 data-[open]:zoom-in-95 data-[closed]:slide-out-to-left-1/2 data-[closed]:slide-out-to-top-[48%] data-[open]:slide-in-from-left-1/2 data-[open]:slide-in-from-top-[48%] sm:rounded-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute end-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[open]:bg-accent data-[open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">{labels.close}</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

/** Container for dialog title and description at the top of the dialog. */
function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-start",
        className
      )}
      {...props}
    />
  )
}

/** Container for action buttons at the bottom of the dialog. */
function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
}

/** Accessible title heading for the dialog. */
function DialogTitle({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="dialog-title"
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
}

/** Accessible description text displayed below the dialog title. */
function DialogDescription({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  type DialogLabels,
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
