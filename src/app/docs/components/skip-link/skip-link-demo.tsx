"use client"

import { Button } from "@/components/ui/button"
import { SkipLink } from "@/components/ui/skip-link"
import { Stack } from "@/components/ui/stack"
import { P } from "@/components/ui/typography"

/**
 * Scoped to its own target id so activating the demo does not move focus to
 * the real page's #main-content.
 */
export function SkipLinkDemo() {
  return (
    <Stack gap="md" className="w-full">
      <SkipLink href="#demo-main">Skip to content</SkipLink>

      <Stack gap="sm" className="rounded-lg border-2 border-border p-4">
        <P className="text-sm font-medium">Navigation</P>
        <Button variant="ghost" size="sm" className="justify-start">
          Products
        </Button>
        <Button variant="ghost" size="sm" className="justify-start">
          Pricing
        </Button>
      </Stack>

      <div
        id="demo-main"
        tabIndex={-1}
        className="rounded-lg border-2 border-border p-4 outline-none"
      >
        <P className="text-sm font-medium">Main content</P>
        <P className="text-sm text-muted-foreground">
          Activating the link moves focus here, past the navigation above.
        </P>
      </div>
    </Stack>
  )
}
