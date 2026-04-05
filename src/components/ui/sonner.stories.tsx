import type { Meta, StoryObj } from "@storybook/react-vite"
import { toast } from "sonner"

import { Button } from "./button"
import { Toaster } from "./sonner"

const meta: Meta<typeof Toaster> = {
  title: "Feedback/Sonner",
  component: Toaster,
}

export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button onClick={() => toast("Event has been created")}>Show Toast</Button>
    </div>
  ),
}

export const Success: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button onClick={() => toast.success("Saved successfully")}>Show Success</Button>
    </div>
  ),
}
