import type { Meta, StoryObj } from "@storybook/react-vite"

import { Descriptions, type DescriptionsItem } from "./descriptions"
import { Badge } from "./badge"

const meta: Meta<typeof Descriptions> = {
  title: "Data Display/Descriptions",
  component: Descriptions,
}

export default meta
type Story = StoryObj<typeof Descriptions>

const items: DescriptionsItem[] = [
  { label: "Customer", children: "Ada Lovelace" },
  { label: "Order", children: "#1024" },
  { label: "Status", children: <Badge>Shipped</Badge> },
  { label: "Email", children: "ada@analytical.engine" },
  { label: "Phone", children: "+44 20 7946 0000" },
  { label: "Shipping address", span: 3, children: "12 Analytical Way, London, UK" },
]

export const Bordered: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Descriptions title="Order #1024" bordered items={items} />
    </div>
  ),
}

export const Plain: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Descriptions title="Account" items={items} />
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Descriptions
        title="Order #1024"
        bordered
        layout="vertical"
        columns={4}
        items={items}
      />
    </div>
  ),
}

export const Compact: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <Descriptions
        title="Server"
        extra="Updated 2m ago"
        bordered
        size="sm"
        columns={2}
        items={[
          { label: "Region", children: "us-east-1" },
          { label: "Status", children: <Badge>Healthy</Badge> },
          { label: "CPU", children: "34%" },
          { label: "Memory", children: "5.2 / 16 GB" },
        ]}
      />
    </div>
  ),
}
