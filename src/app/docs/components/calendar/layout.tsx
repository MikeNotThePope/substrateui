import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Calendar",
  description: "A date picker calendar built on react-day-picker with themed styling. Supports single date, range, and multiple date selection modes.",
  route: "/docs/components/calendar",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
