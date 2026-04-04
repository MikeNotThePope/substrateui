import { Textarea } from "@/components/ui/textarea"
import { Field, FieldLabel, FieldHint } from "@/components/ui/field"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const textareaProps: PropDef[] = [
  {
    name: "placeholder",
    type: "string",
    default: undefined,
    description: "Placeholder text shown when the textarea is empty.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "When true, prevents interaction and reduces opacity.",
  },
  {
    name: "rows",
    type: "number",
    default: undefined,
    description: "The number of visible text lines.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the textarea element.",
  },
]

export default function TextareaPage() {
  return (
    <DocPage
      title="Textarea"
      description="A multi-line text input for longer form content. Supports all native textarea attributes with consistent styling."
    >
      {/* Default */}
      <Stack gap="md">
        <H3>Default</H3>
        <ComponentPreview
          code={`<Textarea placeholder="Write your message..." />`}
        >
          <Textarea placeholder="Write your message..." />
        </ComponentPreview>
      </Stack>

      {/* Disabled */}
      <Stack gap="md">
        <H3>Disabled</H3>
        <ComponentPreview
          code={`<Textarea disabled placeholder="Cannot edit this" rows={3} />`}
        >
          <Textarea disabled placeholder="Cannot edit this" rows={3} />
        </ComponentPreview>
      </Stack>

      {/* With Field */}
      <Stack gap="md">
        <H3>With Field</H3>
        <ComponentPreview
          code={`<Field>
  <FieldLabel>Bio</FieldLabel>
  <Textarea placeholder="Tell us about yourself..." rows={4} />
  <FieldHint>Max 500 characters.</FieldHint>
</Field>`}
        >
          <Stack gap="md" className="w-full max-w-sm">
            <Field>
              <FieldLabel>Bio</FieldLabel>
              <Textarea placeholder="Tell us about yourself..." rows={4} />
              <FieldHint>Max 500 characters.</FieldHint>
            </Field>
          </Stack>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={textareaProps} />
      </Stack>
    </DocPage>
  )
}
