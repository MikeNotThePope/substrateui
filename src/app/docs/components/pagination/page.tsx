import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const paginationProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the pagination container.",
  },
]

export default function PaginationPage() {
  return (
    <DocPage
      title="Pagination"
      description="Navigation controls for moving between pages of content. Provides numbered links plus previous and next shortcuts."
    >
      <Stack gap="md">
        <H3>Numbered Pagination</H3>
        <ComponentPreview
          code={`<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`}
        >
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </ComponentPreview>
      </Stack>

      <ImportLine
        names={[
          "Pagination",
          "PaginationContent",
          "PaginationItem",
          "PaginationLink",
          "PaginationNext",
          "PaginationPrevious",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="Pagination"
          nodes={[
            {
              name: "PaginationContent",
              children: [
                {
                  name: "PaginationItem",
                  children: [
                    { name: "PaginationPrevious" },
                    { name: "PaginationLink" },
                    { name: "PaginationNext" },
                  ],
                },
              ],
            },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>Direction</H3>
        <P>
          Previous and next buttons swap visually in RTL — the previous
          link sits on the right, next on the left, and the chevron icons
          rotate to point in reading direction. Order within the list
          follows the DOM, so logical ordering is preserved.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Labels</H3>
        <P>
          Three of the four strings are accessible names for controls that show only an icon or an ellipsis. Override one instance with the <Code>labels</Code> prop on the component, or every
            instance at once through <Code>LabelsProvider</Code>&apos;s{" "}
            <Code>pagination</Code> key — the provider is how you translate the
            set once instead of at each call site.
        </P>
        <PropsTable
          props={[
          { name: "pagination", type: "string", default: "\"pagination\"", description: "aria-label on the nav element." },
          { name: "previous / next", type: "string", default: "\"Previous\" / \"Next\"", description: "The step buttons, whose visible content is a chevron." },
          { name: "morePages", type: "string", default: "\"More pages\"", description: "Accessible name for the ellipsis between page ranges." },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={paginationProps} />
      </Stack>
    </DocPage>
  )
}
