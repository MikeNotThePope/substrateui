import type { Meta, StoryObj } from "@storybook/react-vite"

import { Spacer } from "./spacer"

const Marker = ({ label }: { label: string }) => (
  <div className="rounded border-2 border-border bg-surface-sunken px-3 py-2 font-mono text-xs">
    {label}
  </div>
)

const meta: Meta<typeof Spacer> = {
  title: "Layout/Spacer",
  component: Spacer,
  args: {
    size: "md",
    axis: "vertical",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl", undefined],
    },
    axis: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  render: (args) =>
    args.axis === "vertical" ? (
      <div className="flex flex-col">
        <Marker label="top" />
        <Spacer {...args} />
        <Marker label="bottom" />
      </div>
    ) : (
      <div className="flex flex-row items-center">
        <Marker label="left" />
        <Spacer {...args} />
        <Marker label="right" />
      </div>
    ),
}

export default meta
type Story = StoryObj<typeof Spacer>

export const Default: Story = {}

export const SizeNone: Story = { args: { size: "none" } }
export const SizeXs: Story = { args: { size: "xs" } }
export const SizeSm: Story = { args: { size: "sm" } }
export const SizeMd: Story = { args: { size: "md" } }
export const SizeLg: Story = { args: { size: "lg" } }
export const SizeXl: Story = { args: { size: "xl" } }
export const Size2xl: Story = { args: { size: "2xl" } }

export const AxisHorizontal: Story = { args: { axis: "horizontal", size: "lg" } }
export const AxisVertical: Story = { args: { axis: "vertical", size: "lg" } }

export const FillAvailable: Story = {
  args: { size: undefined, axis: "horizontal" },
  render: (args) => (
    <div className="flex flex-row items-center w-80 border-2 border-dashed border-border p-2">
      <Marker label="left" />
      <Spacer {...args} />
      <Marker label="right" />
    </div>
  ),
}

export const Playground: Story = {
  args: { size: "md", axis: "vertical" },
}
