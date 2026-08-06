import { ChevronDown, Copy, Download, Share2 } from "lucide-react"

import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Button Group",
  description: "Buttons welded into one unit: the seams collapse to a single 2px rule and only the outer corners stay rounded.",
  route: "/docs/components/button-group",
})

const groupProps: PropDef[] = [
  {
    name: "children",
    type: "React.ReactNode",
    default: undefined,
    description:
      "The buttons. Each element child is cloned with the corner-rounding classes it needs for its position, so children must accept a className.",
  },
]

export default function ButtonGroupPage() {
  return (
    <DocPage
      title="Button Group"
      description="Buttons welded into one unit: the seams collapse to a single 2px rule and only the outer corners stay rounded. Styling only — the buttons keep their own handlers and their own place in the tab order."
    >
      <ComponentPreview
        code={`<ButtonGroup>
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Month</Button>
</ButtonGroup>`}
      >
        <ButtonGroup>
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      </ComponentPreview>

      <ImportLine names={["ButtonGroup"]} />

      <Stack gap="md">
        <H3>How the seams close</H3>
        <Stack gap="sm">
          <P>
            The group is a flex row with <Code>-space-x-[2px]</Code>, pulling each
            button back over its neighbour&apos;s border so two 2px rules read as
            one. Then every child except the first loses its leading corners and
            every child except the last loses its trailing ones —{" "}
            <Code>rounded-s-none</Code> and <Code>rounded-e-none</Code>, logical
            properties, so the shape is right in RTL without a second rule.
          </P>
          <P>
            That is done by cloning each child with an added{" "}
            <Code>className</Code>. A child that ignores <Code>className</Code>{" "}
            keeps all four corners and the group looks like separate buttons
            overlapping. Wrap such a child in an element that does accept one.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>A split button</H3>
        <P>
          The common shape: a primary action, and a menu trigger welded to its
          end. Give the trigger an <Code>aria-label</Code> — a lone chevron has no
          accessible name.
        </P>
        <ComponentPreview
          code={`<ButtonGroup>
  <Button>Publish</Button>
  <Button size="icon" aria-label="More publish options">
    <ChevronDown />
  </Button>
</ButtonGroup>`}
        >
          <ButtonGroup>
            <Button>Publish</Button>
            <Button size="icon" aria-label="More publish options">
              <ChevronDown />
            </Button>
          </ButtonGroup>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Icon groups</H3>
        <P>
          Icon-only buttons group tightly into a toolbar. If the buttons are a set
          of states rather than a set of actions — one of which is currently on —
          you want{" "}
          <a
            href="/docs/components/toggle-group"
            className="underline underline-offset-4 hover:text-primary"
          >
            ToggleGroup
          </a>{" "}
          instead, which adds the pressed state and arrow-key navigation.
        </P>
        <ComponentPreview
          code={`<ButtonGroup>
  <Button variant="outline" size="icon" aria-label="Copy"><Copy /></Button>
  <Button variant="outline" size="icon" aria-label="Download"><Download /></Button>
  <Button variant="outline" size="icon" aria-label="Share"><Share2 /></Button>
</ButtonGroup>`}
        >
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Copy">
              <Copy />
            </Button>
            <Button variant="outline" size="icon" aria-label="Download">
              <Download />
            </Button>
            <Button variant="outline" size="icon" aria-label="Share">
              <Share2 />
            </Button>
          </ButtonGroup>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            The group adds no roles and no keyboard handling. Each button is its
            own tab stop, which is right for a row of independent actions and
            wrong for a set of alternatives — for that,{" "}
            <Code>ToggleGroup</Code> makes the whole set one tab stop with arrow
            keys inside it.
          </P>
          <P>
            The visual welding is the only thing saying these buttons belong
            together, and that cue is not in the accessibility tree. Where the
            grouping carries meaning, wrap it in a{" "}
            <Code>role=&quot;group&quot;</Code> with an{" "}
            <Code>aria-label</Code>.
          </P>
          <P>
            Focus rings still work, and the ring is drawn with an offset, so the
            focused button lifts clear of its neighbours rather than being clipped
            by the overlap.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          <Code>ButtonGroup</Code> defines no props of its own beyond what it does
          to its children — everything else, including <Code>className</Code>,
          goes to the wrapping <Code>div</Code>. See{" "}
          <Code>React.HTMLAttributes&lt;HTMLDivElement&gt;</Code> for that
          surface.
        </P>
        <PropsTable props={groupProps} />
      </Stack>
    </DocPage>
  )
}
