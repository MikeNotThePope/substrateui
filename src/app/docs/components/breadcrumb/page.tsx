import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Breadcrumb",
  description: "Shows where the current page sits in the hierarchy, and links back up it.",
  route: "/docs/components/breadcrumb",
})

const breadcrumbProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the breadcrumb container.",
  },
]

export default function BreadcrumbDocsPage() {
  return (
    <DocPage
      title="Breadcrumb"
      description="Shows where the current page sits in the hierarchy, and links back up it."
    >
      <Stack gap="md">
        <H3>Three-Level Breadcrumb</H3>
        <ComponentPreview
          code={`<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/settings">Settings</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Profile</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Settings</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </ComponentPreview>
      </Stack>

      <ImportLine
        names={[
          "Breadcrumb",
          "BreadcrumbItem",
          "BreadcrumbLink",
          "BreadcrumbList",
          "BreadcrumbPage",
          "BreadcrumbSeparator",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="Breadcrumb"
          nodes={[
            {
              name: "BreadcrumbList",
              children: [
                {
                  name: "BreadcrumbItem",
                  children: [
                    { name: "BreadcrumbLink" },
                    { name: "BreadcrumbPage" },
                  ],
                },
                { name: "BreadcrumbSeparator" },
              ],
            },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>Direction</H3>
        <P>
          The default chevron separator flips automatically in RTL so it
          points in reading direction. If you pass a custom separator, make
          sure its glyph also respects direction — a &quot;/&quot; is
          direction-neutral, but an arrow is not.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          The nav&apos;s own accessible name and the ellipsis both live here, and neither has visible text to fall back on. Override one instance with the <Code>labels</Code> prop on the component, or every
            instance at once through <Code>LabelsProvider</Code>&apos;s{" "}
            <Code>breadcrumb</Code> key — the provider is how you translate the
            set once instead of at each call site.
        </P>
        <PropsTable
          props={[
          { name: "breadcrumb", type: "string", default: "\"breadcrumb\"", description: "aria-label on the nav element — how a screen reader names the trail." },
          { name: "more", type: "string", default: "\"More\"", description: "Accessible name for the collapsed-items ellipsis." },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={breadcrumbProps} />
      </Stack>
    </DocPage>
  )
}
