"use client"

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const drawerProps: PropDef[] = [
  {
    name: "open",
    type: "boolean",
    default: undefined,
    description: "Controlled open state of the drawer.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: undefined,
    description: "Callback fired when the open state changes.",
  },
]

export default function DrawerPage() {
  return (
    <DocPage
      title="Drawer"
      description="A bottom sheet that slides up from the bottom of the viewport. Great for mobile-friendly interactions and supplementary content."
    >
      {/* Basic Drawer */}
      <Stack gap="md">
        <H3>Bottom Drawer</H3>
        <ComponentPreview
          code={`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Move to folder</DrawerTitle>
      <DrawerDescription>
        Select a destination folder for this item.
      </DrawerDescription>
    </DrawerHeader>
    <div className="p-4">
      <p className="text-sm text-muted-foreground">
        Drawer body content goes here.
      </p>
    </div>
  </DrawerContent>
</Drawer>`}
        >
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Move to folder</DrawerTitle>
                <DrawerDescription>
                  Select a destination folder for this item.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  Drawer body content goes here.
                </p>
              </div>
            </DrawerContent>
          </Drawer>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={drawerProps} />
      </Stack>

      {/* Accessibility */}
      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Built on Vaul, which implements focus trapping and restoration
            and closes on Escape. The backdrop is marked{" "}
            <Code>aria-hidden</Code>.
          </P>
          <P>
            Every drawer must have a DrawerTitle. If the title should be
            visually hidden, wrap it in <Code>VisuallyHidden</Code> from
            Radix so the accessible name is still announced.
          </P>
        </Stack>
      </Stack>
    </DocPage>
  )
}
