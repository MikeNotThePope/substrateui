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

  it('keeps a detail outside the button, so its text selects, and still toggles', async () => {
    const user = userEvent.setup()
    render(
      <Accordion>
        <AccordionItem value="r1">
          <AccordionTrigger detail={<span>3f2a9c1e</span>}>Oct 3, 14:02</AccordionTrigger>
          <AccordionContent>What it meant</AccordionContent>
        </AccordionItem>
      </Accordion>
    )

    const trigger = screen.getByRole('button', { name: 'Oct 3, 14:02' })
    const detail = screen.getByText('3f2a9c1e')
    expect(trigger.contains(detail)).toBe(false)
    expect(trigger.className).toContain('after:inset-0')
    expect(trigger.className).not.toContain('active:')
    expect(detail.closest('[data-slot=accordion-detail]')?.className).toContain('z-10')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('What it meant')).toBeVisible()
  })

  it('keeps the whole row as the button when there is no detail', () => {
    renderAccordion({})
    const trigger = screen.getByRole('button', { name: 'First section' })
    expect(trigger.className).toContain('flex-1')
    expect(trigger.querySelector('svg')).not.toBeNull()
  })
})
