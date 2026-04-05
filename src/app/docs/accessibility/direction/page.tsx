import Link from "next/link"
import { DocPage } from "../../_components/doc-page"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const codeExample = `import { DirectionProvider } from "@substrateui/core"

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html dir="rtl">
      <body>
        <DirectionProvider dir="rtl">
          {children}
        </DirectionProvider>
      </body>
    </html>
  )
}`

export default function DirectionPage() {
  return (
    <DocPage
      title="Direction (RTL)"
      description="How SubstrateUI supports right-to-left layout, what is handled automatically, and where consumers still need to make choices per usage."
    >
      <Stack gap="md">
        <H3>Why RTL matters</H3>
        <P>
          The web serves users in roughly twenty right-to-left languages —
          Arabic, Hebrew, Persian, Urdu, and others. For those users, layout
          should flip: reading flow runs from right to left, controls sit on
          the opposite edge, icons pointing forward in LTR point backward in
          RTL, and whole pages read natively rather than as translated-but-
          mirrored LTR interfaces. RTL is a first-class direction in
          SubstrateUI, not an afterthought.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>How to enable RTL in your app</H3>
        <P>
          Set <Code>dir</Code> on the <Code>&lt;html&gt;</Code> element and
          wrap your app in <Code>DirectionProvider</Code> so Radix-based
          primitives pick up the direction:
        </P>
        <pre className="p-4 bg-warm-950 dark:bg-warm-900 text-warm-200 text-sm overflow-x-auto rounded-md" dir="ltr">
          <code>{codeExample}</code>
        </pre>
        <P>
          Setting <Code>dir</Code> on <Code>&lt;html&gt;</Code> — rather than
          on a wrapper <Code>div</Code> — ensures that native HTML elements
          and Radix portals (which render outside the React tree at the
          document body) also inherit the direction. The{" "}
          <Code>DirectionProvider</Code> is what Radix primitives read to
          decide which arrow keys advance focus, which side a menu opens from,
          and so on.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>How the system supports RTL</H3>
        <P>
          SubstrateUI components use logical CSS properties throughout —{" "}
          <Code>ps-*</Code>/<Code>pe-*</Code>, <Code>ms-*</Code>/
          <Code>me-*</Code>, <Code>start-*</Code>/<Code>end-*</Code>,{" "}
          <Code>border-s</Code>/<Code>border-e</Code> — instead of physical{" "}
          <Code>pl</Code>/<Code>pr</Code>/<Code>left</Code>/<Code>right</Code>{" "}
          variants. That means every spacing, border, and positioning rule
          flips automatically when <Code>dir</Code> changes, without per-
          component overrides.
        </P>
        <P>
          Radix primitives (Dialog, Popover, DropdownMenu, Select, Tabs, and
          the rest) consume the same <Code>DirectionProvider</Code>, so
          keyboard navigation, side positioning, and animation origins all
          follow direction. A physical-properties audit script
          (<Code>audit:direction</Code>) runs in CI to prevent regressions
          where a stray <Code>pl-4</Code> sneaks back in.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Known considerations</H3>
        <P>
          Directional icons — chevrons, arrows, carets — need per-usage
          judgment. An accordion chevron should flip in RTL because it
          points in the reading direction; a play button should not, because
          it represents physical playback direction. See the{" "}
          <Link href="/docs/accessibility/direction" className="underline">
            icon audit
          </Link>{" "}
          for classifications of the directional icons shipped with the
          library.
        </P>
        <P>
          Mixed-direction content is supported via <Code>dir=&quot;auto&quot;</Code>{" "}
          on individual elements — useful for user-generated text that may
          contain either script. Numbers, dates, and code blocks should stay
          LTR even inside RTL contexts, which CSS <Code>unicode-bidi</Code>{" "}
          handles automatically for most layouts.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Components that need extra attention in RTL</H3>
        <P>
          Most components flip cleanly. A few expose decisions that belong
          to the consumer rather than the library:
        </P>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component</TableHead>
              <TableHead>What to think about</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">DataTable</TableCell>
              <TableCell>
                Column order follows the <Code>columns</Code> prop. For
                semantically ordered data (e.g., chronological), consider
                reversing column definitions in RTL.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Combobox</TableCell>
              <TableCell>
                Search and chevron icon placement flips automatically;
                confirm filter direction matches expected UX.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Calendar / DatePicker</TableCell>
              <TableCell>
                Week start may differ by locale (Sunday vs. Saturday) —
                that is a locale concern, not a direction concern, but
                often co-occurs.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Pagination</TableCell>
              <TableCell>
                Prev/next buttons swap visually. Ensure any custom arrow
                iconography also flips.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Breadcrumb</TableCell>
              <TableCell>
                Separator glyph should point in reading direction.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Accordion / Collapsible</TableCell>
              <TableCell>
                Chevron rotates in reading direction when expanded.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Stack>

      <Stack gap="md">
        <H3>Test your RTL integration</H3>
        <P>
          These docs include a live direction toggle next to the theme
          toggle in the sidebar (desktop) and header (mobile). Flip it to
          RTL and navigate through any component page to see how the real
          components behave under the direction you plan to ship.
        </P>
      </Stack>
    </DocPage>
  )
}
