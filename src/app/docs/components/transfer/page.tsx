import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"
import { TransferDemo, ControlledTransferDemo } from "./transfer-demo"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Transfer",
  description: "A dual-list picker: move items between a source and a target list with checkboxes, per-panel search, and select-all.",
  route: "/docs/components/transfer",
})

const props: PropDef[] = [
  { name: "dataSource", type: "TransferItem[]", default: undefined, description: "Every item, across both lists. Each has key, label, and optional disabled." },
  { name: "targetKeys", type: "string[]", default: undefined, description: "Keys in the target (right) list — controlled." },
  { name: "defaultTargetKeys", type: "string[]", default: "[]", description: "Keys in the target list initially — uncontrolled." },
  { name: "onChange", type: "(targetKeys, direction, movedKeys) => void", default: undefined, description: "Fired after a move with the next target keys and what moved." },
  { name: "selectedKeys", type: "string[]", default: undefined, description: "Checked keys across both panels — controlled." },
  { name: "onSelectChange", type: "(selectedKeys: string[]) => void", default: undefined, description: "Fired when the checked set changes." },
  { name: "titles", type: "[ReactNode, ReactNode]", default: '["Source", "Target"]', description: "Panel headings." },
  { name: "showSearch", type: "boolean", default: "false", description: "Show a search input in each panel." },
  { name: "listHeight", type: "number", default: "240", description: "Height of each scrollable list, in px." },
  { name: "disabled", type: "boolean", default: "false", description: "Disable the whole control." },
  { name: "labels", type: "TransferLabels", default: undefined, description: "Text overrides: searchPlaceholder, empty, moveToTarget, moveToSource, itemCount." },
]

const itemProps: PropDef[] = [
  { name: "key", type: "string", default: undefined, description: "Unique key across the whole data source." },
  { name: "label", type: "React.ReactNode", default: undefined, description: "Rendered row content." },
  { name: "disabled", type: "boolean", default: undefined, description: "Dim the row and block selection — it can never be moved." },
]

export default function TransferPage() {
  return (
    <DocPage
      title="Transfer"
      description="A dual-list picker: move items between a source and a target list with checkboxes, per-panel search, and select-all. The classic pattern for assigning permissions, columns, tags, or members."
    >
      <P>
        Check rows in either panel, then use the arrows to move them. The
        select-all checkbox in a panel header toggles everything currently
        visible in that panel.
      </P>
      <ComponentPreview
        code={`const permissions = [
  { key: "read", label: "Read records" },
  { key: "write", label: "Write records" },
  { key: "owner", label: "Transfer ownership", disabled: true },
]

<Transfer
  dataSource={permissions}
  defaultTargetKeys={["read"]}
  titles={["Available", "Granted"]}
/>`}
      >
        <TransferDemo />
      </ComponentPreview>

      <ImportLine names={["Transfer"]} />

      <Stack gap="md">
        <H3>With search</H3>
        <P>
          <Code>showSearch</Code> adds a filter to each panel. Select-all then
          applies to the filtered rows only, so you can bulk-move a subset.
        </P>
        <ComponentPreview
          code={`<Transfer dataSource={permissions} titles={["Available", "Granted"]} showSearch />`}
        >
          <TransferDemo showSearch />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Controlled</H3>
        <P>
          Pass <Code>targetKeys</Code> with <Code>onChange</Code> to own the
          state — the standard shape for saving to a form or server.
        </P>
        <ComponentPreview
          code={`const [targetKeys, setTargetKeys] = useState<string[]>(["audit"])

<Transfer
  dataSource={permissions}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  showSearch
/>`}
        >
          <ControlledTransferDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          Both move buttons are icon-only, and the per-panel count is assembled from numbers. Override with the <Code>labels</Code> prop. This is one of the few label sets
            with no <Code>LabelsProvider</Code> key, so it is per instance only;
            wrap it in a component of your own if you use it in more than one place.
        </P>
        <PropsTable
          props={[
          { name: "searchPlaceholder", type: "string", default: "\"Search...\"", description: "Placeholder for each panel's search input." },
          { name: "empty", type: "string", default: "\"No items\"", description: "Shown when a panel has nothing in it." },
          { name: "moveToTarget", type: "string", default: "\"Move to target\"", description: "Accessible name for the button that moves the selection across." },
          { name: "moveToSource", type: "string", default: "\"Move to source\"", description: "Accessible name for the button that moves it back." },
          { name: "itemCount", type: "(selected, total) => string", default: "\"n/m\"", description: "The per-panel count. A function so the separator and order are the caller's." },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          Each row is a <Code>&lt;label&gt;</Code> wrapping its checkbox, so the
          whole row is a click target and screen readers announce the item text
          with its checked state. Panel headers use a select-all checkbox labelled
          by the panel title, and report a mixed state when only some rows are
          checked. The move buttons carry explicit accessible names and disable
          themselves when nothing movable is selected. Items marked{" "}
          <Code>disabled</Code> are skipped by select-all and can never be moved.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
        <P className="text-sm text-muted-foreground">TransferItem</P>
        <PropsTable props={itemProps} />
      </Stack>
    </DocPage>
  )
}
