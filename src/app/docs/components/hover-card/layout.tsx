import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Hover Card",
  description: "A card that opens on hover over its trigger — profile previews, link details. Anything essential belongs somewhere a touch device can also reach.",
  route: "/docs/components/hover-card",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
