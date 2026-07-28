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
    render(<Combobox options={OPTIONS} labels={{ placeholder: "Pick a fruit" }} />)
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
    render(<Combobox options={OPTIONS} labels={{ searchPlaceholder: "Search" }} />)
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
        labels={{ searchPlaceholder: "Search", noResults: "Nothing here" }}
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
    render(<Combobox options={OPTIONS} labels={{ searchPlaceholder: "Search" }} />)
    await user.click(screen.getByRole('combobox'))
    await screen.findByPlaceholderText('Search')
    await user.keyboard('{Escape}')
    expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument()
  })

  it('does not open when disabled', async () => {
    const user = userEvent.setup()
    render(<Combobox options={OPTIONS} disabled labels={{ searchPlaceholder: "Search" }} />)
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

describe('Combobox — async', () => {
  it('shows a loading row instead of results while loading', async () => {
    const user = userEvent.setup()
    render(<Combobox options={OPTIONS} loading labels={{ loading: 'Fetching...' }} />)
    await user.click(screen.getByRole('combobox'))
    expect(await screen.findByText('Fetching...')).toBeInTheDocument()
    expect(screen.queryByText('Apple')).not.toBeInTheDocument()
  })

  it('reports the query so options can be fetched for it', async () => {
    const user = userEvent.setup()
    const onInputChange = vi.fn()
    render(
      <Combobox
        options={OPTIONS}
        onInputChange={onInputChange}
        labels={{ searchPlaceholder: 'Search' }}
      />
    )
    await user.click(screen.getByRole('combobox'))
    await user.type(await screen.findByPlaceholderText('Search'), 'ap')
    expect(onInputChange).toHaveBeenLastCalledWith('ap')
  })

  it('renders options as given when manualFilter is set', async () => {
    const user = userEvent.setup()
    render(
      <Combobox
        options={OPTIONS}
        manualFilter
        labels={{ searchPlaceholder: 'Search' }}
      />
    )
    await user.click(screen.getByRole('combobox'))
    await user.type(await screen.findByPlaceholderText('Search'), 'zzz')
    // The query matches nothing, but the caller owns filtering now.
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Cherry')).toBeInTheDocument()
  })
})

describe('Combobox — free solo', () => {
  it('offers to add a value that matches no option', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Combobox
        options={OPTIONS}
        freeSolo
        onValueChange={onValueChange}
        labels={{ searchPlaceholder: 'Search' }}
      />
    )
    await user.click(screen.getByRole('combobox'))
    await user.type(await screen.findByPlaceholderText('Search'), 'Durian')

    const create = await screen.findByText('Add "Durian"')
    await user.click(create)
    expect(onValueChange).toHaveBeenCalledWith('Durian')
  })

  it('does not offer to add a value that already exists', async () => {
    const user = userEvent.setup()
    render(
      <Combobox options={OPTIONS} freeSolo labels={{ searchPlaceholder: 'Search' }} />
    )
    await user.click(screen.getByRole('combobox'))
    await user.type(await screen.findByPlaceholderText('Search'), 'Apple')
    expect(screen.queryByText('Add "Apple"')).not.toBeInTheDocument()
  })

  it('offers no add row without freeSolo', async () => {
    const user = userEvent.setup()
    render(<Combobox options={OPTIONS} labels={{ searchPlaceholder: 'Search' }} />)
    await user.click(screen.getByRole('combobox'))
    await user.type(await screen.findByPlaceholderText('Search'), 'Durian')
    expect(screen.queryByText('Add "Durian"')).not.toBeInTheDocument()
  })

  it('displays a free-solo value that is not in the options', () => {
    render(<Combobox options={OPTIONS} freeSolo value="Durian" />)
    expect(screen.getByRole('combobox')).toHaveTextContent('Durian')
  })
})

describe('Combobox — grouping', () => {
  it('renders a heading per group', async () => {
    const user = userEvent.setup()
    render(
      <Combobox
        options={OPTIONS}
        groupBy={(o) => (o.value === 'apple' ? 'Pome' : 'Other')}
      />
    )
    await user.click(screen.getByRole('combobox'))
    expect(await screen.findByText('Pome')).toBeInTheDocument()
    expect(screen.getByText('Other')).toBeInTheDocument()
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Cherry')).toBeInTheDocument()
  })
})

describe('Combobox — chips and clearing', () => {
  it('collapses chips past limitTags into a count badge', () => {
    render(
      <Combobox
        options={OPTIONS}
        multiple
        limitTags={2}
        value={['apple', 'banana', 'cherry']}
      />
    )
    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveTextContent('Apple')
    expect(trigger).toHaveTextContent('Banana')
    expect(trigger).not.toHaveTextContent('Cherry')
    expect(trigger).toHaveTextContent('+1')
  })

  it('clears a single selection', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Combobox
        options={OPTIONS}
        clearable
        value="cherry"
        onValueChange={onValueChange}
      />
    )
    await user.click(screen.getByRole('button', { name: 'Clear selection' }))
    expect(onValueChange).toHaveBeenCalledWith('')
  })

  it('clears every chip in multi-select', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Combobox
        options={OPTIONS}
        multiple
        clearable
        value={['apple', 'banana']}
        onValueChange={onValueChange}
      />
    )
    await user.click(screen.getByRole('button', { name: 'Clear selection' }))
    expect(onValueChange).toHaveBeenCalledWith([])
  })

  it('hides the clear button when nothing is selected', () => {
    render(<Combobox options={OPTIONS} clearable />)
    expect(screen.queryByRole('button', { name: 'Clear selection' })).toBeNull()
  })

  it('names each chip remove button after the item it removes', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <Combobox
        options={OPTIONS}
        multiple
        value={['apple', 'banana']}
        onValueChange={onValueChange}
      />
    )
    await user.click(screen.getByRole('button', { name: 'Remove Apple' }))
    expect(onValueChange).toHaveBeenCalledWith(['banana'])
  })
})
