import { cva, type VariantProps } from "class-variance-authority"

// The class recipe, kept out of `overline.tsx` so a server component can call
// it. `Timeline` and `Table` call it during render, and calling a client-
// boundary function from the server throws at prerender time. See
// src/variants.ts for why a re-export through the root barrel is not enough.

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
