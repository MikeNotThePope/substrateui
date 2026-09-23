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
  "relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-center transition-colors focus-within:outline-none focus-within:border-ring focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 data-[dragging=true]:border-ring data-[dragging=true]:bg-surface-interactive has-[input:disabled]:pointer-events-none has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "gap-1.5 p-4 text-xs [&_svg]:size-4",
        default: "gap-2 p-6 text-sm [&_svg]:size-6",
        lg: "gap-3 p-10 text-base [&_svg]:size-8",
      },
      // Both states name every colour they need, rather than one of them
      // overriding the other out of the base. The outcome then does not depend
      // on how tailwind-merge ranks two custom colours in the same group.
      //
      // The rejected state carries a fill and a text colour as well as the
      // border, matching `Alert`'s error variant, and both of those pairings
      // are in the contrast audit. A border alone is a colour-only signal, and
      // for a while it was not even that: tokens.css's `*` border rule sat
      // unlayered and outranked `border-status-error` (#144).
      invalid: {
        true: "border-status-error bg-status-error-surface text-status-error-text hover:bg-status-error-surface [&_svg]:text-status-error-text",
        false:
          "border-input bg-background hover:bg-surface-interactive [&_svg]:text-muted-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      invalid: false,
    },
  }
)
