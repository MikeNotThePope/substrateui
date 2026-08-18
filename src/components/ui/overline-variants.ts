import { cva, type VariantProps } from "class-variance-authority"

/**
 * The overline class recipe, deliberately kept out of `overline.tsx`.
 *
 * `overline.tsx` carries `"use client"` because `useRender` is a hook, and that
 * directive marks *every* export of a module as a client reference — not just
 * the component. `Timeline` and `Table` are server components that call this
 * recipe during render, and calling a client-boundary function from the server
 * throws at prerender time:
 *
 *   Attempted to call overlineVariants() from the server but overlineVariants
 *   is on the client.
 *
 * Rendering a client component from a server one is fine, which is why
 * `Divider`, `StatCard` and `FooterBlock` can use `<Overline>` directly. Only
 * the function call needs to live on this side of the line.
 */
export const overlineVariants = cva(
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

export type OverlineVariants = VariantProps<typeof overlineVariants>
