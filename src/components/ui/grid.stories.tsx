import type { Meta, StoryObj } from "@storybook/react-vite"

import { Grid } from "./grid"

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded border-2 border-border bg-surface-sunken px-3 py-4 font-mono text-xs text-center">
    {children}
  </div>
)

const cells = Array.from({ length: 6 }, (_, i) => (
  <Box key={i}>Cell {i + 1}</Box>
))

const meta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
  args: {
    columns: 3,
    gap: "md",
  },
  argTypes: {
    columns: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6, "auto-fill", "auto-fit"],
    },
    gap: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl"],
    },
    minChildWidth: { control: "text" },
    asChild: { control: "boolean" },
  },
  render: (args) => <Grid {...args}>{cells}</Grid>,
}

export default meta
type Story = StoryObj<typeof Grid>

export const Default: Story = {}

export const Columns1: Story = { args: { columns: 1 } }
export const Columns2: Story = { args: { columns: 2 } }
export const Columns3: Story = { args: { columns: 3 } }
export const Columns4: Story = { args: { columns: 4 } }
export const Columns5: Story = { args: { columns: 5 } }
export const Columns6: Story = { args: { columns: 6 } }
export const AutoFill: Story = { args: { columns: "auto-fill", minChildWidth: "180px" } }
export const AutoFit: Story = { args: { columns: "auto-fit", minChildWidth: "180px" } }

export const GapNone: Story = { args: { gap: "none" } }
export const GapXs: Story = { args: { gap: "xs" } }
export const GapSm: Story = { args: { gap: "sm" } }
export const GapMd: Story = { args: { gap: "md" } }
export const GapLg: Story = { args: { gap: "lg" } }
export const GapXl: Story = { args: { gap: "xl" } }
export const Gap2xl: Story = { args: { gap: "2xl" } }

export const Playground: Story = {
  args: { columns: 3, gap: "md", minChildWidth: "200px" },
}
