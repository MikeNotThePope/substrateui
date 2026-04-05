import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'

function DialogHarness({
  initialOpen = false,
  onOpenChange,
}: {
  initialOpen?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [open, setOpen] = React.useState(initialOpen)
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        onOpenChange?.(o)
      }}
    >
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogTitle>Title</DialogTitle>
        <DialogDescription>Description</DialogDescription>
        <DialogClose>Custom close</DialogClose>
      </DialogContent>
    </Dialog>
  )
}

describe('Dialog', () => {
  it('does not render content until opened', () => {
    render(<DialogHarness />)
    expect(screen.queryByText('Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Description')).not.toBeInTheDocument()
  })

  it('opens the dialog when the trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<DialogHarness />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(await screen.findByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
  })

  it('renders title and description with dialog role semantics', async () => {
    const user = userEvent.setup()
    render(<DialogHarness />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveAccessibleName('Title')
    expect(dialog).toHaveAccessibleDescription('Description')
  })

  it('fires onOpenChange(true) when opened and (false) when closed', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<DialogHarness onOpenChange={onOpenChange} />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
    await screen.findByRole('dialog')
    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(<DialogHarness initialOpen />)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes when the built-in close (X) button is clicked', async () => {
    const user = userEvent.setup()
    render(<DialogHarness initialOpen />)
    // The X close button has sr-only label "Close"
    const closeBtn = await screen.findByRole('button', { name: 'Close' })
    await user.click(closeBtn)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes when a custom DialogClose child is clicked', async () => {
    const user = userEvent.setup()
    render(<DialogHarness initialOpen />)
    await screen.findByRole('dialog')
    await user.click(screen.getByRole('button', { name: 'Custom close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('supports a fully controlled open flow', async () => {
    const { rerender } = render(
      <Dialog open={false} onOpenChange={() => {}}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>T</DialogTitle>
          <DialogDescription>D</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    rerender(
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>T</DialogTitle>
          <DialogDescription>D</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
  })

  it('applies custom className on content', async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="custom-extra">
          <DialogTitle>T</DialogTitle>
          <DialogDescription>D</DialogDescription>
        </DialogContent>
      </Dialog>
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    const dialog = await screen.findByRole('dialog')
    expect(dialog.className).toContain('custom-extra')
  })
})
