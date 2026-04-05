"use client"

import { type ColumnDef } from "@tanstack/react-table"
import {
  DataTable,
  DataTableColumnHeader,
  DataTableToolbar,
  DataTableViewOptions,
  createSelectColumn,
} from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable } from "../../_components/props-table"

// ── Example data ────────────────────────────────────────────────────

type Person = { name: string; email: string; role: string; status: string }

const people: Person[] = [
  { name: "Alex Chen", email: "alex@example.com", role: "Engineering", status: "Active" },
  { name: "Sarah Kim", email: "sarah@example.com", role: "Design", status: "Active" },
  { name: "James Wilson", email: "james@example.com", role: "Product", status: "Pending" },
  { name: "Maria Garcia", email: "maria@example.com", role: "Engineering", status: "Active" },
  { name: "David Park", email: "david@example.com", role: "Marketing", status: "Inactive" },
]

// ── Column definitions ──────────────────────────────────────────────

const columns: ColumnDef<Person>[] = [
  createSelectColumn<Person>(),
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant =
        status === "Active"
          ? "default"
          : status === "Pending"
            ? "secondary"
            : "outline"
      return <Badge variant={variant}>{status}</Badge>
    },
  },
]

// ── Page ─────────────────────────────────────────────────────────────

export default function DataTablePage() {
  return (
    <DocPage
      title="DataTable"
      description="A full-featured table component built on TanStack Table with sorting, filtering, pagination, row selection, and column visibility controls."
    >
      <Stack gap="xl">
        {/* ── Full Example ──────────────────────────────── */}
        <Stack gap="md">
          <H3>Full Example</H3>
          <ComponentPreview
            code={`import { type ColumnDef } from "@tanstack/react-table"
import {
  DataTable,
  DataTableColumnHeader,
  DataTableToolbar,
  DataTableViewOptions,
  createSelectColumn,
} from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type Person = {
  name: string
  email: string
  role: string
  status: string
}

const columns: ColumnDef<Person>[] = [
  createSelectColumn<Person>(),
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={
            status === "Active"
              ? "default"
              : status === "Pending"
                ? "secondary"
                : "outline"
          }
        >
          {status}
        </Badge>
      )
    },
  },
]

<DataTable columns={columns} data={people} />`}
          >
            <div className="w-full">
              <DataTable columns={columns} data={people} />
            </div>
          </ComponentPreview>
        </Stack>

        {/* ── API Reference ─────────────────────────────── */}
        <Stack gap="md">
          <H3>API Reference</H3>

          <Stack gap="sm">
            <H3 className="text-base">DataTable</H3>
            <PropsTable
              props={[
                {
                  name: "columns",
                  type: "ColumnDef<TData, TValue>[]",
                  description:
                    "TanStack Table column definitions that configure headers, cells, sorting, and filtering.",
                  required: true,
                },
                {
                  name: "data",
                  type: "TData[]",
                  description: "Array of row objects to render in the table.",
                  required: true,
                },
                {
                  name: "toolbar",
                  type: "React.ReactNode",
                  description:
                    "Optional toolbar element rendered above the table, typically containing search inputs and view options.",
                },
                {
                  name: "className",
                  type: "string",
                  description:
                    "Additional CSS classes applied to the outer wrapper.",
                },
              ]}
            />
          </Stack>

          <Stack gap="sm">
            <H3 className="text-base">DataTableColumnHeader</H3>
            <PropsTable
              props={[
                {
                  name: "column",
                  type: "Column<TData, TValue>",
                  description:
                    "TanStack Table column instance used to read and toggle sort state.",
                  required: true,
                },
                {
                  name: "title",
                  type: "string",
                  description: "Display text for the column header.",
                  required: true,
                },
              ]}
            />
          </Stack>

          <Stack gap="sm">
            <H3 className="text-base">createSelectColumn</H3>
            <PropsTable
              props={[
                {
                  name: "Return",
                  type: "ColumnDef<TData>",
                  description:
                    "Returns a checkbox selection column definition. Add it as the first entry in your columns array to enable row selection.",
                },
              ]}
            />
          </Stack>
        </Stack>
      </Stack>

      {/* Accessibility */}
      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Always provide an accessible label for the table, either via the{" "}
            <Code>toolbar</Code> prop (which typically contains context
            identifying what the table holds) or by wrapping the DataTable
            in a landmark with <Code>aria-label</Code>.
          </P>
          <P>
            Sortable columns use DataTableColumnHeader, which renders as a
            button with <Code>aria-sort</Code> reflecting the current sort
            state, so screen reader users know which column is sorted and in
            which direction.
          </P>
          <P>
            Row selection (via <Code>createSelectColumn</Code>) uses
            Checkbox, which is keyboard-accessible and screen-reader-friendly
            out of the box.
          </P>
        </Stack>
      </Stack>
    </DocPage>
  )
}
