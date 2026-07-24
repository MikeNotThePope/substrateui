import { Stack } from "@/components/ui/stack"
import { H3, Code, Muted } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const shellProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the shell container.",
  },
]

export default function DashboardShellPage() {
  return (
    <DocPage
      title="Dashboard Shell"
      description="A full-page top + side navigation layout: a full-width header bar above a fixed sidebar and scrollable main region — the classic admin dashboard. It reuses the AppShell sidebar parts, so the sidebar collapses into a drawer on mobile via AppShellSidebarTrigger placed in the header."
    >
      <Stack gap="md">
        <H3>Structure Diagram</H3>
        <ComponentPreview
          code={`import {
  DashboardShell,
  DashboardShellHeader,
  DashboardShellBrand,
  DashboardShellActions,
  DashboardShellBody,
} from "@/components/dashboard-shell"
import {
  AppShellSidebar,
  AppShellSidebarTrigger,
  AppShellNav,
  AppShellNavItem,
  AppShellFooter,
  AppShellMain,
} from "@/components/app-shell"
import { PageHeader, PageHeaderContent, PageHeaderTitle } from "@/components/page-header"
import { PageBody } from "@/components/page-body"

<DashboardShell>
  <DashboardShellHeader>
    {/* Hidden on md+, opens the sidebar drawer on mobile */}
    <AppShellSidebarTrigger />
    <DashboardShellBrand>Acme Inc</DashboardShellBrand>
    <DashboardShellActions>
      <ThemeToggle />
    </DashboardShellActions>
  </DashboardShellHeader>
  <DashboardShellBody>
    <AppShellSidebar>
      <AppShellNav>
        <AppShellNavItem icon={HomeIcon} active href="/">
          Dashboard
        </AppShellNavItem>
        <AppShellNavItem icon={SettingsIcon} href="/settings">
          Settings
        </AppShellNavItem>
      </AppShellNav>
      <AppShellFooter>v1.0.0</AppShellFooter>
    </AppShellSidebar>
    <AppShellMain>
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>Dashboard</PageHeaderTitle>
        </PageHeaderContent>
      </PageHeader>
      <PageBody>{/* page content */}</PageBody>
    </AppShellMain>
  </DashboardShellBody>
</DashboardShell>`}
        >
          <div className="w-full border-2 rounded-lg overflow-hidden text-xs">
            <div className="h-12 border-b-2 bg-card px-4 flex items-center gap-3">
              <Code>DashboardShellBrand</Code>
              <div className="ms-auto">
                <Muted>DashboardShellActions</Muted>
              </div>
            </div>
            <div className="flex h-56">
              <div className="w-48 shrink-0 border-e-2 bg-card flex flex-col">
                <div className="flex-1 p-2 space-y-1">
                  <div className="rounded bg-accent px-2 py-1">
                    <Muted>AppShellNavItem (active)</Muted>
                  </div>
                  <div className="rounded px-2 py-1">
                    <Muted>AppShellNavItem</Muted>
                  </div>
                </div>
                <div className="border-t-2 p-2">
                  <Muted>AppShellFooter</Muted>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="border-b-2 bg-card px-4 py-3">
                  <Code>PageHeader</Code>
                </div>
                <div className="flex-1 p-4 flex items-center justify-center">
                  <Muted>PageBody (scrollable)</Muted>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
        <Muted>
          The top bar spans the full width; the sidebar sits below it. Below the{" "}
          <Code>md</Code> breakpoint the sidebar hides and the{" "}
          <Code>AppShellSidebarTrigger</Code> in the header opens it as a
          drawer. Sidebar, nav, and main come from the{" "}
          <Code>AppShell</Code> family — see{" "}
          <Code>App Shell</Code> for their props.
        </Muted>
      </Stack>

      <Stack gap="md">
        <H3>DashboardShell Props</H3>
        <PropsTable props={shellProps} />
        <Muted>
          The same <Code>className</Code> passthrough applies to{" "}
          <Code>DashboardShellHeader</Code>, <Code>DashboardShellBrand</Code>,{" "}
          <Code>DashboardShellActions</Code>, and{" "}
          <Code>DashboardShellBody</Code>.
        </Muted>
      </Stack>
    </DocPage>
  )
}
