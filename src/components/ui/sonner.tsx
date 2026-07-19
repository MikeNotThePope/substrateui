"use client"

import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

/** Props for the Toaster component. */
type ToasterProps = React.ComponentProps<typeof Sonner>

/**
 * A theme-aware toast notification container powered by Sonner.
 *
 * @example
 * <Toaster />
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheck className="h-4 w-4" />,
        info: <Info className="h-4 w-4" />,
        warning: <TriangleAlert className="h-4 w-4" />,
        error: <OctagonX className="h-4 w-4" />,
        loading: <LoaderCircle className="h-4 w-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-2 group-[.toaster]:border-border group-[.toaster]:shadow-hard",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success:
            "group-[.toaster]:!border-status-success group-[.toaster]:!bg-status-success-surface group-[.toaster]:!text-status-success-text",
          error:
            "group-[.toaster]:!border-status-error group-[.toaster]:!bg-status-error-surface group-[.toaster]:!text-status-error-text",
          warning:
            "group-[.toaster]:!border-status-warning group-[.toaster]:!bg-status-warning-surface group-[.toaster]:!text-status-warning-text",
          info:
            "group-[.toaster]:!border-status-info group-[.toaster]:!bg-status-info-surface group-[.toaster]:!text-status-info-text",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
