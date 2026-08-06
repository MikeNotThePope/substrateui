import { Stack } from "@/components/ui/stack"
import { H3, P, Code, Muted } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Sidebar",
  description: "A composable, stateful sidebar system with collapse modes, a built-in mobile drawer, keyboard toggle (⌘/Ctrl+B), and cookie-persisted state.",
  route: "/docs/components/sidebar",
})

const providerProps: PropDef[] = [
  {
    name: "defaultOpen",
    type: "boolean",
    default: "true",
    description: "Initial open state when uncontrolled.",
  },
  {
    name: "open",
    type: "boolean",
    default: undefined,
    description: "Controlled open state. Pair with onOpenChange.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: undefined,
    description: "Called when the open state should change.",
  },
]

const sidebarProps: PropDef[] = [
  {
    name: "side",
    type: '"left" | "right"',
    default: '"left"',
    description: "Which edge the sidebar is anchored to.",
  },
  {
    name: "variant",
    type: '"sidebar" | "floating" | "inset"',
    default: '"sidebar"',
    description: "Visual treatment of the sidebar surface.",
  },
  {
    name: "collapsible",
    type: '"offcanvas" | "icon" | "none"',
    default: '"offcanvas"',
    description:
      'How the sidebar collapses: slide off-canvas, shrink to icons, or never.',
  },
]

export default function SidebarPage() {
  return (
    <DocPage
      title="Sidebar"
      description="A composable, stateful sidebar system with collapse modes, a built-in mobile drawer, keyboard toggle (⌘/Ctrl+B), and cookie-persisted state. Use it when you need a richer sidebar than the App Shell provides — collapse-to-icon, floating/inset variants, or nested menus."
    >
      <Stack gap="md">
        <H3>Anatomy</H3>
        <ComponentPreview
          code={`import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"

<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>Acme</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive>Dashboard</SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>Settings</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>v1.0.0</SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    {/* page content */}
  </SidebarInset>
</SidebarProvider>`}
        >
          <div className="w-full border-2 rounded-lg overflow-hidden text-xs">
            <div className="flex h-64">
              <div className="w-48 shrink-0 border-e-2 bg-sidebar flex flex-col">
                <div className="h-10 border-b-2 px-3 flex items-center font-semibold">
                  <Code>SidebarHeader</Code>
                </div>
                <div className="flex-1 p-2 space-y-1">
                  <div className="px-2 py-1">
                    <Muted>SidebarGroupLabel</Muted>
                  </div>
                  <div className="rounded bg-accent px-2 py-1">
                    <Muted>SidebarMenuButton (active)</Muted>
                  </div>
                  <div className="rounded px-2 py-1">
                    <Muted>SidebarMenuButton</Muted>
                  </div>
                </div>
                <div className="border-t-2 p-2">
                  <Muted>SidebarFooter</Muted>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="border-b-2 bg-card px-4 py-3 flex items-center gap-2">
                  <Code>SidebarTrigger</Code>
                </div>
                <div className="flex-1 p-4 flex items-center justify-center">
                  <Muted>SidebarInset (page content)</Muted>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
        <Muted>
          Wrap everything in <Code>SidebarProvider</Code>. It manages open state
          (persisted to a <Code>sidebar_state</Code> cookie), a{" "}
          <Code>⌘/Ctrl+B</Code> toggle, and swaps the sidebar for a mobile
          drawer on small screens. Read or toggle state anywhere via{" "}
          <Code>useSidebar()</Code>.
        </Muted>
      </Stack>

      <ImportLine
        names={[
          "SidebarProvider",
          "Sidebar",
          "SidebarHeader",
          "SidebarContent",
          "SidebarFooter",
          "SidebarGroup",
          "SidebarGroupLabel",
          "SidebarMenu",
          "SidebarMenuItem",
          "SidebarMenuButton",
          "SidebarTrigger",
          "SidebarInset",
          "useSidebar",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="SidebarProvider"
          nodes={[
            {
              name: "Sidebar",
              children: [
                { name: "SidebarHeader" },
                {
                  name: "SidebarContent",
                  children: [
                    {
                      name: "SidebarGroup",
                      children: [
                        { name: "SidebarGroupLabel" },
                        {
                          name: "SidebarMenu",
                          children: [
                            {
                              name: "SidebarMenuItem",
                              children: [
                                { name: "SidebarMenuButton" },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                { name: "SidebarFooter" },
              ],
            },
            {
              name: "SidebarInset",
              children: [
                { name: "SidebarTrigger" },
              ],
            },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>When to use this vs. App Shell</H3>
        <Muted>
          <Code>AppShell</Code> is a lightweight, opinionated side-nav layout —
          reach for it first. Use <Code>Sidebar</Code> when you need
          collapse-to-icon, floating/inset variants, nested submenus, badges, or
          programmatic control over the open state.
        </Muted>
      </Stack>

      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          The trigger is an icon button, and the mobile sheet needs a title and
          description whether or not the design shows them. Override one instance
          with the <Code>labels</Code> prop, or every instance at once through{" "}
          <Code>LabelsProvider</Code>&apos;s <Code>sidebar</Code> key — the
          provider is how you translate the set once instead of at each call site.
        </P>
        <PropsTable
          props={[
            { name: "toggleSidebar", type: "string", default: '"Toggle Sidebar"', description: "Accessible name for SidebarTrigger, whose visible content is an icon." },
            { name: "mobileTitle", type: "string", default: '"Sidebar"', description: "Title of the mobile sheet. Required by the dialog underneath, and visually hidden." },
            { name: "mobileDescription", type: "string", default: '"Displays the mobile sidebar."', description: "Description of the mobile sheet, also visually hidden." },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>Direction</H3>
        <Stack gap="sm">
          <P>
            <Code>side=&quot;left&quot;</Code> and{" "}
            <Code>side=&quot;right&quot;</Code> are physical, not logical: a
            left-side sidebar stays on the left in an RTL locale. That is
            deliberate — some products anchor navigation to a physical edge — but it
            means an RTL layout usually wants <Code>side=&quot;right&quot;</Code>{" "}
            so the nav sits at the start of the line.
          </P>
          <P>
            <Code>SidebarTrigger</Code> draws a <Code>PanelLeft</Code> glyph, which
            the{" "}
            <a
              href="/docs/accessibility/direction"
              className="underline underline-offset-4 hover:text-primary"
            >
              RTL icon audit
            </a>{" "}
            classifies as conditional for exactly this reason. Mirror it with{" "}
            <Code>rtl:-scale-x-100</Code> when the sidebar follows reading
            direction; leave it alone when it is pinned to a physical side.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            <Code>⌘/Ctrl+B</Code> toggles the sidebar from anywhere in the page.
            That is a global binding: if your app already uses it, override or
            remove it rather than shipping two handlers on one chord.
          </P>
          <P>
            Below the mobile breakpoint the sidebar becomes a sheet, which traps
            focus and closes on Escape. Above it, the sidebar is ordinary page
            content and does not trap focus — a collapsed-to-icon sidebar still has
            its links in the tab order.
          </P>
          <P>
            Wrap the nav items in a <Code>nav</Code> with an{" "}
            <Code>aria-label</Code>, and mark the current page with{" "}
            <Code>aria-current=&quot;page&quot;</Code>.{" "}
            <Code>SidebarMenuButton</Code> has an <Code>isActive</Code> prop, but
            that is styling — it sets a data attribute and no ARIA.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          <Code>SidebarProvider</Code> owns the open state; everything else reads
          it from context. The remaining parts — groups, menus, badges, skeletons,
          the rail — take plain element props and are best read from the anatomy
          above.
        </P>
        <PropsTable props={providerProps} />

        <H3>Sidebar</H3>
        <PropsTable props={sidebarProps} />
      </Stack>
    </DocPage>
  )
}
