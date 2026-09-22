import type { Meta, StoryObj } from "@storybook/react-vite"
import { Star } from "lucide-react"

import { Item, ItemIcon, ItemLabel, ItemTrailer } from "./item"

const meta: Meta<typeof Item> = {
  title: "Data Display/Item",
  component: Item,
  argTypes: {
    active: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: "inline-radio", options: ["default", "lg"] },
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

/** `lg` is 44px, the target size of WCAG 2.2 SC 2.5.5. */
export const Large: Story = { args: { size: "lg" } }

/** A row of actions: the row is the button, not a button inside the row. */
export const AsButton: Story = {
  render: () => (
    <div className="w-80 divide-y-2">
      {[
        ["01", "Why do you want to work here?", "Long text"],
        ["02", "What is your notice period?", "Single select"],
        ["03", "Expected salary", "Short text"],
      ].map(([number, question, kind]) => (
        <Item
          key={number}
          size="lg"
          render={<button />}
          className="rounded-none px-0"
        >
          <ItemIcon className="font-mono text-xs text-muted-foreground">
            {number}
          </ItemIcon>
          <ItemLabel>{question}</ItemLabel>
          <ItemTrailer className="font-mono text-2xs text-muted-foreground">
            {kind}
          </ItemTrailer>
        </Item>
      ))}
    </div>
  ),
}

/** A row of destinations. Same shape, different element. */
export const AsLink: Story = {
  render: () => (
    <div className="w-80 rounded border-2 p-2">
      <Item render={<a href="#inbox" />}>
        <ItemIcon>
          <Star />
        </ItemIcon>
        <ItemLabel>Starred</ItemLabel>
        <ItemTrailer className="text-xs text-muted-foreground">12</ItemTrailer>
      </Item>
    </div>
  ),
}
