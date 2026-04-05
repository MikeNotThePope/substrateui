import type { Meta, StoryObj } from "@storybook/react-vite"
import { Star } from "lucide-react"

import { Item, ItemIcon, ItemLabel } from "./item"

const meta: Meta<typeof Item> = {
  title: "Data Display/Item",
  component: Item,
  argTypes: {
    active: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  render: (args) => (
    <div className="w-64 rounded border-2 p-2">
      <Item {...args}>
        <ItemIcon>
          <Star />
        </ItemIcon>
        <ItemLabel>Favorites</ItemLabel>
      </Item>
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof Item>

export const Default: Story = {}
export const Active: Story = { args: { active: true } }
export const Disabled: Story = { args: { disabled: true } }
