import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Banner",
  description: "A full-width announcement bar for site-wide messages — new releases, cookie notices, promotions.",
  route: "/docs/components/banner",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
