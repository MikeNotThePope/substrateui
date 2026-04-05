import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ColumnDef } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  createSelectColumn,
} from '@/components/ui/data-table'
import { people, type Person } from '../../fixtures/table-data'

const plainColumns: ColumnDef<Person>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'age', header: 'Age' },
]

const sortableColumns: ColumnDef<Person>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: 'age',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Age" />
    ),
  },
]

describe('DataTable', () => {
  it('renders column headers from the columns config', () => {
    render(<DataTable columns={plainColumns} data={people} />)
    expect(
      screen.getByRole('columnheader', { name: 'Name' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: 'Age' })
    ).toBeInTheDocument()
  })

  it('renders a row per data item', () => {
    render(<DataTable columns={plainColumns} data={people} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Carol')).toBeInTheDocument()
  })

  it('renders empty state when data is empty', () => {
    render(<DataTable columns={plainColumns} data={[]} />)
    expect(screen.getByText('No results.')).toBeInTheDocument()
  })

  it('renders the toolbar when provided', () => {
    render(
      <DataTable
        columns={plainColumns}
        data={people}
        toolbar={<div>My Toolbar</div>}
      />
    )
    expect(screen.getByText('My Toolbar')).toBeInTheDocument()
  })

  it('applies custom className on the wrapper', () => {
    const { container } = render(
      <DataTable
        columns={plainColumns}
        data={people}
        className="custom-extra"
      />
    )
    const wrapper = container.querySelector(
      '[data-slot="data-table"]'
    ) as HTMLElement
    expect(wrapper.className).toContain('custom-extra')
  })

  it('renders custom cell content via cell renderer', () => {
    const columns: ColumnDef<Person>[] = [
      { accessorKey: 'name', header: 'Name' },
      {
        accessorKey: 'age',
        header: 'Age',
        cell: ({ row }) => <span>Age: {row.original.age}</span>,
      },
    ]
    render(<DataTable columns={columns} data={people} />)
    expect(screen.getByText('Age: 30')).toBeInTheDocument()
    expect(screen.getByText('Age: 25')).toBeInTheDocument()
  })

  it('renders pagination controls with page count and status text', () => {
    render(<DataTable columns={plainColumns} data={people} />)
    expect(
      screen.getByRole('button', { name: 'Previous page' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Next page' })
    ).toBeInTheDocument()
    expect(screen.getByText(/Page 1 of 1/)).toBeInTheDocument()
    expect(screen.getByText(/0 of 3 row\(s\) selected/)).toBeInTheDocument()
  })

  it('disables prev/next when there is only one page', () => {
    render(<DataTable columns={plainColumns} data={people} />)
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
  })

  it('advances pages when there is more than one page', async () => {
    const user = userEvent.setup()
    // 12 rows → default pageSize is 10, so 2 pages
    const many: Person[] = Array.from({ length: 12 }, (_, i) => ({
      id: String(i),
      name: `Person ${i}`,
      age: 20 + i,
    }))
    render(<DataTable columns={plainColumns} data={many} />)
    expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled()
    expect(
      screen.getByRole('button', { name: 'Next page' })
    ).not.toBeDisabled()
    await user.click(screen.getByRole('button', { name: 'Next page' }))
    expect(screen.getByText(/Page 2 of 2/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled()
  })

  it('sorts ascending on first click of a sortable header, descending on second', async () => {
    const user = userEvent.setup()
    render(<DataTable columns={sortableColumns} data={people} />)

    // Initial order (data order): Alice, Bob, Carol
    const initialRows = screen
      .getAllByRole('row')
      .slice(1) // skip header row
      .map((r) => within(r).getAllByRole('cell')[0].textContent)
    expect(initialRows).toEqual(['Alice', 'Bob', 'Carol'])

    // Click "Age" header to sort ascending
    await user.click(screen.getByRole('button', { name: /^Age,/ }))
    const ascRows = screen
      .getAllByRole('row')
      .slice(1)
      .map((r) => within(r).getAllByRole('cell')[0].textContent)
    // Ages: Bob 25, Alice 30, Carol 42
    expect(ascRows).toEqual(['Bob', 'Alice', 'Carol'])

    // Click again for descending
    await user.click(screen.getByRole('button', { name: /^Age,/ }))
    const descRows = screen
      .getAllByRole('row')
      .slice(1)
      .map((r) => within(r).getAllByRole('cell')[0].textContent)
    expect(descRows).toEqual(['Carol', 'Alice', 'Bob'])
  })

  it('updates header aria-label to reflect current sort direction', async () => {
    const user = userEvent.setup()
    render(<DataTable columns={sortableColumns} data={people} />)
    expect(
      screen.getByRole('button', { name: /Age, not sorted/ })
    ).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Age, not sorted/ }))
    expect(
      screen.getByRole('button', { name: /Age, sorted ascending/ })
    ).toBeInTheDocument()
  })
})

describe('DataTable row selection via createSelectColumn', () => {
  const selectableColumns: ColumnDef<Person>[] = [
    createSelectColumn<Person>(),
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'age', header: 'Age' },
  ]

  it('renders a "Select row" checkbox per row and a "Select all" header checkbox', () => {
    render(<DataTable columns={selectableColumns} data={people} />)
    expect(
      screen.getByRole('checkbox', { name: 'Select all' })
    ).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox', { name: 'Select row' })).toHaveLength(
      3
    )
  })

  it('clicking a row checkbox updates the selected-rows counter', async () => {
    const user = userEvent.setup()
    render(<DataTable columns={selectableColumns} data={people} />)
    expect(screen.getByText(/0 of 3 row\(s\) selected/)).toBeInTheDocument()
    const firstRowCheckbox = screen.getAllByRole('checkbox', {
      name: 'Select row',
    })[0]
    await user.click(firstRowCheckbox)
    expect(screen.getByText(/1 of 3 row\(s\) selected/)).toBeInTheDocument()
  })

  it('clicking select-all selects every row', async () => {
    const user = userEvent.setup()
    render(<DataTable columns={selectableColumns} data={people} />)
    await user.click(screen.getByRole('checkbox', { name: 'Select all' }))
    expect(screen.getByText(/3 of 3 row\(s\) selected/)).toBeInTheDocument()
  })
})

describe('DataTableColumnHeader', () => {
  it('renders plain title text when column cannot sort', () => {
    const columns: ColumnDef<Person>[] = [
      {
        accessorKey: 'name',
        enableSorting: false,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
    ]
    render(<DataTable columns={columns} data={people} />)
    // There should be no button for the header (not sortable)
    expect(
      screen.queryByRole('button', { name: /Name,/ })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: 'Name' })
    ).toBeInTheDocument()
  })

  it('renders a sort button with descriptive aria-label when sortable', () => {
    render(<DataTable columns={sortableColumns} data={people} />)
    expect(
      screen.getByRole('button', { name: /Name, not sorted/ })
    ).toBeInTheDocument()
  })
})
