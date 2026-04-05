import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "./button"
import { Toaster, toast } from "./toast"

const meta: Meta<typeof Toaster> = {
  title: "Feedback/Toast",
  component: Toaster,
}

export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button onClick={() => toast("Toast triggered")}>Show Toast</Button>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toaster />
      <Button variant="outline" onClick={() => toast.success("Success!")}>Success</Button>
      <Button variant="outline" onClick={() => toast.error("Error!")}>Error</Button>
      <Button variant="outline" onClick={() => toast.warning("Warning!")}>Warning</Button>
    </div>
  ),
}
