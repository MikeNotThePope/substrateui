"use client"

import { useState } from "react"
import { Combobox } from "@/components/ui/combobox"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const comboboxProps: PropDef[] = [
  { name: "options", type: "{ value: string; label: string }[]", default: "[]", description: "The list of selectable options." },
  { name: "value", type: "string | string[]", default: undefined, description: "The controlled selection — an array in multiple mode." },
  { name: "onValueChange", type: "(value: string | string[]) => void", default: undefined, description: "Fired when the selection changes." },
  { name: "multiple", type: "boolean", default: "false", description: "Select more than one option, rendered as removable chips." },
  { name: "loading", type: "boolean", default: "false", description: "Show a loading row in place of results — for options fetched on demand." },
  { name: "onInputChange", type: "(query: string) => void", default: undefined, description: "Fired as the search query changes. Pair with manualFilter to search server-side." },
  { name: "manualFilter", type: "boolean", default: "false", description: "Skip the built-in filtering and render options exactly as given." },
  { name: "freeSolo", type: "boolean", default: "false", description: "Accept values that are not in options by offering to add what was typed." },
  { name: "groupBy", type: "(option) => string", default: undefined, description: "Group options under headings; returns the heading for an option." },
  { name: "limitTags", type: "number", default: undefined, description: "Collapse chips past this many into a single count badge. Multi-select only." },
  { name: "clearable", type: "boolean", default: "false", description: "Show a button that clears the selection." },
  { name: "disabled", type: "boolean", default: "false", description: "Disable the control." },
  { name: "labels", type: "ComboboxLabels", default: undefined, description: "Text overrides: placeholder, searchPlaceholder, noResults, loading, clear, create, more, remove." },
]

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
]

const runtimes = [
  { value: "node", label: "Node.js" },
  { value: "bun", label: "Bun" },
  { value: "deno", label: "Deno" },
  { value: "workers", label: "Cloudflare Workers" },
  { value: "lambda", label: "AWS Lambda" },
]

const host: Record<string, string> = {
  node: "Self-hosted",
  bun: "Self-hosted",
  deno: "Self-hosted",
  workers: "Edge",
  lambda: "Edge",
}

function AsyncDemo() {
  const [value, setValue] = useState("")
  const [results, setResults] = useState(runtimes)
  const [loading, setLoading] = useState(false)

  const search = (query: string) => {
    setLoading(true)
    window.setTimeout(() => {
      const q = query.trim().toLowerCase()
      setResults(
        q ? runtimes.filter((o) => o.label.toLowerCase().includes(q)) : runtimes
      )
      setLoading(false)
    }, 500)
  }

  return (
    <Combobox
      options={results}
      value={value}
      onValueChange={setValue}
      onInputChange={search}
      loading={loading}
      manualFilter
      labels={{ placeholder: "Search runtimes..." }}
    />
  )
}

function FreeSoloDemo() {
  const [value, setValue] = useState<string[]>(["react"])
  return (
    <Combobox
      multiple
      freeSolo
      clearable
      options={frameworks}
      value={value}
      onValueChange={setValue}
      labels={{ placeholder: "Add tags..." }}
    />
  )
}

function GroupedDemo() {
  const [value, setValue] = useState("")
  return (
    <Combobox
      options={runtimes}
      value={value}
      onValueChange={setValue}
      groupBy={(o) => host[o.value] ?? "Other"}
      labels={{ placeholder: "Pick a runtime..." }}
    />
  )
}

function LimitTagsDemo() {
  const [value, setValue] = useState<string[]>(["node", "bun", "deno", "workers"])
  return (
    <Combobox
      multiple
      clearable
      limitTags={2}
      options={runtimes}
      value={value}
      onValueChange={setValue}
    />
  )
}

export default function ComboboxPage() {
  const [value, setValue] = useState("")

  return (
    <DocPage
      title="Combobox"
      description="A text input bound to a listbox: type to filter, select to commit. Use it when the option list is long enough that a plain select becomes a scroll."
    >
      <ComponentPreview
        code={`const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
]

<Combobox
  options={frameworks}
  value={value}
  onValueChange={setValue}
  labels={{
    placeholder: "Select a framework...",
    noResults: "No framework found.",
  }}
/>`}
      >
        <Combobox
          options={frameworks}
          value={value}
          onValueChange={setValue}
          labels={{
            placeholder: "Select a framework...",
            noResults: "No framework found.",
          }}
        />
      </ComponentPreview>

      <ImportLine names={["Combobox"]} />

      {/* Async */}
      <Stack gap="md">
        <H3>Fetching options</H3>
        <P>
          <Code>onInputChange</Code> reports the query so you can fetch for it,
          and <Code>loading</Code> shows a spinner while you do. Add{" "}
          <Code>manualFilter</Code> so the component stops filtering the results
          you already filtered — without it, a server-side match would be
          filtered out again on the client.
        </P>
        <ComponentPreview
          code={`<Combobox
  options={results}
  value={value}
  onValueChange={setValue}
  onInputChange={search}
  loading={loading}
  manualFilter
/>`}
        >
          <AsyncDemo />
        </ComponentPreview>
      </Stack>

      {/* Free solo */}
      <Stack gap="md">
        <H3>Accepting new values</H3>
        <P>
          <Code>freeSolo</Code> offers an &ldquo;Add&rdquo; row whenever the
          query matches no existing option, which is what you want for tags and
          other open-ended fields. The added value is emitted as-is, and it
          still renders in the trigger even though it is not in{" "}
          <Code>options</Code>.
        </P>
        <ComponentPreview
          code={`<Combobox
  multiple
  freeSolo
  clearable
  options={frameworks}
  value={value}
  onValueChange={setValue}
/>`}
        >
          <FreeSoloDemo />
        </ComponentPreview>
      </Stack>

      {/* Grouping */}
      <Stack gap="md">
        <H3>Grouping</H3>
        <P>
          <Code>groupBy</Code> returns a heading for each option. Groups appear
          in first-seen order and filtering applies within them, so an empty
          group disappears along with its heading.
        </P>
        <ComponentPreview
          code={`<Combobox
  options={runtimes}
  value={value}
  onValueChange={setValue}
  groupBy={(o) => host[o.value] ?? "Other"}
/>`}
        >
          <GroupedDemo />
        </ComponentPreview>
      </Stack>

      {/* Chips */}
      <Stack gap="md">
        <H3>Chip overflow</H3>
        <P>
          Multi-select renders each choice as a removable chip.{" "}
          <Code>limitTags</Code> keeps a long selection from growing the trigger
          by collapsing the rest into a count badge, and <Code>clearable</Code>{" "}
          adds a reset button.
        </P>
        <ComponentPreview
          code={`<Combobox multiple clearable limitTags={2} options={runtimes} value={value} onValueChange={setValue} />`}
        >
          <LimitTagsDemo />
        </ComponentPreview>
      </Stack>

      {/* Direction */}
      <Stack gap="md">
        <H3>Direction</H3>
        <P>
          The chevron indicator and selected-check icon placement flip
          automatically in RTL — the chevron sits on the start edge (right
          in RTL) alongside the label. The popover anchors to the trigger
          and mirrors open-direction, so filtered results still read in
          the expected order.
        </P>
      </Stack>

      {/* Labels */}
      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          Every string the component renders itself comes from{" "}
          <Code>ComboboxLabels</Code>, so nothing user-visible is hard-coded
          English. Override one key or all eight; anything you leave out keeps its
          default. <Code>remove</Code> and <Code>more</Code> take the item label
          and the overflow count, so they are functions rather than strings.
        </P>
        <ComponentPreview
          defaultOpen
          code={`<Combobox
  options={frameworks}
  labels={{
    placeholder: "Framework auswählen...",
    searchPlaceholder: "Suchen...",
    noResults: "Kein Framework gefunden.",
    loading: "Wird geladen...",
    clear: "Auswahl löschen",
    create: (query) => \`"\${query}" hinzufügen\`,
    more: (count) => \`+\${count} weitere\`,
    remove: (label) => \`\${label} entfernen\`,
  }}
/>`}
        >
          <P className="text-sm text-muted-foreground">
            Set them per instance, or once for the whole app through{" "}
            <Code>LabelsProvider</Code>.
          </P>
        </ComponentPreview>
      </Stack>

      {/* Accessibility */}
      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Combobox follows the ARIA combobox pattern via Base UI&apos;s
            Combobox. It supports full keyboard navigation: arrow keys
            to move through options, Enter to select, Escape to close the
            listbox.
          </P>
          <P>
            Always provide a label via Field + FieldLabel or an explicit{" "}
            <Code>aria-label</Code>. Without one, screen readers will
            announce the combobox without context.
          </P>
          <P>
            For multi-select, selected items are rendered as removable
            Badges. Each remove button is named after the item it removes
            (&ldquo;Remove React&rdquo;), and the clear button carries its own
            label — override both through <Code>labels.remove</Code> and{" "}
            <Code>labels.clear</Code>.
          </P>
        </Stack>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          The props below are ours. Combobox wraps Base UI&apos;s Combobox, so
          anything not listed here — the open-state props, positioning, and the
          rest of the primitive&apos;s surface — is documented in the{" "}
          <a
            href="https://base-ui.com/react/components/combobox"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-from-font hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Base UI Combobox reference
          </a>
          .
        </P>
        <PropsTable props={comboboxProps} />
      </Stack>
    </DocPage>
  )
}
