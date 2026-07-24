import { Stack } from "@/components/ui/stack"
import { H3, Code, Muted } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const appShellProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the app shell container.",
  },
]

const sidebarProps: PropDef[] = [
  {
    name: "collapsed",
    type: "boolean",
    default: "false",
    description: "Whether the sidebar is in collapsed state.",
  },
  {
    name: "mobileTitle",
    type: "string",
    default: '"Navigation"',
    description:
      "Accessible title for the mobile drawer, announced to screen readers.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the sidebar.",
  },
]

const sidebarTriggerProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description:
      "Additional classes. The trigger is hidden on md+ by default (md:hidden).",
  },
]

const navItemProps: PropDef[] = [
  {
    name: "icon",
    type: "React.ComponentType<{ className?: string }>",
    default: undefined,
    description: "Optional icon component rendered before the label.",
  },
  {
    name: "active",
    type: "boolean",
    default: "false",
    description: "Whether this item represents the current page.",
  },
  {
    name: "href",
    type: "string",
    default: undefined,
    description: "The link destination for the navigation item.",
  },
]

export default function AppShellPage() {
  return (
    <DocPage
      title="App Shell"
      description="A full-page side-navigation layout: a fixed sidebar with logo, navigation, and footer beside a scrollable main region. On mobile the sidebar collapses into a drawer opened by AppShellSidebarTrigger. Use as the root layout for dashboard-style applications."
    >
      <Stack gap="md">
        <H3>Structure Diagram</H3>
        <ComponentPreview
          code={`import {
  AppShell,
  AppShellSidebar,
  AppShellSidebarTrigger,
  AppShellLogo,
  AppShellNav,
  AppShellNavItem,
  AppShellFooter,
  AppShellMain,
} from "@/components/app-shell"
import { PageHeader, PageHeaderContent, PageHeaderTitle } from "@/components/page-header"
import { PageBody } from "@/components/page-body"

<AppShell>
  <AppShellSidebar>
    <AppShellLogo>Acme Inc</AppShellLogo>
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
        {/* Hidden on md+, opens the sidebar drawer on mobile */}
        <AppShellSidebarTrigger />
        <PageHeaderTitle>Dashboard</PageHeaderTitle>
      </PageHeaderContent>
    </PageHeader>
    <PageBody>
      {/* page content */}
    </PageBody>
  </AppShellMain>
</AppShell>`}
        >
          <div className="w-full border-2 rounded-lg overflow-hidden text-xs">
            <div className="flex h-64">
              <div className="w-48 shrink-0 border-r-2 bg-card flex flex-col">
                <div className="h-10 border-b-2 px-3 flex items-center font-semibold">
                  <Code>AppShellLogo</Code>
                </div>
                <div className="flex-1 p-2 space-y-1">
                  <div className="rounded bg-accent px-2 py-1">
                    <Muted>AppShellNavItem (active)</Muted>
                  </div>
                  <div className="rounded px-2 py-1">
                    <Muted>AppShellNavItem</Muted>
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
      </Stack>

      <Stack gap="md">
        <H3>AppShell Props</H3>
        <PropsTable props={appShellProps} />
      </Stack>

      <Stack gap="md">
        <H3>AppShellSidebar Props</H3>
        <PropsTable props={sidebarProps} />
      </Stack>

      <Stack gap="md">
        <H3>AppShellNavItem Props</H3>
        <PropsTable props={navItemProps} />
      </Stack>

      <Stack gap="md">
        <H3>Responsive Behavior</H3>
        <Muted>
          On <Code>md</Code> and larger the sidebar is a fixed column. Below{" "}
          <Code>md</Code> it is hidden and its contents are mirrored into a
          drawer. Render an <Code>AppShellSidebarTrigger</Code> somewhere
          always-visible on mobile (typically inside your{" "}
          <Code>PageHeader</Code>) to open it. The trigger is itself hidden on{" "}
          <Code>md</Code>+, so it never shows on desktop.
        </Muted>
        <PropsTable props={sidebarTriggerProps} />
      </Stack>
    </DocPage>
  )
}
