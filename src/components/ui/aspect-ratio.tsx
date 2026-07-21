"use client"

import * as React from "react"

/** Props accepted by AspectRatio. */
export interface AspectRatioProps
  extends React.ComponentPropsWithRef<"div"> {
  /** Desired width/height ratio, e.g. 16 / 9. */
  ratio?: number
}

/**
 * Constrains its child to a given width-to-height ratio.
 *
 * @example
 * <AspectRatio ratio={16 / 9}><img src="/hero.jpg" /></AspectRatio>
 */
function AspectRatio({ ratio = 1, style, ...props }: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      style={{ position: "relative", aspectRatio: `${ratio}`, ...style }}
      {...props}
    />
  )
}

export { AspectRatio }
