import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable'

/**
 * These guard the seam with react-resizable-panels, which is where this
 * component silently broke once: it styled its vertical layout off
 * `data-panel-group-direction`, an attribute v2 emitted and v4 does not. Nothing
 * failed — the classes simply stopped matching, and a handle in a vertical group
 * rendered as a 1px-wide vertical rule where a horizontal one belonged.
 *
 * So the assertions are about the attribute the styling depends on, not about
 * computed layout, which jsdom cannot give us.
 */

function Group({ orientation }: { orientation: 'horizontal' | 'vertical' }) {
  return (
    <div style={{ height: 200, width: 400 }}>
      <ResizablePanelGroup orientation={orientation}>
        <ResizablePanel defaultSize={50}>one</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>two</ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

describe('Resizable', () => {
  it('gives the handle an aria-orientation matching the rule, not the group', () => {
    // Side-by-side panels are divided by a *vertical* rule, and vice versa —
    // the styling keys off this, so the inversion is load-bearing.
    const horizontal = render(<Group orientation="horizontal" />)
    expect(
      horizontal.container.querySelector('[role="separator"]')
    ).toHaveAttribute('aria-orientation', 'vertical')

    // A second render gets its own container, so this is that container's only
    // separator rather than the second one overall.
    const vertical = render(<Group orientation="vertical" />)
    expect(
      vertical.container.querySelector('[role="separator"]')
    ).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('styles the handle off aria-orientation, not a dead data attribute', () => {
    const { container } = render(<Group orientation="horizontal" />)
    const handle = container.querySelector('[role="separator"]')!

    expect(handle.className).toContain('aria-[orientation=vertical]:w-px')
    expect(handle.className).toContain('aria-[orientation=horizontal]:h-px')
    // The v2 attribute. Reintroducing it is the regression this file exists for.
    expect(handle.className).not.toContain('panel-group-direction')
  })

  it('does not fight the inline size the library sets on the group', () => {
    // The library writes height/width 100% inline, which beats any class, so a
    // class here would look effective and never be.
    const { container } = render(<Group orientation="horizontal" />)
    const group = container.querySelector('[data-group]')!
    expect(group.className).not.toContain('h-full')
    expect(group.className).not.toContain('flex-col')
  })

  it('passes className through to the group', () => {
    const { container } = render(
      <ResizablePanelGroup orientation="horizontal" className="custom-extra">
        <ResizablePanel>one</ResizablePanel>
      </ResizablePanelGroup>
    )
    expect(container.querySelector('[data-group]')!.className).toContain(
      'custom-extra'
    )
  })

  it('renders the grip only when asked', () => {
    const { container } = render(
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel>one</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>two</ResizablePanel>
      </ResizablePanelGroup>
    )
    expect(
      container.querySelector('[role="separator"]')!.firstElementChild
    ).toBeNull()
  })
})
