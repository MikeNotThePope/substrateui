"use client"

import * as React from "react"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Check, Circle } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  choiceCardMarkVariants,
  choiceCardVariants,
} from "./choice-card-variants"

// ─── Shared ──────────────────────────────────────────────────────────

/**
 * Base UI's `className` may be a function of the part's own state. `cn()` drops
 * a function on the floor without saying so, which is what the plain
 * `RadioGroupItem` and `Checkbox` have always done with that form. There is
 * nothing to fudge here — the card *is* the element Base UI renders, so the
 * state is real — so it gets called and its result merged.
 */
function cardClassName<State>(
  recipe: string,
  className: string | ((state: State) => string | undefined) | undefined
): string | ((state: State) => string) {
  if (typeof className === "function") {
    return (state: State) => cn(recipe, className(state))
  }
  return cn(recipe, className)
}

/** The label, and the muted second line under it. */
function ChoiceCardBody({
  label,
  labelId,
  description,
  descriptionId,
}: {
  label: React.ReactNode
  labelId: string
  description?: React.ReactNode
  descriptionId?: string
}) {
  return (
    <span
      data-slot="choice-card-body"
      className="flex min-w-0 flex-col gap-1 font-normal"
    >
      <span
        id={labelId}
        data-slot="choice-card-label"
        className="font-medium leading-6"
      >
        {label}
      </span>
      {description != null && (
        <span
          id={descriptionId}
          data-slot="choice-card-description"
          className="text-sm leading-5 text-muted-foreground"
        >
          {description}
        </span>
      )}
    </span>
  )
}

/**
 * How a card wires its own name and description.
 *
 * The label and the description both sit inside the element that carries the
 * role, so by default the accessible name would be both of them run together.
 * Pointing `aria-labelledby` at the label alone keeps the name to the option
 * and leaves the description where it belongs. A caller who names the card
 * themselves keeps their name; a caller who describes it as well gets both
 * descriptions, in the order they read on screen.
 */
function useChoiceCardNaming(
  description: React.ReactNode,
  ariaLabel: string | undefined,
  ariaLabelledBy: string | undefined,
  ariaDescribedBy: string | undefined
) {
  const id = React.useId()
  const labelId = `${id}-label`
  const descriptionId = description != null ? `${id}-description` : undefined
  const named = ariaLabel != null || ariaLabelledBy != null

  return {
    labelId,
    descriptionId,
    "aria-label": ariaLabel,
    "aria-labelledby": named ? ariaLabelledBy : labelId,
    "aria-describedby":
      [descriptionId, ariaDescribedBy].filter(Boolean).join(" ") || undefined,
  }
}

/** Props both cards add on top of their Base UI primitive. */
interface ChoiceCardOwnProps {
  /** The option, as the reader sees it. Becomes the card's accessible name. */
  children?: React.ReactNode
  /**
   * A muted second line under the label — what the option costs, when it
   * arrives, what it rules out. Becomes the card's accessible description.
   */
  description?: React.ReactNode
}

// ─── RadioGroupCard ──────────────────────────────────────────────────

/** Props accepted by the RadioGroupCard component. */
export type RadioGroupCardProps = Omit<
  React.ComponentPropsWithRef<typeof RadioPrimitive.Root>,
  "children"
> &
  ChoiceCardOwnProps

/**
 * One option in a {@link RadioGroup}, drawn as a card the whole of which is the
 * target.
 *
 * `RadioGroupItem` is an 18px circle that a caller pairs with a `Label` beside
 * it. This is the same control grown into the row: the card carries
 * `role="radio"`, so a click or a tap anywhere in it — the description
 * included — selects, and the target is the card rather than the circle. Arrow
 * keys move within the group and the group is one tab stop, both from Base UI.
 *
 * @example
 * <RadioGroup defaultValue="two-weeks" aria-label="Notice period">
 *   <RadioGroupCard value="two-weeks" description="Ships in a fortnight">
 *     Two weeks
 *   </RadioGroupCard>
 *   <RadioGroupCard value="a-month">A month</RadioGroupCard>
 * </RadioGroup>
 *
 * A frozen answer — a submitted form, a published questionnaire, a staff
 * preview of either — is the same card with `readOnly` on the group. It keeps
 * its role, its `aria-checked` and its place in the tab order, and gains
 * `aria-readonly`, so a reader can still find out what was chosen. It is not
 * dimmed: `disabled` says the option is unavailable, `readOnly` says the answer
 * is final, and a record is the second one.
 *
 * @example
 * <RadioGroup value={answer} readOnly aria-label="Notice period">
 *   <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
 *   <RadioGroupCard value="a-month">A month</RadioGroupCard>
 * </RadioGroup>
 *
 * @prop description - A muted second line, and the card's accessible description.
 */
function RadioGroupCard({
  className,
  children,
  description,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: RadioGroupCardProps) {
  const { labelId, descriptionId, ...naming } = useChoiceCardNaming(
    description,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy
  )

  return (
    <RadioPrimitive.Root
      ref={ref}
      data-slot="radio-group-card"
      className={cardClassName(choiceCardVariants(), className)}
      {...naming}
      {...props}
    >
      <span
        data-slot="choice-card-mark"
        aria-hidden="true"
        className={choiceCardMarkVariants({ shape: "radio" })}
      >
        <RadioPrimitive.Indicator className="flex items-center justify-center">
          <Circle className="size-2.5 fill-current text-current" />
        </RadioPrimitive.Indicator>
      </span>
      <ChoiceCardBody
        label={children}
        labelId={labelId}
        description={description}
        descriptionId={descriptionId}
      />
    </RadioPrimitive.Root>
  )
}

// ─── CheckboxCard ────────────────────────────────────────────────────

/** Props accepted by the CheckboxCard component. */
export type CheckboxCardProps = Omit<
  React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root>,
  "children"
> &
  ChoiceCardOwnProps

/**
 * A {@link Checkbox} drawn as a card the whole of which is the target.
 *
 * The same box as {@link RadioGroupCard}, with a square mark and a tick: use it
 * where more than one option may be picked. Space toggles, and a click anywhere
 * in the card does too.
 *
 * Several of them are a group, and nothing here makes one — wrap them in a
 * `Fieldset`, or in Base UI's `CheckboxGroup` if you want a parent checkbox, so
 * the set has a name of its own.
 *
 * @example
 * <Fieldset legend="Which shifts can you cover?">
 *   <CheckboxCard name="shift" value="mornings" description="06:00 – 14:00">
 *     Mornings
 *   </CheckboxCard>
 *   <CheckboxCard name="shift" value="nights" description="22:00 – 06:00">
 *     Nights
 *   </CheckboxCard>
 * </Fieldset>
 *
 * `readOnly` freezes it the way it freezes a radio card: `aria-readonly`, the
 * answer still readable, and no dimming.
 *
 * @prop description - A muted second line, and the card's accessible description.
 */
function CheckboxCard({
  className,
  children,
  description,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: CheckboxCardProps) {
  const { labelId, descriptionId, ...naming } = useChoiceCardNaming(
    description,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy
  )

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      data-slot="checkbox-card"
      className={cardClassName(choiceCardVariants(), className)}
      {...naming}
      {...props}
    >
      <span
        data-slot="choice-card-mark"
        aria-hidden="true"
        className={choiceCardMarkVariants({ shape: "checkbox" })}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <Check className="size-4" />
        </CheckboxPrimitive.Indicator>
      </span>
      <ChoiceCardBody
        label={children}
        labelId={labelId}
        description={description}
        descriptionId={descriptionId}
      />
    </CheckboxPrimitive.Root>
  )
}

export { RadioGroupCard, CheckboxCard }
