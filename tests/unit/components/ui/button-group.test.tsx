import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'

describe('ButtonGroup', () => {
  it('renders each button child', () => {
    render(
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('button', { name: 'Left' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Middle' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Right' })).toBeInTheDocument()
  })

  it('applies data-slot="button-group" on the wrapper', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>A</Button>
      </ButtonGroup>
    )
    expect(
      container.querySelector('[data-slot="button-group"]')
    ).toBeInTheDocument()
  })

  it('does not strip rounded corners from the first button on the left side', () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>
    )
    const first = screen.getByRole('button', { name: 'First' })
    // first is not last, so rounded-r-none applied; but rounded-l-none should NOT be applied
    expect(first.className).not.toContain('rounded-l-none')
    expect(first.className).toContain('rounded-r-none')
  })

  it('does not strip rounded corners from the last button on the right side', () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Last</Button>
      </ButtonGroup>
    )
    const last = screen.getByRole('button', { name: 'Last' })
    // last is not first, so rounded-l-none applied; rounded-r-none should NOT
    expect(last.className).toContain('rounded-l-none')
    expect(last.className).not.toContain('rounded-r-none')
  })

  it('flushes both sides of middle buttons', () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Middle</Button>
        <Button>Last</Button>
      </ButtonGroup>
    )
    const middle = screen.getByRole('button', { name: 'Middle' })
    expect(middle.className).toContain('rounded-l-none')
    expect(middle.className).toContain('rounded-r-none')
  })

  it('leaves a single-child group fully rounded', () => {
    render(
      <ButtonGroup>
        <Button>Only</Button>
      </ButtonGroup>
    )
    const only = screen.getByRole('button', { name: 'Only' })
    expect(only.className).not.toContain('rounded-l-none')
    expect(only.className).not.toContain('rounded-r-none')
  })

  it('preserves the child button\'s original className', () => {
    render(
      <ButtonGroup>
        <Button className="custom-child">A</Button>
        <Button>B</Button>
      </ButtonGroup>
    )
    const a = screen.getByRole('button', { name: 'A' })
    expect(a.className).toContain('custom-child')
  })

  it('merges custom className onto the group wrapper', () => {
    const { container } = render(
      <ButtonGroup className="group-extra">
        <Button>A</Button>
      </ButtonGroup>
    )
    const wrapper = container.querySelector(
      '[data-slot="button-group"]'
    ) as HTMLElement
    expect(wrapper.className).toContain('group-extra')
    expect(wrapper.className).toContain('flex')
  })

  it('uses negative horizontal spacing to overlap borders', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>A</Button>
        <Button>B</Button>
      </ButtonGroup>
    )
    const wrapper = container.querySelector(
      '[data-slot="button-group"]'
    ) as HTMLElement
    expect(wrapper.className).toContain('-space-x-')
  })
})
