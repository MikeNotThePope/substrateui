import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import {
  PageHeader,
  PageHeaderContent,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
} from '@/components/page-header'

describe('PageHeader', () => {
  it('composes a band by default', () => {
    render(
      <PageHeader>
        <PageHeaderContent>
          <div>
            <PageHeaderTitle>Settings</PageHeaderTitle>
            <PageHeaderDescription>Manage your account.</PageHeaderDescription>
          </div>
          <PageHeaderActions>
            <button>Save</button>
          </PageHeaderActions>
        </PageHeaderContent>
      </PageHeader>
    )
    expect(screen.getByRole('heading', { name: 'Settings', level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Manage your account.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('stacks its children vertically at the default size', () => {
    // The band gives a breadcrumb, a title block and its actions a row each.
    render(<PageHeader data-testid="h"><span>a</span></PageHeader>)
    const header = screen.getByTestId('h')
    expect(header.firstElementChild).toHaveAttribute('data-slot', 'stack')
  })

  it('lays its children out in one row at size sm', () => {
    // The bar has no inner wrapper at all — a back button, the title and a
    // badge are siblings of each other, which is what lets them share a line.
    render(<PageHeader size="sm" data-testid="h"><span>a</span></PageHeader>)
    const header = screen.getByTestId('h')
    expect(header.firstElementChild).not.toHaveAttribute('data-slot', 'stack')
    expect(header.className).toContain('flex')
    expect(header.className).toContain('items-center')
  })

  it('drops the card background at size sm', () => {
    // A bar sits inside an app shell that already paints a surface; a band is
    // the surface.
    const { rerender } = render(<PageHeader data-testid="h" />)
    expect(screen.getByTestId('h').className).toContain('bg-card')

    rerender(<PageHeader size="sm" data-testid="h" />)
    expect(screen.getByTestId('h').className).not.toContain('bg-card')
  })

  it('keeps the house border at both sizes', () => {
    const { rerender } = render(<PageHeader data-testid="h" />)
    expect(screen.getByTestId('h').className).toContain('border-b-2')

    rerender(<PageHeader size="sm" data-testid="h" />)
    expect(screen.getByTestId('h').className).toContain('border-b-2')
  })

  it('passes its own props to the header element, not to an inner wrapper', () => {
    // `id` on a landmark is what a skip link targets, so it has to land on the
    // <header> itself. It used to be spread onto the inner Stack.
    render(<PageHeader id="page-top" aria-label="Page" data-testid="h" />)
    const header = screen.getByTestId('h')
    expect(header.tagName).toBe('HEADER')
    expect(header).toHaveAttribute('id', 'page-top')
    expect(header).toHaveAttribute('aria-label', 'Page')
  })
})

describe('PageHeaderTitle', () => {
  it('takes its size from the header it is in', () => {
    const { rerender } = render(
      <PageHeader>
        <PageHeaderTitle>Jobs</PageHeaderTitle>
      </PageHeader>
    )
    expect(screen.getByRole('heading').className).toContain('text-2xl')

    rerender(
      <PageHeader size="sm">
        <PageHeaderTitle>Jobs</PageHeaderTitle>
      </PageHeader>
    )
    expect(screen.getByRole('heading').className).toContain('text-xl')
    expect(screen.getByRole('heading').className).not.toContain('text-2xl')
  })

  it('is an h1 whichever size it is', () => {
    render(
      <PageHeader size="sm">
        <PageHeaderTitle>Jobs</PageHeaderTitle>
      </PageHeader>
    )
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('lets a caller override the size', () => {
    render(
      <PageHeader size="sm">
        <PageHeaderTitle className="text-3xl">Jobs</PageHeaderTitle>
      </PageHeader>
    )
    const cls = screen.getByRole('heading').className
    expect(cls).toContain('text-3xl')
    expect(cls).not.toContain('text-xl')
  })
})

describe('PageHeaderActions', () => {
  it('claims the far end of a bar', () => {
    // In a bar it is one sibling among several, so nothing else pushes it over.
    render(
      <PageHeader size="sm">
        <PageHeaderTitle>Jobs</PageHeaderTitle>
        <PageHeaderActions data-testid="actions">
          <button>New</button>
        </PageHeaderActions>
      </PageHeader>
    )
    expect(screen.getByTestId('actions').className).toContain('ms-auto')
  })

  it('leaves the band alone, where the row already spaces it', () => {
    // `ms-auto` in the band's mobile column layout would right-align the
    // buttons instead of leaving them where they are.
    render(
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Jobs</PageHeaderTitle>
          <PageHeaderActions data-testid="actions">
            <button>New</button>
          </PageHeaderActions>
        </PageHeaderContent>
      </PageHeader>
    )
    expect(screen.getByTestId('actions').className).not.toContain('ms-auto')
  })
})
