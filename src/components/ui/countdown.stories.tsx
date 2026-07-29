import type { Meta, StoryObj } from "@storybook/react-vite"

import { Countdown } from "./countdown"
import { StatCard } from "../stat-card"

/** Deadlines are computed per render so a story never opens already expired. */
const fromNow = (seconds: number) => Date.now() + seconds * 1000

const meta: Meta<typeof Countdown> = {
  title: "Data Display/Countdown",
  component: Countdown,
  render: (args) => <Countdown {...args} deadline={fromNow(90)} />,
}

export default meta
type Story = StoryObj<typeof Countdown>

export const Default: Story = {}

export const WithHours: Story = {
  render: (args) => <Countdown {...args} deadline={fromNow(3 * 3600 + 245)} />,
}

export const WithDays: Story = {
  render: (args) => <Countdown {...args} deadline={fromNow(2 * 86400 + 11045)} />,
}

export const Finished: Story = {
  render: (args) => <Countdown {...args} deadline={fromNow(-5)} />,
}

export const CustomRender: Story = {
  render: (args) => (
    <Countdown {...args} deadline={fromNow(2 * 86400 + 11045)} className="text-2xl font-bold">
      {({ days, hours, minutes, finished }) =>
        finished ? "Live now" : `${days}d ${hours}h ${minutes}m`
      }
    </Countdown>
  ),
}

export const InStatCard: Story = {
  render: (args) => (
    <div className="w-72">
      <StatCard title="Sale ends" value={<Countdown {...args} deadline={fromNow(9045)} />} />
    </div>
  ),
}

export const Localized: Story = {
  render: (args) => (
    <Countdown {...args} deadline={fromNow(2 * 86400 + 11045)} locale="ar-EG" />
  ),
}
