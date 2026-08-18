import { Inbox } from "lucide-react"
import { Empty, EmptyIcon, EmptyTitle, EmptyDescription, EmptyAction } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Empty",
  description: "A placeholder for empty states. Combines an icon, title, description, and optional action to guide users when no content is available.",
  route: "/docs/components/empty",
})

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
    description:
      "The heading text for the empty state. Renders an h3; pass level={1} when the empty state is the page's whole content.",
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

      <ImportLine
        names={[
          "Empty",
          "EmptyIcon",
          "EmptyTitle",
          "EmptyDescription",
          "EmptyAction",
        ]}
      />

      <Stack gap="md">
        <H3>Pick the right heading level</H3>
        <P>
          <Code>EmptyTitle</Code> renders an <Code>h3</Code>, which is right when the empty
          state sits inside a page that already has a heading above it — an empty table on a
          dashboard, a filtered list with no matches.
        </P>
        <P>
          It often isn&apos;t. A 404, an error screen, or a &quot;nothing here yet&quot; page has
          the empty state as its entire content, and its title is that document&apos;s{" "}
          <Code>h1</Code>. Use <Code>level</Code> to move it. The styling comes along, so what
          changes is the outline, not the look.
        </P>
        <ComponentPreview
          code={`<Empty>
  <EmptyIcon><CircleAlert /></EmptyIcon>
  <EmptyTitle level={1}>This page isn&apos;t available</EmptyTitle>
  <EmptyDescription>The link may be out of date.</EmptyDescription>
</Empty>`}
        >
          <Empty>
            <EmptyTitle level={1}>This page isn&apos;t available</EmptyTitle>
            <EmptyDescription>The link may be out of date.</EmptyDescription>
          </Empty>
        </ComponentPreview>
        <P>
          Skipping this is easy to miss and costly: a page whose only heading is an{" "}
          <Code>h3</Code> reads to a screen-reader user as though two levels went missing, and
          the alternative — copying <Code>EmptyTitle</Code>&apos;s classes onto your own heading
          — drifts the moment those classes change.
        </P>
        <P>
          <Code>render={"{"}&lt;h1 /&gt;{"}"}</Code> renders the same thing, and is what to reach
          for when the title should be something that is <em>not</em> a heading — a{" "}
          <Code>p</Code> in a card that has its own title above. Prefer <Code>level</Code> for a
          heading: <Code>render</Code> puts a childless <Code>&lt;h1 /&gt;</Code> in your source,
          which <Code>jsx-a11y/heading-has-content</Code> reads as an empty heading and reports
          at every call site. The rule is wrong about it and has no option that can be told so.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="Empty"
          nodes={[
            { name: "EmptyIcon" },
            { name: "EmptyTitle" },
            { name: "EmptyDescription" },
            { name: "EmptyAction" },
          ]}
        />
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={emptyProps} />
      </Stack>
    </DocPage>
  )
}
