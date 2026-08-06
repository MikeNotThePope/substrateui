import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"
import { ThemingDemo, GeneratedCssDemo } from "./theming-demo"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Theming API",
  description: "Define named themes in TypeScript, register them, and swap between them at runtime.",
  route: "/docs/foundations/theming",
})

const registryProps: PropDef[] = [
  { name: "themes", type: "Theme[]", default: "[]", description: "Themes made available to useTheme and ThemeSelect." },
  { name: "defaultTheme", type: "string", default: '"default"', description: "Applied when nothing is stored. \"default\" means the stylesheet's built-in palette." },
  { name: "storageKey", type: "string", default: '"substrateui-theme"', description: "localStorage key for the persisted choice." },
  { name: "persist", type: "boolean", default: "true", description: "Remember the choice across reloads." },
  { name: "injectCss", type: "boolean", default: "true", description: "Inject themeToCss(themes) into the head. Turn off if you ship it in your stylesheet." },
  { name: "scoped", type: "boolean", default: "false", description: "Theme a subtree: render a wrapper carrying data-theme and leave the document element alone." },
  { name: "className", type: "string", default: undefined, description: "Classes for the wrapper element rendered when scoped is set." },
]

const configProps: PropDef[] = [
  { name: "name", type: "string", default: undefined, description: "Becomes the data-theme value — letters, digits, - and _ only." },
  { name: "label", type: "string", default: "title-cased name", description: "Human-readable name, shown by ThemeSelect." },
  { name: "extends", type: "Theme", default: undefined, description: "Start from another theme's tokens and override them." },
  { name: "tokens", type: "ThemeTokens", default: undefined, description: "Tokens applied to both colour schemes." },
  { name: "light", type: "ThemeTokens", default: undefined, description: "Light-scheme tokens, overriding tokens." },
  { name: "dark", type: "ThemeTokens", default: undefined, description: "Dark-scheme tokens, overriding tokens." },
]

const selectProps: PropDef[] = [
  { name: "label", type: "string", default: '"Theme"', description: "Accessible name for the trigger." },
  { name: "baseLabel", type: "string", default: '"Default"', description: "Label for the built-in palette option." },
  { name: "includeBase", type: "boolean", default: "true", description: "Offer the built-in palette alongside the registered themes." },
  { name: "className", type: "string", default: undefined, description: "Classes for the select trigger." },
]

function Snippet({ children }: { children: string }) {
  return (
    <pre
      className="overflow-x-auto rounded-md border-2 bg-warm-950 p-4 text-sm text-warm-200 dark:bg-warm-900"
      dir="ltr"
    >
      <code className="font-mono">{children}</code>
    </pre>
  )
}

export default function ThemingPage() {
  return (
    <DocPage
      title="Theming API"
      description="Define named themes in TypeScript, register them, and swap between them at runtime. A theme is a map of semantic tokens — every component that uses those tokens re-colours itself."
    >
      <Stack gap="md">
        <H3>Example</H3>
        <P>
          <Code>createTheme</Code> builds a token map, <Code>ThemeRegistry</Code>{" "}
          owns which one is active, and <Code>ThemeSelect</Code> switches
          between them. Nothing else in your app changes — components already
          read these tokens.
        </P>
        <ComponentPreview
          code={`const ocean = createTheme({
  name: "ocean",
  tokens: { ring: "oklch(0.62 0.13 232)" },
  light: { primary: "oklch(0.45 0.12 232)" },
  dark: { primary: "oklch(0.72 0.13 232)" },
})

<ThemeRegistry themes={[ocean, moss]}>
  <ThemeSelect />
  {children}
</ThemeRegistry>`}
        >
          <ThemingDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Extending a theme</H3>
        <P>
          <Code>extends</Code> starts from another theme&apos;s tokens, so a
          variant only names what actually differs. The source theme is never
          mutated.
        </P>
        <Snippet>{`const moss = createTheme({
  name: "moss",
  extends: ocean,
  tokens: { ring: "oklch(0.60 0.12 148)" },
  light: { primary: "oklch(0.43 0.11 148)" },
  dark: { primary: "oklch(0.74 0.13 148)" },
})`}</Snippet>
      </Stack>

      <Stack gap="md">
        <H3>Shipping themes as CSS</H3>
        <P>
          <Code>ThemeRegistry</Code> injects theme CSS at runtime so a new theme
          works with no build changes. Static CSS is faster — it is there on the
          first paint — so for themes you know at build time, write{" "}
          <Code>themeToCss</Code>&apos;s output into your stylesheet and pass{" "}
          <Code>injectCss={"{false}"}</Code>.
        </P>
        <ComponentPreview code={`themeToCss([ocean, moss])`}>
          <GeneratedCssDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Avoiding a flash on first load</H3>
        <P>
          The stored theme is only readable on the client, so anything that runs
          after hydration shows the default palette first.{" "}
          <Code>themeInitScript()</Code> returns the source of a tiny script that
          applies the stored theme before first paint — run it inline in your
          document head.
        </P>
        <Snippet>{`// app/layout.tsx — a server component
import { themeInitScript } from "substrateui"

<head>
  <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
</head>`}</Snippet>
        <P className="text-sm text-muted-foreground">
          In the Next.js App Router, everything SubstrateUI exports is a client
          module, so <Code>themeInitScript()</Code> cannot be called during a
          server render. Paste its output as a literal string in that case — it
          is a fixed snippet, and the only thing you would change is the storage
          key.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Theming a subtree</H3>
        <P>
          <Code>scoped</Code> puts <Code>data-theme</Code> on a wrapper element
          instead of the document element, which is what you want for a preview
          pane, an embedded widget, or a section that deliberately breaks from
          the rest of the page. Generated CSS targets both placements, so dark
          mode keeps working inside a scoped subtree.
        </P>
        <Snippet>{`<ThemeRegistry themes={[ocean]} defaultTheme="ocean" scoped persist={false}>
  <PreviewPane />
</ThemeRegistry>`}</Snippet>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P className="text-sm text-muted-foreground">ThemeRegistry</P>
        <PropsTable props={registryProps} />
        <P className="text-sm text-muted-foreground">createTheme(config)</P>
        <PropsTable props={configProps} />
        <P className="text-sm text-muted-foreground">ThemeSelect</P>
        <PropsTable props={selectProps} />
        <P>
          <Code>useTheme()</Code> returns{" "}
          <Code>
            {"{ theme, setTheme, themes, resolvedTheme }"}
          </Code>{" "}
          and throws outside a <Code>ThemeRegistry</Code>.{" "}
          <Code>ThemeTokens</Code> autocompletes every semantic token name but
          accepts any custom property, so raw palette steps work too.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          Themes are colour only — no component behaviour changes — so the
          burden is on the tokens you pick. Run the{" "}
          <Code>bun run audit:contrast</Code> check against your own theme
          before shipping it; the built-in palettes clear WCAG AA on every
          pairing, and a custom theme has no such guarantee.{" "}
          <Code>ThemeSelect</Code> renders a labelled select and holds its
          layout with a same-size placeholder until the stored theme is known,
          so the first paint does not shift.
        </P>
      </Stack>
    </DocPage>
  )
}
