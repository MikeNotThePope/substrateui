import type { Meta, StoryObj } from "@storybook/react-vite"

import { RadioGroup, RadioGroupItem } from "./radio-group"

const meta: Meta<typeof RadioGroup> = {
  title: "Forms/RadioGroup",
  component: RadioGroup,
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <label className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="a" /> Option A
      </label>
      <label className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="b" /> Option B
      </label>
      <label className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="c" /> Option C
      </label>
    </RadioGroup>
  ),
}
