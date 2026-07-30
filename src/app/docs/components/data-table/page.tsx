"use client"

import { type ColumnDef } from "@tanstack/react-table"
import {
  DataTable,
  DataTableColumnHeader,
  createSelectColumn,
} from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
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
      description="A table built on TanStack Table: sorting, filtering, pagination, row selection, and column visibility."
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

        {/* ── Direction ─────────────────────────────────── */}
        <Stack gap="md">
          <H3>Direction</H3>
          <P>
            Column order follows the <Code>columns</Code> prop, which means
            in RTL the first column still renders at the start (now visually
            on the right) and the last column at the end. If your data is
            semantically ordered — e.g., timestamp then description — you
            may want to reverse column definitions for RTL users so the
            reading flow stays natural. Sort indicators and header chevrons
            flip automatically via logical CSS properties.
          </P>
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

      <ImportLine
        names={[
          "DataTable",
          "DataTableColumnHeader",
          "createSelectColumn",
        ]}
      />

      {/* Accessibility */}
      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          The largest label set in the set, because a data table is mostly furniture — sort state, selection counts, and pagination are all announced text. Override one instance with the <Code>labels</Code> prop on the component, or every
            instance at once through <Code>LabelsProvider</Code>&apos;s{" "}
            <Code>dataTable</Code> key — the provider is how you translate the
            set once instead of at each call site.
        </P>
        <PropsTable
          props={[
          { name: "previous / next", type: "string", default: "\"Previous\" / \"Next\"", description: "The pagination buttons." },
          { name: "noResults", type: "string", default: "\"No results.\"", description: "Empty-state row." },
          { name: "view", type: "string", default: "\"View\"", description: "The column-visibility trigger." },
          { name: "toggleColumns", type: "string", default: "\"Toggle columns\"", description: "Accessible name for that trigger." },
          { name: "selectAll / selectRow", type: "string", default: "\"Select all\" / \"Select row\"", description: "The header and row checkboxes, which have no visible label." },
          { name: "rowsSelected", type: "(selected, total) => string", default: "\"n of m row(s) selected.\"", description: "Selection summary. A function because the plural rule is the caller's language's, not English's." },
          { name: "pageOf", type: "(page, total) => string", default: "\"Page n of m\"", description: "Page indicator." },
          { name: "sortedAscending", type: "(title) => string", default: "\"…, sorted ascending. Click to sort descending.\"", description: "Announced sort state, and what a click will do next." },
          { name: "sortedDescending", type: "(title) => string", default: "\"…, sorted descending. Click to remove sort.\"", description: "As above, one step round the cycle." },
          { name: "notSorted", type: "(title) => string", default: "\"…, not sorted. Click to sort ascending.\"", description: "The unsorted case." },
          ]}
        />
      </Stack>

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
