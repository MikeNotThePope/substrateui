import * as React from 'react'
import { describe, it, expect, vi, onTestFinished } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

describe('DropdownMenu', () => {
  it('opens via a render-prop trigger and shows items', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button />}>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    expect(await screen.findByRole('menu')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  it('invokes item onClick and closes the menu', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onClick}>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    await user.click(await screen.findByRole('menuitem', { name: 'Edit' }))
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  // A launcher pinned with `position: fixed` is anchored in viewport
  // coordinates; a popup positioned `absolute` is placed in document ones.
  // They agree only while the page is at the top, so the menu has to be
  // able to use the same coordinate space its anchor does.
  it('positions the popup absolutely by default, as Base UI does', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    const popup = await screen.findByRole('menu')
    expect(popup.parentElement).toHaveStyle({ position: 'absolute' })
  })

  it('positions against a fixed anchor when it is told the anchor is fixed', async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger className="fixed bottom-5 end-5">Menu</DropdownMenuTrigger>
        <DropdownMenuContent positionMethod="fixed">
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    const popup = await screen.findByRole('menu')
    expect(popup.parentElement).toHaveStyle({ position: 'fixed' })
  })

  // A popup on <body> sits outside every landmark, which axe's `region` rule
  // fails (#160). `container` lets a consumer keep it inside <main>.
  it('portals the open menu to <body> by default', async () => {
    const user = userEvent.setup()
    render(
      <main>
        <DropdownMenu>
          <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </main>
    )
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    await screen.findByRole('menu')
    expect(within(screen.getByRole('main')).queryByRole('menu')).toBeNull()
  })

  it('portals the open menu into the container element it is given', async () => {
    const user = userEvent.setup()
    const main = document.createElement('main')
    document.body.append(main)
    onTestFinished(() => main.remove())
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent container={main}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    expect(await within(main).findByRole('menu')).toBeInTheDocument()
  })

  it('takes a ref as the container, and its submenus follow it', async () => {
    const user = userEvent.setup()
    function Contained() {
      const container = React.useRef<HTMLElement>(null)
      return (
        <>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
            <DropdownMenuContent container={container}>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Archive</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
          <main ref={container} />
        </>
      )
    }
    render(<Contained />)
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    const main = screen.getByRole('main')
    expect(await within(main).findByRole('menu')).toBeInTheDocument()

    await user.click(within(main).getByRole('menuitem', { name: 'More' }))
    expect(
      await within(main).findByRole('menuitem', { name: 'Archive' })
    ).toBeInTheDocument()
  })

  it('toggles checkbox items', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={false}
            onCheckedChange={onCheckedChange}
          >
            Show toolbar
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
    await user.click(screen.getByRole('button', { name: 'Menu' }))
    await user.click(
      await screen.findByRole('menuitemcheckbox', { name: 'Show toolbar' })
    )
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything())
  })
})
