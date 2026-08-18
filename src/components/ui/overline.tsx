"use client"

import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const overlineVariants = cva(
  "font-mono uppercase tracking-wider text-muted-foreground",
  {
    variants: {
      size: {
        "2xs": "text-2xs",
        xs: "text-xs",
        sm: "text-sm",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

/** Props accepted by the Overline component. */
export interface OverlineProps
  extends useRender.ComponentProps<"span">,
    VariantProps<typeof overlineVariants> {}

/**
 * A short label set above or beside the thing it names — a section caption, a
 * table header, a status eyebrow. Monospace, uppercase and letter-spaced, which
 * is the treatment this system already used in six places under six slightly
 * different class strings.
 *
 * It carries no semantics of its own. Render it as whatever the surrounding
 * document needs: a `<span>` by default, an `<h3>` when it is genuinely a
 * heading, a `<p>` in a card.
 *
 * @example
 * <Overline>Section</Overline>
 * <Overline size="2xs">Draft</Overline>
 * <Overline render={<h3 />}>Resources</Overline>
 *
 * @prop size - `2xs` (11px), `xs` (12px, default), or `sm` (14px).
 * @prop render - Render a different element, keeping the styling.
 */
function Overline({ className, size, render, ...props }: OverlineProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(
      {
        className: cn(overlineVariants({ size }), className),
        "data-slot": "overline",
      } as useRender.ElementProps<"span">,
      props
    ),
  })
}

export { Overline, overlineVariants }
