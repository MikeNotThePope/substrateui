import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/ui/input'

describe('Input', () => {
  it('renders as an <input> element', () => {
    render(<Input aria-label="name" />)
    const input = screen.getByLabelText('name')
    expect(input.tagName).toBe('INPUT')
  })

  it('defaults to text type when none is given', () => {
    render(<Input aria-label="name" />)
    const input = screen.getByLabelText('name') as HTMLInputElement
    // No `type` attribute set => browser default is "text"
    expect(input.type).toBe('text')
  })

  it.each(['text', 'email', 'password', 'number', 'search', 'tel', 'url'])(
    'renders type=%s correctly',
    (type) => {
      render(<Input aria-label="field" type={type} />)
      const input = screen.getByLabelText('field') as HTMLInputElement
      expect(input.type).toBe(type)
    }
  )

  it('accepts and displays a controlled value', () => {
    render(<Input aria-label="name" value="hello" onChange={() => {}} />)
    const input = screen.getByLabelText('name') as HTMLInputElement
    expect(input.value).toBe('hello')
  })

  it('calls onChange when the user types', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Input aria-label="name" onChange={onChange} />)
    await user.type(screen.getByLabelText('name'), 'abc')
    expect(onChange).toHaveBeenCalled()
    // userEvent.type fires one change per character
    expect(onChange.mock.calls.length).toBe(3)
  })

  it('respects the disabled prop', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Input aria-label="name" disabled onChange={onChange} />)
    const input = screen.getByLabelText('name')
    expect(input).toBeDisabled()
    await user.type(input, 'abc')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('respects the readOnly prop', () => {
    render(<Input aria-label="name" readOnly value="locked" />)
    const input = screen.getByLabelText('name') as HTMLInputElement
    expect(input).toHaveAttribute('readonly')
    expect(input.value).toBe('locked')
  })

  it('respects the required prop', () => {
    render(<Input aria-label="name" required />)
    expect(screen.getByLabelText('name')).toBeRequired()
  })

  it('forwards ref to the underlying input element', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input aria-label="name" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('merges custom className with base styles', () => {
    render(<Input aria-label="name" className="custom-extra" />)
    const input = screen.getByLabelText('name')
    expect(input.className).toContain('custom-extra')
    expect(input.className).toContain('rounded-md')
  })

  it('passes through placeholder', () => {
    render(<Input aria-label="name" placeholder="you@example.com" />)
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
  })
})
