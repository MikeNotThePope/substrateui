"use client"

import * as React from "react"
import { DirectionProvider } from "@/components/ui/direction"

type Direction = "ltr" | "rtl"

const STORAGE_KEY = "substrateui-direction"

const DirectionControllerContext = React.createContext<{
  direction: Direction
  setDirection: (d: Direction) => void
}>({ direction: "ltr", setDirection: () => {} })

/**
 * App-level direction provider. Reads initial direction from localStorage,
 * mirrors it onto <html dir> so Base UI portals inherit it, and exposes a
 * setter via useDirectionController(). Mounted at the root layout so every
 * page respects the toggle — not just /docs.
 */
export function DirectionController({
  children,
}: {
  children: React.ReactNode
}) {
  const [direction, setDirectionState] = React.useState<Direction>("ltr")

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Direction | null
    if (stored === "ltr" || stored === "rtl") {
      setDirectionState(stored)
      document.documentElement.setAttribute("dir", stored)
    } else {
      document.documentElement.setAttribute("dir", "ltr")
    }
  }, [])

  const setDirection = React.useCallback((d: Direction) => {
    setDirectionState(d)
    document.documentElement.setAttribute("dir", d)
    localStorage.setItem(STORAGE_KEY, d)
  }, [])

  return (
    <DirectionControllerContext.Provider value={{ direction, setDirection }}>
      <DirectionProvider dir={direction}>{children}</DirectionProvider>
    </DirectionControllerContext.Provider>
  )
}

export function useDirectionController() {
  return React.useContext(DirectionControllerContext)
}
