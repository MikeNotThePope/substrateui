import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"
import { SkipLinkDemo } from "./skip-link-demo"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "SkipLink",
  description:
    "A bypass link that jumps keyboard users straight to the main content, past the header and navigation. Hidden until focused.",
  route: "/docs/components/skip-link",
})

const props: PropDef[] = [
  {
    name: "href",
    type: "string",
    default: '"#main-content"',
    description: "Fragment id of the element to jump to.",
  },
  {
    name: "children",
    type: "ReactNode",
    default: '"Skip to content"',
    description: "The link label. Replace it to translate or reword.",
  },
  {
    name: "...a props",
    type: "React.ComponentProps<'a'>",
    default: undefined,
    description: "Forwarded to the anchor element.",
  },
]

export default function SkipLinkPage() {
  return (
    <DocPage
      title="SkipLink"
      description="A bypass link that jumps keyboard users straight to the main content, past the header and navigation. Hidden until focused, so it costs nothing visually and is the first thing Tab reaches. This site uses it — press Tab from the top of any page."
    >
      <P className="text-sm text-muted-foreground">
        Click the box below, then press Tab. The link appears; press Enter to jump.
      </P>
      <ComponentPreview
        code={`import { SkipLink } from "@mikenotthepope/substrateui"

<SkipLink />
<SiteHeader />
<main id="main-content" tabIndex={-1}>
  …
</main>`}
      >
        <SkipLinkDemo />
      </ComponentPreview>

      <ImportLine names={["SkipLink"]} />

      <Stack gap="md">
        <H3>Wiring the target</H3>
        <P>
          The link is only half of the pattern. Give the target element a matching{" "}
          <Code>id</Code> and <Code>tabIndex={"{-1}"}</Code> — without the negative tabindex,
          browsers scroll to the element but leave focus where it was, so the next Tab press
          returns to the navigation the user was trying to skip.
        </P>
        <P>
          Add <Code>outline-none</Code> to the target as well. It receives focus programmatically
          rather than by keyboard, so a focus ring there is noise.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Placement</H3>
        <P>
          Render it as the first focusable element in the document, immediately inside{" "}
          <Code>&lt;body&gt;</Code> and before the header. Anything focusable above it has to be
          tabbed through first, which defeats the purpose.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          This satisfies WCAG 2.4.1 Bypass Blocks (Level A), which requires a way past blocks of
          content repeated across pages — a header and a sidebar of 100+ links, in this site&apos;s
          case. It matters most for keyboard and switch-device users, for whom every repeated link
          is a keystroke on every page.
        </P>
        <P>
          The link uses <Code>:focus</Code> rather than <Code>:focus-visible</Code> on purpose: it
          is only ever reached by keyboard, and Safari does not match{" "}
          <Code>:focus-visible</Code> on anchors it has moved focus to.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>
    </DocPage>
  )
}
