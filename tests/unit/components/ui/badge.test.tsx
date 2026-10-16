import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('renders its children', () => {
    render(<Badge>Published</Badge>)
    expect(screen.getByText('Published')).toBeInTheDocument()
  })

  it('pads the default size on both axes', () => {
    render(<Badge>Published</Badge>)
    const badge = screen.getByText('Published')
    expect(badge.className).toContain('px-2.5')
    expect(badge.className).toContain('py-0.5')
  })

  it('tightens xs to sit inline with a line of text', () => {
    render(<Badge size="xs">New</Badge>)
    const badge = screen.getByText('New')
    expect(badge.className).toContain('px-1')
    expect(badge.className).not.toContain('px-2.5')
  })

  it('keeps the pill and the type at every size', () => {
    render(<Badge size="xs">New</Badge>)
    const badge = screen.getByText('New')
    expect(badge.className).toContain('rounded-full')
    expect(badge.className).toContain('text-[11px]')
  })

  it('takes a variant alongside a size', () => {
    render(
      <Badge size="xs" variant="success">
        Live
      </Badge>,
    )
    expect(screen.getByText('Live').className).toContain('bg-status-success-surface')
  })

  it('marks a badge that is not a state with dot={false}', () => {
    render(
      <>
        <Badge variant="outline">Draft</Badge>
        <Badge variant="outline" dot={false}>
          Full-time
        </Badge>
      </>
    )
    expect(screen.getByText('Draft')).not.toHaveAttribute('data-dot')
    expect(screen.getByText('Full-time')).toHaveAttribute('data-dot', 'false')
  })

  it('dots every Caldera badge but the opted-out one', () => {
    // The dot is the theme's ::before; jsdom draws no pseudo-element, so the
    // rule's selector is what is tested, against each variant.
    const css = readFileSync(join(process.cwd(), 'src/styles/tokens.css'), 'utf8')
    const rule = '[data-theme="caldera"] [data-slot="badge"]:not([data-dot="false"])::before'
    expect(css).toContain(rule)
    const dotted = '[data-slot="badge"]:not([data-dot="false"])'
    const variants = ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'error', 'info'] as const
    render(
      <>
        {variants.map((v) => (
          <Badge key={v} variant={v}>
            {v}
          </Badge>
        ))}
        <Badge variant="outline" dot={false}>
          chip
        </Badge>
      </>
    )
    for (const v of variants) expect(screen.getByText(v).matches(dotted)).toBe(true)
    expect(screen.getByText('chip').matches(dotted)).toBe(false)
  })
})
