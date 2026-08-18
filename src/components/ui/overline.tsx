"use client"

import { useRender } from "@base-ui/react/use-render"
import { mergeProps } from "@base-ui/react/merge-props"

import { cn } from "@/lib/utils"
import { overlineVariants, type OverlineVariants } from "./overline-variants"

/** Props accepted by the Overline component. */
export interface OverlineProps
  extends useRender.ComponentProps<"span">,
    OverlineVariants {}

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
 * The class recipe lives in `./overline-variants`, which has no `"use client"`,
 * so server components can call it without crossing the boundary. Do not
 * re-export it from here — a re-export through a client module is still a
 * client reference.
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

export { Overline }
