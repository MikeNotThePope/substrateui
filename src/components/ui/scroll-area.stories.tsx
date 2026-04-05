import type { Meta, StoryObj } from "@storybook/react-vite"

import { ScrollArea } from "./scroll-area"

const meta: Meta<typeof ScrollArea> = {
  title: "Layout/ScrollArea",
  component: ScrollArea,
}

export default meta
type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-md border-2 p-4">
      <div className="space-y-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-sm">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
