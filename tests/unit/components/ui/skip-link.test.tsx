import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SkipLink } from '@/components/ui/skip-link'

describe('SkipLink', () => {
  it('renders a link with the default label and target', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link', { name: 'Skip to content' })
    expect(link).toHaveAttribute('href', '#main-content')
  })

  it('accepts a custom target and label', () => {
    render(<SkipLink href="#elsewhere">Saltar al contenido</SkipLink>)
    const link = screen.getByRole('link', { name: 'Saltar al contenido' })
    expect(link).toHaveAttribute('href', '#elsewhere')
  })

  it('is in the accessibility tree, not hidden from it', () => {
    // sr-only hides it visually only. `display: none` or `hidden` here would
    // make the link unreachable and the component pointless.
    render(<SkipLink />)
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('stays visually hidden until it is focused', () => {
    render(<SkipLink />)
    const link = screen.getByRole('link')
    expect(link.className).toContain('sr-only')
    expect(link.className).toContain('focus:not-sr-only')
  })

  it('is reachable by keyboard as the first tab stop', async () => {
    const user = userEvent.setup()
    render(
      <>
        <SkipLink />
        <a href="#other">A later link</a>
      </>,
    )
    await user.tab()
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveFocus()
  })

  it('positions itself with logical properties so RTL is not mirrored wrong', () => {
    // audit:direction bans physical left/right utilities across components;
    // this pins the intent for the one place it is easy to regress.
    render(<SkipLink />)
    const cls = screen.getByRole('link').className
    expect(cls).toContain('focus:start-4')
    expect(cls).not.toMatch(/\bfocus:left-\d/)
  })

  it('merges a caller className instead of dropping it', () => {
    render(<SkipLink className="custom-class" />)
    expect(screen.getByRole('link').className).toContain('custom-class')
  })
})
