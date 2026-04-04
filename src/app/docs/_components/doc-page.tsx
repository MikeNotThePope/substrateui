import { Center } from "@/components/ui/center"
import { Stack } from "@/components/ui/stack"
import { H1, P } from "@/components/ui/typography"

interface DocPageProps {
  title: string
  description: string
  children: React.ReactNode
}

export function DocPage({ title, description, children }: DocPageProps) {
  return (
    <Center max="2xl" className="py-8 px-4 md:py-12 md:px-8">
      <Stack gap="lg">
        <div>
          <H1>{title}</H1>
          <P className="text-lg text-muted-foreground mt-2">{description}</P>
        </div>
        {children}
      </Stack>
    </Center>
  )
}
