import { Stack } from "@/components/ui/stack"
import { H3, Code, Muted } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

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
        <H3>SidebarProvider Props</H3>
        <PropsTable props={providerProps} />
      </Stack>

      <Stack gap="md">
        <H3>Sidebar Props</H3>
        <PropsTable props={sidebarProps} />
      </Stack>
    </DocPage>
  )
}
