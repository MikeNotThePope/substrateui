import type { Meta, StoryObj } from "@storybook/react-vite"

import { Cluster } from "./cluster"

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded border-2 border-border bg-surface-sunken px-3 py-2 font-mono text-xs">
    {children}
  </div>
)

const meta: Meta<typeof Cluster> = {
  title: "Layout/Cluster",
  component: Cluster,
  args: {
    gap: "sm",
    align: "center",
    justify: "start",
    wrap: true,
  },
  argTypes: {
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "baseline"],
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
    },
    wrap: { control: "boolean" },
    asChild: { control: "boolean" },
  },
  render: (args) => (
    <Cluster {...args}>
      <Box>Alpha</Box>
      <Box>Beta</Box>
      <Box>Gamma</Box>
      <Box>Delta</Box>
    </Cluster>
  ),
}

export default meta
type Story = StoryObj<typeof Cluster>

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
export const AlignBaseline: Story = { args: { align: "baseline" } }

export const JustifyStart: Story = { args: { justify: "start" } }
export const JustifyCenter: Story = { args: { justify: "center" } }
export const JustifyEnd: Story = { args: { justify: "end" } }
export const JustifyBetween: Story = { args: { justify: "between" } }

export const NoWrap: Story = { args: { wrap: false } }

export const Playground: Story = {
  args: { gap: "sm", align: "center", justify: "start", wrap: true },
}
