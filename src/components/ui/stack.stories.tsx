import type { Meta, StoryObj } from "@storybook/react-vite"

import { Stack } from "./stack"

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded border-2 border-border bg-surface-sunken px-3 py-2 font-mono text-xs">
    {children}
  </div>
)

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  args: {
    gap: "md",
    align: "stretch",
  },
  argTypes: {
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "stretch"],
    },
    asChild: { control: "boolean" },
  },
  render: (args) => (
    <Stack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
}

export default meta
type Story = StoryObj<typeof Stack>

export const Default: Story = {}

export const GapNone: Story = { args: { gap: "none" } }
export const GapXs: Story = { args: { gap: "xs" } }
export const GapSm: Story = { args: { gap: "sm" } }
export const GapMd: Story = { args: { gap: "md" } }
export const GapLg: Story = { args: { gap: "lg" } }
export const GapXl: Story = { args: { gap: "xl" } }
export const Gap2xl: Story = { args: { gap: "2xl" } }

export const AlignStart: Story = { args: { align: "start" } }
export const AlignCenter: Story = { args: { align: "center" } }
export const AlignEnd: Story = { args: { align: "end" } }
export const AlignStretch: Story = { args: { align: "stretch" } }

export const Playground: Story = {
  args: { gap: "md", align: "stretch" },
}
