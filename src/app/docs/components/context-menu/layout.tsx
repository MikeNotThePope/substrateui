import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Context Menu",
  description: "A menu that appears on right-click. Provides contextual actions relevant to the element under the cursor.",
  route: "/docs/components/context-menu",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
