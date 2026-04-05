import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Combobox } from '@/components/ui/combobox'

const OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

describe('Combobox', () => {
  it('renders the trigger with placeholder when empty', () => {
    render(<Combobox options={OPTIONS} placeholder="Pick a fruit" />)
    expect(screen.getByRole('combobox')).toHaveTextContent('Pick a fruit')
  })

  it('opens the listbox on trigger click and shows all options', async () => {
    const user = userEvent.setup()
    render(<Combobox options={OPTIONS} />)
    await user.click(screen.getByRole('combobox'))
    expect(await screen.findByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
    expect(screen.getByText('Cherry')).toBeInTheDocument()
  })

  it('filters options as the user types', async () => {
    const user = userEvent.setup()
    render(<Combobox options={OPTIONS} searchPlaceholder="Search" />)
    await user.click(screen.getByRole('combobox'))
    const input = await screen.findByPlaceholderText('Search')
    await user.type(input, 'ban')
    expect(screen.getByText('Banana')).toBeInTheDocument()
    expect(screen.queryByText('Apple')).not.toBeInTheDocument()
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument()
  })

  it('shows empty state when no options match', async () => {
    const user = userEvent.setup()
    render(
      <Combobox
        options={OPTIONS}
        searchPlaceholder="Search"
        emptyMessage="Nothing here"
      />
    )
    await user.click(screen.getByRole('combobox'))
    const input = await screen.findByPlaceholderText('Search')
    await user.type(input, 'zzz')
    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('selecting an option calls onValueChange and closes the popover', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Combobox options={OPTIONS} onValueChange={onValueChange} />)
    await user.click(screen.getByRole('combobox'))
    const item = await screen.findByText('Banana')
    await user.click(item)
    expect(onValueChange).toHaveBeenCalledWith('banana')
  })

  it('displays the selected labelʼs text when value is set', () => {
    render(<Combobox options={OPTIONS} value="cherry" />)
    expect(screen.getByRole('combobox')).toHaveTextContent('Cherry')
  })

  it('Escape closes the listbox', async () => {
    const user = userEvent.setup()
    render(<Combobox options={OPTIONS} searchPlaceholder="Search" />)
    await user.click(screen.getByRole('combobox'))
    await screen.findByPlaceholderText('Search')
    await user.keyboard('{Escape}')
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument()
  })

  it('does not open when disabled', async () => {
    const user = userEvent.setup()
    render(<Combobox options={OPTIONS} disabled searchPlaceholder="Search" />)
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeDisabled()
    await user.click(trigger).catch(() => {})
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument()
  })

  it('multiple mode calls onValueChange with an array', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Combobox
        options={OPTIONS}
        multiple
        value={[]}
        onValueChange={onValueChange}
      />
    )
    await user.click(screen.getByRole('combobox'))
    const item = await screen.findByText('Apple')
    await user.click(item)
    expect(onValueChange).toHaveBeenCalledWith(['apple'])
  })

  it('applies custom className to the trigger', () => {
    render(<Combobox options={OPTIONS} className="custom-extra" />)
    expect(screen.getByRole('combobox').className).toContain('custom-extra')
  })
})
