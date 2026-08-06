import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Templates",
  description: "Assembled pages built from blocks and shells. Pass data props for a ready-to-ship page, or drop in your own content.",
  route: "/docs/templates",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
