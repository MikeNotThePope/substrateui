import { cva } from "class-variance-authority"

// The class recipe, kept out of `native-select.tsx` so a server component can call it.
// See src/variants.ts for why a re-export through the root barrel is not
// enough.

/** Size variants for the native select element. Use with cn(nativeSelectVariants({...})) for non-select elements. */
export const nativeSelectVariants = cva(
  "w-full border-2 rounded-md bg-background px-3 text-sm appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-9",
        default: "h-10",
        lg: "h-11",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)
