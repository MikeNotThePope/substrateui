import { Center } from "@/components/ui/center"
import { Stack } from "@/components/ui/stack"
import { H1, P } from "@/components/ui/typography"
import { DocEyebrow } from "./doc-eyebrow"
import { PlateLine } from "./plate-line"

interface DocPageProps {
  title: string
  description: string
  children: React.ReactNode
}

export function DocPage({ title, description, children }: DocPageProps) {
  return (
    <Center max="2xl" className="py-8 px-4 md:py-12 md:px-8">
      <Stack gap="lg">
        {/* Press furniture: slug line, title, then the trim rule that says
            where the sheet's own margin ends and the content begins. The
            rule is a hairline — the heavy borders in this page belong to the
            components, and matching them here would flatten the hierarchy. */}
        <div>
          <DocEyebrow />
          <H1 className="mt-3">{title}</H1>
          <P className="text-lg text-muted-foreground mt-2">{description}</P>
          <div aria-hidden className="mt-6 border-b border-border" />
          {/* Which file prints this sheet. Below the trim rule because it
              describes the plate, not the page's subject. */}
          <PlateLine />
        </div>
        {children}
      </Stack>
    </Center>
  )
}
