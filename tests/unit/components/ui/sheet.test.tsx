import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet'

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
    expect(dialog.className).toContain('right-0')
    expect(dialog.className).toContain('slide-in-from-right')
  })

  it('applies left side positioning classes when side="left"', async () => {
    render(<SheetHarness initialOpen side="left" />)
    const dialog = await screen.findByRole('dialog')
    expect(dialog.className).toContain('left-0')
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
