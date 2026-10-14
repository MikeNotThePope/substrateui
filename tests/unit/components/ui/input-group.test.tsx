import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  InputGroup,
  InputGroupPrefix,
  InputGroupReadback,
  InputGroupSuffix,
} from '@/components/ui/input-group'
import { Input } from '@/components/ui/input'

describe('InputGroup', () => {
  it('renders children', () => {
    render(
      <InputGroup>
        <InputGroupPrefix>$</InputGroupPrefix>
        <Input placeholder="Amount" />
        <InputGroupSuffix>USD</InputGroupSuffix>
      </InputGroup>
    )
    expect(screen.getByText('$')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Amount')).toBeInTheDocument()
    expect(screen.getByText('USD')).toBeInTheDocument()
  })

  it('applies the input-group data-slot on the wrapper', () => {
    const { container } = render(
      <InputGroup>
        <Input />
      </InputGroup>
    )
    expect(
      container.querySelector('[data-slot="input-group"]')
    ).toBeInTheDocument()
  })

  it('applies group border and focus-within styles', () => {
    const { container } = render(
      <InputGroup>
        <Input />
      </InputGroup>
    )
    const wrapper = container.querySelector(
      '[data-slot="input-group"]'
    ) as HTMLElement
    expect(wrapper.className).toContain('border-2')
    expect(wrapper.className).toContain('rounded-md')
    expect(wrapper.className).toContain('focus-within:ring-2')
  })

  it('merges custom className with group classes', () => {
    const { container } = render(
      <InputGroup className="custom-extra">
        <Input />
      </InputGroup>
    )
    const wrapper = container.querySelector(
      '[data-slot="input-group"]'
    ) as HTMLElement
    expect(wrapper.className).toContain('custom-extra')
    expect(wrapper.className).toContain('flex')
  })

  it('forwards arbitrary div props (id, data-*) to the wrapper', () => {
    const { container } = render(
      <InputGroup id="my-group" data-testid="grp">
        <Input />
      </InputGroup>
    )
    const wrapper = container.querySelector(
      '[data-slot="input-group"]'
    ) as HTMLElement
    expect(wrapper.id).toBe('my-group')
    expect(wrapper.getAttribute('data-testid')).toBe('grp')
  })
})

describe('InputGroupPrefix', () => {
  it('renders content with left padding', () => {
    const { container } = render(<InputGroupPrefix>$</InputGroupPrefix>)
    const prefix = container.querySelector(
      '[data-slot="input-group-prefix"]'
    ) as HTMLElement
    expect(prefix).toBeInTheDocument()
    expect(prefix.className).toContain('ps-3')
    expect(prefix.textContent).toBe('$')
  })

  it('accepts custom className', () => {
    const { container } = render(
      <InputGroupPrefix className="extra">x</InputGroupPrefix>
    )
    const prefix = container.querySelector(
      '[data-slot="input-group-prefix"]'
    ) as HTMLElement
    expect(prefix.className).toContain('extra')
    expect(prefix.className).toContain('ps-3')
  })
})

describe('InputGroupSuffix', () => {
  it('renders content with right padding', () => {
    const { container } = render(<InputGroupSuffix>USD</InputGroupSuffix>)
    const suffix = container.querySelector(
      '[data-slot="input-group-suffix"]'
    ) as HTMLElement
    expect(suffix).toBeInTheDocument()
    expect(suffix.className).toContain('pe-3')
    expect(suffix.textContent).toBe('USD')
  })

  it('accepts custom className', () => {
    const { container } = render(
      <InputGroupSuffix className="extra">x</InputGroupSuffix>
    )
    const suffix = container.querySelector(
      '[data-slot="input-group-suffix"]'
    ) as HTMLElement
    expect(suffix.className).toContain('extra')
    expect(suffix.className).toContain('pe-3')
  })
})

describe('InputGroup stack', () => {
  it('wraps below sm and stays on one line from sm up', () => {
    const { container } = render(
      <InputGroup stack>
        <Input />
        <InputGroupSuffix>@example.com</InputGroupSuffix>
      </InputGroup>
    )
    const wrapper = container.querySelector(
      '[data-slot="input-group"]'
    ) as HTMLElement
    expect(wrapper.dataset.stack).toBe('true')
    expect(wrapper.className).toContain('flex-wrap')
    expect(wrapper.className).toContain('sm:flex-nowrap')
    expect(wrapper.className).toContain('sm:[&_input]:flex-1')
  })

  it('gives the suffix its own line below sm, inside the border', () => {
    const { container } = render(
      <InputGroup stack>
        <Input />
        <InputGroupSuffix>@example.com</InputGroupSuffix>
      </InputGroup>
    )
    const suffix = container.querySelector(
      '[data-slot="input-group-suffix"]'
    ) as HTMLElement
    expect(suffix.className).toContain('basis-full')
    expect(suffix.className).toContain('border-t-2')
    expect(suffix.className).toContain('sm:basis-auto')
    expect(suffix.className).toContain('sm:whitespace-nowrap')
  })

  it('leaves an unstacked group on one line at every width', () => {
    const { container } = render(
      <InputGroup>
        <Input />
        <InputGroupSuffix>USD</InputGroupSuffix>
      </InputGroup>
    )
    const wrapper = container.querySelector(
      '[data-slot="input-group"]'
    ) as HTMLElement
    const suffix = container.querySelector(
      '[data-slot="input-group-suffix"]'
    ) as HTMLElement
    expect(wrapper.hasAttribute('data-stack')).toBe(false)
    expect(wrapper.className).not.toContain('flex-wrap')
    expect(suffix.className).not.toContain('basis-full')
  })
})

describe('InputGroupReadback', () => {
  function Readback({ defaultValue }: { defaultValue?: string }) {
    return (
      <InputGroupReadback
        label="New address"
        suffix="@example.com"
        defaultValue={defaultValue}
      >
        <InputGroup stack>
          <Input aria-label="Part before the @" defaultValue={defaultValue} />
          <InputGroupSuffix>@example.com</InputGroupSuffix>
        </InputGroup>
      </InputGroupReadback>
    )
  }

  it('reads back the whole value as it is typed', () => {
    render(<Readback />)
    fireEvent.input(screen.getByLabelText('Part before the @'), {
      target: { value: ' ana ' },
    })
    expect(screen.getByText(/New address:/).textContent).toBe(
      'New address: ana@example.com'
    )
  })

  it('selects the whole address in one tap', () => {
    render(<Readback defaultValue="ana" />)
    const address = screen.getByText(
      (_, el) => el?.tagName === 'SPAN' && el.textContent === 'ana@example.com'
    )
    expect(address.className).toContain('select-all')
  })

  it('shows the suffix alone before anything is typed', () => {
    render(<Readback />)
    expect(screen.getByText(/New address:/).textContent).toBe(
      'New address: \u2026@example.com'
    )
  })
})
