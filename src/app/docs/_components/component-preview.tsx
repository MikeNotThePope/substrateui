"use client"

import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Caps } from "@/components/caps"
import { RegMark } from "@/components/reg-mark"
import { Stack } from "@/components/ui/stack"
import { CodeBlock } from "@/components/code-block"

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  title?: string
  /**
   * Print the code with the specimen instead of behind the toggle. For pages
   * where the code *is* the lesson rather than the recipe for the thing above
   * it — install commands, import lines, configuration.
   */
  defaultOpen?: boolean
}

export function ComponentPreview({ children, code, title, defaultOpen = false }: ComponentPreviewProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    // data-specimen is load-bearing: globals.css uses it to keep headings
    // inside a preview in --font-sans, because a preview shows library output
    // and a consumer's app has no Archivo to render it with (decision S5).
    <Stack gap="none" data-specimen className="shadow-hard rounded-lg">
      {title && (
        /* A proof's slug line names the plate. The three dots this replaces
           were a macOS title bar — window-chrome pastiche that said nothing
           about the component, and part of the templated look the direction
           rules out. */
        <div className="flex items-center gap-2 px-4 py-2.5 border-2 border-b-0 rounded-t-lg bg-muted text-muted-foreground">
          <RegMark className="h-3.5 w-3.5 shrink-0 text-primary" />
          <Caps>{title}</Caps>
        </div>
      )}
      <div className={`border-2 ${title ? "border-t-0" : "rounded-t-lg"} p-6 bg-surface-page flex flex-wrap items-start gap-4`}>
        {children}
      </div>
      {/* The code folds away by default. A page carrying eight worked examples
          with eight code panels open is a page nobody scrolls to the bottom of;
          the specimens are what you scan, and the plate is what you open when
          one of them is the thing you want. No height animation — there is
          nothing here worth making someone wait for. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex w-full items-center gap-1.5 border-2 border-t-0 bg-muted px-4 py-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
          open ? "" : "rounded-b-lg"
        }`}
      >
        <ChevronRight
          aria-hidden
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-90" : "rtl:-scale-x-100"}`}
        />
        <Caps>{open ? "Hide code" : "View code"}</Caps>
      </button>
      {open && <CodeBlock code={code} className="border-2 border-t-0 rounded-b-lg" />}
    </Stack>
  )
}
