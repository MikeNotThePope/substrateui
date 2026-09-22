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
 * Selection is a fill and a filled mark, not a border colour. An unlayered
 * `* { border-color: var(--border) }` in tokens.css outranks every
 * `border-<colour>` utility in the sheet, so a card that showed it was picked
 * by turning its border `border-primary` would render identically to a resting
 * one. That is a system-wide bug reported on MikeNotThePope/substrateui#144,
 * not this component's to fix — but a selected state has to be visible today,
 * and `bg-accent` is not in the cascade's way. `foreground on accent` and
 * `muted-foreground on accent` both pass AA in all six themes.
 *
 * `readOnly` dims nothing. A frozen answer is final, not unavailable: Base UI
 * gives it `aria-readonly` and `data-readonly`, and the only thing this recipe
 * takes away is the hover and the pointer. `disabled` is the state that dims.
 */
export const choiceCardVariants = cva(
  [
    "group/choice-card relative flex w-full min-h-11 items-start gap-3 rounded-lg border-2 border-input bg-background p-3.5 text-start text-base text-foreground transition-colors",
    "cursor-pointer select-none hover:bg-surface-interactive",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "data-[checked]:bg-accent data-[checked]:hover:bg-accent",
    "data-[readonly]:cursor-default data-[readonly]:hover:bg-background data-[readonly]:data-[checked]:hover:bg-accent",
    "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[disabled]:hover:bg-background",
  ].join(" ")
)

/**
 * The mark: the 18px circle or box at the start of the card.
 *
 * The size, the border weight and the corner are written as the same literal
 * tokens `RadioGroupItem` and `Checkbox` use, because a card is a bigger target
 * around the same control, not a bigger control. It is the one thing lavahire's
 * copy of this pattern needed a test for — its live control drew `rounded-sm`
 * where its read-only twin drew `rounded`, which is the sort of difference
 * nobody spots side by side and everybody spots in a screenshot. Here there is
 * one card rather than a twin, so the pair that can still drift is this mark
 * against the standalone control, and `choice-card.test.tsx` compares them.
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
          "rounded group-data-[checked]/choice-card:bg-primary group-data-[checked]/choice-card:text-primary-foreground",
      },
    },
    defaultVariants: {
      shape: "radio",
    },
  }
)
