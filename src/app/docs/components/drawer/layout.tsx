import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Drawer",
  description: "A sheet that slides up from the bottom edge and can be dragged back down. Built for touch.",
  route: "/docs/components/drawer",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
