import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  FormActions,
  FormActionsPrimary,
  FormActionsSecondary,
} from '@/components/ui/form-actions'

describe('FormActions', () => {
  it('renders children (typically buttons)', () => {
    render(
      <FormActions>
        <button>Cancel</button>
        <button>Save</button>
      </FormActions>
    )
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('applies the documented layout classes (border and padding)', () => {
    const { container } = render(
      <FormActions>
        <button>Save</button>
      </FormActions>
    )
    const el = container.querySelector('[data-slot="form-actions"]')
    expect(el?.className).toContain('border-t-2')
    expect(el?.className).toContain('pt-6')
  })

  it('accepts custom className', () => {
    const { container } = render(
      <FormActions className="custom-extra">
        <button>Save</button>
      </FormActions>
    )
    const el = container.querySelector('[data-slot="form-actions"]')
    expect(el?.className).toContain('custom-extra')
  })

  it('renders primary/secondary sub-components when used', () => {
    render(
      <FormActions>
        <FormActionsSecondary>
          <button>Delete</button>
        </FormActionsSecondary>
        <FormActionsPrimary>
          <button>Save</button>
        </FormActionsPrimary>
      </FormActions>
    )
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })
})
