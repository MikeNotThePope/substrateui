import type { Meta, StoryObj } from "@storybook/react-vite"

import { Progress } from "./progress"

const meta: Meta<typeof Progress> = {
  title: "Feedback/Progress",
  component: Progress,
  args: {
    value: 60,
  },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {}
export const Empty: Story = { args: { value: 0 } }
export const Half: Story = { args: { value: 50 } }
export const Full: Story = { args: { value: 100 } }
