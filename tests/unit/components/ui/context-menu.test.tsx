import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from '@/components/ui/context-menu'

describe('ContextMenu', () => {
  it('opens on right-click and shows items', async () => {
    const user = userEvent.setup()
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>Edit</ContextMenuItem>
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    await user.pointer({
      keys: '[MouseRight]',
      target: screen.getByText('Right click here'),
    })
    expect(await screen.findByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('invokes item onClick and closes the menu', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={onClick}>Edit</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    await user.pointer({
      keys: '[MouseRight]',
      target: screen.getByText('Right click here'),
    })
    await user.click(await screen.findByRole('menuitem', { name: 'Edit' }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('renders and toggles checkbox items', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem
            checked={false}
            onCheckedChange={onCheckedChange}
          >
            Show toolbar
          </ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>
    )
    await user.pointer({
      keys: '[MouseRight]',
      target: screen.getByText('Right click here'),
    })
    await user.click(
      await screen.findByRole('menuitemcheckbox', { name: 'Show toolbar' })
    )
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })
})
