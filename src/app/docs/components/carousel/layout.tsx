import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Carousel",
  description: "A horizontal or vertical slider on Embla, with the arrows wired up.",
  route: "/docs/components/carousel",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
