import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderToString } from 'react-dom/server'

import { FloatingAction } from '@/components/ui/floating-action'
import { CornerPanel, CornerPanelTrigger } from '@/components/ui/corner-panel'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/** The geometry that makes a corner launcher a corner launcher. */
const CORNER = ['fixed', 'bottom-5', 'end-5', 'z-50', 'h-14', 'w-14', 'rounded-full']

function Launcher({ onSelect }: { onSelect?: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <FloatingAction aria-label="Test tools">
            <svg data-testid="wrench" />
          </FloatingAction>
        }
      />
      <DropdownMenuContent positionMethod="fixed" side="top" align="end">
        <DropdownMenuItem onClick={onSelect}>Accounts</DropdownMenuItem>
        <DropdownMenuItem>Inbox</DropdownMenuItem>
        <DropdownMenuItem>Load test data</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

describe('FloatingAction', () => {
  it('is an ordinary button, named by the caller', () => {
    render(
      <FloatingAction aria-label="Test tools">
        <svg data-testid="wrench" />
      </FloatingAction>
    )
    const launcher = screen.getByRole('button', { name: 'Test tools' })
    expect(launcher.tagName).toBe('BUTTON')
    expect(screen.getByTestId('wrench')).toBeInTheDocument()
  })

  it('is a button of type button, so it cannot submit the form it lands in', () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <FloatingAction aria-label="Test tools" />
      </form>
    )
    expect(screen.getByRole('button', { name: 'Test tools' })).toHaveAttribute(
      'type',
      'button'
    )
  })

  it('is round, fixed, and in the bottom end corner', () => {
    render(<FloatingAction aria-label="Test tools" />)
    const launcher = screen.getByRole('button', { name: 'Test tools' })
    for (const token of CORNER) {
      expect(launcher.className.split(/\s+/)).toContain(token)
    }
    expect(launcher).toHaveAttribute('data-slot', 'floating-action')
  })

  it('uses the logical end, so the corner follows the reading direction', () => {
    render(<FloatingAction aria-label="Test tools" />)
    const classes = screen
      .getByRole('button', { name: 'Test tools' })
      .className.split(/\s+/)
    expect(classes.some((c) => /^-?(right|left)-/.test(c))).toBe(false)
  })

  it('is the same 56px launcher CornerPanel parks in that corner', () => {
    const { unmount } = render(
      <CornerPanel>
        <CornerPanelTrigger aria-label="Open chat" />
      </CornerPanel>
    )
    const panelLauncher = screen
      .getByRole('button', { name: 'Open chat' })
      .className.split(/\s+/)
    unmount()

    render(<FloatingAction aria-label="Test tools" />)
    const menuLauncher = screen
      .getByRole('button', { name: 'Test tools' })
      .className.split(/\s+/)

    for (const token of CORNER) {
      expect(panelLauncher).toContain(token)
      expect(menuLauncher).toContain(token)
    }
  })

  it('lifts one launcher clear of the corner when something already holds it', () => {
    render(<FloatingAction aria-label="Test tools" lift={1} />)
    const classes = screen
      .getByRole('button', { name: 'Test tools' })
      .className.split(/\s+/)
    expect(classes).toContain('bottom-23')
    expect(classes).not.toContain('bottom-5')
  })

  it('stacks a second time, and the arithmetic is the launcher plus the gap', () => {
    render(<FloatingAction aria-label="Test tools" lift={2} />)
    const classes = screen
      .getByRole('button', { name: 'Test tools' })
      .className.split(/\s+/)
    expect(classes).toContain('bottom-41')
    expect(classes).not.toContain('bottom-23')
  })

  it('merges a caller className instead of dropping it', () => {
    render(<FloatingAction aria-label="Test tools" className="absolute bottom-4" />)
    const classes = screen
      .getByRole('button', { name: 'Test tools' })
      .className.split(/\s+/)
    // The caller wins the conflict, and keeps the rest.
    expect(classes).toContain('absolute')
    expect(classes).toContain('bottom-4')
    expect(classes).not.toContain('bottom-5')
    expect(classes).toContain('rounded-full')
  })

  it('keeps the caller onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<FloatingAction aria-label="Test tools" onClick={onClick} />)
    await user.click(screen.getByRole('button', { name: 'Test tools' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('ships in the first byte of HTML, because a launcher that waits is a hole in the corner', () => {
    const html = renderToString(<FloatingAction aria-label="Test tools" />)
    expect(html).toContain('data-slot="floating-action"')
    expect(html).toContain('rounded-full')
    expect(html).toContain('type="button"')
  })
})

describe('FloatingAction as a DropdownMenu trigger', () => {
  it('says what it opens, and reports whether it is open', async () => {
    const user = userEvent.setup()
    render(<Launcher />)
    const launcher = screen.getByRole('button', { name: 'Test tools' })
    expect(launcher).toHaveAttribute('aria-haspopup', 'menu')
    expect(launcher).toHaveAttribute('aria-expanded', 'false')

    await user.click(launcher)

    expect(await screen.findByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Accounts' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Test tools' })
    ).toHaveAttribute('aria-expanded', 'true')
  })

  it('keeps the corner after Base UI has merged its own props into the trigger', () => {
    render(<Launcher />)
    const classes = screen
      .getByRole('button', { name: 'Test tools' })
      .className.split(/\s+/)
    for (const token of CORNER) {
      expect(classes).toContain(token)
    }
  })

  // The highlight moves with the key; DOM focus follows it in the effect
  // after, so every one of these waits rather than reading the same tick.
  const focused = (name: string) =>
    waitFor(() => expect(screen.getByRole('menuitem', { name })).toHaveFocus())

  it('wraps from the last item round to the first', async () => {
    const user = userEvent.setup()
    render(<Launcher />)
    await user.click(screen.getByRole('button', { name: 'Test tools' }))
    await screen.findByRole('menu')

    await user.keyboard('{ArrowDown}')
    await focused('Accounts')
    await user.keyboard('{ArrowDown}{ArrowDown}')
    await focused('Load test data')
    await user.keyboard('{ArrowDown}')
    await focused('Accounts')
  })

  it('wraps from the first item back round to the last', async () => {
    const user = userEvent.setup()
    render(<Launcher />)
    await user.click(screen.getByRole('button', { name: 'Test tools' }))
    await screen.findByRole('menu')

    await user.keyboard('{ArrowDown}')
    await focused('Accounts')
    await user.keyboard('{ArrowUp}')
    await focused('Load test data')
  })

  it('closes on Escape and gives the launcher its focus back', async () => {
    const user = userEvent.setup()
    render(<Launcher />)
    await user.click(screen.getByRole('button', { name: 'Test tools' }))
    await screen.findByRole('menu')

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('menu')).toBeNull()
    expect(screen.getByRole('button', { name: 'Test tools' })).toHaveFocus()
  })

  it('closes when focus leaves it for something else', async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">Somewhere else</button>
        <Launcher />
      </>
    )
    await user.click(screen.getByRole('button', { name: 'Test tools' }))
    await screen.findByRole('menu')
    await user.keyboard('{ArrowDown}')
    await focused('Accounts')

    await user.tab()

    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
    expect(screen.getByRole('button', { name: 'Somewhere else' })).toHaveFocus()
  })

  // Safari does not focus a button on tap: the press lands on the item and
  // whatever had focus loses it to the document body. A menu that closes on
  // any focus-out unmounts the item before its click event arrives, so the
  // press does nothing at all. lavahire bought its way out with
  // `onMouseDown` `preventDefault` on both the launcher and the menu; what
  // this composition relies on instead is that focus falling to the body is
  // not focus moving to somewhere else.
  it('does not close on a press that focuses nothing, so the click still lands', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Launcher onSelect={onSelect} />)
    await user.click(screen.getByRole('button', { name: 'Test tools' }))
    await screen.findByRole('menu')
    await user.keyboard('{ArrowDown}')

    const item = screen.getByRole('menuitem', { name: 'Accounts' })
    await act(async () => {
      // The Safari tap, in one line: focus goes to the body, not to the button.
      item.blur()
    })

    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.click(screen.getByRole('menuitem', { name: 'Accounts' }))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
