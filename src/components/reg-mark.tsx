// ─── Registration mark ────────────────────────────────────────────────
// The crosshair a printer aligns plates by. Structural, not decorative:
// it marks where the sheet's own furniture starts, which is why it sits
// beside eyebrows and slug lines and never beside body copy.
//
// Site-only, like Caps — kept out of src/components/index.ts.

export function RegMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
    >
      <circle cx="9" cy="9" r="5.5" />
      <path d="M9 0v18M0 9h18" />
    </svg>
  )
}
