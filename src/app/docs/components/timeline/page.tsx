import { Rocket, Package, GitCommit } from "lucide-react"
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineTime,
  TimelineTitle,
  TimelineBody,
} from "@/components/ui/timeline"
import { Stack } from "@/components/ui/stack"
import { H3, P } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Timeline",
  description: "Displays a series of events in chronological order — activity feeds, changelogs, order tracking, and audit logs.",
  route: "/docs/components/timeline",
})

const props: PropDef[] = [
  {
    name: "Timeline",
    type: "React.ComponentProps<'ol'>",
    default: undefined,
    description: "The rail container. Renders an ordered list with a vertical border.",
  },
  {
    name: "TimelineItem",
    type: "React.ComponentProps<'li'>",
    default: undefined,
    description: "A single event. Position a TimelineDot inside it.",
  },
  {
    name: "TimelineDot",
    type: "{ icon?: React.ComponentType }",
    default: undefined,
    description: "Marker on the rail. Pass an icon to render a ringed badge instead of a dot.",
  },
  {
    name: "TimelineTime / TimelineTitle / TimelineBody",
    type: "React.ComponentProps<...>",
    default: undefined,
    description: "Timestamp, heading, and body copy slots for an item.",
  },
]

export default function TimelinePage() {
  return (
    <DocPage
      title="Timeline"
      description="Displays a series of events in chronological order — activity feeds, changelogs, order tracking, and audit logs. Compose items from time, title, and body slots, with an optional icon marker."
    >
      <ComponentPreview
        code={`<Timeline>
  <TimelineItem>
    <TimelineDot />
    <TimelineTime>March 2026</TimelineTime>
    <TimelineTitle>Shipped v1.3</TimelineTitle>
    <TimelineBody>Blocks, the init CLI, and the theme generator landed.</TimelineBody>
  </TimelineItem>
  <TimelineItem>
    <TimelineDot />
    <TimelineTime>February 2026</TimelineTime>
    <TimelineTitle>Migrated to Base UI</TimelineTitle>
    <TimelineBody>Swapped the primitive layer from Radix to Base UI 1.6.</TimelineBody>
  </TimelineItem>
</Timeline>`}
      >
        <Timeline>
          <TimelineItem>
            <TimelineDot />
            <TimelineTime>March 2026</TimelineTime>
            <TimelineTitle>Shipped v1.3</TimelineTitle>
            <TimelineBody>Blocks, the init CLI, and the theme generator landed.</TimelineBody>
          </TimelineItem>
          <TimelineItem>
            <TimelineDot />
            <TimelineTime>February 2026</TimelineTime>
            <TimelineTitle>Migrated to Base UI</TimelineTitle>
            <TimelineBody>Swapped the primitive layer from Radix to Base UI 1.6.</TimelineBody>
          </TimelineItem>
        </Timeline>
      </ComponentPreview>

      <ImportLine
        names={[
          "Timeline",
          "TimelineItem",
          "TimelineDot",
          "TimelineTime",
          "TimelineTitle",
          "TimelineBody",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="Timeline"
          nodes={[
            {
              name: "TimelineItem",
              children: [
                { name: "TimelineDot" },
                { name: "TimelineTime" },
                { name: "TimelineTitle" },
                { name: "TimelineBody" },
              ],
            },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>With icons</H3>
        <ComponentPreview
          code={`<Timeline>
  <TimelineItem>
    <TimelineDot icon={Rocket} />
    <TimelineTitle>Deployed</TimelineTitle>
    <TimelineBody>Release went out to production.</TimelineBody>
  </TimelineItem>
</Timeline>`}
        >
          <Timeline>
            <TimelineItem>
              <TimelineDot icon={Rocket} />
              <TimelineTitle>Deployed</TimelineTitle>
              <TimelineBody>Release went out to production.</TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineDot icon={Package} />
              <TimelineTitle>Published</TimelineTitle>
              <TimelineBody>Package pushed to npm.</TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineDot icon={GitCommit} />
              <TimelineTitle>Merged</TimelineTitle>
              <TimelineBody>Feature branch merged to main.</TimelineBody>
            </TimelineItem>
          </Timeline>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          The timeline renders as an ordered list (<code>&lt;ol&gt;</code>/<code>&lt;li&gt;</code>),
          so assistive technology announces the sequence and count. Markers are
          decorative and hidden from screen readers; keep the meaning in the
          title and body text.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>
    </DocPage>
  )
}
