import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuItem,
} from '@/components/ui/context-menu'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarItem,
} from '@/components/ui/menubar'

/**
 * A submenu is positioned logically and opens toward the end of the line, so in
 * RTL it opens leftward. Its trigger's chevron therefore has to mirror, which
 * docs/rtl-icon-audit.md classifies as "flip in RTL" for all three menus.
 *
 * It is the kind of thing that only shows up in an RTL locale, so a class
 * assertion is what stops it being dropped again.
 */

const CASES = [
  {
    name: 'ContextMenuSubTrigger',
    ui: (
      <ContextMenu>
        <ContextMenuTrigger>target</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Nested</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    ),
    open: async (user: ReturnType<typeof userEvent.setup>) => {
      await user.pointer({ keys: '[MouseRight]', target: screen.getByText('target') })
    },
  },
  {
    name: 'DropdownMenuSubTrigger',
    ui: (
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Nested</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    open: async (user: ReturnType<typeof userEvent.setup>) => {
      await user.click(screen.getByRole('button', { name: 'Menu' }))
    },
  },
  {
    name: 'MenubarSubTrigger',
    ui: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>More</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Nested</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
    open: async (user: ReturnType<typeof userEvent.setup>) => {
      await user.click(screen.getByText('File'))
    },
  },
]

describe('submenu chevrons mirror in RTL', () => {
  it.each(CASES)('$name', async ({ ui, open }) => {
    const user = userEvent.setup()
    render(ui)
    await open(user)

    const trigger = await screen.findByText('More')
    const chevron = trigger.querySelector('svg')
    expect(chevron, 'the sub-trigger draws no chevron').not.toBeNull()
    expect(chevron!.getAttribute('class')).toContain('rtl:-scale-x-100')
    // Positioned logically too, or it would sit on the wrong edge in RTL.
    expect(chevron!.getAttribute('class')).toContain('ms-auto')
  })
})
