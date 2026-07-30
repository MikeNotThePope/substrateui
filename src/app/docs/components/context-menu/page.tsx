"use client"

import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const contextMenuProps: PropDef[] = [
  {
    name: "children",
    type: "React.ReactNode",
    default: undefined,
    description: "The trigger area and menu content. Compose with ContextMenuTrigger and ContextMenuContent.",
    required: true,
  },
]

export default function ContextMenuPage() {
  return (
    <DocPage
      title="Context Menu"
      description="A menu that appears on right-click. Provides contextual actions relevant to the element under the cursor."
    >
      {/* Basic Context Menu */}
      <Stack gap="md">
        <H3>Right-Click Menu</H3>
        <ComponentPreview
          code={`<ContextMenu>
  <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed text-sm text-muted-foreground">
    Right-click here
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Cut</ContextMenuItem>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Paste</ContextMenuItem>
    <ContextMenuItem>Delete</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <ContextMenu>
            <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-md border-2 border-dashed text-sm text-muted-foreground">
              Right-click here
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Cut</ContextMenuItem>
              <ContextMenuItem>Copy</ContextMenuItem>
              <ContextMenuItem>Paste</ContextMenuItem>
              <ContextMenuItem>Delete</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </ComponentPreview>
      </Stack>

      <ImportLine
        names={[
          "ContextMenu",
          "ContextMenuContent",
          "ContextMenuItem",
          "ContextMenuTrigger",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="ContextMenu"
          nodes={[
            { name: "ContextMenuTrigger" },
            {
              name: "ContextMenuContent",
              children: [
                { name: "ContextMenuItem" },
              ],
            },
          ]}
        />
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={contextMenuProps} />
      </Stack>
    </DocPage>
  )
}
