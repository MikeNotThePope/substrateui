import { Field, FieldLabel, FieldHint } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3, H4, Muted } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const formPatternProps: PropDef[] = [
  {
    name: "Field",
    type: "component",
    default: undefined,
    description:
      "Wraps a single input with label, hint, and error. Provides context via FieldContext.",
  },
  {
    name: "FormSection (pattern)",
    type: "Card + heading",
    default: undefined,
    description:
      "Group related fields under a titled Card. Not a dedicated component -- compose with Card + H4.",
  },
  {
    name: "FormActions (pattern)",
    type: "Cluster of Buttons",
    default: undefined,
    description:
      "A row of action buttons (submit, cancel) at the bottom of the form.",
  },
]

export default function FormsPage() {
  return (
    <DocPage
      title="Form Patterns"
      description="Compose Field components into logical sections with Card wrappers, then add a FormActions row at the bottom. This pattern scales from simple settings forms to complex multi-section workflows."
    >
      <Stack gap="md">
        <H3>Settings Form</H3>
        <ComponentPreview
          code={`{/* Section 1: Profile */}
<Card>
  <CardContent className="pt-6">
    <Stack gap="md">
      <H4>Profile</H4>
      <Muted>Your public profile information.</Muted>
      <Field>
        <FieldLabel>Display Name</FieldLabel>
        <Input placeholder="Jane Smith" />
      </Field>
      <Field>
        <FieldLabel>Bio</FieldLabel>
        <Textarea placeholder="Tell us about yourself..." />
        <FieldHint>Markdown is supported.</FieldHint>
      </Field>
    </Stack>
  </CardContent>
</Card>

{/* Section 2: Notifications */}
<Card>
  <CardContent className="pt-6">
    <Stack gap="md">
      <H4>Notifications</H4>
      <Muted>Manage how you receive updates.</Muted>
      <Field>
        <div className="flex items-center justify-between">
          <FieldLabel>Email notifications</FieldLabel>
          <Switch />
        </div>
        <FieldHint>Receive updates about your account via email.</FieldHint>
      </Field>
      <Field>
        <div className="flex items-center justify-between">
          <FieldLabel>Marketing emails</FieldLabel>
          <Switch />
        </div>
        <FieldHint>Receive tips, product updates, and offers.</FieldHint>
      </Field>
    </Stack>
  </CardContent>
</Card>

{/* Form Actions */}
<Cluster gap="sm" justify="end">
  <Button variant="outline">Cancel</Button>
  <Button>Save Changes</Button>
</Cluster>`}
        >
          <Stack gap="lg" className="w-full">
            <Card>
              <CardContent className="pt-6">
                <Stack gap="md">
                  <H4>Profile</H4>
                  <Muted>Your public profile information.</Muted>
                  <Field>
                    <FieldLabel>Display Name</FieldLabel>
                    <Input placeholder="Jane Smith" />
                  </Field>
                  <Field>
                    <FieldLabel>Bio</FieldLabel>
                    <Textarea placeholder="Tell us about yourself..." />
                    <FieldHint>Markdown is supported.</FieldHint>
                  </Field>
                </Stack>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Stack gap="md">
                  <H4>Notifications</H4>
                  <Muted>Manage how you receive updates.</Muted>
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel>Email notifications</FieldLabel>
                      <Switch />
                    </div>
                    <FieldHint>Receive updates about your account via email.</FieldHint>
                  </Field>
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel>Marketing emails</FieldLabel>
                      <Switch />
                    </div>
                    <FieldHint>Receive tips, product updates, and offers.</FieldHint>
                  </Field>
                </Stack>
              </CardContent>
            </Card>

            <Cluster gap="sm" justify="end">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </Cluster>
          </Stack>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Composition Reference</H3>
        <PropsTable props={formPatternProps} />
      </Stack>
    </DocPage>
  )
}
