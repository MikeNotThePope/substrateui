import type { Meta, StoryObj } from "@storybook/react-vite"
import { Terminal } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "./alert"

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success", "warning", "info"],
    },
  },
  render: (args) => (
    <Alert {...args} className="w-96">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components using the CLI.</AlertDescription>
    </Alert>
  ),
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = { args: { variant: "default" } }
export const Destructive: Story = { args: { variant: "destructive" } }
export const Success: Story = { args: { variant: "success" } }
export const Warning: Story = { args: { variant: "warning" } }
export const Info: Story = { args: { variant: "info" } }
