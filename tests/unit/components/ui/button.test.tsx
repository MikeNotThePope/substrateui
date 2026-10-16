import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button-variants'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toggleVariants } from '@/components/ui/toggle-variants'

/** The class match Caldera draws an outline button's magma edge on. */
const OUTLINE_EDGE = '.border-input[class*="shadow-hard-sm"]'

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
    ['secondary-fill', 'bg-secondary-fill'],
    ['ghost', 'hover:bg-accent'],
    ['link', 'underline-offset-4'],
  ] as const)('applies variant=%s classes', (variant, expectedClass) => {
    render(<Button variant={variant}>V</Button>)
    const btn = screen.getByRole('button', { name: 'V' })
    expect(btn.className).toContain(expectedClass)
  })

  // "amber" shipped in 1.x and stays as an alias. It must keep resolving to
  // exactly the same classes as secondary-fill, or the deprecation silently
  // changes how existing consumers' buttons look.
  it('treats the deprecated amber variant as an alias of secondary-fill', () => {
    render(<Button variant="amber">Old</Button>)
    render(<Button variant="secondary-fill">New</Button>)
    const old = screen.getByRole('button', { name: 'Old' })
    const next = screen.getByRole('button', { name: 'New' })
    expect(old.className).toBe(next.className)
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

  it('renders the render-prop element as the actual element', () => {
    render(<Button render={<a href="/somewhere" />}>Link text</Button>)
    const link = screen.getByRole('link', { name: 'Link text' })
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/somewhere')
    // Button classes should still be merged onto the rendered element
    expect(link.className).toContain('inline-flex')
  })

  it('merges className from the render-prop element with variant classes', () => {
    render(
      <Button render={<a href="/x" className="from-render" />}>Merge</Button>
    )
    const link = screen.getByRole('link', { name: 'Merge' })
    expect(link.className).toContain('from-render')
    expect(link.className).toContain('bg-primary')
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

  it('sizes icon-sm to sit beside a small control', () => {
    render(<Button size="icon-sm" aria-label="Copy" />)
    const btn = screen.getByRole('button', { name: 'Copy' })
    expect(btn.className).toContain('h-9')
    expect(btn.className).toContain('w-9')
  })

  describe('Caldera outline edge', () => {
    const css = readFileSync(join(process.cwd(), 'src/styles/tokens.css'), 'utf8')

    it('is a rule in both modes', () => {
      expect(css).toContain(`[data-theme="caldera"] ${OUTLINE_EDGE} { border-color: var(--primary); }`)
      expect(css).toContain(`[data-theme="caldera"]:not(.dark) ${OUTLINE_EDGE}:not(`)
    })

    it('matches an outline Button and an outline buttonVariants link', () => {
      render(
        <>
          <Button variant="outline">Sign out</Button>
          <a href="/x" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            Your applications
          </a>
        </>
      )
      expect(screen.getByRole('button', { name: 'Sign out' }).matches(OUTLINE_EDGE)).toBe(true)
      expect(screen.getByRole('link', { name: 'Your applications' }).matches(OUTLINE_EDGE)).toBe(true)
    })

    it('matches no other variant and no field', () => {
      render(
        <>
          <Button>Save</Button>
          <Button variant="secondary">Later</Button>
          <Input aria-label="name" />
          <Textarea aria-label="note" />
          <button type="button" className={toggleVariants({ variant: 'outline' })}>
            Bold
          </button>
        </>
      )
      for (const name of ['Save', 'Later', 'Bold']) {
        expect(screen.getByRole('button', { name }).matches(OUTLINE_EDGE)).toBe(false)
      }
      expect(screen.getByLabelText('name').matches(OUTLINE_EDGE)).toBe(false)
      expect(screen.getByLabelText('note').matches(OUTLINE_EDGE)).toBe(false)
    })
  })
})
