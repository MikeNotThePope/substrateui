"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * The dark panel a code sample prints on, with its copy button.
 *
 * Extracted from ComponentPreview so the Import section can use the same panel
 * instead of a second copy-to-clipboard implementation drifting alongside it.
 * The inverted colours are load-bearing and deliberately not theme tokens —
 * see decision #16: --ds-muted and --ds-primary-ink are tuned against light
 * stock and measure 2.59:1 and 3.47:1 on ink.
 */
export function CodeBlock({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    // dir="ltr" because source code is LTR regardless of the reading direction
    // of the page around it. Without it the site's RTL toggle right-aligns the
    // sample and moves the copy button to the start edge, which is wrong for
    // code in any locale. It also makes the logical utilities below resolve to
    // the same physical edge in both directions.
    <div dir="ltr" className={cn("relative overflow-hidden bg-warm-950 dark:bg-warm-900", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 end-2 h-8 w-8 text-warm-400 hover:bg-warm-800 hover:text-warm-100"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <pre className="overflow-x-auto p-4 pe-12 text-sm">
        <code className="font-mono text-warm-200">{code}</code>
      </pre>
    </div>
  )
}
