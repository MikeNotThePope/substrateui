import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

const meta: Meta<typeof Popover> = {
  title: "Overlays/Popover",
  component: Popover,
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open Popover
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {}
export const DefaultOpen: Story = { args: { defaultOpen: true } }
