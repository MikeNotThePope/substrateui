import { PasswordInput } from "@/components/ui/password-input"
import { Field, FieldLabel, FieldHint } from "@/components/ui/field"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
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
      <ComponentPreview
        code={`<PasswordInput placeholder="••••••••" />`}
      >
        <PasswordInput placeholder="••••••••" />
      </ComponentPreview>

      <ImportLine names={["PasswordInput"]} />

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
        <H3>Labels</H3>
        <P>
          The reveal toggle is an icon whose name has to change with its state, so both halves are here. Override one instance with the <Code>labels</Code> prop on the component, or every
            instance at once through <Code>LabelsProvider</Code>&apos;s{" "}
            <Code>passwordInput</Code> key — the provider is how you translate the
            set once instead of at each call site.
        </P>
        <PropsTable
          props={[
          { name: "showPassword", type: "string", default: "\"Show password\"", description: "Accessible name while the password is hidden." },
          { name: "hidePassword", type: "string", default: "\"Hide password\"", description: "Accessible name while it is visible." },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={passwordInputProps} />
      </Stack>
    </DocPage>
  )
}
