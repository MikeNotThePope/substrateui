import { ThemeToggle } from "@/components/theme-toggle"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "ThemeToggle",
  description:
    "A three-way colour-scheme control — light, dark, follow the system — that owns no theme state of its own.",
  route: "/docs/components/theme-toggle",
})

const props: PropDef[] = [
  {
    name: "value",
    type: '"light" | "dark" | "system"',
    default: undefined,
    description:
      "The mode that is currently on. `undefined` renders a same-height placeholder instead of the buttons.",
  },
  {
    name: "onValueChange",
    type: "(mode: ThemeMode) => void",
    default: undefined,
    description: "Called with the mode the user picked.",
  },
  {
    name: "labels",
    type: "ThemeToggleLabels",
    default: undefined,
    description: "Translations for the three accessible names.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Merged onto the group.",
  },
]

export default function ThemeTogglePage() {
  return (
    <DocPage
      title="ThemeToggle"
      description="A three-way colour-scheme control: light, dark, and follow the system. One segmented group of icon buttons, each carrying aria-pressed. It owns no theme state — pass the mode in, take the change back out."
    >
      <ComponentPreview
        code={`import { ThemeToggle, type ThemeMode } from "@mikenotthepope/substrateui/organisms"

const [mode, setMode] = React.useState<ThemeMode>("system")

<ThemeToggle value={mode} onValueChange={setMode} />`}
      >
        <Stack gap="sm">
          <ThemeToggle value="light" />
          <ThemeToggle value="dark" />
          <ThemeToggle value="system" />
        </Stack>
      </ComponentPreview>

      <ImportLine
        names={["ThemeToggle"]}
        entry="@mikenotthepope/substrateui/organisms"
      />

      <Stack gap="md">
        <H3>It is three modes, not two</H3>
        <P>
          Worth saying plainly, because the control it is most often confused with is a Sun
          and a Moon swapped by <Code>dark:hidden</Code> and <Code>dark:block</Code> — one
          button, two states, no JavaScript. That one is charming and it cannot express
          &quot;follow the system&quot;, which is the mode most people are actually in.
        </P>
        <P>
          Here each mode is its own button carrying <Code>aria-pressed</Code>, so which one
          is on is announced rather than only drawn. Each is icon-only and each is labelled.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>It owns no theme state</H3>
        <P>
          That is not a shortcut. It is what keeps this package free of a theming library.
          An earlier version of this component read <Code>useTheme</Code> from{" "}
          <Code>next-themes</Code> directly — and <Code>next-themes</Code> is a devDependency
          here rather than a peer, so the bundler does not leave it alone: publishing the
          component like that put a private second copy of the package inside{" "}
          <Code>dist/organisms.js</Code>. Its React context is one no consumer&apos;s own{" "}
          <Code>&lt;ThemeProvider&gt;</Code> can reach, so <Code>useTheme</Code> falls back to{" "}
          <Code>{"{ setTheme: () => {}, themes: [] }"}</Code>: three unpressed buttons that do
          nothing, with no error anywhere.
        </P>
        <P>
          <Code>Toaster</Code> was cut loose from the same package for a near-identical
          reason. <Code>audit:boundary</Code> now fails the library build if any published
          entry bundles <Code>next</Code> or <Code>next-themes</Code> again.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Wiring it to next-themes</H3>
        <P>
          Five lines, in your application, where <Code>next-themes</Code> is a real
          dependency:
        </P>
      </Stack>

      <ComponentPreview
        defaultOpen
        code={`"use client"

import { useTheme } from "next-themes"
import { ThemeToggle, type ThemeMode } from "@mikenotthepope/substrateui/organisms"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  return <ThemeToggle value={theme as ThemeMode} onValueChange={setTheme} />
}`}
      >
        <ThemeToggle value="system" />
      </ComponentPreview>

      <Stack gap="md">
        <H3>The placeholder</H3>
        <P>
          With no <Code>value</Code> it renders an <Code>aria-hidden</Code> box of the same
          height instead of the buttons. The mode usually comes from{" "}
          <Code>localStorage</Code>, which the server cannot read, so the first client render
          has to agree with the server render — and three buttons whose pressed state was
          guessed do not. This is the mount wait, moved to where it is cheap: a caller who
          knows the mode on the server never pays for it.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Where it belongs on this site</H3>
        <P>
          In the header&apos;s preferences popover and nowhere else — see the site chrome
          rules in <Code>CONTRIBUTING.md</Code>. That is a rule about this documentation
          site, not about your application.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>
    </DocPage>
  )
}
