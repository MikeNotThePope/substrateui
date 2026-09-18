import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { HoneypotField } from '@/components/ui/honeypot-field'

describe('HoneypotField', () => {
  it('submits under a name a script would want to fill', () => {
    const { container } = render(<HoneypotField />)
    const input = container.querySelector('[data-slot="honeypot-field"]')
    expect(input).toHaveAttribute('name', 'company_website')
    expect(input).toHaveAttribute('type', 'text')
  })

  it('takes a name of the form’s choosing', () => {
    const { container } = render(<HoneypotField name="fax_number" />)
    expect(container.querySelector('[data-slot="honeypot-field"]')).toHaveAttribute(
      'name',
      'fax_number',
    )
  })

  it('is not in the accessibility tree', () => {
    render(<HoneypotField />)
    expect(screen.queryByRole('textbox')).toBeNull()
  })

  it('carries aria-hidden and a negative tabindex together', () => {
    // Either one alone is a finding: jsx-a11y's no-aria-hidden-on-focusable and
    // axe's aria-hidden-focus both read an input as focusable unless its
    // tabindex is negative.
    const { container } = render(<HoneypotField />)
    const input = container.querySelector('[data-slot="honeypot-field"]')
    expect(input).toHaveAttribute('aria-hidden', 'true')
    expect(input).toHaveAttribute('tabindex', '-1')
  })

  it('is skipped by Tab', async () => {
    const user = userEvent.setup()
    render(
      <form>
        <input aria-label="Email" name="email" />
        <HoneypotField />
        <button type="button">Send</button>
      </form>,
    )
    await user.tab()
    expect(screen.getByLabelText('Email')).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Send' })).toHaveFocus()
  })

  it('is positioned off-screen rather than display:none', () => {
    const { container } = render(<HoneypotField />)
    const input = container.querySelector('[data-slot="honeypot-field"]')
    expect(input?.className).toContain('start-[-9999px]')
    // Neither of the two ways of making it invisible that a script can spot:
    // `hidden` as a class of its own (overflow-hidden is a different word), and
    // sr-only, which clips it to a 1px box in place.
    expect(input?.className.split(/\s+/)).not.toContain('hidden')
    expect(input?.className.split(/\s+/)).not.toContain('sr-only')
  })

  it('never autofills for a real person', () => {
    const { container } = render(<HoneypotField />)
    expect(container.querySelector('[data-slot="honeypot-field"]')).toHaveAttribute(
      'autocomplete',
      'off',
    )
  })
})
