import { cva } from "class-variance-authority"

// The class recipes, kept out of `choice-card.tsx` so a server component can
// call them. See src/variants.ts for why a re-export through the root barrel is
// not enough.

/**
 * The choice card's box: the whole row a reader clicks, not the mark inside it.
 *
 * The card *is* the control — `Radio.Root` and `Checkbox.Root` render this
 * element — so the target is the box, and "large-target" means a number:
 * `min-h-11` is 2.75rem, the 44px of WCAG 2.2 SC 2.5.5 (Target Size, Enhanced),
 * against the 24px floor of SC 2.5.8. Width comes from the caller's column.
 *
 * Selection is a fill and a filled mark, not a border colour: a fill changes
 * the whole card, where a recoloured 2px edge is easy to miss. It was also the
 * only signal that worked while tokens.css's `*` border rule sat unlayered and
 * outranked every `border-<colour>` utility (MikeNotThePope/substrateui#144).
 * `foreground on accent` and `muted-foreground on accent` both pass AA in all
 * six themes.
 *
 * Neither `readOnly` nor `presentational` dims. A frozen answer is final, not
 * unavailable, and a staff preview of a form is not a disabled form: all this
 * recipe takes away from either is the hover and the pointer. `disabled` is the
 * one state that dims. `presentational` also restores text selection, because
 * a picture of a form is text a reader may want to copy.
 */
export const choiceCardVariants = cva(
  [
    "group/choice-card relative flex w-full min-h-11 items-start gap-3 rounded-lg border-2 border-input bg-background p-3.5 text-start text-base text-foreground transition-colors",
    "cursor-pointer select-none hover:bg-surface-interactive",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "data-[checked]:bg-accent data-[checked]:hover:bg-accent",
    "data-[readonly]:cursor-default data-[readonly]:hover:bg-background data-[readonly]:data-[checked]:hover:bg-accent",
    "data-[presentational]:cursor-default data-[presentational]:select-text data-[presentational]:hover:bg-background data-[presentational]:data-[checked]:hover:bg-accent",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-background",
  ].join(" ")
)

/**
 * The mark: the 18px circle or box at the start of the card.
 *
 * The size, the border weight and the corner are written as the same literal
 * tokens `RadioGroupItem` and `Checkbox` use, because a card is a bigger target
 * around the same control, not a bigger control. `choice-card.test.tsx`
 * compares the two, which keeps them together and cannot tell whether the
 * token they share is right.
 *
 * It was not. Both drew bare `rounded`, which is `--radius` (0.625rem), off the
 * `--radius-factor` ladder: 10px on an 18px box clamps to a circle, so every
 * checkbox read as a radio (#159). lavahire's live control drew `rounded-sm`,
 * a 1px corner, and that was the right one, not the drift. The box is
 * `rounded-sm` now, so it scales with the theme like every other corner, and
 * `tests/visual/mark-corner.behavior.spec.ts` reads the computed corner
 * against the box's own width in every palette.
 *
 * `mt-0.5` sits the mark on the label's first line rather than centring it
 * against a two-line card.
 */
export const choiceCardMarkVariants = cva(
  "mt-0.5 flex h-[18px] w-[18px] flex-none items-center justify-center border-2 border-primary text-primary transition-colors",
  {
    variants: {
      shape: {
        radio: "rounded-full",
        checkbox:
          "rounded-sm group-data-[checked]/choice-card:bg-primary group-data-[checked]/choice-card:text-primary-foreground",
      },
    },
    defaultVariants: {
      shape: "radio",
    },
  }
)
