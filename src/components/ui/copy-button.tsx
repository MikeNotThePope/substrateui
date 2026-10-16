"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { resolveLabels } from "@/lib/resolve-labels"
import { useLabels } from "@/components/providers/labels-provider"
import { useClipboard } from "@/hooks/use-clipboard"
import { Button, type ButtonProps } from "@/components/ui/button"

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by CopyButton. All keys have English defaults. */
interface CopyButtonLabels {
  copied?: string
}

const defaultCopyButtonLabels: Required<CopyButtonLabels> = {
  copied: "Copied",
}

/** Props for the CopyButton component. */
interface CopyButtonProps
  extends Omit<ButtonProps, "children" | "value" | "onClick" | "render"> {
  /** The text copied. `null` disables the button: there is nothing to copy yet. */
  value: string | null
  /** Accessible name, naming what it copies ("Copy apply link"). Nothing is drawn from it. */
  label: string
  labels?: CopyButtonLabels
}

/**
 * A square outline button that copies a value, for one that sits beside the
 * thing it copies: a link, an address, a number. The value itself stays
 * whatever it was; `CopyField` is the one that draws the value in a box.
 *
 * The icon is `Copy` and its name is `label`. For two seconds after a copy the
 * icon is a `Check` and the name is "Copied". A refused clipboard changes
 * nothing, so the button still reads as Copy. `null` disables it.
 *
 * @example
 * <a href={url}>{url}</a>
 * <CopyButton value={url} label="Copy company page link" />
 *
 * @prop value - The text copied, or null to disable the button.
 * @prop label - Accessible name, e.g. "Copy apply link".
 * @prop labels - Translatable strings: `copied`.
 * @prop variant - Button variant. Default "outline".
 * @prop size - Button size. Default "icon"; "icon-sm" beside a small control.
 */
function CopyButton({
  value,
  label,
  labels: labelsProp,
  variant = "outline",
  size = "icon",
  disabled,
  ...props
}: CopyButtonProps) {
  const ctx = useLabels()
  const labels = resolveLabels(defaultCopyButtonLabels, ctx.copyButton, labelsProp)
  const { copy, copied } = useClipboard()

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      data-slot="copy-button"
      disabled={disabled ?? value === null}
      // The name flips with the icon, so a screen reader that re-reads the
      // focused button hears what a sighted reader sees.
      aria-label={copied ? labels.copied : label}
      onClick={() => {
        // Fire and forget: useClipboard owns the copied state, and a refusal
        // has nothing a reader could act on.
        if (value !== null) void copy(value)
      }}
      {...props}
    >
      {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
    </Button>
  )
}

export { CopyButton, type CopyButtonProps, type CopyButtonLabels }
