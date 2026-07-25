import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { FocusTrap } from "./focus-trap"
import { Button } from "./button"
import { Input } from "./input"
import { Stack } from "./stack"

const meta: Meta<typeof FocusTrap> = {
  title: "Utilities/FocusTrap",
  component: FocusTrap,
}

export default meta
type Story = StoryObj<typeof FocusTrap>

function TrapDemo() {
  const [active, setActive] = React.useState(false)
  return (
    <Stack gap="md" className="max-w-sm">
      <Button onClick={() => setActive((a) => !a)}>
        {active ? "Release focus" : "Trap focus"}
      </Button>

      <FocusTrap active={active}>
        <Stack gap="sm" className="rounded-lg border-2 border-border p-4">
          <p className="text-sm text-muted-foreground">
            {active ? "Tab is trapped inside this box." : "Not trapped — Tab escapes freely."}
          </p>
          <Input placeholder="First field" />
          <Input placeholder="Second field" />
          <Button variant="outline" onClick={() => setActive(false)}>
            Close
          </Button>
        </Stack>
      </FocusTrap>

      <Button variant="ghost">Outside button (unreachable while trapped)</Button>
    </Stack>
  )
}

export const Default: Story = {
  render: () => <TrapDemo />,
}
