import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

describe('ScrollArea', () => {
  it('assembles a scrollbar for both axes', () => {
    // Asserted against the element tree, not the DOM: Base UI drops the bar for
    // an axis that doesn't overflow, and jsdom has no layout, so mounting this
    // renders no bars at all however many are declared.
    //
    // A caller cannot supply the second bar themselves — children go inside the
    // viewport, where a scrollbar would scroll with the content instead of
    // framing it. So dropping back to one bar loses horizontal overflow its bar
    // and breaks nothing else, which is what this guards.
    const tree = ScrollArea({ children: <div /> })
    const bars: unknown[] = []
    const walk = (node: React.ReactNode) => {
      React.Children.forEach(node, (child) => {
        if (!React.isValidElement(child)) return
        if (child.type === ScrollBar) bars.push(child.props)
        walk((child.props as { children?: React.ReactNode }).children)
      })
    }
    walk(tree)

    expect(bars).toHaveLength(2)
    expect(bars.map((p) => (p as { orientation?: string }).orientation)).toEqual([
      'vertical',
      'horizontal',
    ])
  })

  it('puts the content inside the viewport, not beside the bars', () => {
    const { container, getByText } = render(
      <ScrollArea>
        <div>content</div>
      </ScrollArea>
    )
    const root = container.querySelector('[data-slot="scroll-area"]')!
    // The bars are siblings of the viewport; the content is inside it.
    expect(getByText('content').closest('[data-slot="scroll-bar"]')).toBeNull()
    expect(root).toContainElement(getByText('content'))
  })

  it('passes className through to the root', () => {
    const { container } = render(
      <ScrollArea className="custom-extra">
        <div>content</div>
      </ScrollArea>
    )
    expect(
      container.querySelector('[data-slot="scroll-area"]')!.className
    ).toContain('custom-extra')
  })
})
