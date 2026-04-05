import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from '@/components/ui/switch'

describe('Switch', () => {
  it('renders with role="switch"', () => {
    render(<Switch aria-label="notifications" />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('toggles on click', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Switch
        onCheckedChange={onCheckedChange}
        aria-label="notifications"
      />
    )
    await user.click(screen.getByRole('switch'))
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('toggles on Space keypress when focused', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Switch
        onCheckedChange={onCheckedChange}
        aria-label="notifications"
      />
    )
    const sw = screen.getByRole('switch')
    sw.focus()
    await user.keyboard(' ')
    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('reflects controlled checked state via aria-checked', () => {
    const { rerender } = render(
      <Switch checked={false} aria-label="notifications" />
    )
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false')
    rerender(<Switch checked={true} aria-label="notifications" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('uses defaultChecked for uncontrolled initial state', () => {
    render(<Switch defaultChecked aria-label="notifications" />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Switch
        disabled
        onCheckedChange={onCheckedChange}
        aria-label="notifications"
      />
    )
    await user.click(screen.getByRole('switch'))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('forwards ref to the underlying element', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Switch ref={ref} aria-label="notifications" />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('merges custom className with base styles', () => {
    render(<Switch className="custom-extra" aria-label="notifications" />)
    const sw = screen.getByRole('switch')
    expect(sw.className).toContain('custom-extra')
    expect(sw.className).toContain('rounded-full')
  })
})
