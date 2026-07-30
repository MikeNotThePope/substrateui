import { Link } from "@/components/ui/link"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const linkProps: PropDef[] = [
  {
    name: "href",
    type: "string",
    default: undefined,
    description:
      "Where the link goes. Required, and the one prop the contract insists on — every router link accepts at least this.",
  },
]

const providerProps: PropDef[] = [
  {
    name: "component",
    type: "LinkComponent",
    default: "a plain <a>",
    description:
      "The component every Link in the tree renders through — next/link, React Router's Link, or an adapter around one.",
  },
]

export default function LinkPage() {
  return (
    <DocPage
      title="Link"
      description="A link that routes through your framework instead of reloading the page. It resolves its element from LinkProvider at render, so the library never imports a router — and works as a plain anchor when there is no provider."
    >
      <ComponentPreview
        code={`<Link href="/docs/components/button" className="underline underline-offset-4">
  Button
</Link>`}
      >
        <Cluster gap="md">
          <Link
            href="/docs/components/button"
            className="underline underline-offset-4 hover:text-primary"
          >
            Button
          </Link>
          <Link
            href="/docs/components/badge"
            className="underline underline-offset-4 hover:text-primary"
          >
            Badge
          </Link>
        </Cluster>
      </ComponentPreview>

      <ImportLine names={["Link", "LinkProvider", "useLinkComponent"]} />

      <Stack gap="md">
        <H3>Why this exists</H3>
        <Stack gap="sm">
          <P>
            The suite renders navigation in places you do not control — a
            breadcrumb inside a block, a sidebar item inside a shell. If those were
            plain anchors, every one would be a full page load in a routed app; if
            they imported <Code>next/link</Code>, the library would only work in
            Next.
          </P>
          <P>
            So navigation goes through React context. You name your framework&apos;s
            link once, and every <Code>Link</Code> in the tree — including the ones
            inside blocks and organisms — routes client-side. With no provider they
            fall back to <Code>&lt;a&gt;</Code>, so the suite works out of the box
            in any React app.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Wiring the provider</H3>
        <P>
          Once, as high in the tree as your framework allows — the root layout in
          Next, the router&apos;s children elsewhere.
        </P>
        <ComponentPreview
          defaultOpen
          code={`// app/layout.tsx
import NextLink from "next/link"
import { LinkProvider } from "@mikenotthepope/substrateui"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LinkProvider component={NextLink}>{children}</LinkProvider>
      </body>
    </html>
  )
}`}
        >
          <P className="text-sm text-muted-foreground">
            Every <Code>Link</Code> below this point now navigates through the Next
            router.
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Routers that use a different prop</H3>
        <P>
          The contract is <Code>href</Code>. React Router and Remix take{" "}
          <Code>to</Code>, so they need a two-line adapter — declared outside your
          component, not inline, or React remounts every link on each render.
        </P>
        <ComponentPreview
          defaultOpen
          code={`import { Link as RouterLink } from "react-router-dom"
import { LinkProvider, type LinkComponent } from "@mikenotthepope/substrateui"

// Declared at module scope: a component created during render is a new type
// every time, and React unmounts and remounts the whole subtree.
const RouterAdapter: LinkComponent = ({ href, ...props }) => (
  <RouterLink to={href} {...props} />
)

<LinkProvider component={RouterAdapter}>{children}</LinkProvider>`}
        >
          <P className="text-sm text-muted-foreground">
            The same shape works for TanStack Router, or any link that takes a
            destination and spreads the rest onto an anchor.
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Reaching the link from your own components</H3>
        <P>
          <Code>useLinkComponent</Code> returns whatever the nearest provider
          supplied, for components of your own that need a router-aware link
          without hard-coding a framework. It is the same hook{" "}
          <Code>Link</Code> uses.
        </P>
        <ComponentPreview
          defaultOpen
          code={`function BackToTop({ children }: { children: React.ReactNode }) {
  const Anchor = useLinkComponent()
  return <Anchor href="#top" className="text-sm underline">{children}</Anchor>
}`}
        >
          <P className="text-sm text-muted-foreground">
            Outside a provider the hook returns the plain-anchor fallback, so this
            never has to branch.
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Whatever comes out is an anchor with an <Code>href</Code>, so it is
            focusable, announced as a link, and opens in a new tab on
            middle-click — none of which a <Code>div</Code> with an{" "}
            <Code>onClick</Code> gives you. If an action is not navigation, use a{" "}
            <Code>Button</Code>.
          </P>
          <P>
            <Code>Link</Code> supplies no styling: no underline, no colour. An
            underline is the only link cue that does not depend on seeing colour,
            so removing it in body text leaves colour-blind readers unable to find
            the link. Keep it, or replace it with a cue that is not colour.
          </P>
          <P>
            The link text must say where it goes on its own. &quot;Read more&quot;
            repeated down a page gives a screen-reader user a list of identical
            destinations.
          </P>
          <P>
            An external link should say so — <Code>target=&quot;_blank&quot;</Code>{" "}
            with <Code>rel=&quot;noreferrer&quot;</Code> and something in the
            accessible name noting it opens a new tab, since an unannounced tab
            switch strands people using magnification or a screen reader.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          Every prop other than <Code>href</Code> — <Code>className</Code>,{" "}
          <Code>target</Code>, <Code>rel</Code>, <Code>onClick</Code>,{" "}
          <Code>ref</Code> — is passed through to the resolved component untouched.
          See <Code>LinkProps</Code>, which is{" "}
          <Code>
            React.ComponentPropsWithRef&lt;&quot;a&quot;&gt;
          </Code>{" "}
          with <Code>href</Code> made required.
        </P>
        <PropsTable props={linkProps} />

        <H3>LinkProvider</H3>
        <PropsTable props={providerProps} />

        <H3>useLinkComponent</H3>
        <PropsTable
          props={[
            {
              name: "useLinkComponent()",
              type: "() => LinkComponent",
              default: undefined,
              description:
                "The link component from the nearest LinkProvider, or the plain-anchor fallback.",
            },
          ]}
        />
      </Stack>
    </DocPage>
  )
}
