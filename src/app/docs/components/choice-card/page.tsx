import { RadioGroupCard, CheckboxCard } from "@/components/ui/choice-card"
import { RadioGroup } from "@/components/ui/radio-group"
import { Fieldset } from "@/components/ui/fieldset"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Choice Card",
  description:
    "A radio or a checkbox whose whole row is the target: 44px on the short side, a label, a muted description, and a read-only mode for a frozen answer.",
  route: "/docs/components/choice-card",
})

const props: PropDef[] = [
  {
    name: "children",
    type: "React.ReactNode",
    default: undefined,
    description:
      "The option, as the reader sees it. Becomes the card's accessible name.",
  },
  {
    name: "description",
    type: "React.ReactNode",
    default: undefined,
    description:
      "A muted second line under the label. Becomes the card's accessible description, not part of its name.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description:
      "Freeze the answer. Sets `aria-readonly`, keeps the role, the tick and the tab stop, and dims nothing. Set it on the RadioGroup to freeze a whole group at once.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description:
      "The option is unavailable. Dims the card and refuses the pointer — which is what readOnly deliberately does not do.",
  },
  {
    name: "value",
    type: "string",
    default: undefined,
    description:
      "Required on RadioGroupCard: the value the group reports when this card is picked. Optional on CheckboxCard, where it is the value submitted while ticked.",
  },
  {
    name: "className",
    type: "string | ((state) => string)",
    default: undefined,
    description:
      "Merged onto the card. The function form is Base UI's, called with the card's own state — `checked`, `disabled`, `readOnly`.",
  },
  {
    name: "...primitive props",
    type: "Radio.Root | Checkbox.Root props",
    default: undefined,
    description:
      "Everything else is forwarded to the Base UI primitive: `name`, `required`, `checked` / `onCheckedChange` on the checkbox, `render`, `inputRef`.",
  },
]

export default function ChoiceCardPage() {
  return (
    <DocPage
      title="Choice Card"
      description="A radio or a checkbox whose whole row is the target. The card carries the role, so a tap anywhere in it answers — and the same card renders a frozen answer read-only, without looking disabled."
    >
      <ComponentPreview
        code={`import { RadioGroup, RadioGroupCard } from "@mikenotthepope/substrateui"

<RadioGroup defaultValue="two-weeks" aria-label="Notice period">
  <RadioGroupCard value="immediately" description="No handover">
    Immediately
  </RadioGroupCard>
  <RadioGroupCard value="two-weeks" description="The usual arrangement">
    Two weeks
  </RadioGroupCard>
  <RadioGroupCard value="a-month">A month or more</RadioGroupCard>
</RadioGroup>`}
      >
        <div className="w-full max-w-md">
          <RadioGroup defaultValue="two-weeks" aria-label="Notice period">
            <RadioGroupCard value="immediately" description="No handover">
              Immediately
            </RadioGroupCard>
            <RadioGroupCard value="two-weeks" description="The usual arrangement">
              Two weeks
            </RadioGroupCard>
            <RadioGroupCard value="a-month">A month or more</RadioGroupCard>
          </RadioGroup>
        </div>
      </ComponentPreview>

      <ImportLine names={["RadioGroupCard", "CheckboxCard"]} />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="RadioGroup"
          nodes={[{ name: "RadioGroupCard" }]}
        />
        <P>
          <Code>CheckboxCard</Code> has no root of its own — a single one stands alone, and a
          set of them belongs in a <Code>Fieldset</Code> so the set has a name.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>The card is the control</H3>
        <P>
          <Code>RadioGroupItem</Code> and <Code>Checkbox</Code> are 18px boxes that a caller
          pairs with a <Code>Label</Code> beside them, and the target is the box. Here the
          card itself carries <Code>role=&quot;radio&quot;</Code> — it is what{" "}
          <Code>Radio.Root</Code> renders — so the whole row answers, description included,
          and the target is <Code>min-h-11</Code>: 44px on its short side, which is WCAG
          2.2&apos;s enhanced target size (SC 2.5.5) rather than the 24px minimum (SC 2.5.8).
        </P>
        <P>
          Because the control did not move, neither did the keyboard: the group is one tab
          stop, arrow keys move and select within it, and <Code>Space</Code> toggles a
          checkbox card. That is Base UI&apos;s, not ours.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Several answers</H3>
        <ComponentPreview
          code={`<Fieldset legend="Which shifts can you cover?">
  <CheckboxCard name="shift" value="mornings" description="06:00 – 14:00">
    Mornings
  </CheckboxCard>
  <CheckboxCard name="shift" value="evenings" description="14:00 – 22:00">
    Evenings
  </CheckboxCard>
  <CheckboxCard name="shift" value="nights" description="22:00 – 06:00">
    Nights
  </CheckboxCard>
</Fieldset>`}
        >
          <div className="w-full max-w-md">
            <Fieldset legend="Which shifts can you cover?">
              <CheckboxCard name="shift" value="mornings" description="06:00 – 14:00">
                Mornings
              </CheckboxCard>
              <CheckboxCard name="shift" value="evenings" description="14:00 – 22:00">
                Evenings
              </CheckboxCard>
              <CheckboxCard name="shift" value="nights" description="22:00 – 06:00">
                Nights
              </CheckboxCard>
            </Fieldset>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>A frozen answer is not a disabled form</H3>
        <P>
          A submitted answer, a published questionnaire, a staff preview of either: the same
          card with <Code>readOnly</Code>. It keeps its role, its <Code>aria-checked</Code>{" "}
          and its place in the tab order, and gains <Code>aria-readonly</Code>, so a reader
          can still find out what was chosen. Nothing is dimmed.{" "}
          <Code>disabled</Code> says the option is unavailable; <Code>readOnly</Code> says the
          answer is final. A record is the second one, and drawing it with the first is the
          mistake this mode exists to stop.
        </P>
        <ComponentPreview
          code={`<RadioGroup value="two-weeks" readOnly aria-label="Notice period (submitted)">
  <RadioGroupCard value="immediately" description="No handover">
    Immediately
  </RadioGroupCard>
  <RadioGroupCard value="two-weeks" description="The usual arrangement">
    Two weeks
  </RadioGroupCard>
  <RadioGroupCard value="a-month">A month or more</RadioGroupCard>
</RadioGroup>`}
        >
          <div className="w-full max-w-md">
            <RadioGroup
              value="two-weeks"
              readOnly
              aria-label="Notice period (submitted)"
            >
              <RadioGroupCard value="immediately" description="No handover">
                Immediately
              </RadioGroupCard>
              <RadioGroupCard value="two-weeks" description="The usual arrangement">
                Two weeks
              </RadioGroupCard>
              <RadioGroupCard value="a-month">A month or more</RadioGroupCard>
            </RadioGroup>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Disabled, for contrast</H3>
        <ComponentPreview
          code={`<RadioGroup defaultValue="two-weeks" aria-label="Notice period">
  <RadioGroupCard value="immediately" disabled description="Not for this role">
    Immediately
  </RadioGroupCard>
  <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
</RadioGroup>`}
        >
          <div className="w-full max-w-md">
            <RadioGroup defaultValue="two-weeks" aria-label="Notice period">
              <RadioGroupCard
                value="immediately"
                disabled
                description="Not for this role"
              >
                Immediately
              </RadioGroupCard>
              <RadioGroupCard value="two-weeks">Two weeks</RadioGroupCard>
            </RadioGroup>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Naming</H3>
        <P>
          The label and the description both sit inside the element that carries the role, so
          the card points <Code>aria-labelledby</Code> at the label alone and{" "}
          <Code>aria-describedby</Code> at the description. The name is the option; the
          description describes it. Pass your own <Code>aria-label</Code> and it wins; pass
          your own <Code>aria-describedby</Code> and it is appended to the card&apos;s.
        </P>
        <P>
          The group still needs a name of its own — the question being asked. Put it on the{" "}
          <Code>RadioGroup</Code> as an <Code>aria-label</Code>, or in a{" "}
          <Code>Fieldset</Code> legend.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Selection is a fill, not a border</H3>
        <P>
          A picked card is <Code>bg-accent</Code> with a filled mark, rather than a{" "}
          <Code>border-primary</Code> edge. An unlayered <Code>* {"{"} border-color {"}"}</Code>{" "}
          rule in the token sheet currently outranks every <Code>border-&lt;colour&gt;</Code>{" "}
          utility, so a card that showed selection by recolouring its border would look
          exactly like a resting one. That is a system-wide bug rather than this
          component&apos;s, and the fill is what works today.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>
    </DocPage>
  )
}
