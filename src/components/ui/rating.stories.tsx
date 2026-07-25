import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { Rating } from "./rating"

const meta: Meta<typeof Rating> = {
  title: "Data Display/Rating",
  component: Rating,
  args: { value: 4, max: 5, size: "md" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    value: { control: { type: "number", min: 0, max: 5, step: 0.5 } },
  },
}

export default meta
type Story = StoryObj<typeof Rating>

export const ReadOnly: Story = { args: { value: 4, readOnly: true } }

export const Fractional: Story = { args: { value: 3.5, readOnly: true } }

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Rating value={4} size="sm" readOnly />
      <Rating value={4} size="md" readOnly />
      <Rating value={4} size="lg" readOnly />
    </div>
  ),
}

function InteractiveRating() {
  const [value, setValue] = React.useState(3)
  return (
    <div className="flex items-center gap-3">
      <Rating value={value} onValueChange={setValue} />
      <span className="font-mono text-sm text-muted-foreground">{value}/5</span>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveRating />,
}
