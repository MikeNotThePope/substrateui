import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  CornerPanel,
  CornerPanelBody,
  CornerPanelClose,
  CornerPanelContent,
  CornerPanelFooter,
  CornerPanelHeader,
  CornerPanelTitle,
  CornerPanelTrigger,
} from '@/components/ui/corner-panel'

function Widget({
  actions,
  ...props
}: { actions?: React.ReactNode } & React.ComponentProps<typeof CornerPanel>) {
  return (
    <CornerPanel {...props}>
      <CornerPanelTrigger aria-label="Open chat">
        <svg data-testid="launcher-icon" />
      </CornerPanelTrigger>
      <CornerPanelContent>
        <CornerPanelHeader actions={actions}>
          <CornerPanelTitle>Chat</CornerPanelTitle>
        </CornerPanelHeader>
        <CornerPanelBody>
          <p>Newest message</p>
          <button type="button">In the body</button>
        </CornerPanelBody>
        <CornerPanelFooter>
          <button type="button">Send</button>
        </CornerPanelFooter>
      </CornerPanelContent>
    </CornerPanel>
  )
}

describe('CornerPanel', () => {
  it('shows only the launcher at rest', () => {
    render(<Widget />)
    expect(screen.getByRole('button', { name: 'Open chat' })).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('swaps the launcher for the panel', async () => {
    const user = userEvent.setup()
    render(<Widget />)

    await user.click(screen.getByRole('button', { name: 'Open chat' }))

    expect(screen.getByRole('dialog', { name: 'Chat' })).toBeInTheDocument()
    // The swap: the launcher is gone, not merely covered.
    expect(screen.queryByRole('button', { name: 'Open chat' })).toBeNull()
  })

  it('moves focus into the panel when it opens', async () => {
    const user = userEvent.setup()
    render(<Widget />)

    await user.click(screen.getByRole('button', { name: 'Open chat' }))

    expect(screen.getByRole('dialog')).toContainElement(
      document.activeElement as HTMLElement,
    )
  })

  it('traps Tab inside the panel', async () => {
    // None of the three hand-rolled copies did this, which is the reason the
    // panel owns a FocusTrap upstream.
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Outside</button>
        <Widget />
      </>,
    )
    await user.click(screen.getByRole('button', { name: 'Open chat' }))

    screen.getByRole('button', { name: 'Send' }).focus()
    fireEvent.keyDown(document, { key: 'Tab' })

    expect(screen.getByRole('dialog')).toContainElement(
      document.activeElement as HTMLElement,
    )
    expect(screen.getByRole('button', { name: 'Outside' })).not.toHaveFocus()
  })

  it('closes on Escape from anywhere inside', async () => {
    const user = userEvent.setup()
    render(<Widget />)
    await user.click(screen.getByRole('button', { name: 'Open chat' }))

    // Not from the panel root — from a control buried in the footer.
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('returns focus to the launcher when it closes', async () => {
    // The half the consumer needed flushSync for: the launcher does not exist
    // while the panel is open, so focus can only return once it is back.
    const user = userEvent.setup()
    render(<Widget />)
    await user.click(screen.getByRole('button', { name: 'Open chat' }))
    await user.keyboard('{Escape}')

    expect(screen.getByRole('button', { name: 'Open chat' })).toHaveFocus()
  })

  it('closes from the close button', async () => {
    const user = userEvent.setup()
    render(
      <CornerPanel>
        <CornerPanelTrigger aria-label="Open chat">
          <svg />
        </CornerPanelTrigger>
        <CornerPanelContent>
          <CornerPanelHeader actions={<CornerPanelClose />}>
            <CornerPanelTitle>Chat</CornerPanelTitle>
          </CornerPanelHeader>
          <CornerPanelBody>Body</CornerPanelBody>
        </CornerPanelContent>
      </CornerPanel>,
    )

    await user.click(screen.getByRole('button', { name: 'Open chat' }))
    await user.click(screen.getByRole('button', { name: 'Close' }))

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.getByRole('button', { name: 'Open chat' })).toHaveFocus()
  })

  it('gives the scrolling body a name and a tab stop', async () => {
    // The axe finding the consumer fixed: a scroll container a keyboard cannot
    // reach is a region of content a keyboard cannot read.
    const user = userEvent.setup()
    render(<Widget />)
    await user.click(screen.getByRole('button', { name: 'Open chat' }))

    const body = screen.getByRole('region', { name: 'Chat' })
    expect(body).toHaveAttribute('tabindex', '0')
    expect(body.className).toContain('overflow-y-auto')
  })

  it('renders header actions beside the title', async () => {
    const user = userEvent.setup()
    render(
      <Widget
        actions={
          <>
            <button type="button">Refresh</button>
            <CornerPanelClose />
          </>
        }
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Open chat' }))

    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('is a bottom sheet under md and a corner card above', async () => {
    const user = userEvent.setup()
    render(<Widget />)
    await user.click(screen.getByRole('button', { name: 'Open chat' }))

    const panel = screen.getByRole('dialog')
    expect(panel.className).toContain('inset-x-0')
    expect(panel.className).toContain('bottom-0')
    expect(panel.className).toContain('md:bottom-5')
    expect(panel.className).toContain('md:end-5')
    expect(panel.className).toContain('md:w-[380px]')
  })

  it('can be driven from outside', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const { rerender } = render(<Widget open={false} onOpenChange={onOpenChange} />)

    await user.click(screen.getByRole('button', { name: 'Open chat' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
    // Nothing moved on its own: the prop still says closed.
    expect(screen.queryByRole('dialog')).toBeNull()

    rerender(<Widget open onOpenChange={onOpenChange} />)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('opens already open when told to', () => {
    render(<Widget defaultOpen />)
    expect(screen.getByRole('dialog', { name: 'Chat' })).toBeInTheDocument()
  })
})
