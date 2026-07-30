"use client"

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const groupProps: PropDef[] = [
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Which axis the panels sit along. Sets the group's flex-direction inline." },
  { name: "defaultLayout", type: "Layout", default: undefined, description: "A map of panel id to size. Store what onLayoutChanged hands you and pass it back to restore a layout." },
  { name: "onLayoutChanged", type: "(layout: Layout) => void", default: undefined, description: "Fired once the drag ends. The one to persist from." },
  { name: "onLayoutChange", type: "(layout: Layout) => void", default: undefined, description: "Fired on every pointer move during a drag. For live readouts, not for saving." },
  { name: "disabled", type: "boolean", default: "false", description: "Freeze the layout — every panel in the group stops resizing." },
  { name: "groupRef", type: "Ref<GroupImperativeHandle>", default: undefined, description: "Exposes getLayout() and setLayout(), for resetting or applying a layout from outside." },
  { name: "id", type: "string | number", default: "a generated id", description: "Names the group. Also appears as data-group, and is what a stored layout is keyed against." },
]

const panelProps: PropDef[] = [
  { name: "defaultSize", type: "number | string", default: "shared evenly", description: "Starting size. A number is a percentage of the group; a string can carry any CSS unit." },
  { name: "minSize", type: "number | string", default: "0%", description: "Smallest size — the drag stops here." },
  { name: "maxSize", type: "number | string", default: "100%", description: "Largest size." },
  { name: "collapsible", type: "boolean", default: "false", description: "Let the panel snap shut to collapsedSize once dragged below minSize." },
  { name: "collapsedSize", type: "number | string", default: "0%", description: "The size a collapsible panel snaps to." },
  { name: "groupResizeBehavior", type: '"preserve-relative-size" | "preserve-pixel-size"', default: '"preserve-relative-size"', description: "What happens to this panel when the window resizes. A group needs at least one panel on relative size." },
  { name: "id", type: "string | number", default: "a generated id", description: "Names the panel. Give it a stable one if you persist layouts, since the layout map is keyed by panel id." },
]

const handleProps: PropDef[] = [
  { name: "withHandle", type: "boolean", default: "false", description: "Draw a visible grip in the middle of the rule. Worth it — a bare 1px line is hard to find." },
  { name: "disabled", type: "boolean", default: "false", description: "Pin this one boundary, leaving the rest of the group draggable." },
  { name: "disableDoubleClick", type: "boolean", default: "false", description: "Turn off the double-click-to-reset shortcut." },
]

export default function ResizablePage() {
  return (
    <DocPage
      title="Resizable"
      description="Panels the user can drag the boundary between, on react-resizable-panels. Sizes default to percentages of the group, so a layout dragged at one window width still makes sense at another."
    >
      <ComponentPreview
        code={`<div className="h-48 rounded-lg border-2">
  <ResizablePanelGroup orientation="horizontal">
    <ResizablePanel defaultSize={30} minSize={20}>
      <div className="flex h-full items-center justify-center p-4 text-sm">Sidebar</div>
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={70}>
      <div className="flex h-full items-center justify-center p-4 text-sm">Editor</div>
    </ResizablePanel>
  </ResizablePanelGroup>
</div>`}
      >
        <div className="h-48 w-full max-w-lg rounded-lg border-2">
          <ResizablePanelGroup orientation="horizontal">
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="flex h-full items-center justify-center p-4 text-sm">
                Sidebar
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70}>
              <div className="flex h-full items-center justify-center p-4 text-sm">
                Editor
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </ComponentPreview>

      <ImportLine
        names={["ResizablePanelGroup", "ResizablePanel", "ResizableHandle"]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <P>
          A handle goes between every pair of panels — not before the first or
          after the last.
        </P>
        <CompositionTree
          root="ResizablePanelGroup"
          nodes={[
            { name: "ResizablePanel" },
            { name: "ResizableHandle" },
            { name: "ResizablePanel" },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>The height goes on the parent</H3>
        <Stack gap="sm">
          <P>
            The group sets <Code>height: 100%; width: 100%</Code> as an inline
            style, and an inline style beats a class. So a{" "}
            <Code>className=&quot;h-48&quot;</Code> on{" "}
            <Code>ResizablePanelGroup</Code> does nothing: the group takes its size
            from whatever contains it, and in a parent with no resolved height the
            panels collapse to their content.
          </P>
          <P>
            Wrap it in a sized element, as every example on this page does. That is
            also where the border and the rounding belong — put them on the group
            and the panels overflow them.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Nesting the other way</H3>
        <P>
          A panel can hold another group, which is how the three-pane editor layout
          is built. The inner group sets its own <Code>orientation</Code>, and the
          handle lays its grip along the rule to match.
        </P>
        <ComponentPreview
          code={`<div className="h-64 rounded-lg border-2">
  <ResizablePanelGroup orientation="horizontal">
    <ResizablePanel defaultSize={35}>
      <div className="flex h-full items-center justify-center p-4 text-sm">Files</div>
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={65}>
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel defaultSize={65}>
          <div className="flex h-full items-center justify-center p-4 text-sm">Editor</div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={35}>
          <div className="flex h-full items-center justify-center p-4 text-sm">Terminal</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</div>`}
        >
          <div className="h-64 w-full max-w-lg rounded-lg border-2">
            <ResizablePanelGroup orientation="horizontal">
              <ResizablePanel defaultSize={35}>
                <div className="flex h-full items-center justify-center p-4 text-sm">
                  Files
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={65}>
                <ResizablePanelGroup orientation="vertical">
                  <ResizablePanel defaultSize={65}>
                    <div className="flex h-full items-center justify-center p-4 text-sm">
                      Editor
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={35}>
                    <div className="flex h-full items-center justify-center p-4 text-sm">
                      Terminal
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Collapsing a panel</H3>
        <P>
          <Code>collapsible</Code> lets a panel snap shut once it is dragged below
          its <Code>minSize</Code>, rather than sticking at the minimum. It is the
          behaviour a sidebar wants — drag it small and it disappears, drag the
          handle back and it returns to its minimum.
        </P>
        <ComponentPreview
          code={`<ResizablePanel collapsible minSize={20} defaultSize={30}>
  <div className="flex h-full items-center justify-center p-4 text-sm">Drag me shut</div>
</ResizablePanel>`}
        >
          <div className="h-40 w-full max-w-lg rounded-lg border-2">
            <ResizablePanelGroup orientation="horizontal">
              <ResizablePanel collapsible minSize={20} defaultSize={30}>
                <div className="flex h-full items-center justify-center p-4 text-center text-sm">
                  Drag me shut
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={70}>
                <div className="flex h-full items-center justify-center p-4 text-sm">
                  Content
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Remembering the layout</H3>
        <P>
          <Code>onLayoutChanged</Code> fires once the pointer is released and hands
          you a map of panel id to size. Store that, and pass it back as{" "}
          <Code>defaultLayout</Code>. Give the panels stable ids — the map is keyed
          by them, and generated ids change on every mount.{" "}
          <Code>onLayoutChange</Code> fires on every pointer move instead, which is
          for a live readout, not for writing to storage.
        </P>
        <ComponentPreview
          defaultOpen
          code={`const [layout, setLayout] = useState<Layout | undefined>(() =>
  JSON.parse(localStorage.getItem("editor-layout") ?? "null") ?? undefined
)

<ResizablePanelGroup
  orientation="horizontal"
  defaultLayout={layout}
  onLayoutChanged={(next) => {
    setLayout(next)
    localStorage.setItem("editor-layout", JSON.stringify(next))
  }}
>
  <ResizablePanel id="sidebar" defaultSize={30}>…</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel id="editor" defaultSize={70}>…</ResizablePanel>
</ResizablePanelGroup>`}
        >
          <P className="text-sm text-muted-foreground">
            Read the stored layout lazily, as above — reading{" "}
            <Code>localStorage</Code> during a server render throws.
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Direction</H3>
        <Stack gap="sm">
          <P>
            <Code>orientation</Code> means the axis, not the writing direction —{" "}
            <Code>&quot;horizontal&quot;</Code> lays the panels along the inline
            axis, and in RTL the first panel in your JSX is the rightmost. Source
            order is reading order, so nothing needs changing.
          </P>
          <P>
            The grip is a <Code>GripVertical</Code> glyph and is symmetric, so it
            has nothing to mirror. The handle&apos;s widened hit area is centred
            with a transform rather than pinned to a side, which is
            direction-neutral too.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Each handle is a focusable <Code>role=&quot;separator&quot;</Code>{" "}
            carrying <Code>aria-valuenow</Code>, <Code>aria-valuemin</Code>, and{" "}
            <Code>aria-valuemax</Code>, so arrow keys resize once it has focus and
            Home and End drive it to the extremes. Double-click resets it. All of
            that comes from the library.
          </P>
          <P>
            Use <Code>withHandle</Code>. The rule is 1px, and although a
            pseudo-element widens the drag target to 4px, a boundary a user cannot
            see is a boundary they will not think to drag. The visible grip is also
            the only thing saying the layout is adjustable.
          </P>
          <P>
            Set <Code>minSize</Code> on panels holding real content, or use{" "}
            <Code>collapsible</Code>. A panel dragged to nothing hides its content
            visually without removing it from the accessibility tree, which leaves a
            screen-reader user reading a panel a sighted user cannot see.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          <Code>ResizablePanel</Code> is <Code>Panel</Code> from{" "}
          <Code>react-resizable-panels</Code> unchanged, and the other two add
          styling to its <Code>Group</Code> and <Code>Separator</Code>. See the{" "}
          <a
            href="https://github.com/bvaughn/react-resizable-panels"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            react-resizable-panels docs
          </a>{" "}
          for the full surface, including the <Code>useGroupRef</Code> and{" "}
          <Code>usePanelRef</Code> hooks.
        </P>
        <PropsTable props={groupProps} />

        <H3>ResizablePanel</H3>
        <PropsTable props={panelProps} />

        <H3>ResizableHandle</H3>
        <PropsTable props={handleProps} />
      </Stack>
    </DocPage>
  )
}
