import type { Meta, StoryObj } from "@storybook/react-vite"

import { CopyField } from "./copy-field"

const meta: Meta<typeof CopyField> = {
  title: "Data Display/CopyField",
  component: CopyField,
  args: {
    value: "3f2a9c1e-7b4d-4e21-9a0f-5c6d8e2b1a47",
  },
  argTypes: {
    value: { control: "text" },
    label: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof CopyField>

export const Default: Story = {}

export const WithLabel: Story = { args: { label: "Copy reference" } }

export const Narrow: Story = {
  render: (args) => (
    <div className="w-64">
      <CopyField {...args} />
    </div>
  ),
}
