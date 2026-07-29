import { cn } from "@/lib/utils"

// ─── Utility caps ─────────────────────────────────────────────────────
// The tiny type printed on the edge of a swatch card: condensed, 600,
// uppercase, wide-tracked. The direction's fingerprint, and it only works
// small — the system caps it at 13px, above which it stops reading as a
// spec mark and starts reading as a headline in the wrong face.
//
// Site-only. `--font-utility` is registered in src/app/globals.css, not in
// tokens.css, so this must never be added to src/components/index.ts —
// consumers have no Barlow Condensed to resolve it with.

/** The caps treatment as a class string, for styling an element that
 *  already exists (a table header, a sidebar label) rather than wrapping it. */
export const capsClass =
  "font-utility text-xs font-semibold uppercase tracking-widest"

/** The caps treatment as an element, for labelling something that has no
 *  element of its own yet. */
export function Caps({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <span className={cn(capsClass, className)}>{children}</span>
}
