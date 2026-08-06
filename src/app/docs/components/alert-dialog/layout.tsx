import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Alert Dialog",
  description: "A modal dialog that interrupts the user to confirm a destructive or important action. Requires explicit acknowledgment before proceeding.",
  route: "/docs/components/alert-dialog",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
