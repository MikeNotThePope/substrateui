import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Dialog",
  description: "A modal overlay rendered above the page with a backdrop. Focus stays inside it while it is open.",
  route: "/docs/components/dialog",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
