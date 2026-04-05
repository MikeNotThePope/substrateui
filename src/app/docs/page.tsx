import { DocPage } from "./_components/doc-page"
import { ComponentPreview } from "./_components/component-preview"
import { H2, Code, Mono } from "@/components/ui/typography"
import { Stack } from "@/components/ui/stack"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldHint } from "@/components/ui/field"
import { Cluster } from "@/components/ui/cluster"

export default function DocsPage() {
  return (
    <DocPage
      title="Getting Started"
      description="Everything you need to install SubstrateUI and render your first component."
    >
      <Stack gap="xl">
        {/* Installation */}
        <section>
          <H2>Installation</H2>
          <Stack gap="md" className="mt-4">
            <div className="border-2 rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-muted border-b-2">
                <Mono className="text-xs text-muted-foreground">Terminal</Mono>
              </div>
              <pre className="p-4 bg-warm-950 dark:bg-warm-900 text-warm-200 text-sm overflow-x-auto">
                <code>npm install substrateui</code>
              </pre>
            </div>
          </Stack>
        </section>

        {/* Peer Dependencies */}
        <section>
          <H2>Peer Dependencies</H2>
          <Stack gap="md" className="mt-4">
            <div className="border-2 rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-muted border-b-2">
                <Mono className="text-xs text-muted-foreground">Terminal</Mono>
              </div>
              <pre className="p-4 bg-warm-950 dark:bg-warm-900 text-warm-200 text-sm overflow-x-auto">
                <code>npm install tailwindcss@latest @tailwindcss/postcss tw-animate-css next-themes</code>
              </pre>
            </div>
          </Stack>
        </section>

        {/* CSS Setup */}
        <section>
          <H2>CSS Setup</H2>
          <Stack gap="md" className="mt-4">
            <p className="text-muted-foreground">
              Replace your <Code>globals.css</Code> with the following:
            </p>
            <div className="border-2 rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-muted border-b-2">
                <Mono className="text-xs text-muted-foreground">globals.css</Mono>
              </div>
              <pre className="p-4 bg-warm-950 dark:bg-warm-900 text-warm-200 text-sm overflow-x-auto">
                <code>{`@import "tailwindcss";
@import "tw-animate-css";
@import "substrateui/styles.css";
@source "../node_modules/substrateui";`}</code>
              </pre>
            </div>
          </Stack>
        </section>

        {/* Font Setup */}
        <section>
          <H2>Font Setup (Recommended)</H2>
          <Stack gap="md" className="mt-4">
            <p className="text-muted-foreground">
              SubstrateUI is designed for DM Sans + DM Mono. Set them up via <Code>next/font/google</Code> in your root layout:
            </p>
            <div className="border-2 rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-muted border-b-2">
                <Mono className="text-xs text-muted-foreground">layout.tsx</Mono>
              </div>
              <pre className="p-4 bg-warm-950 dark:bg-warm-900 text-warm-200 text-sm overflow-x-auto">
                <code>{`import { DM_Sans, DM_Mono } from "next/font/google"

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" })
const mono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
})

// Apply to <html> or <body>:
// className={\`\${sans.variable} \${mono.variable}\`}`}</code>
              </pre>
            </div>
          </Stack>
        </section>

        {/* Dark Mode */}
        <section>
          <H2>Dark Mode Setup</H2>
          <Stack gap="md" className="mt-4">
            <p className="text-muted-foreground">
              Wrap your app in a <Code>ThemeProvider</Code> from <Code>next-themes</Code>:
            </p>
            <div className="border-2 rounded-lg overflow-hidden">
              <div className="px-4 py-2 bg-muted border-b-2">
                <Mono className="text-xs text-muted-foreground">layout.tsx</Mono>
              </div>
              <pre className="p-4 bg-warm-950 dark:bg-warm-900 text-warm-200 text-sm overflow-x-auto">
                <code>{`import { ThemeProvider } from "next-themes"

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`}</code>
              </pre>
            </div>
          </Stack>
        </section>

        {/* First Component */}
        <section>
          <H2>Your First Component</H2>
          <Stack gap="md" className="mt-4">
            <p className="text-muted-foreground">
              Here&apos;s a complete example combining Button, Stack, Card, and Field:
            </p>
            <ComponentPreview
              code={`import { Button, Stack, Card, CardHeader, CardTitle, CardContent, CardFooter, Field, FieldLabel, FieldHint, Input, Badge, Cluster } from 'substrateui'

export function CreateProject() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Stack gap="md">
          <Field>
            <FieldLabel>Project Name</FieldLabel>
            <Input placeholder="my-awesome-app" />
            <FieldHint>This will be your repo name.</FieldHint>
          </Field>
          <Cluster gap="sm">
            <Badge>Next.js</Badge>
            <Badge variant="secondary">TypeScript</Badge>
          </Cluster>
        </Stack>
      </CardContent>
      <CardFooter>
        <Button variant="amber">Create</Button>
      </CardFooter>
    </Card>
  )
}`}
            >
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Create Project</CardTitle>
                  <CardDescription>Spin up a new project in one click.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Stack gap="md">
                    <Field>
                      <FieldLabel>Project Name</FieldLabel>
                      <Input placeholder="my-awesome-app" />
                      <FieldHint>This will be your repo name.</FieldHint>
                    </Field>
                    <Cluster gap="sm">
                      <Badge>Next.js</Badge>
                      <Badge variant="secondary">TypeScript</Badge>
                      <Badge variant="outline">Tailwind</Badge>
                    </Cluster>
                  </Stack>
                </CardContent>
                <CardFooter>
                  <Cluster gap="sm">
                    <Button variant="amber">Create Project</Button>
                    <Button variant="outline">Cancel</Button>
                  </Cluster>
                </CardFooter>
              </Card>
            </ComponentPreview>
          </Stack>
        </section>
      </Stack>
    </DocPage>
  )
}
