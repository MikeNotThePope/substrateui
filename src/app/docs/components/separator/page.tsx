import { Separator } from "@/components/ui/separator"
import { Divider } from "@/components/ui/divider"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const separatorProps: PropDef[] = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    default: '"horizontal"',
    description:
      "Which way the rule runs. Vertical needs a height from its container — it is h-full, so a parent with no height renders nothing.",
  },
]

export default function SeparatorPage() {
  return (
    <DocPage
      title="Separator"
      description="A one-pixel rule between groups of content. Built on Base UI's Separator, so it is announced or ignored correctly rather than being a styled div."
    >
      <ComponentPreview
        code={`<div>
  <h4 className="text-sm font-semibold">Notification settings</h4>
  <p className="text-sm text-muted-foreground">Choose what reaches your inbox.</p>
</div>
<Separator className="my-4" />
<Cluster gap="md" className="text-sm">
  <span>Product updates</span>
  <Separator orientation="vertical" className="h-4" />
  <span>Security alerts</span>
  <Separator orientation="vertical" className="h-4" />
  <span>Billing</span>
</Cluster>`}
      >
        <div className="w-full max-w-md">
          <div>
            <h4 className="text-sm font-semibold">Notification settings</h4>
            <p className="text-sm text-muted-foreground">
              Choose what reaches your inbox.
            </p>
          </div>
          <Separator className="my-4" />
          <Cluster gap="md" className="text-sm">
            <span>Product updates</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Security alerts</span>
            <Separator orientation="vertical" className="h-4" />
            <span>Billing</span>
          </Cluster>
        </div>
      </ComponentPreview>

      <ImportLine names={["Separator"]} />

      <Stack gap="md">
        <H3>Separator or Divider</H3>
        <Stack gap="sm">
          <P>
            Both draw a rule. <Code>Separator</Code> is the primitive: one pixel,
            no spacing of its own, no text. <Code>Divider</Code> is the same rule
            plus a margin and an optional centred label, for the &quot;or continue
            with&quot; seam in a sign-in form.
          </P>
          <P>
            If you are passing children or reaching for a label, you want{" "}
            <Code>Divider</Code>. If you want a hairline exactly where you put it
            and nothing else, this is the one.
          </P>
        </Stack>
        <ComponentPreview
          code={`<Separator />
<Divider label="or" />`}
        >
          <div className="w-full max-w-md space-y-6">
            <Separator />
            <Divider label="or" />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Vertical rules need a height</H3>
        <P>
          A vertical separator is <Code>h-full w-px</Code>, so it takes its length
          from its parent. In a flex row of text that works out on its own; in a
          container with no resolved height it collapses to nothing. Give it an
          explicit height, or a parent that has one.
        </P>
        <ComponentPreview
          code={`{/* Inside a row with its own height */}
<div className="flex h-10 items-center gap-4">
  <span>Drafts</span>
  <Separator orientation="vertical" />
  <span>Sent</span>
</div>

{/* Or set the height on the separator */}
<Cluster gap="md">
  <span>Drafts</span>
  <Separator orientation="vertical" className="h-5" />
  <span>Sent</span>
</Cluster>`}
        >
          <Stack gap="md" className="w-full max-w-md text-sm">
            <div className="flex h-10 items-center gap-4">
              <span>Drafts</span>
              <Separator orientation="vertical" />
              <span>Sent</span>
            </div>
            <Cluster gap="md">
              <span>Drafts</span>
              <Separator orientation="vertical" className="h-5" />
              <span>Sent</span>
            </Cluster>
          </Stack>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Base UI renders the element with <Code>role=&quot;separator&quot;</Code>{" "}
            and an <Code>aria-orientation</Code> matching the prop, so a
            screen-reader user is told the groups are divided rather than being
            left to infer it from the visual gap.
          </P>
          <P>
            Where the rule is pure decoration beside a heading that already
            establishes the break, pass <Code>role=&quot;none&quot;</Code> so it
            isn&apos;t announced twice.
          </P>
          <P>
            The rule uses <Code>bg-border</Code>, which is a non-text colour and
            so is not held to the 4.5:1 text ratio. Do not use it as the only cue
            for a meaningful boundary — pair it with spacing or a heading.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          Every other prop, including <Code>className</Code> and{" "}
          <Code>ref</Code>, goes to Base UI&apos;s <Code>Separator</Code>. See the{" "}
          <a
            href="https://base-ui.com/react/components/separator"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Base UI separator docs
          </a>{" "}
          for that surface.
        </P>
        <PropsTable props={separatorProps} />
      </Stack>
    </DocPage>
  )
}
