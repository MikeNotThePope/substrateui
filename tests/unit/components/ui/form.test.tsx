import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from '@/components/ui/form'

describe('Form', () => {
  it('renders children inside a <form> element', () => {
    const { container } = render(
      <Form>
        <button type="submit">Submit</button>
      </Form>
    )
    const form = container.querySelector('form')
    expect(form).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('fires onSubmit when the form is submitted', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    render(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>
    )
    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('accepts custom className', () => {
    const { container } = render(
      <Form className="custom-extra">
        <span>hi</span>
      </Form>
    )
    const form = container.querySelector('form')
    expect(form?.className).toContain('custom-extra')
  })

  it('applies the data-slot="form" attribute', () => {
    const { container } = render(
      <Form>
        <span>hi</span>
      </Form>
    )
    expect(
      container.querySelector('[data-slot="form"]')?.tagName
    ).toBe('FORM')
  })

  it('forwards ref to the underlying form element', () => {
    const ref = React.createRef<HTMLFormElement>()
    render(
      <Form ref={ref}>
        <span>hi</span>
      </Form>
    )
    expect(ref.current).toBeInstanceOf(HTMLFormElement)
  })
})
