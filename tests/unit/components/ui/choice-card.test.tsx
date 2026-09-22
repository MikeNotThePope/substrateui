import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroupCard, CheckboxCard } from '@/components/ui/choice-card'
import { choiceCardVariants } from '@/components/ui/choice-card-variants'

// The pattern under test is lavahire's `app/q/[token]/block-field.tsx` and the
// `block-preview.tsx` that mirrors it (MikeNotThePope/substrateui#123 item 6).
// Three surfaces draw the same option list: the live form, the staff preview
// and the frozen published view. Over there the first is a `<button role="radio">`
// and the other two are a `<span>` painted to match it by a shared class helper,
// with a test asserting the two class strings never drift. Both halves are what
// these cards replace, so the read-only half is tested as hard as the live one.

/** The mark: the circle or the box, whichever card drew it. */
const mark = (card: HTMLElement) =>
  card.querySelector('[data-slot="choice-card-mark"]') as HTMLElement

describe('RadioGroupCard', () => {
  it('is a radio named by its label', () => {
    render(
      <RadioGroup aria-label="Notice period">
        <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
        <RadioGroupCard value="a-month">A month</RadioGroupCard>
      </RadioGroup>
    )
    expect(screen.getAllByRole('radio')).toHaveLength(2)
    expect(screen.getByRole('radio', { name: 'Two weeks' })).toBeInTheDocument()
  })

  it('selects on a click anywhere in the card, not just on the mark', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <RadioGroup aria-label="Notice period" onValueChange={onValueChange}>
        <RadioGroupCard value="two-weeks" description="Ships in a fortnight">
          Two weeks
        </RadioGroupCard>
      </RadioGroup>
    )
    // The description is the far corner of the target. A card whose hit area is
    // the 18px mark is not a card.
    await user.click(screen.getByText('Ships in a fortnight'))
    expect(onValueChange).toHaveBeenCalledWith('two-weeks', expect.anything())
  })

  it('describes with `description` rather than folding it into the name', () => {
    render(
      <RadioGroup aria-label="Notice period">
        <RadioGroupCard value="two-weeks" description="Ships in a fortnight">
          Two weeks
        </RadioGroupCard>
      </RadioGroup>
    )
    const card = screen.getByRole('radio', { name: 'Two weeks' })
    expect(card).toHaveAccessibleDescription('Ships in a fortnight')
  })

  it('keeps a caller aria-label as the name', () => {
    render(
      <RadioGroup aria-label="Notice period">
        <RadioGroupCard value="two-weeks" aria-label="Two weeks from signing">
          Two weeks
        </RadioGroupCard>
      </RadioGroup>
    )
    expect(
      screen.getByRole('radio', { name: 'Two weeks from signing' })
    ).toBeInTheDocument()
  })

  it('keeps a caller aria-describedby alongside its own description', () => {
    render(
      <>
        <p id="outside">Read the policy</p>
        <RadioGroup aria-label="Notice period">
          <RadioGroupCard
            value="two-weeks"
            description="Ships in a fortnight"
            aria-describedby="outside"
          >
            Two weeks
          </RadioGroupCard>
        </RadioGroup>
      </>
    )
    expect(screen.getByRole('radio', { name: 'Two weeks' })).toHaveAccessibleDescription(
      'Ships in a fortnight Read the policy'
    )
  })

  it('is one tab stop for the whole group, and arrow keys move within it', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">before</button>
        <RadioGroup aria-label="Notice period" defaultValue="two-weeks">
          <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
          <RadioGroupCard value="a-month">A month</RadioGroupCard>
        </RadioGroup>
        <button type="button">after</button>
      </>
    )
    await user.click(screen.getByRole('button', { name: 'before' }))
    await user.tab()
    expect(screen.getByRole('radio', { name: 'Two weeks' })).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('radio', { name: 'A month' })).toHaveFocus()
    expect(screen.getByRole('radio', { name: 'A month' })).toHaveAttribute(
      'aria-checked',
      'true'
    )
    await user.tab()
    expect(screen.getByRole('button', { name: 'after' })).toHaveFocus()
  })

  it('carries a target at least 44px on its short side', () => {
    render(
      <RadioGroup aria-label="Notice period">
        <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
      </RadioGroup>
    )
    // jsdom lays nothing out, so the floor is asserted as the class that sets
    // it. "Large-target" is a claim with a number in it: WCAG 2.2 SC 2.5.5
    // asks for 44x44, and `min-h-11` is 2.75rem. The rendered pixels are
    // measured in a real browser, not here.
    expect(screen.getByRole('radio', { name: 'Two weeks' }).className).toContain(
      'min-h-11'
    )
  })

  it('accepts className and marks its slot', () => {
    render(
      <RadioGroup aria-label="Notice period">
        <RadioGroupCard value="two-weeks" className="card-extra">
          Two weeks
        </RadioGroupCard>
      </RadioGroup>
    )
    const card = screen.getByRole('radio', { name: 'Two weeks' })
    expect(card.className).toContain('card-extra')
    expect(card).toHaveAttribute('data-slot', 'radio-group-card')
  })

  it('calls a function className with the state Base UI gives it', () => {
    render(
      <RadioGroup aria-label="Notice period" defaultValue="two-weeks">
        <RadioGroupCard
          value="two-weeks"
          className={(state) => (state.checked ? 'is-picked' : 'not-picked')}
        >
          Two weeks
        </RadioGroupCard>
      </RadioGroup>
    )
    // `cn()` drops a function silently, which is how the plain `RadioGroupItem`
    // has always treated this form. The card is the element Base UI renders, so
    // the state is real and there is nothing to fudge — it gets called.
    const card = screen.getByRole('radio', { name: 'Two weeks' })
    expect(card.className).toContain('is-picked')
    expect(card.className).toContain('min-h-11')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    render(
      <RadioGroup aria-label="Notice period">
        <RadioGroupCard value="two-weeks" ref={ref}>
          Two weeks
        </RadioGroupCard>
      </RadioGroup>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})

describe('CheckboxCard', () => {
  it('is a checkbox named by its label, toggled by Space', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(<CheckboxCard onCheckedChange={onCheckedChange}>Two weeks</CheckboxCard>)
    const card = screen.getByRole('checkbox', { name: 'Two weeks' })
    expect(card).toHaveAttribute('aria-checked', 'false')
    card.focus()
    await user.keyboard(' ')
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it('selects on a click anywhere in the card', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <CheckboxCard onCheckedChange={onCheckedChange} description="A fortnight">
        Two weeks
      </CheckboxCard>
    )
    await user.click(screen.getByText('A fortnight'))
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })

  it('describes with `description` rather than folding it into the name', () => {
    render(<CheckboxCard description="A fortnight">Two weeks</CheckboxCard>)
    expect(
      screen.getByRole('checkbox', { name: 'Two weeks' })
    ).toHaveAccessibleDescription('A fortnight')
  })

  it('marks its slot', () => {
    render(<CheckboxCard>Two weeks</CheckboxCard>)
    expect(screen.getByRole('checkbox', { name: 'Two weeks' })).toHaveAttribute(
      'data-slot',
      'checkbox-card'
    )
  })
})

describe('a read-only choice card', () => {
  // The frozen answer view is the surface most likely to be missed. It is not a
  // disabled form: the answer is final, not unavailable, and a screen reader
  // should still be able to read which option was picked.
  it('keeps the role and the answer, and refuses to change it', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <RadioGroup
        aria-label="Notice period"
        value="two-weeks"
        readOnly
        onValueChange={onValueChange}
      >
        <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
        <RadioGroupCard value="a-month">A month</RadioGroupCard>
      </RadioGroup>
    )
    const picked = screen.getByRole('radio', { name: 'Two weeks' })
    const other = screen.getByRole('radio', { name: 'A month' })
    expect(picked).toHaveAttribute('aria-checked', 'true')
    expect(picked).toHaveAttribute('aria-readonly', 'true')
    await user.click(other)
    expect(onValueChange).not.toHaveBeenCalled()
    expect(picked).toHaveAttribute('aria-checked', 'true')
    expect(other).toHaveAttribute('aria-checked', 'false')
  })

  it('is readable by keyboard, and is not disabled', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">before</button>
        <RadioGroup aria-label="Notice period" value="two-weeks" readOnly>
          <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
          <RadioGroupCard value="a-month">A month</RadioGroupCard>
        </RadioGroup>
      </>
    )
    await user.click(screen.getByRole('button', { name: 'before' }))
    await user.tab()
    const picked = screen.getByRole('radio', { name: 'Two weeks' })
    expect(picked).toHaveFocus()
    expect(picked).not.toHaveAttribute('aria-disabled')
    expect(picked).not.toHaveAttribute('data-disabled')
    expect(picked).toHaveAttribute('data-readonly')
  })

  it('a read-only checkbox card is read-only, not disabled', () => {
    render(
      <CheckboxCard readOnly checked>
        Two weeks
      </CheckboxCard>
    )
    const card = screen.getByRole('checkbox', { name: 'Two weeks' })
    expect(card).toHaveAttribute('aria-readonly', 'true')
    expect(card).toHaveAttribute('aria-checked', 'true')
    expect(card).not.toHaveAttribute('aria-disabled')
  })

  it('is not painted as disabled', () => {
    // A card that can only render read-only by looking disabled does not
    // replace lavahire's pair of surfaces. Nothing in the recipe may dim or
    // strike out a read-only card; that treatment belongs to `disabled` alone.
    const recipe = choiceCardVariants()
    expect(recipe).toMatch(/data-\[disabled\]:opacity-50/)
    expect(recipe).not.toMatch(/data-\[readonly\][^\s]*opacity/)
    expect(recipe).not.toMatch(/data-\[readonly\][^\s]*not-allowed/)
  })

  it('a disabled card, by contrast, is dimmed and refuses the pointer', () => {
    render(
      <RadioGroup aria-label="Notice period">
        <RadioGroupCard value="two-weeks" disabled>
          Two weeks
        </RadioGroupCard>
      </RadioGroup>
    )
    const card = screen.getByRole('radio', { name: 'Two weeks' })
    expect(card).toHaveAttribute('data-disabled')
    expect(card).toHaveAttribute('aria-disabled', 'true')
  })
})

describe('the two cards are one card', () => {
  // lavahire needed `app/q/[token]/fidelity.test.ts` because the control and the
  // read-only picture of it lived in two files and drifted on five values. Here
  // every surface is one component off one recipe, and this is what says so.
  it('gives both cards the same box', () => {
    const { unmount } = render(
      <RadioGroup aria-label="Notice period">
        <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
      </RadioGroup>
    )
    const radio = screen.getByRole('radio', { name: 'Two weeks' }).className
    unmount()

    render(<CheckboxCard>Two weeks</CheckboxCard>)
    const checkbox = screen.getByRole('checkbox', { name: 'Two weeks' }).className
    expect(checkbox).toBe(radio)
  })

  it('gives the box the same paint read-only as live', () => {
    const { unmount } = render(
      <RadioGroup aria-label="Notice period">
        <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
      </RadioGroup>
    )
    const live = screen.getByRole('radio', { name: 'Two weeks' }).className
    unmount()

    render(
      <RadioGroup aria-label="Notice period" readOnly>
        <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
      </RadioGroup>
    )
    const frozen = screen.getByRole('radio', { name: 'Two weeks' }).className
    expect(frozen).toBe(live)
  })

  // What a card can still drift against is the standalone control it claims to
  // be a bigger target for. Measured in a real browser before this test existed:
  // the card's checkbox mark drew a 1px corner where `Checkbox` draws 10px.
  const SHAPE = /^(?:rounded|h-\[|w-\[|size-|border-2|border-primary)/
  const shapeOf = (el: Element) =>
    el.className.split(' ').filter((c) => SHAPE.test(c)).sort().join(' ')

  it('draws the same circle as RadioGroupItem', () => {
    const { unmount } = render(
      <RadioGroup aria-label="Notice period">
        <RadioGroupItem value="two-weeks" aria-label="Two weeks" />
      </RadioGroup>
    )
    const control = shapeOf(screen.getByLabelText('Two weeks'))
    unmount()

    render(
      <RadioGroup aria-label="Notice period">
        <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
      </RadioGroup>
    )
    expect(shapeOf(mark(screen.getByRole('radio', { name: 'Two weeks' })))).toBe(
      control
    )
  })

  it('draws the same box as Checkbox', () => {
    const { unmount } = render(<Checkbox aria-label="Two weeks" />)
    const control = shapeOf(screen.getByLabelText('Two weeks'))
    unmount()

    render(<CheckboxCard>Two weeks</CheckboxCard>)
    expect(
      shapeOf(mark(screen.getByRole('checkbox', { name: 'Two weeks' })))
    ).toBe(control)
  })

  it('gives the radio a round mark and the checkbox a square one', () => {
    const { unmount } = render(
      <RadioGroup aria-label="Notice period">
        <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
      </RadioGroup>
    )
    const round = mark(screen.getByRole('radio', { name: 'Two weeks' })).className
    unmount()

    render(<CheckboxCard>Two weeks</CheckboxCard>)
    const square = mark(
      screen.getByRole('checkbox', { name: 'Two weeks' })
    ).className
    expect(round).toContain('rounded-full')
    expect(square).not.toContain('rounded-full')
  })

  it('hides the mark from the accessible name', () => {
    render(<CheckboxCard>Two weeks</CheckboxCard>)
    // The mark is the same information as `aria-checked`, drawn. Announcing it
    // twice is how a checkbox ends up called "checked Two weeks".
    expect(mark(screen.getByRole('checkbox', { name: 'Two weeks' }))).toHaveAttribute(
      'aria-hidden',
      'true'
    )
  })
})
