import { Inbox } from "lucide-react"
import { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyAction } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const emptyProps: PropDef[] = [
  {
    name: "EmptyIcon",
    type: "React.ReactNode",
    default: undefined,
    description: "Container for the icon displayed above the title. Pass any Lucide icon as a child.",
  },
  {
    name: "EmptyTitle",
    type: "React.ReactNode",
    default: undefined,
    description: "The heading text for the empty state.",
  },
  {
    name: "EmptyDescription",
    type: "React.ReactNode",
    default: undefined,
    description: "A supporting description displayed below the title.",
  },
  {
    name: "EmptyAction",
    type: "React.ReactNode",
    default: undefined,
    description: "Container for the call-to-action, typically a Button.",
  },
]

export default function EmptyPage() {
  return (
    <DocPage
      title="Empty"
      description="A placeholder for empty states. Combines an icon, title, description, and optional action to guide users when no content is available."
    >
      {/* Empty State */}
      <Stack gap="md">
        <H3>Default Empty State</H3>
        <ComponentPreview
          code={`<Empty>
  <EmptyIcon>
    <Inbox className="h-10 w-10" />
  </EmptyIcon>
  <EmptyTitle>No messages yet</EmptyTitle>
  <EmptyDescription>
    When you receive messages, they will appear here.
  </EmptyDescription>
  <EmptyAction>
    <Button>Compose Message</Button>
  </EmptyAction>
</Empty>`}
        >
          <Empty>
            <EmptyIcon>
              <Inbox className="h-10 w-10" />
            </EmptyIcon>
            <EmptyTitle>No messages yet</EmptyTitle>
            <EmptyDescription>
              When you receive messages, they will appear here.
            </EmptyDescription>
            <EmptyAction>
              <Button>Compose Message</Button>
            </EmptyAction>
          </Empty>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={emptyProps} />
      </Stack>
    </DocPage>
  )
}
