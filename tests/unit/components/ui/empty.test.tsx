import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import {
  Empty,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  EmptyAction,
} from '@/components/ui/empty'

describe('Empty', () => {
  it('composes the whole family', () => {
    render(
      <Empty>
        <EmptyIcon>
          <svg data-testid="icon" />
        </EmptyIcon>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>Try adjusting your filters.</EmptyDescription>
        <EmptyAction>
          <button>Reset</button>
        </EmptyAction>
      </Empty>
    )
    expect(screen.getByRole('heading', { name: 'No results' })).toBeInTheDocument()
    expect(screen.getByText('Try adjusting your filters.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})

describe('EmptyTitle', () => {
  it('defaults to an h3', () => {
    // Right when the empty state sits under a page heading, which is the
    // common case and so stays the default.
    render(<EmptyTitle>No results</EmptyTitle>)
    expect(screen.getByRole('heading', { name: 'No results', level: 3 })).toBeInTheDocument()
  })

  it('renders as another heading level when the page needs it', () => {
    // A 404 or an error screen has the empty state as its whole content, so its
    // title is the document's h1. Without this the only way to get one was to
    // hand-copy the class string onto an <H1>, which is what consumers did.
    render(<EmptyTitle render={<h1 />}>This job isn&rsquo;t accepting applications</EmptyTitle>)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.tagName).toBe('H1')
    expect(h1).toHaveTextContent("This job isn’t accepting applications")
  })

  it('keeps its styling when the element changes', () => {
    // The whole point: the caller changes the outline, not the look.
    render(<EmptyTitle render={<h1 />}>Title</EmptyTitle>)
    const cls = screen.getByRole('heading', { level: 1 }).className
    expect(cls).toContain('text-lg')
    expect(cls).toContain('font-semibold')
  })

  it('marks itself for styling hooks whichever element it renders', () => {
    const { rerender } = render(<EmptyTitle>Title</EmptyTitle>)
    expect(screen.getByRole('heading')).toHaveAttribute('data-slot', 'empty-title')

    rerender(<EmptyTitle render={<h2 />}>Title</EmptyTitle>)
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute(
      'data-slot',
      'empty-title'
    )
  })

  it('merges a caller className over the defaults', () => {
    render(<EmptyTitle className="text-2xl">Title</EmptyTitle>)
    const cls = screen.getByRole('heading').className
    expect(cls).toContain('text-2xl')
    expect(cls).not.toContain('text-lg')
  })
})
