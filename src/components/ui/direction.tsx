"use client"

import * as React from "react"

/** Text direction, either left-to-right or right-to-left. */
type Direction = "ltr" | "rtl"

const DirectionContext = React.createContext<Direction>("ltr")

/**
 * Context provider that sets the text direction for descendant components.
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
    <DirectionContext.Provider value={dir}>
      {children}
    </DirectionContext.Provider>
  )
}

/** Hook that returns the current text direction from DirectionProvider context. */
function useDirection(): Direction {
  return React.useContext(DirectionContext)
}

export { DirectionProvider, useDirection }
export type { Direction }
