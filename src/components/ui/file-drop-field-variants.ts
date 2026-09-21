import { cva } from "class-variance-authority"

// The class recipe, kept out of `file-drop-field.tsx` so a server component can
// call it. See src/variants.ts for why a re-export through the root barrel is
// not enough.

/**
 * FileDropField box variants (size + invalid). Use with
 * `cn(fileDropFieldVariants({...}))` to give a custom drop target the same box.
 *
 * `size` moves three things at once — padding, type scale and the icon — because
 * the two hand-rolled copies this replaces disagreed on exactly that
 * combination (MikeNotThePope/substrateui#123) and sizing them separately is
 * how they drifted apart in the first place.
 */
export const fileDropFieldVariants = cva(
  // `border-dashed` is the whole affordance: it says drop here in a way no
  // label text has to. The ring goes on the box rather than the input, because
  // the input is a 1px sr-only box and a ring around it is invisible.
  "relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-background text-center transition-colors hover:bg-surface-interactive focus-within:outline-none focus-within:border-ring focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 data-[dragging=true]:border-ring data-[dragging=true]:bg-surface-interactive has-[input:disabled]:pointer-events-none has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
  {
    variants: {
      size: {
        sm: "gap-1.5 p-4 text-xs [&_svg]:size-4",
        default: "gap-2 p-6 text-sm [&_svg]:size-6",
        lg: "gap-3 p-10 text-base [&_svg]:size-8",
      },
      // The resting border colour lives here rather than in the base, so the
      // two never both apply and the outcome does not depend on how
      // tailwind-merge ranks two custom border colours against each other.
      invalid: {
        true: "border-status-error",
        false: "border-input",
      },
    },
    defaultVariants: {
      size: "default",
      invalid: false,
    },
  }
)
