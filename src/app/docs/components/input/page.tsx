import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldHint, FieldError } from "@/components/ui/field"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const inputProps: PropDef[] = [
  {
    name: "type",
    type: "string",
    default: '"text"',
    description:
      "The HTML input type. Supports all native types including text, email, password, number, file, etc.",
  },
  {
    name: "placeholder",
    type: "string",
    default: undefined,
    description: "Placeholder text shown when the input is empty.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description:
      "When true, prevents interaction, reduces opacity, and applies a sunken background.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the input element.",
  },
]

export default function InputPage() {
  return (
    <DocPage
      title="Input"
      description="A styled text input for capturing user data. Features border-2 styling, focus ring, and seamless integration with Field for labels, hints, and validation."
    >
      {/* Default */}
      <Stack gap="md">
        <H3>Default</H3>
        <ComponentPreview
          code={`<Input placeholder="Enter your name" />`}
        >
          <Input placeholder="Enter your name" />
        </ComponentPreview>
      </Stack>

      {/* Disabled */}
      <Stack gap="md">
        <H3>Disabled</H3>
        <ComponentPreview
          code={`<Input disabled placeholder="Cannot edit this" />`}
        >
          <Input disabled placeholder="Cannot edit this" />
        </ComponentPreview>
      </Stack>

      {/* With Field */}
      <Stack gap="md">
        <H3>With Field</H3>
        <ComponentPreview
          code={`<Field>
  <FieldLabel>Email address</FieldLabel>
  <Input type="email" placeholder="you@example.com" />
  <FieldHint>We will never share your email.</FieldHint>
</Field>

<Field error={true}>
  <FieldLabel>Username</FieldLabel>
  <Input placeholder="Choose a username" />
  <FieldError>Username is already taken.</FieldError>
</Field>`}
        >
          <Stack gap="md" className="w-full max-w-sm">
            <Field>
              <FieldLabel>Email address</FieldLabel>
              <Input type="email" placeholder="you@example.com" />
              <FieldHint>We will never share your email.</FieldHint>
            </Field>
            <Field error={true}>
              <FieldLabel>Username</FieldLabel>
              <Input placeholder="Choose a username" />
              <FieldError>Username is already taken.</FieldError>
            </Field>
          </Stack>
        </ComponentPreview>
      </Stack>

      {/* File Input */}
      <Stack gap="md">
        <H3>File Input</H3>
        <ComponentPreview
          code={`<Input type="file" />`}
        >
          <Input type="file" />
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={inputProps} />
      </Stack>
    </DocPage>
  )
}
