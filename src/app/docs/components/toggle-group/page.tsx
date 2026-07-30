"use client"

import { useState } from "react"
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const groupProps: PropDef[] = [
  { name: "variant", type: '"default" | "outline"', default: '"default"', description: "Applied to every item through context, so you set it once on the group." },
  { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Applied to every item through context." },
  { name: "multiple", type: "boolean", default: "false", description: "Allow several items pressed at once. Off, pressing one releases the last." },
  { name: "value", type: "string[]", default: undefined, description: "The controlled list of pressed values — an array in both modes." },
  { name: "defaultValue", type: "string[]", default: "[]", description: "The items pressed on first render, when uncontrolled." },
  { name: "onValueChange", type: "(value: string[]) => void", default: undefined, description: "Fired with the new list of pressed values." },
  { name: "disabled", type: "boolean", default: "false", description: "Disable every item in the group." },
]

const itemProps: PropDef[] = [
  { name: "value", type: "string", default: undefined, description: "Identifies the item in the group's value array. Required." },
  { name: "disabled", type: "boolean", default: "false", description: "Disable this item only." },
]

function ControlledAlignment() {
  const [value, setValue] = useState<string[]>(["center"])
  return (
    <Stack gap="sm" align="start">
      <ToggleGroup variant="outline" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="start" aria-label="Align to the start">
          <AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align to the centre">
          <AlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="end" aria-label="Align to the end">
          <AlignRight />
        </ToggleGroupItem>
      </ToggleGroup>
      <P className="text-sm text-muted-foreground">
        Alignment: {value[0] ?? "none"}
      </P>
    </Stack>
  )
}

export default function ToggleGroupPage() {
  return (
    <DocPage
      title="Toggle Group"
      description="A row of toggles that know about each other. One pressed at a time by default, which makes it the segmented control; set multiple and it becomes a set of independent switches sharing one geometry."
    >
      <ComponentPreview
        code={`<ToggleGroup variant="outline" defaultValue={["center"]}>
  <ToggleGroupItem value="start" aria-label="Align to the start">
    <AlignLeft />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align to the centre">
    <AlignCenter />
  </ToggleGroupItem>
  <ToggleGroupItem value="end" aria-label="Align to the end">
    <AlignRight />
  </ToggleGroupItem>
</ToggleGroup>`}
      >
        <ToggleGroup variant="outline" defaultValue={["center"]}>
          <ToggleGroupItem value="start" aria-label="Align to the start">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align to the centre">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="end" aria-label="Align to the end">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </ComponentPreview>

      <ImportLine names={["ToggleGroup", "ToggleGroupItem"]} />

      <Stack gap="md">
        <H3>Composition</H3>
        <P>
          <Code>variant</Code> and <Code>size</Code> travel from the group to its
          items through context, so a group never comes out with items of two
          different heights. Setting either on an item is possible but only worth
          it deliberately.
        </P>
        <CompositionTree root="ToggleGroup" nodes={[{ name: "ToggleGroupItem" }]} />
      </Stack>

      <Stack gap="md">
        <H3>Several pressed at once</H3>
        <P>
          <Code>multiple</Code> makes the items independent — the right shape for
          text styling, where bold and italic are not alternatives. Without it the
          group behaves as one choice out of several.
        </P>
        <ComponentPreview
          code={`<ToggleGroup multiple variant="outline" defaultValue={["bold"]}>
  <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline"><Underline /></ToggleGroupItem>
</ToggleGroup>`}
        >
          <ToggleGroup multiple variant="outline" defaultValue={["bold"]}>
            <ToggleGroupItem value="bold" aria-label="Bold">
              <Bold />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
              <Italic />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
              <Underline />
            </ToggleGroupItem>
          </ToggleGroup>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Text items and sizes</H3>
        <P>
          Items take text as readily as icons. Where the labels are words, the
          group is often clearer than a <Code>Select</Code> — every option is
          visible and reachable in one press.
        </P>
        <ComponentPreview
          code={`<ToggleGroup variant="outline" size="sm" defaultValue={["month"]}>
  <ToggleGroupItem value="week">Week</ToggleGroupItem>
  <ToggleGroupItem value="month">Month</ToggleGroupItem>
  <ToggleGroupItem value="quarter">Quarter</ToggleGroupItem>
</ToggleGroup>`}
        >
          <ToggleGroup variant="outline" size="sm" defaultValue={["month"]}>
            <ToggleGroupItem value="week">Week</ToggleGroupItem>
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
            <ToggleGroupItem value="quarter">Quarter</ToggleGroupItem>
          </ToggleGroup>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Controlled</H3>
        <P>
          <Code>value</Code> is an array in both modes — single-select is the
          array capped at one entry rather than a separate shape. Read{" "}
          <Code>value[0]</Code> for the single case.
        </P>
        <ComponentPreview
          code={`const [value, setValue] = useState<string[]>(["center"])

<ToggleGroup variant="outline" value={value} onValueChange={setValue}>
  <ToggleGroupItem value="start" aria-label="Align to the start"><AlignLeft /></ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align to the centre"><AlignCenter /></ToggleGroupItem>
  <ToggleGroupItem value="end" aria-label="Align to the end"><AlignRight /></ToggleGroupItem>
</ToggleGroup>`}
        >
          <ControlledAlignment />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Direction</H3>
        <Stack gap="sm">
          <P>
            The group is a flex row, so in RTL the items reverse along with the
            rest of the line — the first item sits on the right. That is correct,
            and nothing needs configuring.
          </P>
          <P>
            The icons are your own, and the alignment icons above are the case
            worth watching: <Code>AlignLeft</Code> means &quot;align to the start
            of the line&quot;, which in RTL is the right. Name the values{" "}
            <Code>start</Code> and <Code>end</Code> rather than{" "}
            <Code>left</Code> and <Code>right</Code>, and mirror the glyph with{" "}
            <Code>rtl:-scale-x-100</Code> so it points the way the text runs. See{" "}
            <a
              href="/docs/accessibility/direction"
              className="underline underline-offset-4 hover:text-primary"
            >
              Direction (RTL)
            </a>
            .
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            The group is a single tab stop; arrow keys move between items inside
            it. That is what makes it a segmented control rather than three
            unrelated buttons, and it is why a row of loose{" "}
            <Code>Toggle</Code>s is the wrong shape for a set of alternatives.
          </P>
          <P>
            Each item is a button carrying <Code>aria-pressed</Code>. Icon-only
            items need an <Code>aria-label</Code> — every example above has one.
          </P>
          <P>
            The group itself has no accessible name. Where the choice is not
            obvious from the surrounding text, give it an{" "}
            <Code>aria-label</Code> such as &quot;Text alignment&quot;.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          Built on Base UI&apos;s <Code>ToggleGroup</Code> and{" "}
          <Code>Toggle</Code>. The props below are the ones you reach for; see the{" "}
          <a
            href="https://base-ui.com/react/components/toggle-group"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Base UI toggle-group docs
          </a>{" "}
          for the full inherited surface.
        </P>
        <PropsTable props={groupProps} />

        <H3>ToggleGroupItem</H3>
        <PropsTable props={itemProps} />
      </Stack>
    </DocPage>
  )
}
