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

/**
 * The same check, for the mode where the opposite is true. A presentational
 * card renders its own `<span>` — there is no Base UI part and so no state to
 * call a function `className` with, and calling it with an invented one would
 * hand back classes for a state the card was never in. Saying so beats quietly
 * dropping it, the way `Tabs unstackAt` and `Sheet dockAt` say it.
 */
function presentationalClassName(
  className: unknown,
  part: string
): string | undefined {
  if (typeof className === "function") {
    throw new Error(
      `${part} cannot take a function \`className\` when it is \`presentational\`: that form is called with Base UI's state for the control, and a presentational card has no control to give one. Pass a string, and select on \`data-checked\` or \`data-presentational\` for the rest.`
    )
  }
  return className as string | undefined
}

/**
 * The glyph inside the mark, and the box it centres in.
 *
 * Written once and handed to both modes. The live card wraps it in Base UI's
 * `Indicator`, which mounts it only while checked; the presentational card
 * mounts it on `selected`. Same element, same classes, so the picture of a
 * picked option and a picked option cannot come apart.
 */
const INDICATOR_CLASS = "flex items-center justify-center"
const RADIO_GLYPH = <Circle className="size-2.5 fill-current text-current" />
const CHECKBOX_GLYPH = <Check className="size-4" />

/** The mark, as the presentational card draws it. */
function PresentationalMark({
  shape,
  selected,
}: {
  shape: "radio" | "checkbox"
  selected?: boolean
}) {
  return (
    <span
      data-slot="choice-card-mark"
      aria-hidden="true"
      className={choiceCardMarkVariants({ shape })}
    >
      {selected && (
        // `data-checked` mirrors what Base UI's `Indicator` puts here, so the
        // two modes render byte-identical markup and a caller styling the
        // indicator does not have to know which mode drew it.
        <span data-checked="" className={INDICATOR_CLASS}>
          {shape === "radio" ? RADIO_GLYPH : CHECKBOX_GLYPH}
        </span>
      )}
    </span>
  )
}

/** The label, and the muted second line under it. */
function ChoiceCardBody({
  label,
  labelId,
  description,
  descriptionId,
}: {
  label: React.ReactNode
  /** Only set when a role needs naming — a presentational card has none. */
  labelId?: string
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

/**
 * Props a card takes when it is a picture of a control rather than a control.
 *
 * The staff surfaces in MikeNotThePope/substrateui#123 item 6 — the builder's
 * applicant preview and a published questionnaire awaiting answers — render a
 * form without being one. A control there is the wrong accessibility object: it
 * adds a tab stop that answers nothing, and announces a `radio` on a page where
 * there is no question to answer. `presentational` is the same card with no
 * role, no ARIA state and no tab stop, and — the part that matters — no dimming
 * either, because the option is neither unavailable nor disabled.
 *
 * Use `readOnly` instead when there *is* an answer and a reader should be able
 * to find out what it was. That keeps the role and gains `aria-readonly`.
 */
interface PresentationalChoiceCardProps {
  /** Draw the card with no control inside it. */
  presentational: true
  /** Whether the mark is drawn filled. There is no control to read it from. */
  selected?: boolean
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

// ─── The presentational card ─────────────────────────────────────────

/** What a presentational card is handed, once the mode prop has been read. */
type PresentationalCardProps = Omit<
  React.ComponentPropsWithRef<"span">,
  "children"
> &
  ChoiceCardOwnProps &
  Omit<PresentationalChoiceCardProps, "presentational">

/** The live half's props, whichever primitive it wraps. */
type LiveChoiceCardProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "children"
> &
  ChoiceCardOwnProps

/**
 * The card with no control in it: one `<span>`, the same recipe, no role.
 *
 * Both cards render through this, so the shape is the only thing that differs
 * between a presentational radio card and a presentational checkbox card —
 * and the box is the same recipe the live card uses, so the pair lavahire
 * could not keep in step is one piece of code here.
 */
function PresentationalChoiceCard({
  className,
  children,
  description,
  selected,
  shape,
  slot,
  part,
  ...props
}: PresentationalCardProps & {
  shape: "radio" | "checkbox"
  slot: string
  part: string
}) {
  return (
    <span
      data-slot={slot}
      data-presentational=""
      {...(selected ? { "data-checked": "" } : {})}
      className={cn(
        choiceCardVariants(),
        presentationalClassName(className, part)
      )}
      {...props}
    >
      <PresentationalMark shape={shape} selected={selected} />
      <ChoiceCardBody label={children} description={description} />
    </span>
  )
}

// ─── RadioGroupCard ──────────────────────────────────────────────────

/** Props accepted by the RadioGroupCard component. */
export type RadioGroupCardProps =
  | (Omit<React.ComponentPropsWithRef<typeof RadioPrimitive.Root>, "children"> &
      ChoiceCardOwnProps & { presentational?: false; selected?: never })
  | (Omit<React.ComponentPropsWithRef<"span">, "children"> &
      ChoiceCardOwnProps &
      PresentationalChoiceCardProps)

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
 * There are two ways to stop being answerable, and they are not the same
 * claim. A **submitted answer** a reader should still be able to read is
 * `readOnly`, which is Base UI's and works on the group: the role, the
 * `aria-checked` and the tab stop all stay, `aria-readonly` arrives, and
 * nothing is dimmed.
 *
 * @example
 * <RadioGroup value={answer} readOnly aria-label="Notice period">
 *   <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
 *   <RadioGroupCard value="a-month">A month</RadioGroupCard>
 * </RadioGroup>
 *
 * A **picture of a form** — a staff preview of a questionnaire, a published
 * record waiting on answers, anywhere there is no question being put to the
 * reader — is `presentational`. No role, no ARIA state, no tab stop, and no
 * group around it: a `radiogroup` on a page nobody can answer is a tab stop
 * that leads nowhere and a question announced to a reader who was not asked
 * it. `selected` fills the mark, because there is no control to read it from.
 *
 * @example
 * <div className="flex flex-col gap-2">
 *   <RadioGroupCard presentational>Immediately</RadioGroupCard>
 *   <RadioGroupCard presentational selected>Two weeks</RadioGroupCard>
 * </div>
 *
 * Neither is `disabled`. Dimming says the option is unavailable, which is a
 * third thing and the only one of the three that greys the card out.
 *
 * @prop description - A muted second line, and the card's accessible description.
 * @prop presentational - Draw the card with no control in it: no role, no ARIA, no tab stop.
 * @prop selected - With `presentational`, whether the mark is drawn filled.
 */
function RadioGroupCard({ presentational, ...rest }: RadioGroupCardProps) {
  if (!presentational) {
    return <LiveRadioGroupCard {...(rest as LiveChoiceCardProps<typeof LiveRadioGroupCard>)} />
  }
  return (
    <PresentationalChoiceCard
      {...(rest as PresentationalCardProps)}
      shape="radio"
      slot="radio-group-card"
      part="RadioGroupCard"
    />
  )
}

/** The interactive half, split out so the hook is never called conditionally. */
function LiveRadioGroupCard({
  className,
  children,
  description,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: Omit<React.ComponentPropsWithRef<typeof RadioPrimitive.Root>, "children"> &
  ChoiceCardOwnProps) {
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
        <RadioPrimitive.Indicator className={INDICATOR_CLASS}>
          {RADIO_GLYPH}
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
export type CheckboxCardProps =
  | (Omit<React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root>, "children"> &
      ChoiceCardOwnProps & { presentational?: false; selected?: never })
  | (Omit<React.ComponentPropsWithRef<"span">, "children"> &
      ChoiceCardOwnProps &
      PresentationalChoiceCardProps)

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
 * `readOnly` and `presentational` mean here exactly what they mean on
 * {@link RadioGroupCard}: the first keeps the control and freezes its answer,
 * the second is a picture of the control with no role at all. Neither dims.
 *
 * @example
 * <CheckboxCard presentational selected>Mornings</CheckboxCard>
 *
 * @prop description - A muted second line, and the card's accessible description.
 */
function CheckboxCard({ presentational, ...rest }: CheckboxCardProps) {
  if (!presentational) {
    return <LiveCheckboxCard {...(rest as LiveChoiceCardProps<typeof LiveCheckboxCard>)} />
  }
  return (
    <PresentationalChoiceCard
      {...(rest as PresentationalCardProps)}
      shape="checkbox"
      slot="checkbox-card"
      part="CheckboxCard"
    />
  )
}

/** The interactive half, split out so the hook is never called conditionally. */
function LiveCheckboxCard({
  className,
  children,
  description,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...props
}: Omit<React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root>, "children"> &
  ChoiceCardOwnProps) {
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
        <CheckboxPrimitive.Indicator className={INDICATOR_CLASS}>
          {CHECKBOX_GLYPH}
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
