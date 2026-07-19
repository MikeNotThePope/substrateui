import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer'

function DrawerHarness({
  initialOpen = false,
  onOpenChange,
}: {
  initialOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [open, setOpen] = React.useState(initialOpen)
  return (
    <Drawer
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        onOpenChange?.(o)
      }}
    >
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Title</DrawerTitle>
        <DrawerDescription>Description</DrawerDescription>
        <DrawerClose>Close</DrawerClose>
      </DrawerContent>
    </Drawer>
  )
}

describe('Drawer', () => {
  it('does not render content until opened', () => {
    render(<DrawerHarness />)
    expect(screen.queryByText('Title')).not.toBeInTheDocument()
  })

  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<DrawerHarness />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('fires onOpenChange(true) on trigger click', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<DrawerHarness onOpenChange={onOpenChange} />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('closes when DrawerClose is clicked', async () => {
    const onOpenChange = vi.fn()
    render(<DrawerHarness initialOpen onOpenChange={onOpenChange} />)
    await screen.findByText('Title')
    // the drawer's drag handlers read a pointer gesture state that userEvent's
    // synthesized pointer events don't populate in jsdom, so a plain click
    // event is used here instead.
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<DrawerHarness initialOpen onOpenChange={onOpenChange} />)
    await screen.findByText('Title')
    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('supports controlled open prop', async () => {
    const { rerender } = render(
      <Drawer open={false} onOpenChange={() => {}}>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>T</DrawerTitle>
          <DrawerDescription>D</DrawerDescription>
        </DrawerContent>
      </Drawer>
    )
    expect(screen.queryByText('T')).not.toBeInTheDocument()
    rerender(
      <Drawer open={true} onOpenChange={() => {}}>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>T</DrawerTitle>
          <DrawerDescription>D</DrawerDescription>
        </DrawerContent>
      </Drawer>
    )
    expect(await screen.findByText('T')).toBeInTheDocument()
  })

  // Drag-to-dismiss is covered by tests/visual/drawer.behavior.spec.ts —
  // the drawer's gesture physics need real pointer timestamps jsdom can't supply.
})
