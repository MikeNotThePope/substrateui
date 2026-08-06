import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Toast",
  description: "A notification that appears at the edge of the viewport and dismisses itself. Built on Sonner.",
  route: "/docs/components/toast",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
