"use client"

import * as React from "react"

import { FocusTrap } from "@/components/ui/focus-trap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Stack } from "@/components/ui/stack"

export function FocusTrapDemo() {
  const [active, setActive] = React.useState(false)
  return (
    <Stack gap="md" className="w-full max-w-sm">
      <Button onClick={() => setActive((a) => !a)}>
        {active ? "Release focus" : "Trap focus"}
      </Button>

      <FocusTrap active={active}>
        <Stack gap="sm" className="rounded-lg border-2 border-border p-4">
          <p className="text-sm text-muted-foreground">
            {active
              ? "Tab and Shift+Tab now cycle within this box."
              : "Not trapped — Tab moves through the page normally."}
          </p>
          <Input placeholder="First field" />
          <Input placeholder="Second field" />
          <Button variant="outline" onClick={() => setActive(false)}>
            Close
          </Button>
        </Stack>
      </FocusTrap>

      <Button variant="ghost">Outside button — unreachable while trapped</Button>
    </Stack>
  )
}
