import type { Meta, StoryObj } from "@storybook/react-vite"

import { AspectRatio } from "./aspect-ratio"

const meta: Meta<typeof AspectRatio> = {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  args: {
    ratio: 16 / 9,
  },
  argTypes: {
    ratio: { control: "number" },
  },
  render: (args) => (
    <div className="w-80">
      <AspectRatio {...args}>
        <div className="flex h-full w-full items-center justify-center rounded border-2 bg-surface-sunken font-mono text-xs">
          {args.ratio?.toFixed(2)}
        </div>
      </AspectRatio>
    </div>
  ),
}

export default meta
type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {}
export const Square: Story = { args: { ratio: 1 } }
export const Portrait: Story = { args: { ratio: 3 / 4 } }
export const Cinema: Story = { args: { ratio: 21 / 9 } }
