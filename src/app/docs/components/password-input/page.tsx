import { PasswordInput } from "@/components/ui/password-input"
import { Field, FieldLabel, FieldHint } from "@/components/ui/field"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const passwordInputProps: PropDef[] = [
  {
    name: "containerClassName",
    type: "string",
    default: undefined,
    description:
      "Additional CSS classes applied to the bordered wrapper element (not the inner input).",
  },
  {
    name: "labels",
    type: "{ showPassword?: string; hidePassword?: string }",
    default: undefined,
    description:
      "Translatable strings for the visibility toggle. Resolves through the LabelsProvider (passwordInput) before falling back to English defaults.",
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
    description: "Additional CSS classes applied to the inner input element.",
  },
]

export default function PasswordInputPage() {
  return (
    <DocPage
      title="PasswordInput"
      description="A password input with a show/hide visibility toggle. A drop-in replacement for Input on password fields — all native input props (name, required, autoComplete, etc.) are forwarded to the underlying input."
    >
      {/* Default */}
      <Stack gap="md">
        <H3>Default</H3>
        <ComponentPreview
          code={`<PasswordInput placeholder="••••••••" />`}
        >
          <PasswordInput placeholder="••••••••" />
        </ComponentPreview>
      </Stack>

      {/* Disabled */}
      <Stack gap="md">
        <H3>Disabled</H3>
        <ComponentPreview
          code={`<PasswordInput disabled defaultValue="hunter2" />`}
        >
          <PasswordInput disabled defaultValue="hunter2" />
        </ComponentPreview>
      </Stack>

      {/* With Field */}
      <Stack gap="md">
        <H3>With Field</H3>
        <ComponentPreview
          code={`<Field>
  <FieldLabel>Password</FieldLabel>
  <PasswordInput autoComplete="current-password" required />
  <FieldHint>Must be at least 8 characters.</FieldHint>
</Field>`}
        >
          <Stack gap="md" className="w-full max-w-sm">
            <Field>
              <FieldLabel>Password</FieldLabel>
              <PasswordInput autoComplete="current-password" required />
              <FieldHint>Must be at least 8 characters.</FieldHint>
            </Field>
          </Stack>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={passwordInputProps} />
      </Stack>
    </DocPage>
  )
}
