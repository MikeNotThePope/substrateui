import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { linkify } from '@/lib/linkify'

describe('linkify', () => {
  it('turns a URL into a link and leaves the rest as text', () => {
    render(<p>{linkify('See https://example.com for details')}</p>)
    const link = screen.getByRole('link', { name: 'https://example.com' })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(screen.getByText(/See/)).toBeInTheDocument()
  })

  it('stops before trailing punctuation', () => {
    render(<p>{linkify('Read https://example.com/docs.')}</p>)
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com/docs')
  })

  it('links every URL in the string', () => {
    render(<p>{linkify('https://a.example and https://b.example')}</p>)
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })

  it('leaves text with no URL alone', () => {
    render(<p>{linkify('no links here')}</p>)
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.getByText('no links here')).toBeInTheDocument()
  })

  it('does not parse the input as markup', () => {
    render(<p>{linkify('<b>not bold</b>')}</p>)
    expect(screen.getByText('<b>not bold</b>')).toBeInTheDocument()
  })

  it('ignores a bare domain', () => {
    // A false positive turns a word someone typed into a link they did not write.
    render(<p>{linkify('mail me at example.com')}</p>)
    expect(screen.queryByRole('link')).toBeNull()
  })
})
