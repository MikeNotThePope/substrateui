import {
  PageHeader,
  PageHeaderContent,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
  PageHeaderBack,
  PageHeaderBreadcrumb,
} from "@/components/page-header"
import { PageBody } from "@/components/page-body"
import { PageTabs, PageTabsList, PageTabsTrigger, PageTabsContent } from "@/components/page-tabs"
import { Badge } from "@/components/ui/badge"
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

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Page Layout",
  description: "Page-level layout patterns for composing headers, bodies, and tabbed content. These organisms sit inside AppShellMain and provide consistent page structure.",
  route: "/docs/layouts/page-layout",
})

const pageHeaderProps: PropDef[] = [
  {
    name: "size",
    type: '"default" | "sm"',
    default: '"default"',
    description:
      'Layout of the header. "default" is a full band with a card background and stacked children. "sm" is a compact single-row bar with no background, for a page inside an app shell. The size reaches PageHeaderTitle and PageHeaderActions too.',
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the page header.",
  },
]

const pageHeaderBackProps: PropDef[] = [
  {
    name: "label",
    type: "string",
    default: undefined,
    description:
      "Where it goes back to, spoken. It is the accessible name, and it is required: the button draws an arrow and nothing else.",
  },
  {
    name: "render",
    type: "ReactElement",
    default: undefined,
    description:
      "Render a link instead of a button, e.g. render={<Link href=\"/jobs\" />}. Prefer this over an onClick into history, so the destination is a URL a person can open in a new tab.",
  },
  {
    name: "...Button props",
    type: "ButtonProps",
    default: 'variant="outline" size="icon-sm"',
    description: "Forwarded to the Button underneath, including variant and size.",
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
        <H3>Compact header</H3>
        <Muted>
          <code>size=&quot;sm&quot;</code> is the bar a working page wants above it: one
          row, no background of its own, a title beside its status rather than over
          it. Children are laid out inline, so a back button, the title and a badge
          are siblings. <code>PageHeaderActions</code> moves itself to the far end.
          It stands as tall as <code>AppShellLogo</code>, so inside an app shell
          the two bottom borders meet at the sidebar&apos;s edge instead of
          stepping across it. A bar that wraps grows past that height.
        </Muted>
        <ComponentPreview
          code={`<PageHeader size="sm">
  <PageHeaderBack label="Back to jobs" render={<Link href="/jobs" />} />
  <PageHeaderTitle>Senior engineer</PageHeaderTitle>
  <Badge variant="success">Published</Badge>
  <PageHeaderActions>
    <Button variant="outline" size="sm">Edit</Button>
  </PageHeaderActions>
</PageHeader>`}
        >
          <div className="w-full border-2 rounded-lg overflow-hidden">
            <PageHeader size="sm">
              <PageHeaderBack label="Back to jobs" render={<a href="#" />} />
              <PageHeaderTitle>Senior engineer</PageHeaderTitle>
              <Badge variant="success">Published</Badge>
              <PageHeaderActions>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </PageHeaderActions>
            </PageHeader>
            <PageBody>
              <Muted>PageBody content goes here.</Muted>
            </PageBody>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>PageHeader Props</H3>
        <PropsTable props={pageHeaderProps} />
      </Stack>

      <Stack gap="md">
        <H3>PageHeaderBack Props</H3>
        <Muted>
          The back arrow a deeper page wears, at the start of its bar. It is the outline
          icon button with an <code>ArrowLeft</code> that every such page was writing out,
          and it is 36px rather than 40 so it sits level with the <code>sm</code> controls
          at the other end of the row.
        </Muted>
        <PropsTable props={pageHeaderBackProps} />
      </Stack>

      <Stack gap="md">
        <H3>PageBody Props</H3>
        <PropsTable props={pageBodyProps} />
      </Stack>
    </DocPage>
  )
}
