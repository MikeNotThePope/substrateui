import { cva } from "class-variance-authority"

// The class recipe, kept out of `badge.tsx` so a server component can call it.
// See src/variants.ts for why a re-export through the root barrel is not
// enough.

/** Badge style variants (default, secondary, destructive, outline, success, warning, error, info). Use with cn(badgeVariants({...})) for non-div elements. */
// text-[11px] rather than the text-2xs step it inspired, deliberately. The
// arbitrary value sets font-size and nothing else, so the badge's line box
// comes from whatever it sits inside; text-2xs pairs a line-height, which
// makes the badge a deterministic 24px instead of 28px in a text-sm
// context. That is the better behaviour and it is a visual change, so it
// wants its own PR and its own baselines rather than riding along here.
export const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 px-2.5 py-0.5 font-mono uppercase tracking-wider text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-status-success-surface text-status-success-text",
        warning:
          "border-transparent bg-status-warning-surface text-status-warning-text",
        error:
          "border-transparent bg-status-error-surface text-status-error-text",
        info:
          "border-transparent bg-status-info-surface text-status-info-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
