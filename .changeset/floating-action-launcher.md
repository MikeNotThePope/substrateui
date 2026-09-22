---
"@mikenotthepope/substrateui": minor
---

`FloatingAction`, the round corner launcher on its own, and `positionMethod` on `DropdownMenuContent`

`FloatingAction` is the 56px round button pinned to the bottom corner of the
viewport. `CornerPanel` already parks one of these in that corner to open a
panel; this is the same object when what it opens is a menu, a dialog, or
nothing at all. It is a `Button` with `fixed bottom-5 end-5 z-50 h-14 w-14
rounded-full` and `type="button"`, and it holds no popup, no state and no
context of its own.

It has no menu slot, deliberately. A launcher with a menu inside it would be a
second menu in this library with its own idea of what an arrow key does, and
`DropdownMenu` already owns that job. Hand the launcher to
`DropdownMenuTrigger` through `render` instead and the two halves stay each
other's business:

```tsx
<DropdownMenu>
  <DropdownMenuTrigger
    render={<FloatingAction aria-label="Test tools"><Wrench /></FloatingAction>}
  />
  <DropdownMenuContent positionMethod="fixed" side="top" align="end">
    <DropdownMenuItem>Accounts</DropdownMenuItem>
    <DropdownMenuItem>Inbox</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

`DropdownMenuContent` now forwards `positionMethod` to the positioner, which is
the half of that composition the library was missing. A trigger pinned with
`position: fixed` is anchored in viewport coordinates and a popup placed
`absolute`, the default, is measured in document ones. The two agree only while
the page is scrolled to the top, so without it the menu parts company with its
own button as soon as the reader scrolls. Every other `DropdownMenu` is
unchanged, `positionMethod` included: leaving it unset keeps Base UI's
`absolute`.

`lift` is how a second launcher gets out of the first one's way, rather than
each caller re-deriving the same 92 pixels: `lift={1}` sits one launcher above
the corner, `lift={2}` two.

It is icon-only, so give it an `aria-label`.
