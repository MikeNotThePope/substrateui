"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Caps } from "@/components/caps"
import { RegMark } from "@/components/reg-mark"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  title?: string
}

export function ComponentPreview({ children, code, title }: ComponentPreviewProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
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
      <div className="relative border-2 border-t-0 rounded-b-lg bg-warm-950 dark:bg-warm-900 overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 text-warm-400 hover:text-warm-100 hover:bg-warm-800"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
        <pre className="p-4 pr-12 overflow-x-auto text-sm">
          <code className="font-mono text-warm-200">{code}</code>
        </pre>
      </div>
    </Stack>
  )
}
