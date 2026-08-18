import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Overline } from '@/components/ui/overline'

describe('Overline', () => {
  it('renders its label', () => {
    render(<Overline>Section</Overline>)
    expect(screen.getByText('Section')).toBeInTheDocument()
  })

  it('defaults to a span, which contributes no semantics', () => {
    // The treatment is typographic. A component that silently emitted a heading
    // would put every status eyebrow in the document outline.
    render(<Overline>Section</Overline>)
    const el = screen.getByText('Section')
    expect(el.tagName).toBe('SPAN')
    expect(screen.queryByRole('heading')).toBeNull()
  })

  it('renders as another element when asked', () => {
    render(<Overline render={<h3 />}>Resources</Overline>)
    expect(screen.getByRole('heading', { name: 'Resources', level: 3 })).toBeInTheDocument()
  })

  it('carries the monospace treatment at every size', () => {
    const { rerender } = render(<Overline>a</Overline>)
    for (const size of ['2xs', 'xs', 'sm'] as const) {
      rerender(<Overline size={size}>a</Overline>)
      const cls = screen.getByText('a').className
      expect(cls).toContain('font-mono')
      expect(cls).toContain('uppercase')
      expect(cls).toContain('tracking-wider')
    }
  })

  it('maps each size to its own step', () => {
    const { rerender } = render(<Overline size="2xs">a</Overline>)
    expect(screen.getByText('a').className).toContain('text-2xs')

    rerender(<Overline size="xs">a</Overline>)
    expect(screen.getByText('a').className).toContain('text-xs')

    rerender(<Overline size="sm">a</Overline>)
    expect(screen.getByText('a').className).toContain('text-sm')
  })

  it('defaults to xs', () => {
    render(<Overline>a</Overline>)
    expect(screen.getByText('a').className).toContain('text-xs')
  })

  it('lets a caller override the size', () => {
    // `text-2xs` is a custom step, so this also pins that tailwind-merge
    // recognises it as a font size rather than leaving both classes on.
    render(
      <Overline size="2xs" className="text-sm">
        a
      </Overline>
    )
    const cls = screen.getByText('a').className
    expect(cls).toContain('text-sm')
    expect(cls).not.toContain('text-2xs')
  })

  it('lets a caller override the colour', () => {
    render(<Overline className="text-primary">a</Overline>)
    const cls = screen.getByText('a').className
    expect(cls).toContain('text-primary')
    expect(cls).not.toContain('text-muted-foreground')
  })

  it('marks itself for styling hooks', () => {
    render(<Overline>a</Overline>)
    expect(screen.getByText('a')).toHaveAttribute('data-slot', 'overline')
  })
})
