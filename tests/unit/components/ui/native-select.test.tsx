import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NativeSelect } from '@/components/ui/native-select'

describe('NativeSelect', () => {
  it('renders a <select> element with <option> children', () => {
    render(
      <NativeSelect aria-label="color">
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </NativeSelect>
    )
    const el = screen.getByLabelText('color')
    expect(el.tagName).toBe('SELECT')
    expect(screen.getByRole('option', { name: 'Red' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Blue' })).toBeInTheDocument()
  })

  it('reflects controlled value', () => {
    render(
      <NativeSelect aria-label="color" value="blue" onChange={() => {}}>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </NativeSelect>
    )
    expect((screen.getByLabelText('color') as HTMLSelectElement).value).toBe(
      'blue'
    )
  })

  it('calls onChange when the user selects an option', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <NativeSelect aria-label="color" defaultValue="red" onChange={onChange}>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </NativeSelect>
    )
    await user.selectOptions(screen.getByLabelText('color'), 'blue')
    expect(onChange).toHaveBeenCalled()
    expect((screen.getByLabelText('color') as HTMLSelectElement).value).toBe(
      'blue'
    )
  })

  it('respects the disabled prop', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <NativeSelect aria-label="color" disabled onChange={onChange}>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
      </NativeSelect>
    )
    const el = screen.getByLabelText('color')
    expect(el).toBeDisabled()
    await user.selectOptions(el, 'blue').catch(() => {})
    expect(onChange).not.toHaveBeenCalled()
  })

  it('respects the required prop', () => {
    render(
      <NativeSelect aria-label="color" required>
        <option value="red">Red</option>
      </NativeSelect>
    )
    expect(screen.getByLabelText('color')).toBeRequired()
  })

  it('applies size variant classes', () => {
    render(
      <NativeSelect aria-label="color" size="lg">
        <option value="red">Red</option>
      </NativeSelect>
    )
    expect(screen.getByLabelText('color').className).toContain('h-11')
  })

  it('merges custom className with base styles', () => {
    render(
      <NativeSelect aria-label="color" className="custom-extra">
        <option value="red">Red</option>
      </NativeSelect>
    )
    const el = screen.getByLabelText('color')
    expect(el.className).toContain('custom-extra')
    expect(el.className).toContain('rounded-md')
  })
})
