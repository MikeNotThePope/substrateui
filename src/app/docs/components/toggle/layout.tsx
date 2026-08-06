import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Toggle",
  description: "A button that stays down. One control, two states — bold on or off, a filter applied or not. For a set where the choices are alternatives, use ToggleGroup.",
  route: "/docs/components/toggle",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
