import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Command",
  description: "A command palette for searching and selecting from a list of options. Supports keyboard navigation, grouping, and filtering.",
  route: "/docs/components/command",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
