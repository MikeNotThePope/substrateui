import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Stack } from "@/components/ui/stack"
import { H3, P } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
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
        <H3>API Reference</H3>
        <PropsTable props={paginationProps} />
      </Stack>
    </DocPage>
  )
}
