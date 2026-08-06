import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Accordion",
  description: "A stack of headings that each reveal a panel. One panel is open at a time unless you set multiple.",
  route: "/docs/components/accordion",
})

const accordionProps: PropDef[] = [
  { name: "multiple", type: "boolean", default: "false", description: "Allow more than one item to be open at once. Off, opening an item closes the last one." },
  { name: "value", type: "string[]", default: undefined, description: "The controlled list of open item values — an array in both modes." },
  { name: "defaultValue", type: "string[]", default: "[]", description: "The items open on first render, when uncontrolled." },
  { name: "onValueChange", type: "(value: string[]) => void", default: undefined, description: "Fired with the new list of open values." },
  { name: "disabled", type: "boolean", default: "false", description: "Disable every trigger in the accordion." },
]

const itemProps: PropDef[] = [
  { name: "value", type: "string", default: undefined, description: "Identifies the item in the accordion's value array. Required." },
  { name: "disabled", type: "boolean", default: "false", description: "Disable this item's trigger only." },
]

export default function AccordionPage() {
  return (
    <DocPage
      title="Accordion"
      description="A stack of headings that each reveal a panel. One panel is open at a time unless you set multiple. Built on Base UI, so the headings are real buttons and arrow keys move between them."
    >
      <ComponentPreview
        code={`<Accordion defaultValue={["shipping"]}>
  <AccordionItem value="shipping">
    <AccordionTrigger>How long does delivery take?</AccordionTrigger>
    <AccordionContent>
      Three to five working days within the UK, and seven to ten elsewhere.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="returns">
    <AccordionTrigger>Can I return an order?</AccordionTrigger>
    <AccordionContent>
      Within 30 days of delivery, unopened, with the receipt.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="tracking">
    <AccordionTrigger>Where is my parcel?</AccordionTrigger>
    <AccordionContent>
      The dispatch email carries a tracking number and a link to the courier.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <Accordion defaultValue={["shipping"]} className="w-full max-w-lg">
          <AccordionItem value="shipping">
            <AccordionTrigger>How long does delivery take?</AccordionTrigger>
            <AccordionContent>
              Three to five working days within the UK, and seven to ten
              elsewhere.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionTrigger>Can I return an order?</AccordionTrigger>
            <AccordionContent>
              Within 30 days of delivery, unopened, with the receipt.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tracking">
            <AccordionTrigger>Where is my parcel?</AccordionTrigger>
            <AccordionContent>
              The dispatch email carries a tracking number and a link to the
              courier.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentPreview>

      <ImportLine
        names={[
          "Accordion",
          "AccordionItem",
          "AccordionTrigger",
          "AccordionContent",
        ]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <P>
          Every item needs a <Code>value</Code> — it is what appears in the
          accordion&apos;s open-value array, so two items sharing one string open
          and close together.
        </P>
        <CompositionTree
          root="Accordion"
          nodes={[
            {
              name: "AccordionItem",
              children: [
                { name: "AccordionTrigger" },
                { name: "AccordionContent" },
              ],
            },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>Several panels at once</H3>
        <P>
          <Code>multiple</Code> stops the accordion closing the previous panel.
          Use it where the panels are a checklist to read through rather than
          alternatives to choose between.
        </P>
        <ComponentPreview
          code={`<Accordion multiple defaultValue={["build", "test"]}>
  <AccordionItem value="build">
    <AccordionTrigger>Build</AccordionTrigger>
    <AccordionContent>Compiles the library and the docs site.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="test">
    <AccordionTrigger>Test</AccordionTrigger>
    <AccordionContent>Unit tests, then the visual regression suite.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion multiple defaultValue={["build", "test"]} className="w-full max-w-lg">
            <AccordionItem value="build">
              <AccordionTrigger>Build</AccordionTrigger>
              <AccordionContent>
                Compiles the library and the docs site.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="test">
              <AccordionTrigger>Test</AccordionTrigger>
              <AccordionContent>
                Unit tests, then the visual regression suite.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Disabling an item</H3>
        <P>
          <Code>disabled</Code> on the root turns off every trigger; on an item
          it turns off that one. A disabled trigger keeps its place in the tab
          order removed rather than hidden, so the list doesn&apos;t reflow.
        </P>
        <ComponentPreview
          code={`<Accordion>
  <AccordionItem value="available">
    <AccordionTrigger>Standard delivery</AccordionTrigger>
    <AccordionContent>Free on orders over £40.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="unavailable" disabled>
    <AccordionTrigger>Same-day delivery</AccordionTrigger>
    <AccordionContent>Not available at this address.</AccordionContent>
  </AccordionItem>
</Accordion>`}
        >
          <Accordion className="w-full max-w-lg">
            <AccordionItem value="available">
              <AccordionTrigger>Standard delivery</AccordionTrigger>
              <AccordionContent>Free on orders over £40.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="unavailable" disabled>
              <AccordionTrigger>Same-day delivery</AccordionTrigger>
              <AccordionContent>
                Not available at this address.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Each trigger is a real <Code>button</Code> inside a heading element,
            carrying <Code>aria-expanded</Code> and pointing at its panel with{" "}
            <Code>aria-controls</Code>. Up and Down move between triggers, Home
            and End jump to the first and last.
          </P>
          <P>
            The panel animates its height, and the chevron its rotation. Both
            collapse under <Code>prefers-reduced-motion</Code>.
          </P>
          <P>
            An accordion is not a substitute for headings. If the panel content
            is part of the document outline, put real headings inside the panels
            — the trigger&apos;s own heading level is set by Base UI and describes
            the disclosure, not the content.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          <Code>Accordion</Code> is Base UI&apos;s <Code>Accordion.Root</Code>{" "}
          unchanged, and <Code>AccordionTrigger</Code> and{" "}
          <Code>AccordionContent</Code> add styling to its Trigger and Panel. The
          props below are the ones you reach for; see the{" "}
          <a
            href="https://base-ui.com/react/components/accordion"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Base UI accordion docs
          </a>{" "}
          for the full inherited surface.
        </P>
        <PropsTable props={accordionProps} />

        <H3>AccordionItem</H3>
        <PropsTable props={itemProps} />
      </Stack>
    </DocPage>
  )
}
