import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Dropdown Menu",
  description: "A menu triggered by a button that displays a list of actions or options. Supports grouping, labels, and separators.",
  route: "/docs/components/dropdown-menu",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
