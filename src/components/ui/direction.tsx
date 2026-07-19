"use client"

import * as React from "react"
import { DirectionProvider as BaseDirectionProvider } from "@base-ui/react/direction-provider"

/** Text direction, either left-to-right or right-to-left. */
type Direction = "ltr" | "rtl"

/**
 * Context provider that sets the text direction for descendant components.
 * All Base UI-based components in this library read from this provider automatically.
 *
 * @example
 * <DirectionProvider dir="rtl">{children}</DirectionProvider>
 *
 * @prop dir - Text direction, defaults to "ltr"
 */
function DirectionProvider({
  dir = "ltr",
  children,
}: {
  dir?: Direction
  children: React.ReactNode
}) {
  return (
    <BaseDirectionProvider direction={dir}>{children}</BaseDirectionProvider>
  )
}

export { DirectionProvider }
/** Hook that returns the current text direction from DirectionProvider context. */
export { useDirection } from "@base-ui/react/direction-provider"
export type { Direction }
