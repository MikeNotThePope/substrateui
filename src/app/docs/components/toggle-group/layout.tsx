import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Toggle Group",
  description: "A row of toggles that know about each other.",
  route: "/docs/components/toggle-group",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
