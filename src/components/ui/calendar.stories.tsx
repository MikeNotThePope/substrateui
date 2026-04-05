import type { Meta, StoryObj } from "@storybook/react-vite"

import { Calendar } from "./calendar"

const meta: Meta<typeof Calendar> = {
  title: "Forms/Calendar",
  component: Calendar,
}

export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => <Calendar mode="single" className="rounded-md border-2" />,
}

export const Range: Story = {
  render: () => <Calendar mode="range" numberOfMonths={2} className="rounded-md border-2" />,
}
