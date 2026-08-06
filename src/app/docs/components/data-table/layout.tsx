import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "DataTable",
  description: "A table built on TanStack Table: sorting, filtering, pagination, row selection, and column visibility.",
  route: "/docs/components/data-table",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
