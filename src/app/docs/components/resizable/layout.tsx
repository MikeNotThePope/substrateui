import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Resizable",
  description: "Panels the user can drag the boundary between, on react-resizable-panels.",
  route: "/docs/components/resizable",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
