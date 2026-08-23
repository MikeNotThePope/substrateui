import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  FormActions,
  FormActionsPrimary,
  FormActionsSecondary,
} from '@/components/ui/form-actions'

/** Renames a function to `""`, which is what a minifier does to these. */
function anonymise(fn: unknown) {
  const original = (fn as { name: string }).name
  Object.defineProperty(fn, 'name', { value: '', configurable: true })
  return () =>
    Object.defineProperty(fn, 'name', { value: original, configurable: true })
}

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

  it('clusters bare children to the end', () => {
    const { container } = render(
      <FormActions>
        <button>Save</button>
      </FormActions>
    )
    const bar = container.querySelector('[data-slot="form-actions"]')
    expect(bar?.firstElementChild?.getAttribute('data-slot')).toBe('cluster')
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

  // The bug this guards: detection used to read `child.type.name`, which a
  // minified build sets to `""`. The split then never matched, and a bar
  // written left/right shipped as one end-aligned pile — correct in
  // `next dev`, wrong in every production build, and silent in both.
  it('splits the bar even when the sub-components have no name', () => {
    const restore = [anonymise(FormActionsPrimary), anonymise(FormActionsSecondary)]
    try {
      const { container } = render(
        <FormActions>
          <FormActionsSecondary>
            <button>Delete</button>
          </FormActionsSecondary>
          <FormActionsPrimary>
            <button>Save</button>
          </FormActionsPrimary>
        </FormActions>
      )
      const bar = container.querySelector('[data-slot="form-actions"]')
      expect([...(bar?.children ?? [])].map((c) => c.getAttribute('data-slot'))).toEqual([
        'form-actions-secondary',
        'form-actions-primary',
      ])
    } finally {
      restore.forEach((r) => r())
    }
  })
})
