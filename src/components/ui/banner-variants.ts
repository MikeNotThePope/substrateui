import { cva } from "class-variance-authority"

// The class recipe, kept out of `banner.tsx` so a server component can call it.
// See src/variants.ts for why a re-export through the root barrel is not
// enough.

/** Banner style variants keyed by intent. */
export const bannerVariants = cva(
  "flex w-full items-center gap-3 border-b-2 px-4 py-2.5 text-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-surface-raised text-foreground",
        primary: "border-primary-border bg-primary text-primary-foreground",
        info: "border-status-info bg-status-info-surface text-status-info-text",
        warning: "border-status-warning bg-status-warning-surface text-status-warning-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
