import type { Meta, StoryObj } from "@storybook/react-vite"
import { Inbox } from "lucide-react"

import { Button } from "./button"
import {
  Empty,
  EmptyAction,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from "./empty"

const meta: Meta<typeof Empty> = {
  title: "Feedback/Empty",
  component: Empty,
}

export default meta
type Story = StoryObj<typeof Empty>

export const Default: Story = {
  render: () => (
    <div className="w-96 rounded border-2">
      <Empty>
        <EmptyIcon>
          <Inbox />
        </EmptyIcon>
        <EmptyTitle>No messages</EmptyTitle>
        <EmptyDescription>
          Your inbox is empty. New messages will appear here.
        </EmptyDescription>
        <EmptyAction>
          <Button>Refresh</Button>
        </EmptyAction>
      </Empty>
    </div>
  ),
}
