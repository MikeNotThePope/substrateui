import { pageMetadata } from "@/lib/site"

// page.tsx for this route is a Client Component (the examples are
// interactive), and a Client Component cannot export metadata. A layout
// can, and it covers exactly this one route.
export const metadata = pageMetadata({
  title: "Combobox",
  description: "A text input bound to a listbox: type to filter, select to commit. Use it when the option list is long enough that a plain select becomes a scroll.",
  route: "/docs/components/combobox",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
