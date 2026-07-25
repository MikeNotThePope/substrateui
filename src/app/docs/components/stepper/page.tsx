import { Stepper } from "@/components/ui/stepper"
import { Stack } from "@/components/ui/stack"
import { H3, P } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const props: PropDef[] = [
  { name: "steps", type: "{ label: ReactNode; description?: ReactNode }[]", default: undefined, description: "The ordered steps to render." },
  { name: "activeStep", type: "number", default: undefined, description: "Zero-based index of the current step. Earlier steps render as completed." },
  { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction." },
]

const steps = [
  { label: "Account", description: "Your details" },
  { label: "Shipping", description: "Where to" },
  { label: "Payment", description: "How to pay" },
  { label: "Review", description: "Confirm" },
]

export default function StepperPage() {
  return (
    <DocPage
      title="Stepper"
      description="A numbered progress indicator for multi-step flows like checkout, onboarding, and form wizards. Completed steps show a check, the active step is highlighted, and upcoming steps are muted."
    >
      <Stack gap="md">
        <H3>Horizontal</H3>
        <ComponentPreview
          code={`<Stepper
  activeStep={1}
  steps={[
    { label: "Account", description: "Your details" },
    { label: "Shipping", description: "Where to" },
    { label: "Payment", description: "How to pay" },
    { label: "Review", description: "Confirm" },
  ]}
/>`}
        >
          <div className="w-full">
            <Stepper activeStep={1} steps={steps} />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Vertical</H3>
        <ComponentPreview
          code={`<Stepper orientation="vertical" activeStep={2} steps={steps} />`}
        >
          <div className="w-64">
            <Stepper orientation="vertical" activeStep={2} steps={steps} />
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          The stepper is an ordered list; the active step carries{" "}
          <code>aria-current=&quot;step&quot;</code>, and each step exposes a{" "}
          <code>data-state</code> of <code>complete</code>, <code>active</code>, or{" "}
          <code>upcoming</code> for styling hooks. State is conveyed by the check
          glyph and text weight, not color alone.
        </P>
      </Stack>
    </DocPage>
  )
}
