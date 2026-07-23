"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { buildPrompt, themeIds, type ThemeId } from "./prompt"

const themeLabels: Record<ThemeId, string> = {
  default: "Default",
  lava: "Lava",
}

function PromptPanel({ theme }: { theme: ThemeId }) {
  const [copied, setCopied] = React.useState(false)
  const prompt = buildPrompt(theme)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative border-2 rounded-lg bg-warm-950 dark:bg-warm-900 overflow-hidden">
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 end-2 text-warm-400 hover:text-warm-100 hover:bg-warm-800"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy prompt"}
      </Button>
      <pre className="p-4 pt-12 overflow-x-auto text-sm max-h-[32rem]" dir="ltr">
        <code className="font-mono text-warm-200">{prompt}</code>
      </pre>
    </div>
  )
}

export function PromptViewer() {
  return (
    <Tabs defaultValue="default">
      <Stack gap="sm">
        <TabsList>
          {themeIds.map((id) => (
            <TabsTrigger key={id} value={id}>
              {themeLabels[id]}
            </TabsTrigger>
          ))}
        </TabsList>
        {themeIds.map((id) => (
          <TabsContent key={id} value={id}>
            <PromptPanel theme={id} />
          </TabsContent>
        ))}
      </Stack>
    </Tabs>
  )
}
