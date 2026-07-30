import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"

export default function CliPage() {
  return (
    <DocPage
      title="CLI"
      description="A zero-dependency init helper. It wires the stylesheet imports into your global CSS and prints the remaining setup. Unlike copy-paste generators, it never copies component source into your repo — the components stay in the installed package, so upgrades are a version bump, not a merge."
    >
      <Stack gap="md">
        <H3>init</H3>
        <P>
          Run it once after installing. It detects your global stylesheet (via{" "}
          <Code>components.json</Code> or common paths), adds any missing{" "}
          <Code>@import</Code> / <Code>@source</Code> lines in the correct order,
          and prints the font, dark-mode, and router setup.
        </P>
        <ComponentPreview
          defaultOpen
          code={`# with the package installed
npx substrateui init

# or point it at a specific stylesheet
npx substrateui init --css src/app/globals.css

# non-interactive (CI, scripts)
npx substrateui init --yes`}
        >
          <P className="font-mono text-sm">
            <Code>npx substrateui init</Code>
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>What it writes</H3>
        <P>
          The command is idempotent — it only inserts lines that are missing, and
          keeps <Code>@import &quot;tailwindcss&quot;</Code> first as Tailwind v4
          requires:
        </P>
        <ComponentPreview
          defaultOpen
          code={`@import "tailwindcss";
@import "tw-animate-css";
@import "@mikenotthepope/substrateui/styles.css";
@source "../node_modules/@mikenotthepope/substrateui";`}
        >
          <P className="text-sm text-muted-foreground">
            Added to your global stylesheet.
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Options</H3>
        <Stack gap="sm">
          <P>
            <Code>--css &lt;path&gt;</Code> — target a specific stylesheet instead
            of auto-detecting.
          </P>
          <P>
            <Code>-y, --yes</Code> — apply changes without the confirmation prompt.
          </P>
          <P>
            <Code>-h, --help</Code> — show usage.
          </P>
        </Stack>
      </Stack>
    </DocPage>
  )
}
