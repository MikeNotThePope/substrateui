import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(
      screen.getByRole('button', { name: 'Click me' })
    ).toBeInTheDocument()
  })

  it('renders as a <button> element by default', () => {
    render(<Button>Go</Button>)
    const btn = screen.getByRole('button', { name: 'Go' })
    expect(btn.tagName).toBe('BUTTON')
  })

  it('applies default variant classes when no variant is given', () => {
    render(<Button>Default</Button>)
    const btn = screen.getByRole('button', { name: 'Default' })
    expect(btn.className).toContain('bg-primary')
    expect(btn.className).toContain('text-primary-foreground')
  })

  it.each([
    ['default', 'bg-primary'],
    ['destructive', 'bg-destructive'],
    ['outline', 'border-input'],
    ['secondary', 'bg-secondary'],
    ['amber', 'bg-amber-500'],
    ['ghost', 'hover:bg-accent'],
    ['link', 'underline-offset-4'],
  ] as const)('applies variant=%s classes', (variant, expectedClass) => {
    render(<Button variant={variant}>V</Button>)
    const btn = screen.getByRole('button', { name: 'V' })
    expect(btn.className).toContain(expectedClass)
  })

  it.each([
    ['default', 'h-10'],
    ['sm', 'h-9'],
    ['lg', 'h-11'],
    ['icon', 'h-10'],
  ] as const)('applies size=%s classes', (size, expectedClass) => {
    render(
      <Button size={size} aria-label="S">
        S
      </Button>
    )
    const btn = screen.getByRole('button', { name: 'S' })
    expect(btn.className).toContain(expectedClass)
  })

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>
    )
    await user.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders children as the actual element when asChild is set', () => {
    render(
      <Button asChild>
        <a href="/somewhere">Link text</a>
      </Button>
    )
    const link = screen.getByRole('link', { name: 'Link text' })
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/somewhere')
    // Button classes should still be merged onto the child
    expect(link.className).toContain('inline-flex')
  })

  it('forwards ref to the underlying button element', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref me</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current?.textContent).toBe('Ref me')
  })

  it('accepts and uses an aria-label for icon-only buttons', () => {
    render(
      <Button size="icon" aria-label="Add item">
        <svg aria-hidden="true" />
      </Button>
    )
    expect(
      screen.getByRole('button', { name: 'Add item' })
    ).toBeInTheDocument()
  })

  it('merges custom className with variant classes', () => {
    render(<Button className="custom-extra">X</Button>)
    const btn = screen.getByRole('button', { name: 'X' })
    expect(btn.className).toContain('custom-extra')
    expect(btn.className).toContain('bg-primary')
  })

  it('passes through type attribute', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute(
      'type',
      'submit'
    )
  })
})
