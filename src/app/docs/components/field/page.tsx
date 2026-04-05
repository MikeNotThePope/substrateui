import { Field, FieldLabel, FieldHint, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const fieldProps: PropDef[] = [
  {
    name: "error",
    type: "boolean",
    default: "false",
    description:
      "When true, applies error styling to child inputs and labels. Adds red border to inputs and red text to labels.",
  },
  {
    name: "id",
    type: "string",
    default: "auto-generated",
    description:
      "Explicit ID for the field. When omitted, a unique ID is generated automatically via React.useId().",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the field wrapper.",
  },
]

const fieldLabelProps: PropDef[] = [
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "The label text content.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the label element.",
  },
]

const fieldHintProps: PropDef[] = [
  {
    name: "children",
    type: "React.ReactNode",
    required: true,
    description: "Helper text displayed below the input.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the hint paragraph.",
  },
]

const fieldErrorProps: PropDef[] = [
  {
    name: "children",
    type: "React.ReactNode",
    default: undefined,
    description:
      "The error message. When empty or undefined, the element does not render at all.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the error paragraph.",
  },
]

export default function FieldPage() {
  return (
    <DocPage
      title="Field"
      description="A composable form field system that links labels, hints, and error messages to inputs through shared context. Handles accessibility attributes automatically."
    >
      {/* Basic Field */}
      <Stack gap="md">
        <H3>Basic Field</H3>
        <ComponentPreview
          code={`<Field>
  <FieldLabel>Display name</FieldLabel>
  <Input placeholder="Enter your display name" />
  <FieldHint>This is how others will see you.</FieldHint>
</Field>`}
        >
          <Stack gap="md" className="w-full max-w-sm">
            <Field>
              <FieldLabel>Display name</FieldLabel>
              <Input placeholder="Enter your display name" />
              <FieldHint>This is how others will see you.</FieldHint>
            </Field>
          </Stack>
        </ComponentPreview>
      </Stack>

      {/* Error State */}
      <Stack gap="md">
        <H3>Error State</H3>
        <ComponentPreview
          code={`<Field error={true}>
  <FieldLabel>Email address</FieldLabel>
  <Input type="email" placeholder="you@example.com" />
  <FieldError>Please enter a valid email address.</FieldError>
</Field>`}
        >
          <Stack gap="md" className="w-full max-w-sm">
            <Field error={true}>
              <FieldLabel>Email address</FieldLabel>
              <Input type="email" placeholder="you@example.com" />
              <FieldError>Please enter a valid email address.</FieldError>
            </Field>
          </Stack>
        </ComponentPreview>
      </Stack>

      {/* Complete Example */}
      <Stack gap="md">
        <H3>Complete Example</H3>
        <ComponentPreview
          code={`<form className="space-y-6">
  <Field>
    <FieldLabel>Full name</FieldLabel>
    <Input placeholder="Jane Doe" />
    <FieldHint>Your legal first and last name.</FieldHint>
  </Field>

  <Field>
    <FieldLabel>Email</FieldLabel>
    <Input type="email" placeholder="jane@example.com" />
    <FieldHint>We use this for account recovery.</FieldHint>
  </Field>

  <Field error={true}>
    <FieldLabel>Password</FieldLabel>
    <Input type="password" placeholder="Create a password" />
    <FieldError>Password must be at least 8 characters.</FieldError>
  </Field>
</form>`}
        >
          <form className="space-y-6 w-full max-w-sm">
            <Field>
              <FieldLabel>Full name</FieldLabel>
              <Input placeholder="Jane Doe" />
              <FieldHint>Your legal first and last name.</FieldHint>
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="jane@example.com" />
              <FieldHint>We use this for account recovery.</FieldHint>
            </Field>
            <Field error={true}>
              <FieldLabel>Password</FieldLabel>
              <Input type="password" placeholder="Create a password" />
              <FieldError>Password must be at least 8 characters.</FieldError>
            </Field>
          </form>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>

        <H3>Field</H3>
        <PropsTable props={fieldProps} />

        <H3>FieldLabel</H3>
        <PropsTable props={fieldLabelProps} />

        <H3>FieldHint</H3>
        <PropsTable props={fieldHintProps} />

        <H3>FieldError</H3>
        <PropsTable props={fieldErrorProps} />
      </Stack>

      {/* Accessibility */}
      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Field automatically links FieldLabel to the input via{" "}
            <Code>htmlFor</Code>, and connects FieldHint and FieldError via{" "}
            <Code>aria-describedby</Code>, so screen reader users hear the
            label, the hint, and any validation error as a single unit.
          </P>
          <P>
            FieldError uses <Code>role=&quot;alert&quot;</Code> so screen
            readers announce validation errors the moment they appear,
            without the user needing to navigate back to the field.
          </P>
          <P>
            Always include a FieldLabel. Placeholder text is not a
            substitute for a label — it disappears when users start typing
            and is often low-contrast.
          </P>
        </Stack>
      </Stack>
    </DocPage>
  )
}
