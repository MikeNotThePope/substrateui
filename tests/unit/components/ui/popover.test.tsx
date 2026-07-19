import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

describe('Popover', () => {
  it('opens on trigger click and renders content', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByText('Popover body')).toBeInTheDocument()
  })

  it('supports asChild triggers, merging onto the child element', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Custom trigger</Button>
        </PopoverTrigger>
        <PopoverContent>Body</PopoverContent>
      </Popover>
    )
    const trigger = screen.getByRole('button', { name: 'Custom trigger' })
    // The Button's own styling must survive the merge
    expect(trigger.className).toContain('border-input')
    await user.click(trigger)
    expect(await screen.findByText('Body')).toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Body</PopoverContent>
      </Popover>
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByText('Body')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByText('Body')).not.toBeInTheDocument()
  })
})
