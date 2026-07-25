import type { Meta, StoryObj } from "@storybook/react-vite"

import { Stepper } from "./stepper"

const meta: Meta<typeof Stepper> = {
  title: "Navigation/Stepper",
  component: Stepper,
  args: {
    activeStep: 1,
    steps: [
      { label: "Account", description: "Your details" },
      { label: "Shipping", description: "Where to" },
      { label: "Payment", description: "How to pay" },
      { label: "Review", description: "Confirm" },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

export const Horizontal: Story = {}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="max-w-xs">
      <Stepper {...args} />
    </div>
  ),
}

export const FirstStep: Story = { args: { activeStep: 0 } }
export const LastStep: Story = { args: { activeStep: 3 } }
