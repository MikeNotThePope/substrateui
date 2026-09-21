import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { ThemeToggle, type ThemeMode } from "./theme-toggle"

const meta: Meta<typeof ThemeToggle> = {
  title: "Organisms/ThemeToggle",
  component: ThemeToggle,
}

export default meta
type Story = StoryObj<typeof ThemeToggle>

function ToggleDemo() {
  const [mode, setMode] = React.useState<ThemeMode>("system")
  return (
    <div className="flex items-center gap-3">
      <ThemeToggle value={mode} onValueChange={setMode} />
      <span className="font-mono text-xs text-muted-foreground">{mode}</span>
    </div>
  )
}

/** Three modes, one pressed. The state lives outside the component. */
export const Default: Story = {
  render: () => <ToggleDemo />,
}

/** Each mode, so the pressed styling can be read side by side. */
export const EachMode: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ThemeToggle value="light" />
      <ThemeToggle value="dark" />
      <ThemeToggle value="system" />
    </div>
  ),
}

/**
 * With no `value` it renders a placeholder of the same height. That is what a
 * caller reading the mode from `localStorage` renders until hydration.
 */
export const Unknown: Story = {
  render: () => (
    <div className="border-2 border-dashed border-border">
      <ThemeToggle />
    </div>
  ),
}
