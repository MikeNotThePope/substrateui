import { Button } from "@/components/ui/button"
import { HoneypotField } from "@/components/ui/honeypot-field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "HoneypotField",
  description:
    "A bait input no person can see or reach. A form that takes public submissions drops anything that arrives with it filled in.",
  route: "/docs/components/honeypot-field",
})

const props: PropDef[] = [
  {
    name: "name",
    type: "string",
    default: '"company_website"',
    description: "The field name the server reads. Anything non-empty is a bot.",
  },
  {
    name: "...input props",
    type: "React.ComponentProps<'input'>",
    default: undefined,
    description: "Forwarded to the input. `type` is fixed at text.",
  },
]

export default function HoneypotFieldPage() {
  return (
    <DocPage
      title="HoneypotField"
      description="A bait input no person can see or reach, for a form that takes public submissions. A script fills every field it finds; a person fills the ones they are shown. So a request that arrives with this one non-empty came from a script, and the server drops it without a captcha, a cookie or a third party."
    >
      <P className="text-sm text-muted-foreground">
        There is nothing to look at, which is the point. Tab through the form below: focus
        goes from the email box straight to the button.
      </P>
      <ComponentPreview
        code={`import { HoneypotField } from "@mikenotthepope/substrateui"

<form action={submit}>
  <HoneypotField />
  <Input name="email" type="email" />
  <Button type="submit">Request access</Button>
</form>`}
      >
        <form className="relative w-full max-w-sm">
          <Stack gap="md">
            <Stack gap="sm">
              <Label htmlFor="honeypot-demo-email">Email</Label>
              <Input id="honeypot-demo-email" name="email" type="email" />
            </Stack>
            <HoneypotField />
            <Button type="button">Request access</Button>
          </Stack>
        </form>
      </ComponentPreview>

      <ImportLine names={["HoneypotField"]} />

      <Stack gap="md">
        <H3>Reading it on the server</H3>
        <P>
          The component is half the pattern. The other half is one line wherever the form is
          handled: if the field arrived with anything in it, stop. Return the same success the
          form always returns rather than an error, so a script learns nothing about why it
          failed.
        </P>
        <P>
          Give it a name a script will want to fill. <Code>company_website</Code> is the
          default for that reason; <Code>honeypot</Code> is not, because it says what it is.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Why it is off-screen and not hidden</H3>
        <P>
          It is positioned off the start edge rather than given{" "}
          <Code>display: none</Code>. Some scripts skip a field they can tell is hidden, which
          would defeat the point. Its parent needs a positioning context, so put{" "}
          <Code>relative</Code> on the form.
        </P>
        <P>
          It is also not <Code>sr-only</Code>. That clips the field to a 1px box but leaves it
          in the layout at its own position, and a zero-size field reads to a script the same
          way a hidden one does.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          The field carries <Code>aria-hidden</Code> so a screen reader never announces it, and{" "}
          <Code>tabIndex={"{-1}"}</Code> so Tab skips it. Both are required together:
          jsx-a11y&apos;s <Code>no-aria-hidden-on-focusable</Code> and axe&apos;s{" "}
          <Code>aria-hidden-focus</Code> each read an input as focusable unless its tabindex is
          negative, so a field with only the first of the two fails the gates it was meant to
          be invisible to.
        </P>
        <P>
          It has no label, on purpose. A label would give it a name for a screen reader, and it
          is meant to have none.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>
    </DocPage>
  )
}
