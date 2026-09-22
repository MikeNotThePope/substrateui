import { Star, Inbox, Archive, Trash2 } from "lucide-react"

import { Item, ItemIcon, ItemLabel, ItemTrailer } from "@/components/ui/item"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata({
  title: "Item",
  description:
    "One row of a menu or list: an icon slot, a truncating label, a trailer, and hover, active and disabled states. Render it as a div, a button, a link or a list item.",
  route: "/docs/components/item",
})

const itemProps: PropDef[] = [
  {
    name: "render",
    type: "React.ReactElement",
    default: "<div />",
    description:
      "The element the row is. Pass <button /> for a row of actions, an anchor or a framework Link for a row of destinations, <li /> for a row that has to stay a container. The row's classes, data attributes and handlers all land on it.",
  },
  {
    name: "size",
    type: '"default" | "lg"',
    default: '"default"',
    description:
      "Row height. default is 36px — a menu row under a pointer that is already there. lg is 44px, the target size of WCAG 2.2 SC 2.5.5, for a full-width row that is itself the control.",
  },
  {
    name: "active",
    type: "boolean",
    default: "false",
    description:
      "Marks the row as the current one — tinted surface and medium weight. Sets data-active for styling; adds no ARIA.",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description:
      "Dims the row to 50% and removes pointer events. Sets aria-disabled, but cannot disable a control it does not own.",
  },
]

const QUESTIONS = [
  { number: "01", text: "Why do you want to work here?", kind: "Long text" },
  { number: "02", text: "What is your notice period?", kind: "Single select" },
  { number: "03", text: "Expected salary", kind: "Short text" },
]

export default function ItemPage() {
  return (
    <DocPage
      title="Item"
      description="One row of a menu or list: an icon slot, a truncating label, a trailer, and hover, active and disabled states. A styling primitive — it renders a div until render says otherwise, and then it is whatever you named."
    >
      <ComponentPreview
        code={`<Item active>
  <ItemIcon><Inbox /></ItemIcon>
  <ItemLabel>Inbox</ItemLabel>
</Item>
<Item>
  <ItemIcon><Star /></ItemIcon>
  <ItemLabel>Starred</ItemLabel>
</Item>
<Item>
  <ItemIcon><Archive /></ItemIcon>
  <ItemLabel>Archive</ItemLabel>
</Item>
<Item disabled>
  <ItemIcon><Trash2 /></ItemIcon>
  <ItemLabel>Trash — emptying</ItemLabel>
</Item>`}
      >
        <div className="w-full max-w-xs rounded-lg border-2 p-1">
          <Item active>
            <ItemIcon>
              <Inbox />
            </ItemIcon>
            <ItemLabel>Inbox</ItemLabel>
          </Item>
          <Item>
            <ItemIcon>
              <Star />
            </ItemIcon>
            <ItemLabel>Starred</ItemLabel>
          </Item>
          <Item>
            <ItemIcon>
              <Archive />
            </ItemIcon>
            <ItemLabel>Archive</ItemLabel>
          </Item>
          <Item disabled>
            <ItemIcon>
              <Trash2 />
            </ItemIcon>
            <ItemLabel>Trash — emptying</ItemLabel>
          </Item>
        </div>
      </ComponentPreview>

      <ImportLine names={["Item", "ItemIcon", "ItemLabel", "ItemTrailer"]} />

      <Stack gap="md">
        <H3>Composition</H3>
        <P>
          <Code>ItemIcon</Code> is <Code>shrink-0</Code> and sizes any nested SVG
          to 16px; <Code>ItemLabel</Code> is <Code>truncate</Code>;{" "}
          <Code>ItemTrailer</Code> is <Code>ms-auto flex-none</Code>. Between
          them that is the whole reason to use the parts rather than raw spans: a
          long label ellipsises instead of pushing the icon out of the row, and
          whatever sits at the end stays at the end.
        </P>
        <CompositionTree
          root="Item"
          nodes={[
            { name: "ItemIcon" },
            { name: "ItemLabel" },
            { name: "ItemTrailer" },
          ]}
        />
      </Stack>

      <Stack gap="md">
        <H3>Rows of actions</H3>
        <Stack gap="sm">
          <P>
            A list of things you can do is a list of <Code>button</Code>s. Pass
            one to <Code>render</Code> and the row becomes it — padding, hover,
            focus ring and all — rather than becoming a container with a button
            inside it fighting for the same width.
          </P>
          <P>
            A bare <Code>{`<button />`}</Code> is given{" "}
            <Code>type=&quot;button&quot;</Code>, because a row of actions
            standing in a form would otherwise submit it. Write{" "}
            <Code>type</Code> yourself and yours is kept.
          </P>
        </Stack>
        <ComponentPreview
          code={`<div className="divide-y-2">
  <Item size="lg" render={<button />} className="rounded-none px-0">
    <ItemIcon className="font-mono text-xs text-muted-foreground">01</ItemIcon>
    <ItemLabel>Why do you want to work here?</ItemLabel>
    <ItemTrailer className="font-mono text-2xs text-muted-foreground">Long text</ItemTrailer>
  </Item>
  {/* … */}
</div>`}
        >
          <div className="w-full max-w-md divide-y-2">
            {QUESTIONS.map((q) => (
              <Item
                key={q.number}
                size="lg"
                render={<button />}
                className="rounded-none px-0"
              >
                <ItemIcon className="font-mono text-xs text-muted-foreground">
                  {q.number}
                </ItemIcon>
                <ItemLabel>{q.text}</ItemLabel>
                <ItemTrailer className="font-mono text-2xs text-muted-foreground">
                  {q.kind}
                </ItemTrailer>
              </Item>
            ))}
          </div>
        </ComponentPreview>
        <P>
          The rule between the rows is <Code>divide-y-2</Code> on the list, not{" "}
          <Code>border-b</Code> on each row. A divider drawn by the parent falls
          between children and nowhere else, so the list does not end on a rule
          it then has to take back off with <Code>last:border-b-0</Code>.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Rows of destinations</H3>
        <P>
          The same shape with a different element. Pass an anchor, or your
          framework&apos;s link component, and the row is a link: right-click,
          middle-click and the status bar all come back.
        </P>
        <ComponentPreview
          code={`<Item render={<a href="/docs/components/list-group" />}>
  <ItemIcon><Archive /></ItemIcon>
  <ItemLabel>ListGroup</ItemLabel>
  <ItemTrailer className="text-xs text-muted-foreground">12</ItemTrailer>
</Item>`}
        >
          <div className="w-full max-w-xs rounded-lg border-2 p-1">
            <Item render={<a href="/docs/components/list-group" />}>
              <ItemIcon>
                <Archive />
              </ItemIcon>
              <ItemLabel>ListGroup</ItemLabel>
              <ItemTrailer className="text-xs text-muted-foreground">
                12
              </ItemTrailer>
            </Item>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Size</H3>
        <P>
          <Code>default</Code> is 36px tall at <Code>text-sm</Code>. That is a
          menu row: the pointer is already on it, because a menu is what put it
          there. <Code>lg</Code> is <Code>min-h-11</Code> — 44px, the target size
          of WCAG 2.2 SC 2.5.5 — and is what a full-width row that is itself the
          control should be, because there the row is the only thing to hit and
          a thumb is what hits it.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>Item or ListGroup</H3>
        <Stack gap="sm">
          <P>
            <Code>Item</Code> is one row and nothing around it — no container, no
            dividers, no keyboard handling. Use it when you are building the
            surrounding control yourself: the rows of a custom menu, a filter
            list, a sidebar section, or a list whose parent is already something
            else, such as a <Code>Sortable</Code>.
          </P>
          <P>
            <a
              href="/docs/components/list-group"
              className="underline underline-offset-4 hover:text-primary"
            >
              ListGroup
            </a>{" "}
            is the finished list — a bordered container with separators and rows
            that take the same <Code>render</Code> prop. If you want a list,
            start there; come here when you want to assemble one, or when the
            list needs no box around it.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Truncation</H3>
        <P>
          The label truncates at the row&apos;s width, which means the full text
          is only available on hover or via the accessibility tree. Where the
          tail of the label matters, give the row a <Code>title</Code> so the
          full string is reachable.
        </P>
        <ComponentPreview
          code={`<Item title="Quarterly revenue reconciliation — EMEA, Q3 2026">
  <ItemIcon><Archive /></ItemIcon>
  <ItemLabel>Quarterly revenue reconciliation — EMEA, Q3 2026</ItemLabel>
</Item>`}
        >
          <div className="w-full max-w-[220px] rounded-lg border-2 p-1">
            <Item title="Quarterly revenue reconciliation — EMEA, Q3 2026">
              <ItemIcon>
                <Archive />
              </ItemIcon>
              <ItemLabel>
                Quarterly revenue reconciliation — EMEA, Q3 2026
              </ItemLabel>
            </Item>
          </div>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Without <Code>render</Code>, <Code>Item</Code> is a{" "}
            <Code>div</Code> with <Code>cursor-pointer</Code>. It looks pressable
            and is not: no <Code>tabIndex</Code>, no role, no key handler, so a
            row carrying only an <Code>onClick</Code> exists for a mouse user and
            for nobody else. If the row does something, name the element that
            does it.
          </P>
          <P>
            When the row is a control, everything inside it is its accessible
            name, in source order and run together — adjacent inline spans
            contribute no whitespace, however far <Code>gap-2</Code> pushes them
            apart. A row of an icon, &ldquo;Salary&rdquo; and a{" "}
            <Code>ItemTrailer</Code> reading &ldquo;Short text&rdquo; announces
            as &ldquo;SalaryShort text&rdquo;. Keep a marker meaningful (a
            number, not a bullet), and where a trailer is decoration rather than
            part of the name, mark it <Code>aria-hidden</Code>.
          </P>
          <P>
            A trailer that disappears on a narrow screen disappears from the
            name too: <Code>hidden</Code> is <Code>display: none</Code>. That is
            usually right, and it is why this component ships no responsive
            behaviour of its own — which of two trailers is the expendable one is
            a fact about the content, not about the row.
          </P>
          <P>
            <Code>active</Code> is styling. It sets <Code>data-active</Code> and
            no ARIA, so pair it with <Code>aria-current</Code> on a navigation
            row or <Code>aria-selected</Code> in a listbox — otherwise the
            current row is only current if you can see the tint.
          </P>
          <P>
            <Code>disabled</Code> sets <Code>aria-disabled</Code> and removes
            pointer events, which stops the mouse but not the keyboard. A row
            rendered as a <Code>button</Code> still needs its own{" "}
            <Code>disabled</Code>.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          <Code>ItemIcon</Code>, <Code>ItemLabel</Code> and{" "}
          <Code>ItemTrailer</Code> add no props of their own — everything,
          including <Code>className</Code>, goes to the underlying{" "}
          <Code>span</Code>. Same for anything you pass <Code>Item</Code> beyond
          the four below, which reaches whatever element <Code>render</Code>{" "}
          named.
        </P>
        <PropsTable props={itemProps} />
      </Stack>
    </DocPage>
  )
}
