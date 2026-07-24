import type { Meta, StoryObj } from "@storybook/react-vite"
import { LayoutDashboard, Settings, Users } from "lucide-react"

import {
  DashboardShell,
  DashboardShellHeader,
  DashboardShellBrand,
  DashboardShellActions,
  DashboardShellBody,
} from "./dashboard-shell"
import {
  AppShellSidebar,
  AppShellSidebarTrigger,
  AppShellNav,
  AppShellNavItem,
  AppShellFooter,
  AppShellMain,
} from "./app-shell"
import { PageHeader, PageHeaderContent, PageHeaderTitle } from "./page-header"
import { PageBody } from "./page-body"
import { Button } from "./ui/button"
import { Muted } from "./ui/typography"

const meta: Meta<typeof DashboardShell> = {
  title: "Organisms/DashboardShell",
  component: DashboardShell,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof DashboardShell>

function Nav() {
  return (
    <AppShellNav>
      <AppShellNavItem icon={LayoutDashboard} active href="#">
        Dashboard
      </AppShellNavItem>
      <AppShellNavItem icon={Users} href="#">
        Team
      </AppShellNavItem>
      <AppShellNavItem icon={Settings} href="#">
        Settings
      </AppShellNavItem>
    </AppShellNav>
  )
}

export const Default: Story = {
  render: () => (
    <DashboardShell>
      <DashboardShellHeader>
        <AppShellSidebarTrigger />
        <DashboardShellBrand>Acme Inc</DashboardShellBrand>
        <DashboardShellActions>
          <Button variant="outline" size="sm">
            Feedback
          </Button>
        </DashboardShellActions>
      </DashboardShellHeader>
      <DashboardShellBody>
        <AppShellSidebar>
          <Nav />
          <AppShellFooter>
            <Muted>v1.0.0</Muted>
          </AppShellFooter>
        </AppShellSidebar>
        <AppShellMain>
          <PageHeader>
            <PageHeaderContent>
              <PageHeaderTitle>Dashboard</PageHeaderTitle>
            </PageHeaderContent>
          </PageHeader>
          <PageBody>
            <Muted>
              Top bar spans the full width; the sidebar sits below it. Resize
              under md to collapse the sidebar into a drawer opened from the
              header hamburger.
            </Muted>
          </PageBody>
        </AppShellMain>
      </DashboardShellBody>
    </DashboardShell>
  ),
}

export const Mobile: Story = {
  ...Default,
  parameters: {
    layout: "fullscreen",
    viewport: { defaultViewport: "mobile1" },
  },
}
