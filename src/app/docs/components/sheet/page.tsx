"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const sheetProps: PropDef[] = [
  {
    name: "open",
    type: "boolean",
    default: undefined,
    description: "Controlled open state of the sheet.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: undefined,
    description: "Callback fired when the open state changes.",
  },
  {
    name: "side",
    type: '"top" | "right" | "bottom" | "left"',
    default: '"right"',
    description: "The edge of the viewport the sheet slides in from.",
  },
]

export default function SheetPage() {
  return (
    <DocPage
      title="Sheet"
      description="A panel that slides in from the edge of the screen. Ideal for navigation menus, filters, or detail views that don't require a full page."
    >
      {/* Basic Sheet */}
      <Stack gap="md">
        <H3>Right Sheet</H3>
        <ComponentPreview
          code={`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Sheet</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
      <SheetDescription>
        Adjust your preferences below.
      </SheetDescription>
    </SheetHeader>
    <p className="text-sm text-muted-foreground mt-4">
      Sheet body content goes here.
    </p>
  </SheetContent>
</Sheet>`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>
                  Adjust your preferences below.
                </SheetDescription>
              </SheetHeader>
              <p className="text-sm text-muted-foreground mt-4">
                Sheet body content goes here.
              </p>
            </SheetContent>
          </Sheet>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={sheetProps} />
      </Stack>

      {/* Accessibility */}
      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Built on Base UI primitives, so focus is trapped inside the sheet
            while open and restored to the trigger on close. Escape closes
            the sheet. The backdrop is marked <Code>aria-hidden</Code>.
          </P>
          <P>
            Every sheet must have a SheetTitle. If the title should be
            visually hidden, wrap it in <Code>VisuallyHidden</Code> from
            Base UI.
          </P>
        </Stack>
      </Stack>
    </DocPage>
  )
}
