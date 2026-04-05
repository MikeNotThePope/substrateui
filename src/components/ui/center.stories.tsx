import type { Meta, StoryObj } from "@storybook/react-vite"

import { Center } from "./center"

const meta: Meta<typeof Center> = {
  title: "Layout/Center",
  component: Center,
  args: {
    max: "2xl",
    padding: true,
  },
  argTypes: {
    max: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "2xl", "full"],
    },
    padding: { control: "boolean" },
    asChild: { control: "boolean" },
  },
  render: (args) => (
    <Center {...args}>
      <div className="border-2 border-border bg-surface-sunken py-6 text-center font-mono text-xs">
        Centered content (max={String(args.max)})
      </div>
    </Center>
  ),
}

export default meta
type Story = StoryObj<typeof Center>

export const Default: Story = {}

export const MaxSm: Story = { args: { max: "sm" } }
export const MaxMd: Story = { args: { max: "md" } }
export const MaxLg: Story = { args: { max: "lg" } }
export const MaxXl: Story = { args: { max: "xl" } }
export const Max2xl: Story = { args: { max: "2xl" } }
export const MaxFull: Story = { args: { max: "full" } }

export const NoPadding: Story = { args: { padding: false } }

export const Playground: Story = {
  args: { max: "lg", padding: true },
}
