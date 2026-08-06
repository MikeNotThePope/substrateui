import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Blocks",
  description: "Assembled compositions you paste in and wire up — sign-in and sign-up pages, dashboard stat rows, marketing heroes, and feature grids.",
  route: "/docs/blocks",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
