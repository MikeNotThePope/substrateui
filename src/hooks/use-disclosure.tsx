"use client"

import * as React from "react"

/** Handlers returned by {@link useDisclosure}. */
export interface DisclosureHandlers {
  open: () => void
  close: () => void
  toggle: () => void
}

/**
 * Manages an open/closed boolean — the canonical hook for dialogs, drawers,
 * popovers, and disclosure widgets. Returns the state and a stable handlers
 * object.
 *
 * @example
 * const [opened, { open, close, toggle }] = useDisclosure(false)
 * <Dialog open={opened} onOpenChange={(o) => (o ? open() : close())} />
 *
 * @param initial - Initial open state (default false).
 * @param callbacks - Optional onOpen/onClose side effects.
 */
export function useDisclosure(
  initial = false,
  callbacks?: { onOpen?: () => void; onClose?: () => void }
): [boolean, DisclosureHandlers] {
  const { onOpen, onClose } = callbacks ?? {}
  const [opened, setOpened] = React.useState(initial)

  const open = React.useCallback(() => {
    setOpened((isOpen) => {
      if (!isOpen) {
        onOpen?.()
        return true
      }
      return isOpen
    })
  }, [onOpen])

  const close = React.useCallback(() => {
    setOpened((isOpen) => {
      if (isOpen) {
        onClose?.()
        return false
      }
      return isOpen
    })
  }, [onClose])

  const toggle = React.useCallback(() => {
    // Read current state via the updater to stay correct under batching.
    setOpened((isOpen) => {
      if (isOpen) onClose?.()
      else onOpen?.()
      return !isOpen
    })
  }, [onOpen, onClose])

  const handlers = React.useMemo(() => ({ open, close, toggle }), [open, close, toggle])
  return [opened, handlers]
}
