import { FileText, ImagePlus } from "lucide-react"

import { FileDropField } from "@/components/ui/file-drop-field"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "FileDropField",
  description:
    "A real file input dressed as a drop target: an sr-only input inside a dashed box that takes the focus ring, the click and the drop.",
  route: "/docs/components/file-drop-field",
})

const props: PropDef[] = [
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    description: "Box padding, type scale and icon size, moved together.",
  },
  {
    name: "icon",
    type: "React.ReactNode",
    default: "<Upload />",
    description: "The mark above the prompt. `null` for no icon at all.",
  },
  {
    name: "prompt",
    type: "React.ReactNode",
    default: '"Choose a file or drag it here"',
    description: "Replaces the default prompt line.",
  },
  {
    name: "hint",
    type: "React.ReactNode",
    default: undefined,
    description: "A muted line under the prompt — accepted types, a size limit.",
  },
  {
    name: "invalid",
    type: "boolean",
    default: "a surrounding Field's error",
    description: "Draw the box as rejected and set `aria-invalid`.",
  },
  {
    name: "onFilesChange",
    type: "(files: File[]) => void",
    default: undefined,
    description:
      "The files after a pick or a drop, already filtered by `accept` and `multiple`. The only event a drop raises.",
  },
  {
    name: "labels",
    type: "FileDropFieldLabels",
    default: undefined,
    description: "Translations for the prompt and the multi-file summary.",
  },
  {
    name: "...input props",
    type: "React.ComponentProps<'input'>",
    default: undefined,
    description:
      "Forwarded to the input — `name`, `accept`, `multiple`, `required`, `disabled`, `aria-label`. `type` is fixed at file.",
  },
]

export default function FileDropFieldPage() {
  return (
    <DocPage
      title="FileDropField"
      description="A real file input dressed as a drop target: an sr-only input inside a dashed box that takes the focus ring, the click and the drop. Two applications had hand-rolled this and had already drifted on the box size and the icon, which is why both are props."
    >
      <ComponentPreview
        code={`import { FileDropField } from "@mikenotthepope/substrateui"

<FileDropField
  name="resume"
  aria-label="Resume"
  accept=".pdf,.doc,.docx"
  hint="PDF or Word, up to 5MB"
  onFilesChange={([file]) => setResume(file)}
/>`}
      >
        <div className="w-full max-w-sm">
          <FileDropField
            name="resume"
            aria-label="Resume"
            accept=".pdf,.doc,.docx"
            hint="PDF or Word, up to 5MB"
          />
        </div>
      </ComponentPreview>

      <ImportLine names={["FileDropField"]} />

      <Stack gap="md">
        <H3>It is an input, not a div with a handler</H3>
        <P>
          The dashed box is a <Code>&lt;label&gt;</Code> and the thing inside it is a real{" "}
          <Code>&lt;input type=&quot;file&quot;&gt;</Code>, hidden with <Code>sr-only</Code>{" "}
          rather than removed. That is what keeps Tab, Space, the platform file picker and
          form submission working without a line of code, and why the focus ring is a{" "}
          <Code>focus-within:ring-2</Code> on the box — a ring drawn around a 1px input is a
          ring nobody sees.
        </P>
        <P>
          The box&apos;s own text is the input&apos;s accessible name. Once that is more than
          the prompt — a hint, a picked file name — give the field an <Code>aria-label</Code>{" "}
          of its own, as every example here does.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Size and icon</H3>
        <P>
          Both are props because both are what the two hand-rolled copies had already drifted
          on. <Code>size</Code> moves the padding, the type scale and the icon together;
          sizing them separately is how they came apart in the first place.
        </P>
      </Stack>

      <ComponentPreview
        code={`<FileDropField aria-label="Small" size="sm" prompt="Small" />
<FileDropField aria-label="Default" prompt="Default" />
<FileDropField aria-label="Large" size="lg" prompt="Large" />

<FileDropField aria-label="CV" icon={<FileText />} prompt="Upload your CV" />
<FileDropField aria-label="Photo" icon={<ImagePlus />} prompt="Upload a photo" />
<FileDropField aria-label="Anything" icon={null} prompt="No icon" />`}
      >
        <Stack gap="md" className="w-full max-w-sm">
          <FileDropField aria-label="Small" size="sm" prompt="Small" />
          <FileDropField aria-label="Default" prompt="Default" />
          <FileDropField aria-label="Large" size="lg" prompt="Large" />
          <FileDropField aria-label="CV" icon={<FileText />} prompt="Upload your CV" />
          <FileDropField
            aria-label="Photo"
            icon={<ImagePlus />}
            prompt="Upload a photo"
          />
          <FileDropField aria-label="Anything" icon={null} prompt="No icon" />
        </Stack>
      </ComponentPreview>

      <Stack gap="md">
        <H3>Reading the files</H3>
        <P>
          <Code>onFilesChange</Code> covers both ways a file arrives, and hands you what
          survived <Code>accept</Code> and <Code>multiple</Code>. A drop does{" "}
          <em>not</em> fire the input&apos;s own <Code>change</Code> event: the dropped files
          are assigned to the input where the browser allows it, so a plain form submission
          carries them, but nothing synthesises a <Code>change</Code>. If a form library is
          bound to <Code>onChange</Code>, wire <Code>onFilesChange</Code> as well or the drop
          goes unseen.
        </P>
        <P>
          The browser applies <Code>accept</Code> to the file picker and to nothing else, so a
          drop normally arrives unfiltered. This component applies the same list to a drop by
          hand — extensions, media types and wildcard subtypes like{" "}
          <Code>image/*</Code> — because a box that says &quot;PDF only&quot; and then
          swallows anything is worse than one that never offered to take a drop.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Rejected</H3>
        <P>
          <Code>invalid</Code> swaps the border to <Code>border-status-error</Code> and sets{" "}
          <Code>aria-invalid</Code>. Inside a <Code>Field</Code> there is nothing to pass: the
          field&apos;s own error state reaches the box.
        </P>
      </Stack>

      <ComponentPreview
        code={`<FileDropField aria-label="Resume" accept=".pdf" hint="PDF only" invalid />

// or, inside a Field:
<Field error={!resume}>
  <FieldLabel>Resume</FieldLabel>
  <FileDropField aria-label="Resume" accept=".pdf" />
  <FieldError>A resume is required.</FieldError>
</Field>`}
      >
        <div className="w-full max-w-sm">
          <FileDropField aria-label="Resume" accept=".pdf" hint="PDF only" invalid />
        </div>
      </ComponentPreview>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          The input keeps its own semantics, so a screen reader announces a file input and the
          keyboard operates it. It is <Code>sr-only</Code>, not{" "}
          <Code>aria-hidden</Code> and not <Code>tabIndex={"{-1}"}</Code> — the opposite of{" "}
          <Code>HoneypotField</Code>, which hides a field from everyone on purpose.
        </P>
        <P>
          The rejected state is a border colour <em>and</em> <Code>aria-invalid</Code>, never
          colour alone.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>
    </DocPage>
  )
}
