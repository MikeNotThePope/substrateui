import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from '@/components/ui/textarea'

describe('Textarea', () => {
  it('renders as a <textarea> element', () => {
    render(<Textarea aria-label="desc" />)
    const el = screen.getByLabelText('desc')
    expect(el.tagName).toBe('TEXTAREA')
  })

  it('accepts and displays a controlled value', () => {
    render(<Textarea aria-label="desc" value="hello" onChange={() => {}} />)
    const el = screen.getByLabelText('desc') as HTMLTextAreaElement
    expect(el.value).toBe('hello')
  })

  it('calls onChange when the user types', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Textarea aria-label="desc" onChange={onChange} />)
    await user.type(screen.getByLabelText('desc'), 'hi')
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls.length).toBe(2)
  })

  it('respects the disabled prop', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Textarea aria-label="desc" disabled onChange={onChange} />)
    const el = screen.getByLabelText('desc')
    expect(el).toBeDisabled()
    await user.type(el, 'x')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('respects the readOnly prop', () => {
    render(<Textarea aria-label="desc" readOnly value="locked" />)
    const el = screen.getByLabelText('desc') as HTMLTextAreaElement
    expect(el).toHaveAttribute('readonly')
    expect(el.value).toBe('locked')
  })

  it('respects the required prop', () => {
    render(<Textarea aria-label="desc" required />)
    expect(screen.getByLabelText('desc')).toBeRequired()
  })

  it('respects rows and cols', () => {
    render(<Textarea aria-label="desc" rows={5} cols={40} />)
    const el = screen.getByLabelText('desc')
    expect(el).toHaveAttribute('rows', '5')
    expect(el).toHaveAttribute('cols', '40')
  })

  it('forwards ref to the underlying textarea element', () => {
    const ref = React.createRef<HTMLTextAreaElement>()
    render(<Textarea aria-label="desc" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('merges custom className with base styles', () => {
    render(<Textarea aria-label="desc" className="custom-extra" />)
    const el = screen.getByLabelText('desc')
    expect(el.className).toContain('custom-extra')
    expect(el.className).toContain('rounded-md')
  })

  it('passes through placeholder', () => {
    render(<Textarea aria-label="desc" placeholder="write here" />)
    expect(screen.getByPlaceholderText('write here')).toBeInTheDocument()
  })
})
