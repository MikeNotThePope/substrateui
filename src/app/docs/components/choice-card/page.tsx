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
    "A radio or a checkbox whose whole row is the target: 56px tall, a label, a muted description, and two non-answerable modes — a frozen answer and a picture of a form.",
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
    name: "presentational",
    type: "boolean",
    default: "false",
    description:
      "Draw the card with no control in it: no role, no ARIA state, no tab stop. For a picture of a form — a staff preview, a published record waiting on answers. Dims nothing.",
  },
  {
    name: "selected",
    type: "boolean",
    default: "false",
    description:
      "With `presentational`, whether the mark is drawn filled. There is no control to read it from.",
  },
  {
    name: "readOnly",
    type: "boolean",
    default: "false",
    description:
      "Freeze a submitted answer. Base UI's: sets `aria-readonly`, keeps the role, the tick and the tab stop, and dims nothing. Set it on the RadioGroup to freeze a whole group at once.",
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
      description="A radio or a checkbox whose whole row is the target. The card carries the role, so a tap anywhere in it answers — and the same card renders a submitted answer, or a picture of a form with no control at all, without looking disabled."
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
          and the target is <Code>min-h-11</Code>: a 44px floor, which is WCAG 2.2&apos;s
          enhanced target size (SC 2.5.5) rather than the 24px minimum (SC 2.5.8). A
          one-line card measures 56px, because the padding and the line box exceed the
          floor. The hand-rolled rows this replaces measured 36px — enough for SC 2.5.8,
          short of SC 2.5.5 — so the card is a change of look, not a like-for-like port.
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
        <H3>A submitted answer: <Code>readOnly</Code></H3>
        <P>
          An answer somebody gave, which a reader should still be able to read: the same card
          with <Code>readOnly</Code> on the group. It keeps its role, its{" "}
          <Code>aria-checked</Code> and its place in the tab order, and gains{" "}
          <Code>aria-readonly</Code>, so a screen reader can still say which option was
          chosen. Nothing is dimmed. This is Base UI&apos;s own prop — the library adds
          only the refusal to grey it out.
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
        <H3>A picture of a form: <Code>presentational</Code></H3>
        <P>
          A staff preview of a questionnaire, or a published record waiting on answers, is
          not a form at all — nobody is being asked anything. A control there is the wrong
          accessibility object: a <Code>radiogroup</Code> nobody can answer is a tab stop
          that leads nowhere and a question announced to a reader who was not asked it.{" "}
          <Code>presentational</Code> is the same card with no role, no ARIA state and no
          tab stop, and no group needed around it. <Code>selected</Code> fills the mark,
          because there is no control to read it from.
        </P>
        <P>
          It is still not <Code>disabled</Code>. A preview of a form is not a disabled form,
          and dimming it says something untrue about every option on the page.
        </P>
        <ComponentPreview
          code={`<div className="flex flex-col gap-2">
  <RadioGroupCard presentational description="No handover">
    Immediately
  </RadioGroupCard>
  <RadioGroupCard presentational selected description="The usual arrangement">
    Two weeks
  </RadioGroupCard>
  <RadioGroupCard presentational>A month or more</RadioGroupCard>
</div>`}
        >
          <div className="flex w-full max-w-md flex-col gap-2">
            <RadioGroupCard presentational description="No handover">
              Immediately
            </RadioGroupCard>
            <RadioGroupCard
              presentational
              selected
              description="The usual arrangement"
            >
              Two weeks
            </RadioGroupCard>
            <RadioGroupCard presentational>A month or more</RadioGroupCard>
          </div>
        </ComponentPreview>
        <P>
          Every mode comes off one recipe, so the picture and the control cannot drift
          apart. That is the pair this component exists to delete: the applications that
          hand-rolled this kept a test whose whole job was to assert two class strings
          stayed equal.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Two options is not a special case</H3>
        <P>
          A true/false question is a single-select whose two options the caller wrote, so it
          is an ordinary radio group and nothing here knows about booleans.
        </P>
        <ComponentPreview
          code={`<RadioGroup defaultValue="yes" aria-label="Do you hold a valid work permit?">
  <RadioGroupCard value="yes">Yes</RadioGroupCard>
  <RadioGroupCard value="no">No</RadioGroupCard>
</RadioGroup>`}
        >
          <div className="w-full max-w-md">
            <RadioGroup
              defaultValue="yes"
              aria-label="Do you hold a valid work permit?"
            >
              <RadioGroupCard value="yes">Yes</RadioGroupCard>
              <RadioGroupCard value="no">No</RadioGroupCard>
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
