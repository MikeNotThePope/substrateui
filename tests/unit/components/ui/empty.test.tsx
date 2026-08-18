import { describe, it, expect } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'

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
    render(<EmptyTitle level={1}>This job isn&rsquo;t accepting applications</EmptyTitle>)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1.tagName).toBe('H1')
    expect(h1).toHaveTextContent("This job isn’t accepting applications")
  })

  it('covers every level a page outline can need', () => {
    const { rerender } = render(<EmptyTitle>Title</EmptyTitle>)
    for (const level of [1, 2, 3, 4] as const) {
      rerender(<EmptyTitle level={level}>Title</EmptyTitle>)
      expect(screen.getByRole('heading', { level })).toBeInTheDocument()
    }
  })

  it('puts no childless heading in the caller source', () => {
    // The whole reason `level` exists. `render={<h1 />}` produces the same DOM,
    // but the source carries an `<h1 />` with no children, which
    // jsx-a11y/heading-has-content reports as an empty heading at every call
    // site — and the rule has no option that can be told otherwise. This pins
    // the two forms as equivalent, so the lint-clean one is never second class.
    const { container: byLevel } = render(<EmptyTitle level={1}>Same</EmptyTitle>)
    const levelHtml = byLevel.innerHTML
    cleanup()

    const { container: byRender } = render(<EmptyTitle render={<h1 />}>Same</EmptyTitle>)
    expect(byRender.innerHTML).toBe(levelHtml)
  })

  it('lets render win when both are given', () => {
    // They answer different questions, so both at once is a mistake — but a
    // silent one either way. `render` is the more specific instruction: it
    // names an element, where `level` only names a depth.
    render(
      <EmptyTitle level={1} render={<p />}>
        Not a heading
      </EmptyTitle>
    )
    expect(screen.queryByRole('heading')).toBeNull()
    expect(screen.getByText('Not a heading').tagName).toBe('P')
  })

  it('keeps its styling when the element changes', () => {
    // The whole point: the caller changes the outline, not the look.
    render(<EmptyTitle level={1}>Title</EmptyTitle>)
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
