"use client"

import * as React from "react"
import { useDirectionController } from "@/components/providers/direction-controller"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by DirectionToggle. All keys have English defaults. */
interface DirectionToggleLabels {
  textDirection?: string
  ltr?: string
  rtl?: string
}

const defaultDirectionToggleLabels: Required<DirectionToggleLabels> = {
  textDirection: "Text direction",
  ltr: "LTR",
  rtl: "RTL",
}

export function DirectionToggle({ labels: labelsProp }: { labels?: DirectionToggleLabels } = {}) {
  const { direction, setDirection } = useDirectionController()
  const [mounted, setMounted] = React.useState(false)
  const ctx = useLabels()
  const labels = resolveLabels(defaultDirectionToggleLabels, ctx.directionToggle, labelsProp)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-9" />

  return (
    <div
      className="inline-flex items-center rounded-lg border-2 p-1"
      role="group"
      aria-label={labels.textDirection}
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
        {labels.ltr}
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
        {labels.rtl}
      </button>
    </div>
  )
}

export type { DirectionToggleLabels }
