import type { Meta, StoryObj } from "@storybook/react-vite"

import { Kbd } from "./kbd"

const meta: Meta<typeof Kbd> = {
  title: "Atoms/Kbd",
  component: Kbd,
  args: {
    children: "Enter",
  },
  argTypes: {
    children: { control: "text" },
    keys: { control: "object" },
  },
}

export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = {}

export const SingleKey: Story = { args: { children: "Esc" } }
export const TwoKeyCombo: Story = { args: { keys: ["Ctrl", "S"], children: undefined } }
export const ThreeKeyCombo: Story = { args: { keys: ["Ctrl", "Shift", "P"], children: undefined } }

export const Playground: Story = {
  args: { children: "Tab", keys: undefined },
}
