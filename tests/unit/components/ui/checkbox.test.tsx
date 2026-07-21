import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '@/components/ui/checkbox'

describe('Checkbox', () => {
  it('toggles when clicked', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox onCheckedChange={onCheckedChange} aria-label="Accept" />)
    await user.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it('toggles when Space is pressed while focused', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<Checkbox onCheckedChange={onCheckedChange} aria-label="Accept" />)
    const cb = screen.getByRole('checkbox')
    cb.focus()
    await user.keyboard(' ')
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Checkbox
        disabled
        onCheckedChange={onCheckedChange}
        aria-label="Accept"
      />
    )
    await user.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('reflects controlled checked state via aria-checked', () => {
    const { rerender } = render(
      <Checkbox checked={false} aria-label="Accept" />
    )
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'false'
    )
    rerender(<Checkbox checked={true} aria-label="Accept" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'true'
    )
  })

  it('uses defaultChecked for uncontrolled initial state', () => {
    render(<Checkbox defaultChecked aria-label="Accept" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'true'
    )
  })

  it('fires onCheckedChange with false when unchecking', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Checkbox
        defaultChecked
        onCheckedChange={onCheckedChange}
        aria-label="Accept"
      />
    )
    await user.click(screen.getByRole('checkbox'))
    expect(onCheckedChange).toHaveBeenCalledWith(false, expect.anything())
  })

  it('associates with label via htmlFor/id', () => {
    render(
      <>
        <label htmlFor="terms">Terms</label>
        <Checkbox id="terms" />
      </>
    )
    expect(
      screen.getByRole('checkbox', { name: 'Terms' })
    ).toBeInTheDocument()
  })

  it('forwards ref to the underlying element', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Checkbox ref={ref} aria-label="Accept" />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('merges custom className with base styles', () => {
    render(<Checkbox className="custom-extra" aria-label="Accept" />)
    const cb = screen.getByRole('checkbox')
    expect(cb.className).toContain('custom-extra')
    expect(cb.className).toContain('rounded')
  })

  it('supports indeterminate (mixed) state', () => {
    render(<Checkbox checked="indeterminate" aria-label="Accept" />)
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-checked',
      'mixed'
    )
  })
})
