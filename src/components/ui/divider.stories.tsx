import type { Meta, StoryObj } from "@storybook/react-vite"

import { Divider } from "./divider"

const meta: Meta<typeof Divider> = {
  title: "Layout/Divider",
  component: Divider,
  args: {
    orientation: "horizontal",
  },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    label: { control: "text" },
  },
  render: (args) =>
    args.orientation === "vertical" ? (
      <div className="flex items-stretch h-24 gap-4">
        <div className="font-mono text-xs self-center">Left</div>
        <Divider {...args} />
        <div className="font-mono text-xs self-center">Right</div>
      </div>
    ) : (
      <div className="w-80">
        <Divider {...args} />
      </div>
    ),
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {}

export const Horizontal: Story = { args: { orientation: "horizontal" } }
export const Vertical: Story = { args: { orientation: "vertical" } }
export const WithLabel: Story = { args: { orientation: "horizontal", label: "OR" } }

export const Playground: Story = {
  args: { orientation: "horizontal", label: "" },
}
