import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchField } from '@/components/ui/search-field'

function Controlled({
  initial = '',
  onClear,
}: {
  initial?: string
  onClear?: () => void
}) {
  const [value, setValue] = React.useState(initial)
  return (
    <SearchField
      value={value}
      onChange={setValue}
      onClear={onClear}
      placeholder="Search..."
    />
  )
}

describe('SearchField', () => {
  it('renders with a search role and input', () => {
    render(<SearchField value="" onChange={() => {}} />)
    expect(screen.getByRole('search')).toBeInTheDocument()
    expect(
      screen.getByRole('searchbox', { name: 'Search...' })
    ).toBeInTheDocument()
  })

  it('uses the placeholder as the input aria-label', () => {
    render(<SearchField value="" onChange={() => {}} placeholder="Find users" />)
    expect(
      screen.getByRole('searchbox', { name: 'Find users' })
    ).toBeInTheDocument()
  })

  it('fires onChange with the typed string (controlled)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchField value="" onChange={onChange} />)
    await user.type(screen.getByRole('searchbox'), 'a')
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('does not render the clear button when value is empty', () => {
    render(<SearchField value="" onChange={() => {}} />)
    expect(
      screen.queryByRole('button', { name: 'Clear search' })
    ).not.toBeInTheDocument()
  })

  it('renders the clear button when value is non-empty', () => {
    render(<SearchField value="hello" onChange={() => {}} />)
    expect(
      screen.getByRole('button', { name: 'Clear search' })
    ).toBeInTheDocument()
  })

  it('clicking clear resets value to empty string', async () => {
    const user = userEvent.setup()
    render(<Controlled initial="hello" />)
    expect(
      (screen.getByRole('searchbox') as HTMLInputElement).value
    ).toBe('hello')
    await user.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(
      (screen.getByRole('searchbox') as HTMLInputElement).value
    ).toBe('')
  })

  it('clicking clear fires onClear callback', async () => {
    const user = userEvent.setup()
    const onClear = vi.fn()
    render(<Controlled initial="hello" onClear={onClear} />)
    await user.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(onClear).toHaveBeenCalledOnce()
  })

  it('shows the shortcut hint when value is empty and shortcut prop is set', () => {
    render(<SearchField value="" onChange={() => {}} shortcut="/" />)
    expect(screen.getByText('/')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Clear search' })
    ).not.toBeInTheDocument()
  })

  it('hides the shortcut hint once the user types', () => {
    render(<SearchField value="x" onChange={() => {}} shortcut="/" />)
    expect(screen.queryByText('/')).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Clear search' })
    ).toBeInTheDocument()
  })

  it('merges custom className on the wrapper', () => {
    render(
      <SearchField
        value=""
        onChange={() => {}}
        className="custom-extra"
      />
    )
    expect(screen.getByRole('search').className).toContain('custom-extra')
  })
})
