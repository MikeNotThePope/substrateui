import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Stat Card",
  description: "One metric on a card: a name, a figure, and an optional change indicator.",
  route: "/docs/components/stat-card",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
