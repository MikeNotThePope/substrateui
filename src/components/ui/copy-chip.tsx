"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"
import { useClipboard } from "@/hooks/use-clipboard"
import { announce } from "@/hooks/use-announcer"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by CopyChip. All keys have English defaults. */
interface CopyChipLabels {
  copy?: string
  copied?: string
}

const defaultCopyChipLabels: Required<CopyChipLabels> = {
  copy: "Copy",
  copied: "Copied",
}

/** Props for the CopyChip component. */
interface CopyChipProps
  extends Omit<React.ComponentPropsWithRef<"button">, "children" | "value" | "onClick" | "type"> {
  /** The text shown and copied. */
  value: string
  /**
   * Where the value may wrap: after each occurrence of this string, and nowhere
   * else. `"@"` lets an address break after its `@`. Unset, it never wraps.
   */
  breakAfter?: string
  labels?: CopyChipLabels
}

/** The value cut after each `breakAfter`, each piece kept whole. */
function pieces(value: string, breakAfter: string | undefined): string[] {
  if (!breakAfter) return [value]
  const parts = value.split(breakAfter)
  return parts
    .map((part, i) => (i < parts.length - 1 ? part + breakAfter : part))
    .filter((part) => part !== "")
}

/**
 * A value and a copy icon in one outlined inline chip, for a value set inside a
 * sentence: "Type <chip> to confirm". The whole chip is the button.
 *
 * Its name is the value itself, so a label the chip sits in still reads as the
 * sentence, and "Copy" is its description. For two seconds after a copy the
 * icon is a `Check` and "Copied" is announced. When the browser refuses the
 * clipboard (plain http, a denied permission), the value is selected instead,
 * so the reader's own long-press or Ctrl+C still works.
 *
 * The label must point at its field with `for` (`htmlFor`, or `FieldLabel`
 * inside a `Field`), never by wrapping it: a label with no `for` labels the
 * first control inside it, and the chip comes first.
 *
 * `CopyButton` is the bare icon beside a value; `CopyField` is a value in its
 * own box, on its own line.
 *
 * @example
 * <FieldLabel>Type <CopyChip value={email} breakAfter="@" /> to confirm</FieldLabel>
 *
 * @prop value - The text shown and copied.
 * @prop breakAfter - Where the value may wrap. Unset, it never wraps.
 * @prop labels - Translatable strings: `copy` (the description), `copied`.
 */
function CopyChip({
  value,
  breakAfter,
  labels: labelsProp,
  className,
  "aria-describedby": describedBy,
  ...props
}: CopyChipProps) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultCopyChipLabels, ctx.copyChip, labelsProp)
  const { copy, copied, error } = useClipboard()
  const valueRef = React.useRef<HTMLSpanElement>(null)
  const descriptionId = React.useId()
  // One per press that has settled, so a second copy inside the two seconds
  // is announced too: `copied` is already true then and would not change.
  const [settled, setSettled] = React.useState(0)

  // A live region in the chip would land in the sentence around it, and so
  // in the name of whatever field that sentence labels. The shared one sits
  // outside every label. Keyed on the press alone: a new `labels` mid-flight
  // is no reason to say it twice.
  React.useEffect(() => {
    if (settled > 0 && copied) announce(labels.copied)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settled])

  // A refused clipboard leaves the reader to copy by hand, so do the
  // selecting for them. Keyed on the error object: each refusal is a new one.
  React.useEffect(() => {
    if (!error || !valueRef.current) return
    window.getSelection()?.selectAllChildren(valueRef.current)
  }, [error])

  return (
    <button
      type="button"
      data-slot="copy-chip"
      // `hidden` keeps "Copy" out of the chip's name and out of any label's
      // text, while aria-describedby still reads it.
      aria-describedby={[descriptionId, describedBy].filter(Boolean).join(" ")}
      onClick={() => void copy(value).then(() => setSettled((n) => n + 1))}
      className={cn(
        "group inline-flex max-w-full items-center gap-1.5 rounded-sm border border-border px-1.5 align-middle text-start font-normal leading-6 transition-colors hover:border-primary hover:text-primary motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <span ref={valueRef} dir="auto" className="select-text">
        {pieces(value, breakAfter).map((piece, i) => (
          <React.Fragment key={i}>
            {i > 0 && <wbr />}
            <span className="whitespace-nowrap">{piece}</span>
          </React.Fragment>
        ))}
      </span>
      {copied ? (
        <Check className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
      ) : (
        <Copy className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
      )}
      <span id={descriptionId} hidden>
        {labels.copy}
      </span>
    </button>
  )
}

export { CopyChip, type CopyChipProps, type CopyChipLabels }
