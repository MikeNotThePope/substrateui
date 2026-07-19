"use client"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const hoverCardProps: PropDef[] = [
  {
    name: "open",
    type: "boolean",
    default: undefined,
    description: "Controlled open state of the hover card.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: undefined,
    description: "Callback fired when the open state changes.",
  },
]

export default function HoverCardPage() {
  return (
    <DocPage
      title="Hover Card"
      description="A card that appears when hovering over a trigger element. Useful for showing preview information like user profiles or link details."
    >
      {/* Basic Hover Card */}
      <Stack gap="md">
        <H3>Basic Hover Card</H3>
        <ComponentPreview
          code={`<HoverCard>
  <HoverCardTrigger render={<a href="#" className="underline text-sm font-medium" />}>
    @substrate_ui
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="space-y-2">
      <h4 className="text-sm font-semibold">SubstrateUI</h4>
      <p className="text-sm text-muted-foreground">
        A premium component library for building modern
        web applications.
      </p>
      <p className="text-xs text-muted-foreground">
        Joined December 2024
      </p>
    </div>
  </HoverCardContent>
</HoverCard>`}
        >
          <HoverCard>
            <HoverCardTrigger render={<a href="#" className="underline text-sm font-medium" />}>
              @substrate_ui
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">SubstrateUI</h4>
                <p className="text-sm text-muted-foreground">
                  A premium component library for building modern web applications.
                </p>
                <p className="text-xs text-muted-foreground">
                  Joined December 2024
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={hoverCardProps} />
      </Stack>
    </DocPage>
  )
}
