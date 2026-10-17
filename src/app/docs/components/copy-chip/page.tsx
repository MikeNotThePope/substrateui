import { CopyChip } from "@/components/ui/copy-chip"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "CopyChip",
  description: "A value and a copy icon in one outlined inline chip, set inside a sentence.",
  route: "/docs/components/copy-chip",
})

const EMAIL = "staging-admin@admin.staging.example.com"

const copyChipProps: PropDef[] = [
  {
    name: "value",
    type: "string",
    default: undefined,
    description: "The text shown and copied. It is also the chip's accessible name.",
  },
  {
    name: "breakAfter",
    type: "string",
    default: undefined,
    description:
      "Where the value may wrap: after each occurrence of this string, and nowhere else. \"@\" lets an address break after its @. Unset, the value never wraps.",
  },
  {
    name: "labels",
    type: "{ copy?: string; copied?: string }",
    default: undefined,
    description:
      "Translatable strings for the description and the announcement. Resolves through the LabelsProvider (copyChip) before falling back to English defaults.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes applied to the chip.",
  },
]

export default function CopyChipPage() {
  return (
    <DocPage
      title="CopyChip"
      description="A value and a copy icon in one outlined inline chip, for a value set inside a sentence. The whole chip is the button. Its icon flips to a check for two seconds after a copy, and Copied is announced. When the browser refuses the clipboard, the value is selected instead, so a long-press or Ctrl+C still works."
    >
      <ComponentPreview
        code={`<Field>
  <FieldLabel>
    Type <CopyChip value="${EMAIL}" breakAfter="@" /> to confirm
  </FieldLabel>
  <Input type="email" />
</Field>`}
      >
        <div className="w-full max-w-sm">
          <Field>
            <FieldLabel>
              Type <CopyChip value={EMAIL} breakAfter="@" /> to confirm
            </FieldLabel>
            <Input type="email" autoComplete="off" />
          </Field>
        </div>
      </ComponentPreview>

      <ImportLine names={["CopyChip"]} />

      <Stack gap="md">
        <H3>Inside a label</H3>
        <P>
          The chip&apos;s name is its value, and <Code>copy</Code> is only its description, so
          the label it sits in still reads as the sentence: the field above is named
          &ldquo;Type {EMAIL} to confirm&rdquo;. The announcement goes through the shared live
          region, outside every label, for the same reason. A press on the chip copies; it
          does not move focus to the field. The label has to point at its field with{" "}
          <Code>htmlFor</Code>, as <Code>FieldLabel</Code> does: a label wrapped around the
          field instead labels the first control inside it, which is the chip.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Wrapping</H3>
        <P>
          The value never breaks mid-word. <Code>breakAfter</Code> names the one place it
          may, and the chip grows a line there when the sentence runs out of room. Without
          it, the value stays on one line.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          <Code>copy</Code> is the chip&apos;s description and <Code>copied</Code> the
          announcement after a copy. Override one instance with the <Code>labels</Code> prop,
          or every instance through <Code>LabelsProvider</Code>&apos;s <Code>copyChip</Code>{" "}
          key.
        </P>
        <PropsTable
          props={[
            { name: "copy", type: "string", default: "\"Copy\"", description: "The chip's accessible description." },
            { name: "copied", type: "string", default: "\"Copied\"", description: "What is announced after a copy." },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={copyChipProps} />
      </Stack>
    </DocPage>
  )
}
