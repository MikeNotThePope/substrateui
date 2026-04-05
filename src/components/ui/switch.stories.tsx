import type { Meta, StoryObj } from "@storybook/react-vite"

import { Switch } from "./switch"

const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
  component: Switch,
  argTypes: {
    disabled: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } }
