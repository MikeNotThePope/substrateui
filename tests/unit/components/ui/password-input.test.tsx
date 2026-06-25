import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordInput } from '@/components/ui/password-input'
import { LabelsProvider } from '@/components/providers/labels-provider'

describe('PasswordInput', () => {
  it('renders a password field by default', () => {
    render(<PasswordInput aria-label="password" />)
    const input = screen.getByLabelText('password') as HTMLInputElement
    expect(input.tagName).toBe('INPUT')
    expect(input.type).toBe('password')
  })

  it('renders a toggle button labelled "Show password" by default', () => {
    render(<PasswordInput aria-label="password" />)
    const toggle = screen.getByRole('button', { name: 'Show password' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
  })

  it('reveals the value and flips the toggle when clicked', async () => {
    const user = userEvent.setup()
    render(<PasswordInput aria-label="password" defaultValue="hunter2" />)
    const input = screen.getByLabelText('password') as HTMLInputElement
    expect(input.type).toBe('password')

    await user.click(screen.getByRole('button', { name: 'Show password' }))

    expect(input.type).toBe('text')
    const toggle = screen.getByRole('button', { name: 'Hide password' })
    expect(toggle).toHaveAttribute('aria-pressed', 'true')

    await user.click(toggle)
    expect(input.type).toBe('password')
    expect(
      screen.getByRole('button', { name: 'Show password' })
    ).toHaveAttribute('aria-pressed', 'false')
  })

  it('forwards native input props to the underlying input', () => {
    render(
      <PasswordInput
        aria-label="password"
        name="password"
        required
        autoComplete="current-password"
      />
    )
    const input = screen.getByLabelText('password') as HTMLInputElement
    expect(input).toHaveAttribute('name', 'password')
    expect(input).toBeRequired()
    expect(input).toHaveAttribute('autocomplete', 'current-password')
  })

  it('forwards ref to the underlying input element', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<PasswordInput aria-label="password" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('overrides the toggle text via the labels prop', () => {
    render(
      <PasswordInput
        aria-label="password"
        labels={{ showPassword: 'Mostrar', hidePassword: 'Ocultar' }}
      />
    )
    expect(
      screen.getByRole('button', { name: 'Mostrar' })
    ).toBeInTheDocument()
  })

  it('resolves toggle text from the LabelsProvider context', () => {
    render(
      <LabelsProvider labels={{ passwordInput: { showPassword: 'Reveal' } }}>
        <PasswordInput aria-label="password" />
      </LabelsProvider>
    )
    expect(
      screen.getByRole('button', { name: 'Reveal' })
    ).toBeInTheDocument()
  })
})
