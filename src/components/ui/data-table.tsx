"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ArrowUpDown, Settings2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ─── DataTableColumnHeader ───────────────────────────────────────────

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: import("@tanstack/react-table").Column<TData, TValue>
  title: string
}

/**
 * Sortable column header button that toggles sort direction on click.
 *
 * @example
 * <DataTableColumnHeader column={column} title="Name" />
 *
 * @prop column - TanStack Table column instance
 * @prop title - Display text for the header
 */
function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  const sorted = column.getIsSorted()

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("-ml-3 h-8 font-mono text-xs", className)}
      onClick={() => column.toggleSorting(sorted === "asc")}
      aria-label={
        sorted === "asc"
          ? `${title}, sorted ascending. Click to sort descending.`
          : sorted === "desc"
            ? `${title}, sorted descending. Click to remove sort.`
            : `${title}, not sorted. Click to sort ascending.`
      }
    >
      {title}
      {sorted === "asc" ? (
        <ArrowUp className="ml-2 size-3.5" aria-hidden="true" />
      ) : sorted === "desc" ? (
        <ArrowDown className="ml-2 size-3.5" aria-hidden="true" />
      ) : (
        <ArrowUpDown className="ml-2 size-3.5" aria-hidden="true" />
      )}
    </Button>
  )
}

// ─── DataTableViewOptions ────────────────────────────────────────────

interface DataTableViewOptionsProps<TData> {
  table: import("@tanstack/react-table").Table<TData>
}

/**
 * Dropdown menu for toggling column visibility in a data table.
 *
 * @example
 * <DataTableViewOptions table={table} />
 *
 * @prop table - TanStack Table instance
 */
function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto h-8 border-2">
          <Settings2 className="mr-2 size-4" />
          <span className="font-mono text-xs">View</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel className="font-mono text-xs">
          Toggle columns
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── DataTablePagination ─────────────────────────────────────────────

interface DataTablePaginationProps<TData> {
  table: import("@tanstack/react-table").Table<TData>
}

/**
 * Pagination controls displaying row selection count and page navigation.
 *
 * @example
 * <DataTablePagination table={table} />
 *
 * @prop table - TanStack Table instance
 */
function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex-1 font-mono text-xs text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center gap-2">
        <div className="font-mono text-xs text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-2"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-2"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

// ─── DataTableToolbar ────────────────────────────────────────────────

interface DataTableToolbarProps {
  children?: React.ReactNode
  className?: string
}

/**
 * Horizontal toolbar container for data table filters and actions.
 *
 * @example
 * <DataTableToolbar><Input placeholder="Filter..." /></DataTableToolbar>
 */
function DataTableToolbar({ children, className }: DataTableToolbarProps) {
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn("flex items-center justify-between py-4", className)}
    >
      {children}
    </div>
  )
}

// ─── Selection column helper ─────────────────────────────────────────

/**
 * Creates a checkbox selection column definition for use with TanStack Table.
 *
 * @example
 * const columns = [createSelectColumn<MyData>(), ...otherColumns]
 */
function createSelectColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }
}

// ─── DataTable ───────────────────────────────────────────────────────

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  className?: string
  toolbar?: React.ReactNode
}

/**
 * Full-featured data table with sorting, filtering, pagination, and row selection.
 *
 * @example
 * <DataTable columns={columns} data={data} toolbar={<DataTableToolbar>...</DataTableToolbar>} />
 *
 * @prop columns - TanStack Table column definitions
 * @prop data - Array of row data
 * @prop toolbar - Optional toolbar rendered above the table
 */
function DataTable<TData, TValue>({
  columns,
  data,
  className,
  toolbar,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div data-slot="data-table" className={className}>
      {toolbar}
      <div className="border-2 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-surface-sunken">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="data-[state=selected]:bg-accent"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableToolbar,
  DataTableViewOptions,
  createSelectColumn,
}
