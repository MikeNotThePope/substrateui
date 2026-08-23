import { H3, P, Code } from "@/components/ui/typography";
import { Stack } from "@/components/ui/stack";
import { DocPage } from "../../_components/doc-page";
import { ComponentPreview } from "../../_components/component-preview";
import { CompositionTree } from "../../_components/composition-tree";
import { ImportLine } from "../../_components/import-line";
import { PropsTable, type PropDef } from "../../_components/props-table";
import { SortableDemo } from "./sortable-demo";

const sortableProps: PropDef[] = [
  {
    name: "onReorder",
    type: "(from: number, to: number) => void",
    required: true,
    description: "Called with the index moved from and the index moved to.",
  },
];

const sortableItemProps: PropDef[] = [
  {
    name: "index",
    type: "number",
    required: true,
    description: "This item's position in the list.",
  },
  {
    name: "label",
    type: "string",
    required: true,
    description:
      "What the move buttons call this item — a screen reader hears it.",
  },
  {
    name: "labels",
    type: "SortableLabels",
    description:
      "Translations for the two button names. {item} is replaced with label.",
  },
];

export default function SortablePage() {
  return (
    <DocPage
      title="Sortable"
      description="A vertical list whose items can be reordered. It reports a move and you own the array — so the same list can drive a form field, a draft, or an optimistic write."
    >
      <ComponentPreview
        code={`const [items, setItems] = React.useState(STAGES)

<Sortable onReorder={(from, to) => setItems((xs) => reorder(xs, from, to))}>
  {items.map((item, i) => (
    <SortableItem key={item} index={i} label={item}>
      <div className="rounded-md border-2 px-3 py-2 text-sm">{item}</div>
    </SortableItem>
  ))}
</Sortable>`}
      >
        <SortableDemo />
      </ComponentPreview>

      <ImportLine names={["Sortable", "SortableItem", "reorder"]} />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree root="Sortable" nodes={[{ name: "SortableItem" }]} />
      </Stack>

      <Stack gap="md">
        <H3>It holds no order</H3>
        <Stack gap="sm">
          <P>
            <Code>Sortable</Code> never reorders anything. It tells you two
            indices and stops, which is what lets the array stay where it
            already lives — in form state, in a draft you save on submit, in a
            mutation you roll back. A component that owned the order would have
            to be told about every one of those.
          </P>
          <P>
            <Code>reorder</Code> ships with it because every caller needs the
            same four lines. It returns a copy, and an out-of-range index
            returns the list unchanged rather than throwing — the drag reads an
            index off the DOM, so that case is reachable without a caller
            mistake.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>The buttons are the control</H3>
        <Stack gap="sm">
          <P>
            Dragging a grip is a pointer gesture with no keyboard equivalent, so
            a list that can <em>only</em> be dragged fails WCAG 2.1.1 — and
            reordering is often the whole point of the screen.{" "}
            <Code>SortableItem</Code> therefore renders the move buttons itself
            and marks the grip <Code>aria-hidden</Code>. There is no prop to
            turn them off.
          </P>
          <P>
            Each button is named after its item rather than its action, so a
            screen reader hears &quot;Move Phone call up&quot; instead of five
            identical &quot;Move up&quot;s. That is what <Code>label</Code> is
            for; give it the same text a sighted reader sees in the row.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>One item</H3>
        <P>
          Both moves are at an end, so both buttons are disabled. Nothing
          special is needed at the call site — the list handles its own ends.
        </P>
        <ComponentPreview
          code={`<Sortable onReorder={onReorder}>
  <SortableItem index={0} label="Screen the CV">
    <div className="rounded-md border-2 px-3 py-2 text-sm">Screen the CV</div>
  </SortableItem>
</Sortable>`}
        >
          <SortableDemo items={["Screen the CV"]} />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            The move buttons are real buttons, reachable by keyboard and
            disabled at the ends of the list. The grip is decorative and carries
            no name, because it does nothing the buttons do not.
          </P>
          <P>
            Nothing announces a completed move. If the reordered content is not
            visible where focus is — a long list, a list in a scroll container —
            put the result in a live region yourself.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Sortable props</H3>
        <PropsTable props={sortableProps} />
      </Stack>

      <Stack gap="md">
        <H3>SortableItem props</H3>
        <PropsTable props={sortableItemProps} />
      </Stack>
    </DocPage>
  );
}
