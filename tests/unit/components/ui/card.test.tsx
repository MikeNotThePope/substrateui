import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardLink, CardRaised } from '@/components/ui/card'

function Row({ interactive }: { interactive?: boolean }) {
  return (
    <Card interactive={interactive} data-testid="card">
      <CardLink href="/jobs/1">Field Volcanologist</CardLink>
      <CardRaised render={<p className="text-sm" />}>maya@example.com</CardRaised>
    </Card>
  )
}

describe('Card', () => {
  it('presses in only when interactive', () => {
    const { rerender } = render(<Card data-testid="card">Body</Card>)
    expect(screen.getByTestId('card').className).not.toContain('active:translate-x-[3px]')
    rerender(<Card interactive data-testid="card">Body</Card>)
    expect(screen.getByTestId('card').className).toContain('active:translate-x-[3px]')
  })

  it('lifts and positions itself only around a CardLink, never pressing in', () => {
    render(<Row />)
    const card = screen.getByTestId('card').className
    expect(card).toContain('has-[[data-slot=card-link]]:relative')
    expect(card).toContain('has-[[data-slot=card-link]]:hover:-translate-y-0.5')
    expect(card).not.toContain('active:')
    expect(card).not.toContain('cursor-pointer')
  })
})

describe('CardLink', () => {
  it('is one link named by its own text, stretched over the card', () => {
    render(<Row />)
    const link = screen.getByRole('link', { name: 'Field Volcanologist' })
    expect(link).toHaveAttribute('href', '/jobs/1')
    expect(link).toHaveAttribute('data-slot', 'card-link')
    expect(link.className).toContain('after:absolute')
    expect(link.className).toContain('after:inset-0')
  })

  it('renders as the element it is handed, merging classes', () => {
    render(
      <Card>
        <CardLink render={<a href="/r" className="font-medium" />} className="text-lg">
          Routed
        </CardLink>
      </Card>
    )
    const link = screen.getByRole('link', { name: 'Routed' })
    expect(link).toHaveAttribute('href', '/r')
    expect(link.className).toContain('font-medium')
    expect(link.className).toContain('text-lg')
    expect(link.className).toContain('after:inset-0')
  })
})

describe('CardRaised', () => {
  it('sits outside the link, above its hit area', () => {
    render(<Row />)
    const text = screen.getByText('maya@example.com')
    expect(screen.getByRole('link').contains(text)).toBe(false)
    expect(text.tagName).toBe('P')
    expect(text).toHaveAttribute('data-slot', 'card-raised')
    expect(text.className).toContain('relative')
    expect(text.className).toContain('z-10')
    expect(text.className).toContain('text-sm')
  })
})
