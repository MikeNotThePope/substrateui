import type { Meta, StoryObj } from "@storybook/react-vite"

import { Separator } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "Layout/Separator",
  component: Separator,
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  render: (args) =>
    args.orientation === "vertical" ? (
      <div className="flex h-12 items-center gap-4 text-sm">
        <span>Left</span>
        <Separator {...args} />
        <span>Right</span>
      </div>
    ) : (
      <div className="w-64">
        <Separator {...args} />
      </div>
    ),
}

export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = { args: { orientation: "horizontal" } }
export const Vertical: Story = { args: { orientation: "vertical" } }
