"use client"

import * as React from "react"
import { useDirectionController } from "@/components/providers/direction-controller"

export function DirectionToggle() {
  const { direction, setDirection } = useDirectionController()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-9" />

  return (
    <div
      className="inline-flex items-center rounded-lg border-2 p-1"
      role="group"
      aria-label="Text direction"
    >
      <button
        type="button"
        onClick={() => setDirection("ltr")}
        aria-pressed={direction === "ltr"}
        className={`px-2.5 h-7 rounded-md text-xs font-medium transition-colors ${
          direction === "ltr"
            ? "bg-secondary text-secondary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        LTR
      </button>
      <button
        type="button"
        onClick={() => setDirection("rtl")}
        aria-pressed={direction === "rtl"}
        className={`px-2.5 h-7 rounded-md text-xs font-medium transition-colors ${
          direction === "rtl"
            ? "bg-secondary text-secondary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        RTL
      </button>
    </div>
  )
}
