"use client"

import * as React from "react"

type Direction = "ltr" | "rtl"

const DirectionContext = React.createContext<Direction>("ltr")

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

function useDirection(): Direction {
  return React.useContext(DirectionContext)
}

export { DirectionProvider, useDirection }
export type { Direction }
