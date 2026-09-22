import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { RadioGroupCard, CheckboxCard } from "./choice-card"
import { RadioGroup } from "./radio-group"
import { Fieldset } from "./fieldset"
import { Stack } from "./stack"

const meta: Meta<typeof RadioGroupCard> = {
  title: "Forms/ChoiceCard",
  component: RadioGroupCard,
}

export default meta
type Story = StoryObj<typeof RadioGroupCard>

/** Tab into the group once, then arrow between the cards. */
export const Radios: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <RadioGroup defaultValue="two-weeks" aria-label="Notice period">
        <RadioGroupCard value="immediately" description="No handover">
          Immediately
        </RadioGroupCard>
        <RadioGroupCard value="two-weeks" description="The usual arrangement">
          Two weeks
        </RadioGroupCard>
        <RadioGroupCard value="a-month">A month or more</RadioGroupCard>
      </RadioGroup>
    </div>
  ),
}

/** Space toggles each one. A set of them needs a name of its own. */
export const Checkboxes: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Fieldset legend="Which shifts can you cover?">
        <Stack gap="sm">
          <CheckboxCard name="shift" value="mornings" description="06:00 – 14:00">
            Mornings
          </CheckboxCard>
          <CheckboxCard name="shift" value="evenings" description="14:00 – 22:00">
            Evenings
          </CheckboxCard>
          <CheckboxCard name="shift" value="nights" description="22:00 – 06:00">
            Nights
          </CheckboxCard>
        </Stack>
      </Fieldset>
    </div>
  ),
}

/**
 * A frozen answer. `readOnly` keeps the role, the tick and the tab stop, and
 * adds `aria-readonly` — nothing is dimmed, because the answer is final rather
 * than unavailable.
 */
export const ReadOnly: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <RadioGroup value="two-weeks" readOnly aria-label="Notice period (submitted)">
        <RadioGroupCard value="immediately" description="No handover">
          Immediately
        </RadioGroupCard>
        <RadioGroupCard value="two-weeks" description="The usual arrangement">
          Two weeks
        </RadioGroupCard>
        <RadioGroupCard value="a-month">A month or more</RadioGroupCard>
      </RadioGroup>
    </div>
  ),
}

/** `disabled` is the other state, and the only one that dims. */
export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <RadioGroup defaultValue="two-weeks" aria-label="Notice period">
        <RadioGroupCard value="immediately" disabled description="Not for this role">
          Immediately
        </RadioGroupCard>
        <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
      </RadioGroup>
    </div>
  ),
}

/** Labels alone, with nothing under them. */
export const LabelOnly: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <RadioGroup defaultValue="yes" aria-label="Do you hold a valid work permit?">
        <RadioGroupCard value="yes">Yes</RadioGroupCard>
        <RadioGroupCard value="no">No</RadioGroupCard>
      </RadioGroup>
    </div>
  ),
}
