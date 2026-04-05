import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "./badge"

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  args: {
    children: "Badge",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "success", "warning", "error"],
    },
    children: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const DefaultVariant: Story = { args: { variant: "default" } }
export const Secondary: Story = { args: { variant: "secondary" } }
export const Destructive: Story = { args: { variant: "destructive" } }
export const Outline: Story = { args: { variant: "outline" } }
export const Success: Story = { args: { variant: "success", children: "Active" } }
export const Warning: Story = { args: { variant: "warning", children: "Pending" } }
export const Error: Story = { args: { variant: "error", children: "Failed" } }

export const Playground: Story = {
  args: { variant: "default", children: "Playground" },
}
