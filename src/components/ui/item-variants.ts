import { cva } from "class-variance-authority"

// The class recipe, kept out of `item.tsx` so a server component can call it.
// `item.tsx` is `"use client"` from the moment it reaches for `useRender`, and
// `"use client"` marks every export of a module — see src/variants.ts for why a
// re-export through the root barrel is not enough.

/**
 * One row of a menu or list.
 *
 * The row is a shape, not an element. `Item` renders a `div` by default and any
 * of `a`, `button`, `li` or `summary` through `render`, and this recipe has to
 * look the same on all of them — so the two things only an interactive element
 * needs are scoped to one. `w-full` and `text-start` are inside
 * `[&:where(a,button)]` because a `button` is `width: fit-content` and
 * `text-align: center` by UA default and a `div` is neither, and `:where()`
 * keeps the selector at zero specificity so a caller's `className` still wins.
 * The focus ring is unscoped: a `div` carrying `tabIndex` is focusable too, and
 * a ring on an element that can never take focus costs nothing.
 *
 * `ring-inset` rather than `ring-offset-2`. A row sits flush against its
 * neighbours in a list, and an offset ring is drawn *outside* the element,
 * where it overlaps the row above and below. Inside the padding there is room
 * for it. This is the same call `ListGroupItem` makes.
 *
 * `size` is a target size, not a taste. `default` is 36px tall at `text-sm`
 * (8 + 20 + 8), which is a fine menu row under a pointer that is already
 * there. A full-width row that *is* the control is a different job: `lg` is
 * `min-h-11`, the 44px of WCAG 2.2 SC 2.5.5 (Target Size, Enhanced), against
 * the 24px floor of SC 2.5.8.
 *
 * State is a background, never a border colour. An unlayered
 * `* { border-color: var(--border) }` in tokens.css outranks every
 * `border-<colour>` utility in the sheet, so a row that showed it was current
 * by turning its border `border-primary` would render identically to a resting
 * one (MikeNotThePope/substrateui#144).
 */
export const itemVariants = cva(
  [
    "flex items-center gap-2 rounded-md text-sm cursor-pointer transition-colors",
    "[&:where(a,button)]:w-full [&:where(a,button)]:text-start",
    "hover:bg-surface-interactive",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
    "data-[active=true]:bg-surface-interactive data-[active=true]:font-medium",
    "data-[disabled=true]:opacity-50 data-[disabled=true]:pointer-events-none",
  ].join(" "),
  {
    variants: {
      size: {
        default: "px-3 py-2",
        lg: "min-h-11 px-3 py-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)
