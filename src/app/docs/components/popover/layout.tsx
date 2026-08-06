import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Popover",
  description: "A floating panel anchored to a trigger element. Use for rich content like forms, menus, or additional details without leaving the current context.",
  route: "/docs/components/popover",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
