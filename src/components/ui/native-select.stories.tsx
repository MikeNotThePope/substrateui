import type { Meta, StoryObj } from "@storybook/react-vite"

import { NativeSelect } from "./native-select"

const meta: Meta<typeof NativeSelect> = {
  title: "Forms/NativeSelect",
  component: NativeSelect,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    disabled: { control: "boolean" },
  },
  render: (args) => (
    <div className="w-64">
      <NativeSelect {...args}>
        <option value="">Select a fruit</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="cherry">Cherry</option>
      </NativeSelect>
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof NativeSelect>

export const Default: Story = {}
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const Disabled: Story = { args: { disabled: true } }
