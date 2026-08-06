import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Rating",
  description: "A star rating — a fractional-fill display for aggregate scores, or an interactive input when you pass a change handler.",
  route: "/docs/components/rating",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
