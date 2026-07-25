"use client"

import * as React from "react"

import { Transfer, type TransferItem } from "@/components/ui/transfer"

const permissions: TransferItem[] = [
  { key: "read", label: "Read records" },
  { key: "write", label: "Write records" },
  { key: "delete", label: "Delete records" },
  { key: "invite", label: "Invite members" },
  { key: "billing", label: "Manage billing" },
  { key: "audit", label: "View audit log" },
  { key: "owner", label: "Transfer ownership", disabled: true },
]

export function TransferDemo({ showSearch = false }: { showSearch?: boolean }) {
  return (
    <div className="w-full">
      <Transfer
        dataSource={permissions}
        defaultTargetKeys={["read"]}
        titles={["Available", "Granted"]}
        showSearch={showSearch}
      />
    </div>
  )
}

export function ControlledTransferDemo() {
  const [targetKeys, setTargetKeys] = React.useState<string[]>(["audit"])

  return (
    <div className="w-full space-y-3">
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
