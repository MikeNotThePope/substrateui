"use client"

import * as React from "react"
import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
} from "lucide-react"
import { Toaster as Sonner } from "sonner"

/** Props for the Toaster component. */
type ToasterProps = React.ComponentProps<typeof Sonner>

const subscribeToTheme = (onChange: () => void) => {
  if (typeof MutationObserver === "undefined") return () => {}
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

const getTheme = (): "light" | "dark" =>
  document.documentElement.classList.contains("dark") ? "dark" : "light"

const getServerTheme = (): "light" | "dark" => "light"

/**
 * Resolves light/dark from the `.dark` class on `<html>` — the same signal
 * every other component in the system reads.
 *
 * This deliberately avoids `next-themes`. That package is declared an optional
 * peer dependency, but this file's import of it was top-level and tsup marks it
 * external, so it survived into `dist/index.js` as a bare import and any app
 * without next-themes installed failed to build:
 *
 *   [MISSING_EXPORT] "useTheme" is not exported by
 *   "__vite-optional-peer-dep:next-themes:@mikenotthepope/substrateui"
 *
 * Reading the class keeps behaviour identical for next-themes users (it sets
 * that class) while making the package genuinely framework-agnostic.
 */
const useResolvedTheme = (): "light" | "dark" =>
  React.useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme)

/**
 * A theme-aware toast notification container powered by Sonner.
 *
 * @example
 * <Toaster />
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useResolvedTheme()

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
