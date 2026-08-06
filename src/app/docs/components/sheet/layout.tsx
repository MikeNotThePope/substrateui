import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Sheet",
  description: "A panel that slides in from an edge of the viewport — navigation, filters, detail views that do not need a route of their own.",
  route: "/docs/components/sheet",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
