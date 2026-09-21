import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ThemeToggle } from '@/components/theme-toggle'
import * as organisms from '@/components/index'
import { LabelsProvider } from '@/components/providers/labels-provider'

describe('ThemeToggle', () => {
  it('ships from the organisms entry', () => {
    // Issue #123 item 12: it exists here but is in no published entry.
    expect(organisms.ThemeToggle).toBe(ThemeToggle)
  })

  it('offers light, dark and system — not the Sun/Moon pair the consumer wrote', () => {
    render(<ThemeToggle value="light" />)
    expect(screen.getByRole('button', { name: 'Light theme' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Dark theme' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'System theme' })).toBeInTheDocument()
  })

  it('presses exactly the mode it was given', () => {
    const { rerender } = render(<ThemeToggle value="light" />)
    expect(screen.getByRole('button', { name: 'Light theme' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Dark theme' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )

    rerender(<ThemeToggle value="system" />)
    expect(screen.getByRole('button', { name: 'System theme' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    expect(screen.getByRole('button', { name: 'Light theme' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })

  it('reports the mode that was picked', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<ThemeToggle value="light" onValueChange={onValueChange} />)

    await user.click(screen.getByRole('button', { name: 'Dark theme' }))
    expect(onValueChange).toHaveBeenCalledWith('dark')

    await user.click(screen.getByRole('button', { name: 'System theme' }))
    expect(onValueChange).toHaveBeenCalledWith('system')
  })

  it('holds its own height while the caller does not know the mode yet', () => {
    // Server render and first client render agree on this, which is what keeps
    // a theme read from localStorage out of the hydration diff.
    const { container } = render(<ThemeToggle />)
    expect(screen.queryByRole('button')).toBeNull()
    const placeholder = container.querySelector('[data-slot="theme-toggle-placeholder"]')
    expect(placeholder).toBeInTheDocument()
    expect(placeholder).toHaveAttribute('aria-hidden', 'true')
  })

  it('takes labels from the prop and from the provider', () => {
    const { rerender } = render(
      <ThemeToggle value="light" labels={{ light: 'Clair' }} />,
    )
    expect(screen.getByRole('button', { name: 'Clair' })).toBeInTheDocument()

    rerender(
      <LabelsProvider labels={{ themeToggle: { dark: 'Sombre' } }}>
        <ThemeToggle value="light" />
      </LabelsProvider>,
    )
    expect(screen.getByRole('button', { name: 'Sombre' })).toBeInTheDocument()
  })

  it('imports nothing from next-themes', async () => {
    // The whole reason this is more than a one-line export. `next-themes` is a
    // devDependency, so tsup does not treat it as external — a top-level import
    // is bundled into dist/organisms.js as a private second copy of the
    // package, whose React context no consumer's ThemeProvider ever fills.
    // `useTheme` then returns `{ setTheme: () => {}, themes: [] }` and the
    // toggle renders three unpressed buttons that do nothing.
    // The authoritative check is `audit:boundary`, which reads the real chunk
    // graph of a built dist. This one is here so the mistake is caught in the
    // second a test run takes rather than in a full library build. Anchored at
    // the start of a line so the wiring example in the JSDoc does not match.
    const { readFile } = await import('node:fs/promises')
    const source = await readFile('src/components/theme-toggle.tsx', 'utf-8')
    expect(source).not.toMatch(/^import[^\n]*["']next-themes["']/m)
  })
})
