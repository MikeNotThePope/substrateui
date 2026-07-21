import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'

function AlertHarness({
  initialOpen = false,
  onOpenChange,
  onAction,
}: {
  initialOpen?: boolean
  onOpenChange?: (open: boolean) => void
  onAction?: () => void
}) {
  const [open, setOpen] = React.useState(initialOpen)
  return (
    <AlertDialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        onOpenChange?.(o)
      }}
    >
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>This is permanent.</AlertDialogDescription>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onAction}>Confirm</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  )
}

describe('AlertDialog', () => {
  it('does not render content until opened', () => {
    render(<AlertHarness />)
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument()
  })

  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<AlertHarness />)
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    expect(await screen.findByRole('alertdialog')).toBeInTheDocument()
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    expect(screen.getByText('This is permanent.')).toBeInTheDocument()
  })

  it('renders title and description with alertdialog role semantics', async () => {
    const user = userEvent.setup()
    render(<AlertHarness />)
    await user.click(screen.getByRole('button', { name: 'Delete' }))
    const dialog = await screen.findByRole('alertdialog')
    expect(dialog).toHaveAccessibleName('Are you sure?')
    expect(dialog).toHaveAccessibleDescription('This is permanent.')
  })

  it('closes when Cancel is clicked and fires onOpenChange(false)', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(<AlertHarness initialOpen onOpenChange={onOpenChange} />)
    await screen.findByRole('alertdialog')
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })

  it('closes when Action is clicked and fires its onClick', async () => {
    const user = userEvent.setup()
    const onAction = vi.fn()
    const onOpenChange = vi.fn()
    render(
      <AlertHarness
        initialOpen
        onAction={onAction}
        onOpenChange={onOpenChange}
      />
    )
    await screen.findByRole('alertdialog')
    await user.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(onAction).toHaveBeenCalledOnce()
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
  })

  it('does NOT close on click outside (modal behavior)', async () => {
    // The modal dialog guards interactivity with pointer-events: none on
    // ancestors, so we disable userEvent's pointer-events check for this click.
    const user = userEvent.setup({ pointerEventsCheck: 0 })
    render(<AlertHarness initialOpen />)
    await screen.findByRole('alertdialog')
    const overlay = document.querySelector(
      '[data-slot="alert-dialog-overlay"]'
    ) as HTMLElement
    expect(overlay).toBeInTheDocument()
    await user.click(overlay)
    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
  })

  it('applies button-like classes to Action and outline classes to Cancel', async () => {
    render(<AlertHarness initialOpen />)
    await screen.findByRole('alertdialog')
    const action = screen.getByRole('button', { name: 'Confirm' })
    const cancel = screen.getByRole('button', { name: 'Cancel' })
    expect(action.className).toContain('bg-primary')
    expect(cancel.className).toContain('border-input')
  })

  it('supports controlled open prop', async () => {
    const { rerender } = render(
      <AlertDialog open={false} onOpenChange={() => {}}>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>T</AlertDialogTitle>
          <AlertDialogDescription>D</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    rerender(
      <AlertDialog open={true} onOpenChange={() => {}}>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>T</AlertDialogTitle>
          <AlertDialogDescription>D</AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialog>
    )
    expect(await screen.findByRole('alertdialog')).toBeInTheDocument()
  })
})
