import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "./label"
import { Input } from "./input"

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  args: {
    children: "Email address",
    htmlFor: "email",
  },
  argTypes: {
    children: { control: "text" },
    htmlFor: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {}

export const WithInput: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2 w-64">
      <Label {...args} />
      <Input id={args.htmlFor} type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const Playground: Story = {
  args: { children: "Custom label", htmlFor: "custom" },
}
