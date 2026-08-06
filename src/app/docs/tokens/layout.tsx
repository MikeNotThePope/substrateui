import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Colors",
  description: "OKLCH-based color system with perceptually uniform scaling and CVD-safe pairings. Showing the active theme — switch themes in the header to compare.",
  route: "/docs/tokens",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
