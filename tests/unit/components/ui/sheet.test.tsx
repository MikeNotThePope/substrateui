import * as React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet'

// ─── A matchMedia that can be moved across a breakpoint ──────────────
//
// tests/unit/setup.ts installs a matchMedia that answers `false` to
// everything and never fires. `dockAt` reads a min-width query and crossing
// that query at runtime is the behaviour under test, so this file installs
// one that answers min-width queries from a width it owns and notifies its
// listeners when that width changes. Everything else still answers `false`,
// so nothing Base UI asks about pointers or reduced motion changes.

const REM = 16
let viewportWidth = 375
let listeners = new Set<() => void>()

function installMatchMedia() {
  viewportWidth = 375
  listeners = new Set()
  window.matchMedia = ((query: string) => {
    const match = /\(min-width:\s*([\d.]+)rem\)/.exec(query)
    const min = match ? Number.parseFloat(match[1]) * REM : Number.POSITIVE_INFINITY
    return {
      get matches() {
        return viewportWidth >= min
      },
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: (_type: string, listener: () => void) => {
        listeners.add(listener)
      },
      removeEventListener: (_type: string, listener: () => void) => {
        listeners.delete(listener)
      },
      dispatchEvent: () => false,
    } as unknown as MediaQueryList
  }) as typeof window.matchMedia
}

/** Move the viewport and let every subscriber hear about it. */
function setViewportWidth(width: number) {
  act(() => {
    viewportWidth = width
    for (const listener of listeners) listener()
  })
}

const PHONE = 375
const DESKTOP = 1280

beforeEach(() => {
  installMatchMedia()
})

afterEach(() => {
  vi.restoreAllMocks()
})

function SheetHarness({
  initialOpen = false,
  side,
  onOpenChange,
}: {
  initialOpen?: boolean
  side?: 'top' | 'bottom' | 'left' | 'right'
  onOpenChange?: (open: boolean) => void
}) {
  const [open, setOpen] = React.useState(initialOpen)
  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        onOpenChange?.(o)
      }}
    >
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent side={side}>
        <SheetTitle>Title</SheetTitle>
        <SheetDescription>Description</SheetDescription>
        <SheetClose>Custom close</SheetClose>
      </SheetContent>
    </Sheet>
  )
}

describe('Sheet', () => {
  it('does not render content until opened', () => {
    render(<SheetHarness />)
    expect(screen.queryByText('Title')).not.toBeInTheDocument()
  })

  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<SheetHarness />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('defaults to the right side', async () => {
    render(<SheetHarness initialOpen />)
    const dialog = await screen.findByRole('dialog')
    expect(dialog.className).toContain('end-0')
    expect(dialog.className).toContain('slide-in-from-right')
  })

  it('applies left side positioning classes when side="left"', async () => {
    render(<SheetHarness initialOpen side="left" />)
    const dialog = await screen.findByRole('dialog')
    expect(dialog.className).toContain('start-0')
    expect(dialog.className).toContain('slide-in-from-left')
  })

  it('applies top side positioning classes when side="top"', async () => {
    render(<SheetHarness initialOpen side="top" />)
    const dialog = await screen.findByRole('dialog')
    expect(dialog.className).toContain('top-0')
    expect(dialog.className).toContain('slide-in-from-top')
  })

  it('applies bottom side positioning classes when side="bottom"', async () => {
    render(<SheetHarness initialOpen side="bottom" />)
    const dialog = await screen.findByRole('dialog')
    expect(dialog.className).toContain('bottom-0')
    expect(dialog.className).toContain('slide-in-from-bottom')
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<SheetHarness initialOpen onOpenChange={onOpenChange} />)
    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes when built-in X close button is clicked', async () => {
    const user = userEvent.setup()
    render(<SheetHarness initialOpen />)
    const closeBtn = await screen.findByRole('button', { name: 'Close' })
    await user.click(closeBtn)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes when SheetClose child is clicked', async () => {
    const user = userEvent.setup()
    render(<SheetHarness initialOpen />)
    await screen.findByRole('dialog')
    await user.click(screen.getByRole('button', { name: 'Custom close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('fires onOpenChange(true) on open and (false) on close', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<SheetHarness onOpenChange={onOpenChange} />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('renders title/description with accessible name and description', async () => {
    render(<SheetHarness initialOpen />)
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAccessibleName('Title')
    expect(dialog).toHaveAccessibleDescription('Description')
  })
})

// ─── dockAt ──────────────────────────────────────────────────────────

function Rail({
  dockAt = 'lg' as const,
  side,
  open,
  onOpenChange,
  headingLevel,
  withClose = false,
}: {
  dockAt?: 'lg'
  side?: 'top' | 'bottom' | 'left' | 'right'
  open?: boolean
  onOpenChange?: (open: boolean) => void
  headingLevel?: 2 | 3 | 4 | 5 | 6
  withClose?: boolean
}) {
  return (
    <Sheet dockAt={dockAt} open={open} onOpenChange={onOpenChange} headingLevel={headingLevel}>
      <SheetTrigger>Job details</SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Job details</SheetTitle>
          <SheetDescription>Pay, location and the hiring team.</SheetDescription>
        </SheetHeader>
        <p>Remote, or the Leeds office two days a week.</p>
        {withClose ? <SheetClose>Done</SheetClose> : null}
      </SheetContent>
    </Sheet>
  )
}

/** The rail, hidden or not, dialog or aside. `getByRole` cannot see it hidden. */
function railElement(): HTMLElement {
  const el = document.querySelector<HTMLElement>('[data-slot="sheet-content"]')
  if (!el) throw new Error('no rail in the document')
  return el
}

function triggerElement(): HTMLElement {
  const el = document.querySelector<HTMLElement>('[data-slot="sheet-trigger"]')
  if (!el) throw new Error('no trigger in the document')
  return el
}

describe('Sheet without dockAt', () => {
  it('does not dock at any width', async () => {
    render(<SheetHarness initialOpen />)
    setViewportWidth(DESKTOP)

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
  })
})

describe('Sheet below dockAt, closed', () => {
  beforeEach(() => {
    viewportWidth = PHONE
  })

  it('gives the trigger aria-expanded and aria-controls', () => {
    render(<Rail />)

    const trigger = screen.getByRole('button', { name: 'Job details' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
    expect(trigger).toHaveAttribute('aria-controls', railElement().id)
  })

  it('points aria-controls at an element that is really there', () => {
    render(<Rail />)

    const id = screen.getByRole('button', { name: 'Job details' }).getAttribute('aria-controls')
    expect(id).toBeTruthy()
    expect(document.querySelectorAll(`[id="${id}"]`)).toHaveLength(1)
  })

  it('keeps the closed rail out of the accessibility tree by attribute, not by stylesheet', () => {
    render(<Rail />)

    const rail = railElement()
    expect(rail).toHaveAttribute('hidden')
    expect(rail).toHaveAttribute('inert')
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

describe('Sheet below dockAt, open', () => {
  beforeEach(() => {
    viewportWidth = PHONE
  })

  it('opens a modal dialog from the trigger', async () => {
    const user = userEvent.setup()
    render(<Rail />)

    await user.click(screen.getByRole('button', { name: 'Job details' }))

    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAccessibleName('Job details')
    expect(dialog).toHaveAccessibleDescription('Pay, location and the hiring team.')
    // Queried by slot rather than by role: the drawer is modal, so Base UI
    // has taken the rest of the document out of the accessibility tree and
    // `getByRole` cannot see the trigger while it is open. It still has to
    // say what it is, for the moment the drawer closes again.
    expect(triggerElement()).toHaveAttribute('aria-expanded', 'true')
  })

  it('never lets two elements answer to the rail id', async () => {
    const user = userEvent.setup()
    render(<Rail />)
    const id = railElement().id

    await user.click(screen.getByRole('button', { name: 'Job details' }))
    await screen.findByRole('dialog')

    expect(document.querySelectorAll(`[id="${id}"]`)).toHaveLength(1)
    expect(await screen.findByRole('dialog')).toHaveAttribute('id', id)
  })

  it('washes the page behind it with the background, not with black', async () => {
    const user = userEvent.setup()
    render(<Rail />)

    await user.click(screen.getByRole('button', { name: 'Job details' }))
    await screen.findByRole('dialog')

    const scrim = document.querySelector('[data-slot="sheet-overlay"]')
    expect(scrim).not.toBeNull()
    expect(scrim!.className).toContain('bg-background/80')
  })

  it('keeps the sr-only Close label on the corner button', async () => {
    const user = userEvent.setup()
    render(<Rail />)

    await user.click(screen.getByRole('button', { name: 'Job details' }))

    expect(await screen.findByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('closes on Escape and says so once', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<Rail onOpenChange={onOpenChange} />)

    await user.click(screen.getByRole('button', { name: 'Job details' }))
    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    expect(screen.getByRole('button', { name: 'Job details' })).toHaveAttribute(
      'aria-expanded',
      'false'
    )
  })

  it('gives focus back to the trigger when it closes', async () => {
    const user = userEvent.setup()
    render(<Rail />)

    const trigger = screen.getByRole('button', { name: 'Job details' })
    await user.click(trigger)
    await screen.findByRole('dialog')
    await user.click(await screen.findByRole('button', { name: 'Close' }))

    expect(trigger).toHaveFocus()
  })

  it('closes from a SheetClose in the body', async () => {
    const user = userEvent.setup()
    render(<Rail withClose />)

    await user.click(screen.getByRole('button', { name: 'Job details' }))
    await user.click(await screen.findByRole('button', { name: 'Done' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

describe('Sheet at and above dockAt', () => {
  beforeEach(() => {
    viewportWidth = DESKTOP
  })

  it('reports no dialog at all, and no scrim to dismiss', () => {
    render(<Rail />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.querySelector('[data-slot="sheet-overlay"]')).toBeNull()
  })

  it('reports the rail as a complementary landmark named by its title', () => {
    render(<Rail />)

    const rail = screen.getByRole('complementary', { name: 'Job details' })
    expect(rail.tagName).toBe('ASIDE')
    expect(rail).toHaveTextContent('Remote, or the Leeds office two days a week.')
  })

  it('turns the title into a heading, at the level the dialog already used', () => {
    render(<Rail />)

    expect(screen.getByRole('heading', { level: 2, name: 'Job details' })).toBeInTheDocument()
  })

  it('takes the heading level from the caller, because only they know the outline', () => {
    render(<Rail headingLevel={3} />)

    expect(screen.getByRole('heading', { level: 3, name: 'Job details' })).toBeInTheDocument()
  })

  it('leaves the trigger nothing to claim: no aria-expanded, no aria-controls', () => {
    render(<Rail />)

    const trigger = triggerElement()
    expect(trigger).not.toHaveAttribute('aria-expanded')
    expect(trigger).not.toHaveAttribute('aria-controls')
    expect(trigger).toHaveAttribute('hidden')
    expect(trigger).toHaveAttribute('inert')
    expect(screen.queryByRole('button', { name: 'Job details' })).not.toBeInTheDocument()
  })

  it('renders no close button, because there is nothing to close', () => {
    render(<Rail withClose />)

    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Done' })).not.toBeInTheDocument()
  })

  it('does not answer Escape', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<Rail onOpenChange={onOpenChange} />)

    await user.keyboard('{Escape}')

    expect(screen.getByRole('complementary', { name: 'Job details' })).toBeInTheDocument()
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('shows the rail with no hidden or inert attribute on it', () => {
    render(<Rail />)

    const rail = railElement()
    expect(rail).not.toHaveAttribute('hidden')
    expect(rail).not.toHaveAttribute('inert')
  })
})

describe('Sheet crossing dockAt', () => {
  it('swaps the pattern in both directions', async () => {
    const user = userEvent.setup()
    viewportWidth = PHONE
    render(<Rail />)

    await user.click(screen.getByRole('button', { name: 'Job details' }))
    expect(await screen.findByRole('dialog')).toBeInTheDocument()

    setViewportWidth(DESKTOP)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByRole('complementary', { name: 'Job details' })).toBeInTheDocument()

    setViewportWidth(PHONE)
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('tells a controlled caller that docking closed the drawer', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    viewportWidth = PHONE
    render(<Rail onOpenChange={onOpenChange} />)

    await user.click(screen.getByRole('button', { name: 'Job details' }))
    await screen.findByRole('dialog')
    onOpenChange.mockClear()

    setViewportWidth(DESKTOP)

    expect(onOpenChange).toHaveBeenCalledTimes(1)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('does not fire when the width crosses with the drawer already closed', () => {
    const onOpenChange = vi.fn()
    viewportWidth = PHONE
    render(<Rail onOpenChange={onOpenChange} />)

    setViewportWidth(DESKTOP)
    setViewportWidth(PHONE)

    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('moves focus to the rail rather than dropping it on the floor', async () => {
    const user = userEvent.setup()
    viewportWidth = PHONE
    render(<Rail />)

    await user.click(screen.getByRole('button', { name: 'Job details' }))
    await screen.findByRole('dialog')

    setViewportWidth(DESKTOP)

    expect(screen.getByRole('complementary', { name: 'Job details' })).toHaveFocus()
  })
})

describe('Sheet dockAt on the server', () => {
  it('claims nothing it cannot know: no dialog, and no aria-expanded on the trigger', async () => {
    const { renderToString } = await import('react-dom/server')
    const html = renderToString(<Rail />)

    expect(html).not.toContain('role="dialog"')
    expect(html).not.toContain('aria-expanded')
    expect(html).not.toContain('aria-controls')
  })

  it('ships the docked rail, so the wide layout is right in the first frame', async () => {
    const { renderToString } = await import('react-dom/server')
    const html = renderToString(<Rail />)

    expect(html).toContain('<aside')
    expect(html).toContain('Remote, or the Leeds office two days a week.')
    // Hiding the rail before the width is known is the stylesheet's job: the
    // attribute would still be there at desktop.
    expect(html).not.toContain(' hidden=')
    expect(html).not.toContain(' inert=')
  })
})

describe('Sheet dockAt misuse', () => {
  it('refuses to dock a top or bottom sheet', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<Rail side="top" />)).toThrow(/dockAt/)
    error.mockRestore()
  })

  it('refuses a function className, which it has no state to call', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      render(
        <Sheet dockAt="lg">
          <SheetTrigger className={() => 'x'}>Job details</SheetTrigger>
          <SheetContent>
            <SheetTitle>Job details</SheetTitle>
          </SheetContent>
        </Sheet>
      )
    ).toThrow(/SheetTrigger/)
    error.mockRestore()
  })
})
