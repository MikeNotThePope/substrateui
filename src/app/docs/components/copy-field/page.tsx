import { CopyField } from "@/components/ui/copy-field"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "CopyField",
  description: "A read-only value in a mono block with a copy button at its end edge.",
  route: "/docs/components/copy-field",
})

const copyFieldProps: PropDef[] = [
  {
    name: "value",
    type: "string",
    default: undefined,
    description: "The text shown and copied.",
  },
  {
    name: "label",
    type: "string",
    default: undefined,
    description:
      "Accessible name of the copy button, naming what it copies. Falls back to labels.copy. The visible text stays labels.copy.",
  },
  {
    name: "labels",
    type: "{ copy?: string; copied?: string }",
    default: undefined,
    description:
      "Translatable strings for the button and the announcement. Resolves through the LabelsProvider (copyField) before falling back to English defaults.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes applied to the bordered wrapper.",
  },
]

export default function CopyFieldPage() {
  return (
    <DocPage
      title="CopyField"
      description="A read-only value in a mono block with a copy button at its end edge. The button flips to a check and Copied for two seconds, and a polite live region says so. When the browser refuses the clipboard, the value is selected instead, so a long-press or Ctrl+C still works."
    >
      <ComponentPreview
        code={`<CopyField value="3f2a9c1e-7b4d-4e21-9a0f-5c6d8e2b1a47" label="Copy reference" />`}
      >
        <div className="w-full max-w-sm">
          <CopyField value="3f2a9c1e-7b4d-4e21-9a0f-5c6d8e2b1a47" label="Copy reference" />
        </div>
      </ComponentPreview>

      <ImportLine names={["CopyField"]} />

      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          The button&apos;s text is <Code>copy</Code> until a copy lands, then <Code>copied</Code>,
          which is also what the live region announces. Below the <Code>sm</Code> breakpoint the
          text is hidden and only the icon shows. Override one instance with the{" "}
          <Code>labels</Code> prop, or every instance through <Code>LabelsProvider</Code>&apos;s{" "}
          <Code>copyField</Code> key.
        </P>
        <PropsTable
          props={[
            { name: "copy", type: "string", default: "\"Copy\"", description: "The button's text, and its name when no label is given." },
            { name: "copied", type: "string", default: "\"Copied\"", description: "The button's text and name after a copy, and the announcement." },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={copyFieldProps} />
      </Stack>
    </DocPage>
  )
}
