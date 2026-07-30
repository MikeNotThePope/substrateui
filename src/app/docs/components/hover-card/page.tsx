"use client"

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
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
      description="A card that opens on hover over its trigger — profile previews, link details. Anything essential belongs somewhere a touch device can also reach."
    >
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

      <ImportLine
        names={[
          "HoverCard",
          "HoverCardContent",
          "HoverCardTrigger",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="HoverCard"
          nodes={[
            { name: "HoverCardTrigger" },
            { name: "HoverCardContent" },
          ]}
        />
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={hoverCardProps} />
      </Stack>
    </DocPage>
  )
}
