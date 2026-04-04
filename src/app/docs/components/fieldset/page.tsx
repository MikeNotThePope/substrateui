import { Fieldset } from "@/components/ui/fieldset"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const fieldsetProps: PropDef[] = [
  {
    name: "legend",
    type: "string",
    required: true,
    description:
      "Text displayed as the fieldset legend, providing an accessible group label.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description:
      "When true, disables all form controls within the fieldset.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the fieldset element.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "The form fields and content grouped by this fieldset.",
  },
]

export default function FieldsetPage() {
  return (
    <DocPage
      title="Fieldset"
      description="An accessible fieldset wrapper with a visible legend label. Groups related form fields together with semantic HTML."
    >
      {/* Basic Fieldset */}
      <Stack gap="md">
        <H3>Basic Fieldset</H3>
        <ComponentPreview
          code={`<Fieldset legend="Personal Information">
  <Field>
    <FieldLabel>First name</FieldLabel>
    <Input placeholder="Jane" />
  </Field>
  <Field>
    <FieldLabel>Last name</FieldLabel>
    <Input placeholder="Doe" />
  </Field>
</Fieldset>`}
        >
          <Stack gap="md" className="w-full max-w-sm">
            <Fieldset legend="Personal Information">
              <Field>
                <FieldLabel>First name</FieldLabel>
                <Input placeholder="Jane" />
              </Field>
              <Field>
                <FieldLabel>Last name</FieldLabel>
                <Input placeholder="Doe" />
              </Field>
            </Fieldset>
          </Stack>
        </ComponentPreview>
      </Stack>

      {/* Disabled Fieldset */}
      <Stack gap="md">
        <H3>Disabled Fieldset</H3>
        <ComponentPreview
          code={`<Fieldset legend="Account Details" disabled>
  <Field>
    <FieldLabel>Username</FieldLabel>
    <Input placeholder="janedoe" />
  </Field>
  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="jane@example.com" />
  </Field>
</Fieldset>`}
        >
          <Stack gap="md" className="w-full max-w-sm">
            <Fieldset legend="Account Details" disabled>
              <Field>
                <FieldLabel>Username</FieldLabel>
                <Input placeholder="janedoe" />
              </Field>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="jane@example.com" />
              </Field>
            </Fieldset>
          </Stack>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={fieldsetProps} />
      </Stack>
    </DocPage>
  )
}
