import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"
import { TreeDemo } from "./tree-demo"

const props: PropDef[] = [
  { name: "data", type: "TreeNode[]", default: undefined, description: "Hierarchical nodes: { id, label, icon?, children?, disabled? }." },
  { name: "defaultExpandedIds", type: "string[]", default: "[]", description: "Ids expanded initially (uncontrolled)." },
  { name: "expandedIds", type: "string[]", default: undefined, description: "Controlled set of expanded ids." },
  { name: "onExpandedChange", type: "(ids: string[]) => void", default: undefined, description: "Called when the expanded set changes." },
  { name: "defaultSelectedId", type: "string | null", default: "null", description: "Selected id initially (uncontrolled)." },
  { name: "selectedId", type: "string | null", default: undefined, description: "Controlled selected id." },
  { name: "onSelect", type: "(id: string) => void", default: undefined, description: "Called when the selection changes." },
]

export default function TreePage() {
  return (
    <DocPage
      title="Tree"
      description="A hierarchical tree view for file explorers, nested navigation, and category pickers. Expand/collapse, single selection, icons, and full keyboard support following the ARIA tree pattern. Expanded and selected state can be controlled or uncontrolled."
    >
      <Stack gap="md">
        <H3>Example</H3>
        <P className="text-sm text-muted-foreground">
          Click to select and expand; focus the tree and use the arrow keys to navigate.
        </P>
        <ComponentPreview
          code={`import { Tree, type TreeNode } from "@mikenotthepope/substrateui"
import { Folder, FileCode } from "lucide-react"

const files: TreeNode[] = [
  {
    id: "src", label: "src", icon: Folder,
    children: [
      { id: "components", label: "components", icon: Folder, children: [
        { id: "button", label: "button.tsx", icon: FileCode },
      ]},
      { id: "index", label: "index.ts", icon: FileCode },
    ],
  },
]

<Tree
  aria-label="Project files"
  data={files}
  defaultExpandedIds={["src", "components"]}
  selectedId={selected}
  onSelect={setSelected}
/>`}
        >
          <TreeDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Keyboard</H3>
        <Stack gap="sm">
          <P><Code>↑</Code> / <Code>↓</Code> — move between visible nodes.</P>
          <P><Code>→</Code> — expand a collapsed node, or move to its first child.</P>
          <P><Code>←</Code> — collapse an expanded node, or move to its parent.</P>
          <P><Code>Enter</Code> / <Code>Space</Code> — select (and toggle a parent).</P>
          <P><Code>Home</Code> / <Code>End</Code> — jump to the first / last visible node.</P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          The tree implements the WAI-ARIA tree pattern: <Code>role=&quot;tree&quot;</Code>{" "}
          with <Code>treeitem</Code> children carrying <Code>aria-expanded</Code>,{" "}
          <Code>aria-selected</Code>, and <Code>aria-level</Code>. A roving{" "}
          <Code>tabindex</Code> keeps a single stop in the tab order, and full
          arrow-key navigation is provided.
        </P>
      </Stack>
    </DocPage>
  )
}
