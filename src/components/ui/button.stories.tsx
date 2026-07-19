import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  args: {
    children: "Button",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "amber", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const DefaultVariant: Story = { args: { variant: "default" } }
export const Destructive: Story = { args: { variant: "destructive" } }
export const Outline: Story = { args: { variant: "outline" } }
export const Secondary: Story = { args: { variant: "secondary" } }
export const Amber: Story = { args: { variant: "amber" } }
export const Ghost: Story = { args: { variant: "ghost" } }
export const Link: Story = { args: { variant: "link" } }

export const SizeDefault: Story = { args: { size: "default" } }
export const SizeSm: Story = { args: { size: "sm" } }
export const SizeLg: Story = { args: { size: "lg" } }
export const SizeIcon: Story = { args: { size: "icon", children: "★" } }

export const Playground: Story = {
  args: { variant: "default", size: "default", disabled: false },
}
