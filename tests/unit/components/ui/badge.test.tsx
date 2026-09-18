import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

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
})
