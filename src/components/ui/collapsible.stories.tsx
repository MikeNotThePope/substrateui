import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible"

const meta: Meta<typeof Collapsible> = {
  title: "Data Display/Collapsible",
  component: Collapsible,
  render: (args) => (
    <Collapsible {...args} className="w-64 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">@peduarte starred 3 repositories</span>
        <CollapsibleTrigger render={<Button variant="outline" size="sm" />}>
          Toggle
        </CollapsibleTrigger>
      </div>
      <div className="rounded border-2 px-3 py-2 font-mono text-xs">@base-ui/react</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded border-2 px-3 py-2 font-mono text-xs">@mui/material</div>
        <div className="rounded border-2 px-3 py-2 font-mono text-xs">@stitches/react</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = { args: { defaultOpen: true } }
export const Closed: Story = { args: { defaultOpen: false } }
