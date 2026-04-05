import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bold } from "lucide-react"

import { Toggle } from "./toggle"

const meta: Meta<typeof Toggle> = {
  title: "Forms/Toggle",
  component: Toggle,
  args: {
    children: <Bold />,
    "aria-label": "Toggle bold",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {}
export const Outline: Story = { args: { variant: "outline" } }
export const Small: Story = { args: { size: "sm" } }
export const Large: Story = { args: { size: "lg" } }
export const Disabled: Story = { args: { disabled: true } }
