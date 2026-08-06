import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the whole page is a live
// playground), and a Client Component cannot export metadata. A layout can,
// and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Design System",
  description:
    "Every SubstrateUI component on one page, rendered live in the active theme — the kitchen-sink view for comparing components side by side.",
  route: "/design-system",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
