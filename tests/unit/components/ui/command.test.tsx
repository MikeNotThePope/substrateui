import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

function Palette({ onSelect }: { onSelect?: (v: string) => void }) {
  return (
    <Command>
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={onSelect}>Calendar</CommandItem>
          <CommandItem onSelect={onSelect}>Search</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem onSelect={onSelect}>Profile</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

describe('Command', () => {
  it('renders items and group headings with the list always visible', () => {
    render(<Palette />)
    expect(screen.getByText('Calendar')).toBeInTheDocument()
    expect(screen.getByText('Suggestions')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
  })

  it('filters items as the user types and shows empty state for no matches', async () => {
    const user = userEvent.setup()
    render(<Palette />)
    await user.type(screen.getByPlaceholderText('Type a command...'), 'cal')
    expect(screen.getByText('Calendar')).toBeInTheDocument()
    expect(screen.queryByText('Profile')).not.toBeInTheDocument()

    await user.clear(screen.getByPlaceholderText('Type a command...'))
    await user.type(
      screen.getByPlaceholderText('Type a command...'),
      'zzz-no-match'
    )
    expect(screen.queryByText('Calendar')).not.toBeInTheDocument()
    expect(screen.getByText('No results found.')).toBeInTheDocument()
  })

  it('fires onSelect with the derived text value on click', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Palette onSelect={onSelect} />)
    await user.click(screen.getByText('Search'))
    expect(onSelect).toHaveBeenCalledWith('Search')
  })
})
