import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"
import { CascaderDemo, ControlledCascaderDemo } from "./cascader-demo"

const props: PropDef[] = [
  { name: "options", type: "CascaderOption[]", default: undefined, description: "The option tree to choose a path through." },
  { name: "value", type: "string[]", default: undefined, description: "Selected path, root first — controlled." },
  { name: "defaultValue", type: "string[]", default: "[]", description: "Selected path on mount — uncontrolled." },
  { name: "onChange", type: "(value: string[], options: CascaderOption[]) => void", default: undefined, description: "Fired with the new path and the options along it." },
  { name: "placeholder", type: "string", default: '"Select..."', description: "Trigger text when nothing is selected." },
  { name: "separator", type: "string", default: '" / "', description: "Joins labels in the trigger and in search results." },
  { name: "changeOnSelect", type: "boolean", default: "false", description: "Let branches be selected too, not just leaves." },
  { name: "showSearch", type: "boolean", default: "false", description: "Add a filter box that searches whole paths." },
  { name: "clearable", type: "boolean", default: "false", description: "Show a button that resets the selection." },
  { name: "displayRender", type: "(labels, options) => ReactNode", default: undefined, description: "Replace the trigger's label rendering." },
  { name: "open", type: "boolean", default: undefined, description: "Controlled popup open state." },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Popup open state on mount." },
  { name: "onOpenChange", type: "(open: boolean) => void", default: undefined, description: "Fired when the popup opens or closes." },
  { name: "labels", type: "CascaderLabels", default: undefined, description: "Text overrides: searchPlaceholder, empty, clear, level." },
  { name: "contentClassName", type: "string", default: undefined, description: "Extra classes for the popup." },
]

const optionProps: PropDef[] = [
  { name: "value", type: "string", default: undefined, description: "Unique among its siblings; the path is the list of values from root to node." },
  { name: "label", type: "React.ReactNode", default: undefined, description: "Rendered option content." },
  { name: "children", type: "CascaderOption[]", default: undefined, description: "Child options — presence makes this a branch rather than a leaf." },
  { name: "disabled", type: "boolean", default: undefined, description: "Dim the option and block selecting it or drilling into it." },
]

export default function CascaderPage() {
  return (
    <DocPage
      title="Cascader"
      description="A nested-path select: drill through columns of options and commit the path you land on. The standard control for category → subcategory → item pickers."
    >
      <P>
        Clicking a branch opens the next column; clicking a leaf commits the
        whole path and closes the popup. Reopening resumes on the committed
        path.
      </P>
      <ComponentPreview
        code={`const places = [
  {
    value: "asia",
    label: "Asia",
    children: [
      { value: "jp", label: "Japan", children: [{ value: "tokyo", label: "Tokyo" }] },
    ],
  },
]

<Cascader options={places} placeholder="Pick a city" />`}
      >
        <CascaderDemo />
      </ComponentPreview>

      <ImportLine names={["Cascader"]} />

      <Stack gap="md">
        <H3>Search and clear</H3>
        <P>
          <Code>showSearch</Code> filters against the whole joined path, so
          typing <Code>europe por</Code> finds Porto. <Code>clearable</Code> adds
          a reset button once something is selected.
        </P>
        <ComponentPreview
          code={`<Cascader options={places} placeholder="Pick a city" showSearch clearable />`}
        >
          <CascaderDemo showSearch clearable />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Selecting any level</H3>
        <P>
          By default only leaves are selectable. <Code>changeOnSelect</Code>{" "}
          commits every branch you pass through too — useful when
          &ldquo;Asia&rdquo; is a valid answer on its own.
        </P>
        <ComponentPreview
          code={`<Cascader options={places} placeholder="Pick any level" changeOnSelect />`}
        >
          <CascaderDemo changeOnSelect placeholder="Pick any level" />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Controlled</H3>
        <P>
          Pass <Code>value</Code> with <Code>onChange</Code> to own the state.
          The second argument gives you the options along the path, so you have
          the labels without re-walking the tree.
        </P>
        <ComponentPreview
          code={`const [value, setValue] = useState<string[]>(["asia", "jp", "tokyo"])

<Cascader options={places} value={value} onChange={setValue} clearable />`}
        >
          <ControlledCascaderDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          Each column is a listbox named after the option that opened it, and
          every option reports its selected state. Branches carry{" "}
          <Code>aria-expanded</Code> and <Code>aria-haspopup</Code> so screen
          readers announce that more choices follow. Keyboard users move within a
          column with <Code>↑</Code>/<Code>↓</Code> (plus <Code>Home</Code> and{" "}
          <Code>End</Code>), open a branch with the forward arrow, and step back
          to the parent with the reverse arrow — the arrows swap in RTL, and the
          chevrons mirror with them. <Code>Escape</Code> closes the popup and
          returns focus to the trigger. Disabled options can neither be selected
          nor expanded.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
        <P className="text-sm text-muted-foreground">CascaderOption</P>
        <PropsTable props={optionProps} />
      </Stack>
    </DocPage>
  )
}
