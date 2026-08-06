import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldLabel, FieldHint } from "@/components/ui/field"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Label",
  description: "A native label element at the form type scale. One job: name a control, and make clicking the text focus it.",
  route: "/docs/components/label",
})

const labelProps: PropDef[] = [
  {
    name: "htmlFor",
    type: "string",
    default: undefined,
    description:
      "The id of the control this labels. Required unless the control is nested inside the label.",
  },
]

export default function LabelPage() {
  return (
    <DocPage
      title="Label"
      description="A native label element at the form type scale. One job: name a control, and make clicking the text focus it. Most of the time you want Field, which renders this for you and wires the id."
    >
      <ComponentPreview
        code={`<Label htmlFor="workspace">Workspace name</Label>
<Input id="workspace" placeholder="acme-production" />`}
      >
        <Stack gap="sm" className="w-full max-w-sm">
          <Label htmlFor="workspace">Workspace name</Label>
          <Input id="workspace" placeholder="acme-production" />
        </Stack>
      </ComponentPreview>

      <ImportLine names={["Label"]} />

      <Stack gap="md">
        <H3>Prefer Field</H3>
        <Stack gap="sm">
          <P>
            <Code>Field</Code> generates the id, points{" "}
            <Code>FieldLabel</Code> at it, and wires any hint and error text into{" "}
            <Code>aria-describedby</Code>. Doing that by hand is three chances to
            get it wrong on every field in the app.
          </P>
          <P>
            Reach for <Code>Label</Code> directly when there is no field to
            describe — a group caption, a label on a control you have built
            yourself, or a row where the label sits beside the control rather than
            above it.
          </P>
        </Stack>
        <ComponentPreview
          code={`{/* Preferred: Field owns the id and the description wiring */}
<Field>
  <FieldLabel>Workspace name</FieldLabel>
  <Input placeholder="acme-production" />
  <FieldHint>Lowercase letters, numbers, and hyphens.</FieldHint>
</Field>`}
        >
          <div className="w-full max-w-sm">
            <Field>
              <FieldLabel>Workspace name</FieldLabel>
              <Input placeholder="acme-production" />
              <FieldHint>Lowercase letters, numbers, and hyphens.</FieldHint>
            </Field>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Beside a control</H3>
        <P>
          A checkbox or switch reads better with its label to the side. The label
          is still the click target, so the whole phrase toggles the control
          rather than only the 16 pixels of the box.
        </P>
        <ComponentPreview
          code={`<Cluster gap="sm" align="center">
  <Checkbox id="digest" />
  <Label htmlFor="digest">Email me a weekly digest</Label>
</Cluster>`}
        >
          <Cluster gap="sm" align="center">
            <Checkbox id="digest" />
            <Label htmlFor="digest">Email me a weekly digest</Label>
          </Cluster>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Disabled controls</H3>
        <P>
          The label dims itself when a <Code>peer</Code>-marked control next to it
          is disabled, via <Code>peer-disabled</Code>. That needs the control to
          carry the <Code>peer</Code> class and to be a previous sibling — the
          label cannot see a disabled control it isn&apos;t next to.
        </P>
        <ComponentPreview
          code={`<Cluster gap="sm" align="center">
  <Checkbox id="sms" disabled className="peer" />
  <Label htmlFor="sms">Text me instead</Label>
</Cluster>`}
        >
          <Cluster gap="sm" align="center">
            <Checkbox id="sms" disabled className="peer" />
            <Label htmlFor="sms">Text me instead</Label>
          </Cluster>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            This renders a real <Code>&lt;label&gt;</Code>, so the browser
            supplies the accessible name and the click-to-focus behaviour. A{" "}
            <Code>div</Code> styled to look like a label gives neither.
          </P>
          <P>
            The association must exist: either <Code>htmlFor</Code> matching the
            control&apos;s <Code>id</Code>, or the control nested inside the
            label. Placeholder text is not a label — it disappears on first
            keystroke and is not announced as the field&apos;s name.
          </P>
          <P>
            One label per control. Two elements both claiming to name the same
            input produce an unpredictable accessible name.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          <Code>Label</Code> adds no props of its own — everything, including{" "}
          <Code>className</Code> and <Code>ref</Code>, goes to the underlying{" "}
          <Code>&lt;label&gt;</Code>. See{" "}
          <Code>React.ComponentPropsWithRef&lt;&quot;label&quot;&gt;</Code> for
          that surface; the one prop worth naming is the association.
        </P>
        <PropsTable props={labelProps} />
      </Stack>
    </DocPage>
  )
}
