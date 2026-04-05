import type { Meta, StoryObj } from "@storybook/react-vite"

import { Spinner } from "./spinner"

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {}

export const SizeSm: Story = { args: { size: "sm" } }
export const SizeDefault: Story = { args: { size: "default" } }
export const SizeLg: Story = { args: { size: "lg" } }

export const Playground: Story = {
  args: { size: "default" },
}
