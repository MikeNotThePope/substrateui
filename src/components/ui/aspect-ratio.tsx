"use client"

import * as React from "react"

/**
 * Constrains its child to a given width-to-height ratio.
 *
 * @example
 * <AspectRatio ratio={16 / 9}><img src="/hero.jpg" /></AspectRatio>
 */
function AspectRatio({
  ratio = 1,
  style,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div"> & {
  ratio?: number
}) {
  return (
    <div
      ref={ref}
      data-slot="aspect-ratio"
      style={{ aspectRatio: ratio, ...style }}
      {...props}
    />
  )
}

export { AspectRatio }
