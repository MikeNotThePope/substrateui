"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

/**
 * Circular container for a user profile image with fallback support.
 *
 * @example
 * <Avatar><AvatarImage src="/me.jpg" /><AvatarFallback>CN</AvatarFallback></Avatar>
 */
function Avatar({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

/** Image displayed inside an Avatar; hidden automatically when loading fails. */
function AvatarImage({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn("aspect-square h-full w-full", className)}
      {...props}
    />
  )
}

/** Placeholder content shown while the avatar image loads or when it fails. */
function AvatarFallback({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full border-2 bg-muted",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
