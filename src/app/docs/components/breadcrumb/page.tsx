import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Stack } from "@/components/ui/stack"
import { H3, P } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

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
        <H3>API Reference</H3>
        <PropsTable props={breadcrumbProps} />
      </Stack>
    </DocPage>
  )
}
