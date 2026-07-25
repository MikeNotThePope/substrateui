"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/** Banner style variants keyed by intent. */
const bannerVariants = cva(
  "flex w-full items-center gap-3 border-b-2 px-4 py-2.5 text-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-surface-raised text-foreground",
        primary: "border-primary-border bg-primary text-primary-foreground",
        info: "border-status-info bg-status-info-surface text-status-info-text",
        warning: "border-status-warning bg-status-warning-surface text-status-warning-text",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/** Props for the Banner component. */
export interface BannerProps
  extends React.ComponentPropsWithRef<"div">,
    VariantProps<typeof bannerVariants> {
  /** Show a dismiss button. @default true */
  dismissible?: boolean
  /** Called after the user dismisses the banner. */
  onDismiss?: () => void
  /** Accessible label for the dismiss button. @default "Dismiss" */
  dismissLabel?: string
}

/**
 * A full-width announcement bar for site-wide messages (new releases, cookie
 * notices, promotions). Sticky-friendly and dismissible; make it stick by
 * adding `className="sticky top-0 z-50"`.
 *
 * @example
 * <Banner variant="primary" onDismiss={() => setOpen(false)}>
 *   <p>SubstrateUI v1.4 is out. <a href="/changelog" className="underline">See what's new</a>.</p>
 * </Banner>
 *
 * @prop variant - "default" | "primary" | "info" | "warning"
 * @prop dismissible - Show the dismiss button (default true).
 * @prop onDismiss - Fired after dismissal.
 */
function Banner({
  variant,
  dismissible = true,
  onDismiss,
  dismissLabel = "Dismiss",
  className,
  children,
  ref,
  ...props
}: BannerProps) {
  const [open, setOpen] = React.useState(true)
  if (!open) return null

  return (
    <div
      ref={ref}
      data-slot="banner"
      role="region"
      aria-label="Announcement"
      className={cn(bannerVariants({ variant }), className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 items-center justify-center gap-2 text-center">
        {children}
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={() => {
            setOpen(false)
            onDismiss?.()
          }}
          className="-me-1 inline-flex size-7 shrink-0 items-center justify-center rounded-md opacity-80 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4"
        >
          <X aria-hidden />
        </button>
      )}
    </div>
  )
}

export { Banner, bannerVariants }
