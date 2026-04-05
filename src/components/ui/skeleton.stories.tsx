import type { Meta, StoryObj } from "@storybook/react-vite"

import { Skeleton } from "./skeleton"

const meta: Meta<typeof Skeleton> = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  args: {
    className: "h-4 w-48",
  },
  argTypes: {
    className: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {}

export const TextLine: Story = { args: { className: "h-4 w-64" } }
export const Avatar: Story = { args: { className: "h-12 w-12 rounded-full" } }
export const Card: Story = { args: { className: "h-32 w-64" } }

export const Composition: Story = {
  render: () => (
    <div className="flex items-center gap-4 w-80">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ),
}

export const Playground: Story = {
  args: { className: "h-6 w-40" },
}
