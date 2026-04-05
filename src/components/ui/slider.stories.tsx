import type { Meta, StoryObj } from "@storybook/react-vite"

import { Slider } from "./slider"

const meta: Meta<typeof Slider> = {
  title: "Forms/Slider",
  component: Slider,
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  render: (args) => (
    <div className="w-80">
      <Slider {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {}
export const Range: Story = { args: { defaultValue: [25, 75] } }
export const Disabled: Story = { args: { disabled: true } }
