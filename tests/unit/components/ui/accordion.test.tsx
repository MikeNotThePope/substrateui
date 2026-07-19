import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

function renderAccordion(props: React.ComponentProps<typeof Accordion>) {
  return render(
    <Accordion {...props}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionContent>First content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionContent>Second content</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

describe('Accordion', () => {
  it('expands and collapses an item', async () => {
    const user = userEvent.setup()
    renderAccordion({})

    const trigger = screen.getByRole('button', { name: 'First section' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('First content')).not.toBeInTheDocument()

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('First content')).toBeVisible()

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the previous item by default and emits array values', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderAccordion({ defaultValue: ['item-1'], onValueChange })

    expect(screen.getByText('First content')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Second section' }))
    expect(onValueChange).toHaveBeenCalledWith(['item-2'], expect.anything())
    expect(screen.getByText('Second content')).toBeVisible()
    expect(screen.queryByText('First content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Second section' }))
    expect(onValueChange).toHaveBeenLastCalledWith([], expect.anything())
  })

  it('allows several items open with the multiple prop', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderAccordion({ multiple: true, defaultValue: ['item-1'], onValueChange })

    expect(screen.getByText('First content')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Second section' }))
    expect(onValueChange).toHaveBeenCalledWith(
      ['item-1', 'item-2'],
      expect.anything()
    )
    expect(screen.getByText('First content')).toBeVisible()
    expect(screen.getByText('Second content')).toBeVisible()
  })
})
