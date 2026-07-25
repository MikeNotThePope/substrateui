import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Transfer, type TransferItem } from "./transfer"

const meta: Meta<typeof Transfer> = {
  title: "Data Display/Transfer",
  component: Transfer,
}

export default meta
type Story = StoryObj<typeof Transfer>

const permissions: TransferItem[] = [
  { key: "read", label: "Read records" },
  { key: "write", label: "Write records" },
  { key: "delete", label: "Delete records" },
  { key: "invite", label: "Invite members" },
  { key: "billing", label: "Manage billing" },
  { key: "audit", label: "View audit log" },
  { key: "owner", label: "Transfer ownership", disabled: true },
]

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Transfer dataSource={permissions} defaultTargetKeys={["read"]} />
    </div>
  ),
}

export const WithSearch: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Transfer
        dataSource={permissions}
        defaultTargetKeys={["read", "write"]}
        titles={["Available", "Granted"]}
        showSearch
      />
    </div>
  ),
}

function ControlledTransfer() {
  const [targetKeys, setTargetKeys] = React.useState<string[]>(["audit"])
  return (
    <div className="w-full max-w-3xl space-y-3">
      <Transfer
        dataSource={permissions}
        targetKeys={targetKeys}
        onChange={setTargetKeys}
        titles={["Available", "Granted"]}
        showSearch
      />
      <p className="font-mono text-sm text-muted-foreground">
        granted: [{targetKeys.join(", ")}]
      </p>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledTransfer />,
}

export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <Transfer dataSource={permissions} defaultTargetKeys={["read"]} disabled />
    </div>
  ),
}
