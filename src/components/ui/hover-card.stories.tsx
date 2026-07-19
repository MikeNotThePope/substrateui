import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./hover-card"

const meta: Meta<typeof HoverCard> = {
  title: "Overlays/HoverCard",
  component: HoverCard,
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger render={<Button variant="link" />}>
        @substrate
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@substrate</h4>
          <p className="text-sm text-muted-foreground">A design system for the web.</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {}
export const DefaultOpen: Story = { args: { defaultOpen: true } }
