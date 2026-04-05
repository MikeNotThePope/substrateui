import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

describe('Field', () => {
  it('renders label, input, and hint together', () => {
    render(
      <Field>
        <FieldLabel>Display name</FieldLabel>
        <Input id="display-name" placeholder="name" />
        <FieldHint>This is how others will see you.</FieldHint>
      </Field>
    )
    expect(screen.getByText('Display name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('name')).toBeInTheDocument()
    expect(
      screen.getByText('This is how others will see you.')
    ).toBeInTheDocument()
  })

  it('associates FieldLabel with an input via htmlFor using the Field id', () => {
    render(
      <Field id="my-field">
        <FieldLabel>Name</FieldLabel>
        <Input id="my-field" />
      </Field>
    )
    // getByLabelText resolves label -> control via htmlFor/id
    const input = screen.getByLabelText('Name')
    expect(input).toBeInstanceOf(HTMLInputElement)
    expect(input).toHaveAttribute('id', 'my-field')
  })

  it('auto-generates a stable id when none is provided', () => {
    render(
      <Field>
        <FieldLabel>Auto</FieldLabel>
        <Input />
      </Field>
    )
    const label = screen.getByText('Auto')
    expect(label).toHaveAttribute('for')
    expect(label.getAttribute('for')).not.toBe('')
  })

  it('focuses the input when the label is clicked', async () => {
    const user = userEvent.setup()
    render(
      <Field id="click-focus">
        <FieldLabel>Email</FieldLabel>
        <Input id="click-focus" type="email" />
      </Field>
    )
    const label = screen.getByText('Email')
    const input = screen.getByLabelText('Email')
    await user.click(label)
    expect(input).toHaveFocus()
  })

  it('FieldHint has an id derived from the field id', () => {
    render(
      <Field id="hinted">
        <FieldLabel>Name</FieldLabel>
        <Input id="hinted" />
        <FieldHint>A nice hint.</FieldHint>
      </Field>
    )
    const hint = screen.getByText('A nice hint.')
    expect(hint).toHaveAttribute('id', 'hinted-hint')
  })

  it('FieldError has an id derived from the field id and role="alert"', () => {
    render(
      <Field id="bad" error>
        <FieldLabel>Password</FieldLabel>
        <Input id="bad" type="password" />
        <FieldError>Too short.</FieldError>
      </Field>
    )
    const err = screen.getByRole('alert')
    expect(err).toHaveAttribute('id', 'bad-error')
    expect(err).toHaveTextContent('Too short.')
  })

  it('FieldError renders nothing when children are empty', () => {
    render(
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input />
        <FieldError>{null}</FieldError>
      </Field>
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('applies error styling classes to inputs when error is true', () => {
    const { container } = render(
      <Field error>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="err-input" />
        <FieldError>Bad.</FieldError>
      </Field>
    )
    const wrapper = container.querySelector('[data-slot="field"]')
    expect(wrapper?.className).toContain('border-status-error')
  })

  it('gives FieldLabel error-colored text when error is true', () => {
    render(
      <Field error>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldError>Bad.</FieldError>
      </Field>
    )
    const label = screen.getByText('Email')
    expect(label.className).toContain('text-status-error-text')
  })

  it('does not render error-colored label text when error is false', () => {
    render(
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input />
      </Field>
    )
    const label = screen.getByText('Email')
    expect(label.className).not.toContain('text-status-error-text')
  })

  it('accepts additional className on Field wrapper', () => {
    const { container } = render(
      <Field className="my-extra-class">
        <FieldLabel>X</FieldLabel>
        <Input />
      </Field>
    )
    const wrapper = container.querySelector('[data-slot="field"]')
    expect(wrapper?.className).toContain('my-extra-class')
    expect(wrapper?.className).toContain('space-y-2')
  })
})
