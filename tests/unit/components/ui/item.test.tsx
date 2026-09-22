import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Item, ItemIcon, ItemLabel, ItemTrailer } from '@/components/ui/item'
import { ListGroup, ListGroupItem } from '@/components/ui/list-group'
import { Sortable, SortableItem } from '@/components/ui/sortable'

// The pattern under test is lavahire's
// `app/jobs/[id]/questionnaire/[qid]/question-row.tsx`
// (MikeNotThePope/substrateui#123 item 7): a full-width `<button>` row with a
// leading marker, a truncating title, a conditional badge and a trailer, drawn
// by hand because `Item` rendered a `div` and nothing else.
//
// The item proposed an `ItemButton`. What it needs is `render`, because the
// same shape over there is a button once, a link once, and a plain container
// twice — so the element is the variable and the row is not.

const itemOf = (el: HTMLElement) =>
  el.closest('[data-slot="item"]') as HTMLElement

describe('Item', () => {
  it('still renders a div by default', () => {
    render(<Item><ItemLabel>Inbox</ItemLabel></Item>)
    expect(itemOf(screen.getByText('Inbox')).tagName).toBe('DIV')
  })

  it('is the button when render says so, and carries the row shape onto it', () => {
    render(
      <Item render={<button />} size="lg">
        <ItemLabel>Why do you want to work here?</ItemLabel>
      </Item>
    )
    const row = screen.getByRole('button', {
      name: 'Why do you want to work here?',
    })
    expect(row.tagName).toBe('BUTTON')
    // The point of the prop. A row that made the call site re-state its own
    // padding, hover and focus ring would have closed nothing.
    expect(row.className).toContain('min-h-11')
    expect(row.className).toContain('py-3')
    expect(row.className).toContain('hover:bg-surface-interactive')
    expect(row.className).toContain('focus-visible:ring-2')
    // A `<button>` is `width: fit-content` and centres its text; a full-width
    // row is neither.
    expect(row.className).toContain('[&:where(a,button)]:w-full')
    expect(row.className).toContain('[&:where(a,button)]:text-start')
  })

  it('defaults a bare render button to type="button"', () => {
    // A row of actions inside a form: without this every one of them submits.
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Item render={<button />}>
          <ItemLabel>Add a question</ItemLabel>
        </Item>
      </form>
    )
    expect(
      screen.getByRole('button', { name: 'Add a question' })
    ).toHaveAttribute('type', 'button')
  })

  it('leaves an explicit type alone', () => {
    render(
      <Item render={<button type="submit" />}>
        <ItemLabel>Publish</ItemLabel>
      </Item>
    )
    expect(screen.getByRole('button', { name: 'Publish' })).toHaveAttribute(
      'type',
      'submit'
    )
  })

  it('is the link when render says so, and keeps the href', () => {
    render(
      <Item render={<a href="/jobs/1/applications/2" />}>
        <ItemLabel>Dana Whitfield</ItemLabel>
        <ItemTrailer>Review</ItemTrailer>
      </Item>
    )
    // The name runs together: three adjacent inline spans, no whitespace
    // between them in the DOM, so the accessible name has none either. The
    // `gap-2` is layout, and layout is not text.
    const row = screen.getByRole('link', { name: 'Dana WhitfieldReview' })
    expect(row).toHaveAttribute('href', '/jobs/1/applications/2')
  })

  it('renders as a list item when the row has to stay a container', () => {
    // lavahire's FAQ queue: a checkbox and a delete button in one row, so the
    // row cannot be the control. `render` covers that case by doing nothing to
    // it beyond the shape.
    render(
      <ul>
        <Item render={<li />}>
          <ItemLabel>Do you sponsor visas?</ItemLabel>
        </Item>
      </ul>
    )
    expect(screen.getByRole('listitem')).toHaveAttribute('data-slot', 'item')
  })

  it('forwards the caller className and lets it win over the recipe', () => {
    render(
      <Item className="px-0" render={<button />}>
        <ItemLabel>Flush</ItemLabel>
      </Item>
    )
    const row = screen.getByRole('button', { name: 'Flush' })
    // tailwind-merge, not concatenation: the row is flush, not `px-3 px-0`
    // resolved by whichever utility the stylesheet happened to emit last.
    expect(row.className).toContain('px-0')
    expect(row.className).not.toContain('px-3')
  })

  it('merges the caller onClick with the rendered element', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Item render={<button />} onClick={onClick}>
        <ItemLabel>Open</ItemLabel>
      </Item>
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('keeps active and disabled on the rendered element', () => {
    render(
      <Item render={<button />} active disabled>
        <ItemLabel>Trash</ItemLabel>
      </Item>
    )
    const row = screen.getByRole('button', { name: 'Trash' })
    expect(row).toHaveAttribute('data-active', 'true')
    expect(row).toHaveAttribute('data-disabled', 'true')
    expect(row).toHaveAttribute('aria-disabled', 'true')
  })
})

describe('Item parts', () => {
  it('pins a trailer to the end of the row without shrinking it', () => {
    render(
      <Item>
        <ItemLabel>A very long question that will not fit</ItemLabel>
        <ItemTrailer>Long text</ItemTrailer>
      </Item>
    )
    const trailer = screen.getByText('Long text')
    expect(trailer.className).toContain('ms-auto')
    expect(trailer.className).toContain('flex-none')
  })

  it('leaves two trailers side by side rather than splitting the row', () => {
    render(
      <Item>
        <ItemLabel>Not written yet</ItemLabel>
        <ItemTrailer>Todo</ItemTrailer>
        <ItemTrailer>Long text</ItemTrailer>
      </Item>
    )
    // The first `ms-auto` takes the whole of the free space, so the second one
    // has none to take. Both end up at the end.
    expect(screen.getByText('Todo').className).toContain('ms-auto')
    expect(screen.getByText('Long text').className).toContain('ms-auto')
  })
})

describe('Item inside SortableItem', () => {
  // `builder.tsx` wraps the row in SubstrateUI's own SortableItem, and
  // `builder.test.ts` pins that the move buttons work on a closed row. A row
  // that became a button had to compose inside that without swallowing the
  // grip.
  const rows = ['Why here?', 'Salary?']

  function Builder() {
    return (
      <Sortable onReorder={() => {}}>
        {rows.map((text, i) => (
          <SortableItem key={text} index={i} label={text}>
            <Item render={<button />} size="lg">
              <ItemIcon>{String(i + 1).padStart(2, '0')}</ItemIcon>
              <ItemLabel>{text}</ItemLabel>
              <ItemTrailer>Long text</ItemTrailer>
            </Item>
          </SortableItem>
        ))}
      </Sortable>
    )
  }

  it('leaves the move buttons outside the row and reachable', () => {
    render(<Builder />)
    const row = screen.getByRole('button', { name: '01Why here?Long text' })
    expect(
      screen.getByRole('button', { name: 'Move Why here? up' })
    ).toBeInTheDocument()
    // Nested buttons would be invalid HTML and the move buttons would stop
    // firing. They are siblings of the row, not children of it.
    expect(row.querySelector('button')).toBeNull()
  })

  it('reads its marker, its label and its trailer as one name', () => {
    render(<Builder />)
    // What a screen reader announces for the row: everything inside it, in
    // source order, and run together — adjacent inline spans contribute no
    // whitespace to an accessible name however far `gap-2` pushes them apart.
    // The marker is part of that name, which is why it is a number rather than
    // a bullet.
    expect(
      screen.getByRole('button', { name: '01Why here?Long text' })
    ).toBeInTheDocument()
  })

  it('puts the move buttons before the row in tab order', () => {
    render(<Builder />)
    const focusable = Array.from(
      document.querySelectorAll('button')
    ) as HTMLElement[]
    expect(focusable.map((b) => b.getAttribute('aria-label') ?? b.textContent))
      .toEqual([
        'Move Why here? up',
        'Move Why here? down',
        '01Why here?Long text',
        'Move Salary? up',
        'Move Salary? down',
        '02Salary?Long text',
      ])
  })
})

describe('ListGroupItem', () => {
  // Item 7 says "`Item` and `ListGroupItem` render divs". Half of that was
  // already false when the audit was written: `ListGroupItem` has taken
  // `render` since it shipped, and its own docstring shows a link. Pinned here
  // so the claim this PR corrects cannot quietly become true again.
  it('already rendered as a button, before this change', () => {
    render(
      <ListGroup>
        <ListGroupItem render={<button type="button" />}>Sign out</ListGroupItem>
      </ListGroup>
    )
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument()
  })
})
