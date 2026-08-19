import { cva } from "class-variance-authority"

// The class recipe, kept out of `button.tsx` so a server component can call it.
// See src/variants.ts for why a re-export through the root barrel is not
// enough.

/**
 * Hard-shadow press mechanics shared by solid variants: rest on a small
 * offset shadow, lift toward the light on hover, sink flush on press.
 */
const pressable =
  "shadow-hard-sm hover:-translate-x-px hover:-translate-y-px hover:shadow-hard active:translate-x-[3px] active:translate-y-[3px] active:shadow-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 motion-reduce:active:translate-x-0 motion-reduce:active:translate-y-0"

/**
 * The saturated secondary fill, as opposed to `secondary`, which is the tinted
 * surface. Shared by `secondary-fill` and its deprecated alias `amber` so the
 * two can't drift apart.
 */
const secondaryFill = `bg-secondary-fill text-secondary-fill-foreground border-2 border-secondary-fill-border hover:bg-secondary-fill-hover ${pressable}`

/** Button style variants (variant + size). Use with cn(buttonVariants({...})) for non-button elements. */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-[transform,box-shadow,background-color,color,border-color] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: `bg-primary text-primary-foreground border-2 border-primary-border hover:bg-primary/90 ${pressable}`,
        destructive: `bg-destructive text-destructive-foreground border-2 border-transparent hover:bg-destructive/90 ${pressable}`,
        outline: `border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground ${pressable}`,
        secondary: `bg-secondary text-secondary-foreground border-2 border-transparent hover:bg-secondary/80 ${pressable}`,
        "secondary-fill": secondaryFill,
        /** @deprecated Renamed to `secondary-fill` in 1.16. "Amber" is the
         *  plum palette's name for this slot; every theme colours it
         *  differently, so the colour can't be in the API. Kept as an alias
         *  because it shipped in 1.x. */
        amber: secondaryFill,
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:translate-y-[1.5px] motion-reduce:active:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
