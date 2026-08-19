import { cva } from "class-variance-authority"

// The class recipe, kept out of `spinner.tsx` so a server component can call it.
// See src/variants.ts for why a re-export through the root barrel is not
// enough.

/** Spinner size variants. Use with cn(spinnerVariants({...})) for non-spinner elements. */
export const spinnerVariants = cva(
  "rounded-full border-2",
  {
    variants: {
      size: {
        sm: "size-4",
        default: "size-6",
        lg: "size-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)
