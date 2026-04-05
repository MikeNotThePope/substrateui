import type { Meta, StoryObj } from "@storybook/react-vite"

import { Fieldset } from "./fieldset"
import { Input } from "./input"

const meta: Meta<typeof Fieldset> = {
  title: "Forms/Fieldset",
  component: Fieldset,
  args: {
    legend: "Personal Info",
  },
  argTypes: {
    legend: { control: "text" },
  },
  render: (args) => (
    <div className="w-80">
      <Fieldset {...args}>
        <Input placeholder="First name" />
        <Input placeholder="Last name" />
      </Fieldset>
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof Fieldset>

export const Default: Story = {}
