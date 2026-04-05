import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ColumnDef } from "@tanstack/react-table"

import { DataTable, DataTableColumnHeader } from "./data-table"

interface Payment {
  id: string
  amount: number
  status: "pending" | "success" | "failed"
  email: string
}

const data: Payment[] = [
  { id: "1", amount: 100, status: "success", email: "a@example.com" },
  { id: "2", amount: 250, status: "pending", email: "b@example.com" },
  { id: "3", amount: 75, status: "failed", email: "c@example.com" },
  { id: "4", amount: 500, status: "success", email: "d@example.com" },
]

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
    cell: ({ row }) => `$${row.getValue("amount")}`,
  },
]

const meta: Meta<typeof DataTable> = {
  title: "Data Display/DataTable",
  component: DataTable,
}

export default meta
type Story = StoryObj<typeof DataTable<Payment, unknown>>

export const Default: Story = {
  render: () => (
    <div className="w-[640px]">
      <DataTable columns={columns} data={data} />
    </div>
  ),
}
