import {
  PageHeader,
  PageHeaderContent,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
  PageHeaderBreadcrumb,
} from "@/components/page-header"
import { PageBody } from "@/components/page-body"
import { PageTabs, PageTabsList, PageTabsTrigger, PageTabsContent } from "@/components/page-tabs"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Stack } from "@/components/ui/stack"
import { H3, Muted } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const pageHeaderProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the page header.",
  },
]

const pageBodyProps: PropDef[] = [
  {
    name: "fullWidth",
    type: "boolean",
    default: "false",
    description: "Skip the max-width Center wrapper when true.",
  },
  {
    name: "padding",
    type: '"default" | "none"',
    default: '"default"',
    description: 'Use "none" to remove default padding.',
  },
]

export default function PageLayoutPage() {
  return (
    <DocPage
      title="Page Layout"
      description="Page-level layout patterns for composing headers, bodies, and tabbed content. These organisms sit inside AppShellMain and provide consistent page structure."
    >
      <Stack gap="md">
        <H3>PageHeader with Breadcrumb and Actions</H3>
        <ComponentPreview
          code={`<PageHeader>
  <PageHeaderBreadcrumb>
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  </PageHeaderBreadcrumb>
  <PageHeaderContent>
    <div>
      <PageHeaderTitle>Settings</PageHeaderTitle>
      <PageHeaderDescription>
        Manage your account preferences.
      </PageHeaderDescription>
    </div>
    <PageHeaderActions>
      <Button variant="outline">Cancel</Button>
      <Button>Save</Button>
    </PageHeaderActions>
  </PageHeaderContent>
</PageHeader>`}
        >
          <div className="w-full border-2 rounded-lg overflow-hidden">
            <PageHeader>
              <PageHeaderBreadcrumb>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Settings</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </PageHeaderBreadcrumb>
              <PageHeaderContent>
                <div>
                  <PageHeaderTitle>Settings</PageHeaderTitle>
                  <PageHeaderDescription>
                    Manage your account preferences.
                  </PageHeaderDescription>
                </div>
                <PageHeaderActions>
                  <Button variant="outline">Cancel</Button>
                  <Button>Save</Button>
                </PageHeaderActions>
              </PageHeaderContent>
            </PageHeader>
            <PageBody>
              <Muted>PageBody content goes here.</Muted>
            </PageBody>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Page with Tabs</H3>
        <ComponentPreview
          code={`<PageHeader>
  <PageHeaderContent>
    <PageHeaderTitle>Project</PageHeaderTitle>
  </PageHeaderContent>
</PageHeader>
<PageTabs defaultValue="overview">
  <PageTabsList>
    <PageTabsTrigger value="overview">Overview</PageTabsTrigger>
    <PageTabsTrigger value="activity">Activity</PageTabsTrigger>
    <PageTabsTrigger value="settings">Settings</PageTabsTrigger>
  </PageTabsList>
  <PageTabsContent value="overview">
    <PageBody>Overview content</PageBody>
  </PageTabsContent>
</PageTabs>`}
        >
          <div className="w-full border-2 rounded-lg overflow-hidden">
            <PageHeader>
              <PageHeaderContent>
                <PageHeaderTitle>Project</PageHeaderTitle>
              </PageHeaderContent>
            </PageHeader>
            <PageTabs defaultValue="overview">
              <PageTabsList>
                <PageTabsTrigger value="overview">Overview</PageTabsTrigger>
                <PageTabsTrigger value="activity">Activity</PageTabsTrigger>
                <PageTabsTrigger value="settings">Settings</PageTabsTrigger>
              </PageTabsList>
              <PageTabsContent value="overview">
                <PageBody>
                  <Muted>Overview tab content goes here.</Muted>
                </PageBody>
              </PageTabsContent>
              <PageTabsContent value="activity">
                <PageBody>
                  <Muted>Activity tab content goes here.</Muted>
                </PageBody>
              </PageTabsContent>
              <PageTabsContent value="settings">
                <PageBody>
                  <Muted>Settings tab content goes here.</Muted>
                </PageBody>
              </PageTabsContent>
            </PageTabs>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>PageHeader Props</H3>
        <PropsTable props={pageHeaderProps} />
      </Stack>

      <Stack gap="md">
        <H3>PageBody Props</H3>
        <PropsTable props={pageBodyProps} />
      </Stack>
    </DocPage>
  )
}
