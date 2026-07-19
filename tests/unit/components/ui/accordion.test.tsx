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
  it('expands and collapses an item in single collapsible mode', async () => {
    const user = userEvent.setup()
    renderAccordion({ type: 'single', collapsible: true })

    const trigger = screen.getByRole('button', { name: 'First section' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('First content')).not.toBeInTheDocument()

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('First content')).toBeVisible()

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('emits string values and closes the previous item in single mode', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderAccordion({
      type: 'single',
      collapsible: true,
      defaultValue: 'item-1',
      onValueChange,
    })

    expect(screen.getByText('First content')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Second section' }))
    expect(onValueChange).toHaveBeenCalledWith('item-2')
    expect(screen.getByText('Second content')).toBeVisible()
    expect(screen.queryByText('First content')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Second section' }))
    expect(onValueChange).toHaveBeenLastCalledWith('')
  })

  it('allows multiple items open in multiple mode and emits array values', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderAccordion({
      type: 'multiple',
      defaultValue: ['item-1'],
      onValueChange,
    })

    expect(screen.getByText('First content')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Second section' }))
    expect(onValueChange).toHaveBeenCalledWith(['item-1', 'item-2'])
    expect(screen.getByText('First content')).toBeVisible()
    expect(screen.getByText('Second content')).toBeVisible()
  })

  it('keeps the open item open when collapsible is false', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    renderAccordion({
      type: 'single',
      collapsible: false,
      defaultValue: 'item-1',
      onValueChange,
    })

    const trigger = screen.getByRole('button', { name: 'First section' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('First content')).toBeVisible()
    expect(onValueChange).not.toHaveBeenCalled()
  })
})
