import { Spinner } from "@/components/ui/spinner"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3, P, Code, Muted } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const spinnerProps: PropDef[] = [
  {
    name: "size",
    type: '"sm" | "default" | "lg"',
    default: '"default"',
    description: "Controls the diameter of the spinner.",
  },
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the spinner element.",
  },
]

export default function SpinnerPage() {
  return (
    <DocPage
      title="Spinner"
      description="An animated loading indicator for asynchronous operations. Renders as a spinning circle with a primary-colored arc."
    >
      <Stack gap="md">
        <H3>Sizes</H3>
        <ComponentPreview
          code={`<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />`}
        >
          <Cluster gap="lg" align="center">
            <Stack gap="xs" className="items-center">
              <Spinner size="sm" />
              <Muted>sm</Muted>
            </Stack>
            <Stack gap="xs" className="items-center">
              <Spinner />
              <Muted>default</Muted>
            </Stack>
            <Stack gap="xs" className="items-center">
              <Spinner size="lg" />
              <Muted>lg</Muted>
            </Stack>
          </Cluster>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={spinnerProps} />
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Spinner renders with <Code>role=&quot;status&quot;</Code> and an{" "}
            <Code>aria-label</Code> so screen readers announce the loading
            state rather than silently skipping over it.
          </P>
          <P>
            For standalone loading pages, pair Spinner with visible text
            (&quot;Loading…&quot;) for sighted users — the animation alone
            carries no meaning for users who have turned off the spinner via
            reduced motion.
          </P>
        </Stack>
      </Stack>
    </DocPage>
  )
}
