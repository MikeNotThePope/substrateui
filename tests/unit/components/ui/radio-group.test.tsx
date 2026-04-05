import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

describe('RadioGroup', () => {
  it('renders items with role="radio"', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="a" aria-label="A" />
        <RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>
    )
    expect(screen.getAllByRole('radio')).toHaveLength(2)
  })

  it('fires onValueChange with the selected value on click', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="a" aria-label="A" />
        <RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>
    )
    await user.click(screen.getByLabelText('B'))
    expect(onValueChange).toHaveBeenCalledWith('b')
  })

  it('only one item is selected at a time (controlled)', () => {
    const { rerender } = render(
      <RadioGroup value="a">
        <RadioGroupItem value="a" aria-label="A" />
        <RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>
    )
    expect(screen.getByLabelText('A')).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByLabelText('B')).toHaveAttribute('aria-checked', 'false')
    rerender(
      <RadioGroup value="b">
        <RadioGroupItem value="a" aria-label="A" />
        <RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>
    )
    expect(screen.getByLabelText('A')).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByLabelText('B')).toHaveAttribute('aria-checked', 'true')
  })

  it('uses defaultValue for uncontrolled initial selection', () => {
    render(
      <RadioGroup defaultValue="b">
        <RadioGroupItem value="a" aria-label="A" />
        <RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>
    )
    expect(screen.getByLabelText('B')).toHaveAttribute('aria-checked', 'true')
  })

it('disabled on the group disables all items', () => {
    render(
      <RadioGroup disabled>
        <RadioGroupItem value="a" aria-label="A" />
        <RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>
    )
    expect(screen.getByLabelText('A')).toBeDisabled()
    expect(screen.getByLabelText('B')).toBeDisabled()
  })

  it('disabled on an individual item disables just that one', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="a" aria-label="A" disabled />
        <RadioGroupItem value="b" aria-label="B" />
      </RadioGroup>
    )
    expect(screen.getByLabelText('A')).toBeDisabled()
    expect(screen.getByLabelText('B')).not.toBeDisabled()
    await user.click(screen.getByLabelText('A'))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('forwards ref on RadioGroup', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <RadioGroup ref={ref}>
        <RadioGroupItem value="a" aria-label="A" />
      </RadioGroup>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('forwards ref on RadioGroupItem', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(
      <RadioGroup>
        <RadioGroupItem value="a" aria-label="A" ref={ref} />
      </RadioGroup>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('accepts custom className on group and item', () => {
    const { container } = render(
      <RadioGroup className="group-extra">
        <RadioGroupItem value="a" aria-label="A" className="item-extra" />
      </RadioGroup>
    )
    expect(
      container.querySelector('[data-slot="radio-group"]')?.className
    ).toContain('group-extra')
    expect(screen.getByLabelText('A').className).toContain('item-extra')
  })
})
