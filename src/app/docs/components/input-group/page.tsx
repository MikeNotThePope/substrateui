import { Search, AtSign } from "lucide-react"

import {
  InputGroup,
  InputGroupPrefix,
  InputGroupSuffix,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldHint } from "@/components/ui/field"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Input Group",
  description: "An input and its addons inside one border.",
  route: "/docs/components/input-group",
})

const groupProps: PropDef[] = [
  {
    name: "children",
    type: "React.ReactNode",
    default: undefined,
    description:
      "A prefix, an Input, a suffix — in that order. The group strips the nested input's own border and focus ring so the frame is drawn once, by the group.",
  },
]

export default function InputGroupPage() {
  return (
    <DocPage
      title="Input Group"
      description="An input and its addons inside one border. The group takes the frame and the focus ring; the input inside gives up both, so a currency symbol or a domain suffix sits inside the field rather than beside it."
    >
      <ComponentPreview
        code={`<InputGroup>
  <InputGroupPrefix>$</InputGroupPrefix>
  <Input placeholder="0.00" />
  <InputGroupSuffix>USD</InputGroupSuffix>
</InputGroup>`}
      >
        <div className="w-full max-w-sm">
          <InputGroup>
            <InputGroupPrefix>$</InputGroupPrefix>
            <Input placeholder="0.00" />
            <InputGroupSuffix>USD</InputGroupSuffix>
          </InputGroup>
        </div>
      </ComponentPreview>

      <ImportLine
        names={["InputGroup", "InputGroupPrefix", "InputGroupSuffix"]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <P>
          Both addons are optional. The group draws the border and, on{" "}
          <Code>focus-within</Code>, the ring — so the whole assembly lights up
          when the input inside it is focused, instead of a ring appearing around
          only the middle third.
        </P>
        <CompositionTree
          root="InputGroup"
          nodes={[
            { name: "InputGroupPrefix" },
            { name: "Input" },
            { name: "InputGroupSuffix" },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>An icon on one side</H3>
        <P>
          A prefix takes any node, so an icon works as readily as text. Mark it{" "}
          <Code>aria-hidden</Code>: it repeats what the label and placeholder
          already say, and an announced &quot;magnifying glass&quot; in front of a
          search field is noise.
        </P>
        <ComponentPreview
          code={`<InputGroup>
  <InputGroupPrefix>
    <Search aria-hidden className="h-4 w-4" />
  </InputGroupPrefix>
  <Input placeholder="Search the docs" />
</InputGroup>`}
        >
          <div className="w-full max-w-sm">
            <InputGroup>
              <InputGroupPrefix>
                <Search aria-hidden className="h-4 w-4" />
              </InputGroupPrefix>
              <Input placeholder="Search the docs" />
            </InputGroup>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Inside a Field</H3>
        <P>
          The group is only a frame — it does no labelling. Put it inside{" "}
          <Code>Field</Code> and the label, hint, and error wiring work exactly as
          they do around a bare input.
        </P>
        <ComponentPreview
          code={`<Field>
  <FieldLabel>Workspace URL</FieldLabel>
  <InputGroup>
    <InputGroupPrefix>
      <AtSign aria-hidden className="h-4 w-4" />
    </InputGroupPrefix>
    <Input placeholder="acme" />
    <InputGroupSuffix>.substrateui.dev</InputGroupSuffix>
  </InputGroup>
  <FieldHint>Lowercase letters, numbers, and hyphens.</FieldHint>
</Field>`}
        >
          <div className="w-full max-w-sm">
            <Field>
              <FieldLabel>Workspace URL</FieldLabel>
              <InputGroup>
                <InputGroupPrefix>
                  <AtSign aria-hidden className="h-4 w-4" />
                </InputGroupPrefix>
                <Input placeholder="acme" />
                <InputGroupSuffix>.substrateui.dev</InputGroupSuffix>
              </InputGroup>
              <FieldHint>Lowercase letters, numbers, and hyphens.</FieldHint>
            </Field>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Direction</H3>
        <Stack gap="sm">
          <P>
            Prefix and suffix are named for reading order, not for sides. Their
            padding uses <Code>ps-3</Code> and <Code>pe-3</Code>, so in RTL the
            prefix moves to the right of the field and keeps its inner padding —
            nothing to configure.
          </P>
          <P>
            What does not flip is the content you put in them. A currency symbol
            or a domain suffix is text and belongs where the locale puts it; an
            arrow or chevron is directional and needs{" "}
            <Code>rtl:-scale-x-100</Code>. See{" "}
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
            An addon is a <Code>div</Code> — decoration, not a label. If the
            prefix carries information the user needs, say it in the label or the
            hint too: &quot;Amount in US dollars&quot; rather than relying on a{" "}
            <Code>$</Code> a screen reader may read as &quot;dollar sign&quot; in
            the middle of the field&apos;s name, or may not reach at all.
          </P>
          <P>
            The addons are not click targets and do not focus the input. Where an
            addon should do something — a unit picker, a reveal toggle — put a real
            button inside it, and remember that button is its own tab stop before
            or after the field.
          </P>
          <P>
            The focus ring is drawn by the group with an offset, so it clears the
            border rather than sitting on it.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          None of the three parts defines a prop of its own; everything, including{" "}
          <Code>className</Code>, goes to the underlying <Code>div</Code>. See{" "}
          <Code>React.HTMLAttributes&lt;HTMLDivElement&gt;</Code> for that
          surface — the composition tree above is the more useful map.
        </P>
        <PropsTable props={groupProps} />
      </Stack>
    </DocPage>
  )
}
