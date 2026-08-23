import { pageMetadata } from "@/lib/site";

// The examples are interactive, so they render through a Client Component and
// this route's metadata lives here rather than in page.tsx.
export const metadata = pageMetadata({
  title: "Sortable",
  description:
    "A reorderable list — buttons first, drag as the mouse shortcut.",
  route: "/docs/components/sortable",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
