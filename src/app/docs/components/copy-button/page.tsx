import { CopyButton } from "@/components/ui/copy-button"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "CopyButton",
  description: "A square outline icon button that copies a value, for beside the link or address it copies.",
  route: "/docs/components/copy-button",
})

const copyButtonProps: PropDef[] = [
  {
    name: "value",
    type: "string | null",
    default: undefined,
    description: "The text copied. null disables the button.",
  },
  {
    name: "label",
    type: "string",
    default: undefined,
    description: "Accessible name, naming what it copies (\"Copy apply link\"). Nothing is drawn from it.",
  },
  {
    name: "labels",
    type: "{ copied?: string }",
    default: undefined,
    description:
      "Translatable strings. Resolves through the LabelsProvider (copyButton) before falling back to English defaults.",
  },
  {
    name: "size",
    type: '"icon" | "icon-sm"',
    default: '"icon"',
    description: "The square's size. icon-sm sits beside a size=\"sm\" control.",
  },
  {
    name: "variant",
    type: "Button variant",
    default: '"outline"',
    description: "Any Button variant; outline is the one it is drawn for.",
  },
]

export default function CopyButtonPage() {
  return (
    <DocPage
      title="CopyButton"
      description="A square outline icon button that copies a value. It sits beside what it copies, a link or an address, which stays whatever it was. For two seconds after a copy its icon is a check and its name is Copied. Where the value should read as something to paste, CopyField draws it in a box instead."
    >
      <ComponentPreview
        code={`<a href={url}>example.com/companies/acme</a>
<CopyButton value={url} label="Copy company page link" />`}
      >
        <div className="flex items-center gap-2">
          <a
            href="https://example.com/companies/acme"
            className="text-sm underline underline-offset-2"
          >
            example.com/companies/acme
          </a>
          <CopyButton value="https://example.com/companies/acme" label="Copy company page link" />
        </div>
      </ComponentPreview>

      <ImportLine names={["CopyButton"]} />

      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          The button draws no text, so <Code>label</Code> is its whole name. After a copy the name is{" "}
          <Code>copied</Code> for two seconds, then <Code>label</Code> again. A refused clipboard
          changes nothing. Override one instance with the <Code>labels</Code> prop, or every instance
          through <Code>LabelsProvider</Code>&apos;s <Code>copyButton</Code> key.
        </P>
        <PropsTable
          props={[
            { name: "copied", type: "string", default: "\"Copied\"", description: "The button's name for two seconds after a copy." },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={copyButtonProps} />
      </Stack>
    </DocPage>
  )
}
