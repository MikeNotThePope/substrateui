"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"
import { useClipboard } from "@/hooks/use-clipboard"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by CopyField. All keys have English defaults. */
interface CopyFieldLabels {
  copy?: string
  copied?: string
}

const defaultCopyFieldLabels: Required<CopyFieldLabels> = {
  copy: "Copy",
  copied: "Copied",
}

/** Props for the CopyField component. */
interface CopyFieldProps
  extends Omit<React.ComponentPropsWithRef<"div">, "children"> {
  /** The text shown and copied. */
  value: string
  /**
   * Accessible name of the copy button, naming what it copies ("Copy
   * reference"). Defaults to `labels.copy`. The visible text stays `labels.copy`,
   * so start `label` with it: a name that contains the visible words is what
   * lets a voice user say "click Copy" (WCAG 2.5.3).
   */
  label?: string
  labels?: CopyFieldLabels
}

/**
 * A read-only value in a mono block with a copy button at its end edge.
 *
 * The button's icon and text flip to a check and "Copied" for two seconds after
 * a copy, and a polite live region says so. When the browser refuses the clipboard (plain
 * http, a denied permission), the value is selected instead, so the reader's
 * own long-press or Ctrl+C still works. A tap on the value selects it whole.
 *
 * @example
 * <CopyField value={reference} label="Copy reference" />
 *
 * @prop value - The text shown and copied.
 * @prop label - Accessible name of the copy button.
 * @prop labels - Translatable strings for the button and the announcement.
 */
function CopyField({
  value,
  label,
  labels: labelsProp,
  className,
  ...props
}: CopyFieldProps) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultCopyFieldLabels, ctx.copyField, labelsProp)
  const { copy, copied, error } = useClipboard()
  const valueRef = React.useRef<HTMLElement>(null)

  // A refused clipboard leaves the reader to copy by hand, so do the
  // selecting for them. Keyed on the error object: each refusal is a new one.
  React.useEffect(() => {
    if (!error || !valueRef.current) return
    window.getSelection()?.selectAllChildren(valueRef.current)
  }, [error])

  return (
    <div
      data-slot="copy-field"
      className={cn(
        "flex min-w-0 items-stretch rounded-md border-2 border-input bg-background text-foreground",
        className
      )}
      {...props}
    >
      <code
        ref={valueRef}
        dir="auto"
        className="min-w-0 flex-1 select-all break-all px-3 py-2 font-mono text-sm"
      >
        {value}
      </code>
      <button
        type="button"
        // The name holds still: the live region says "Copied", and a focused
        // button renamed to the same word would be announced twice.
        aria-label={label ?? labels.copy}
        onClick={() => void copy(value)}
        className="flex shrink-0 items-center gap-1.5 rounded-e-sm border-s-2 border-input px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {copied ? (
          <Check className="size-4" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
        <span className="max-sm:sr-only">{copied ? labels.copied : labels.copy}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? labels.copied : ""}
      </span>
    </div>
  )
}

export { CopyField, type CopyFieldProps, type CopyFieldLabels }
