import { Star, Inbox, Archive, Trash2 } from "lucide-react"

import { Item, ItemIcon, ItemLabel } from "@/components/ui/item"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const itemProps: PropDef[] = [
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

export default function ItemPage() {
  return (
    <DocPage
      title="Item"
      description="One row of a menu or list: an icon slot, a truncating label, and hover, active, and disabled states. A styling primitive — it renders a div, so the interactivity is yours to supply."
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

      <ImportLine names={["Item", "ItemIcon", "ItemLabel"]} />

      <Stack gap="md">
        <H3>Composition</H3>
        <P>
          <Code>ItemIcon</Code> is <Code>shrink-0</Code> and sizes any nested SVG
          to 16px; <Code>ItemLabel</Code> is <Code>truncate</Code>. Between them
          that is the whole reason to use the parts rather than raw spans: a long
          label ellipsises instead of pushing the icon out of the row.
        </P>
        <CompositionTree
          root="Item"
          nodes={[{ name: "ItemIcon" }, { name: "ItemLabel" }]}
        />
      </Stack>

      <Stack gap="md">
        <H3>Item or ListGroup</H3>
        <Stack gap="sm">
          <P>
            <Code>Item</Code> is one row and nothing around it — no container, no
            dividers, no keyboard handling. Use it when you are building the
            surrounding control yourself: the rows of a custom menu, a filter list,
            a sidebar section.
          </P>
          <P>
            <a
              href="/docs/components/list-group"
              className="underline underline-offset-4 hover:text-primary"
            >
              ListGroup
            </a>{" "}
            is the finished list — a bordered container with separators and real
            interactive rows. If you want a list, start there; come here when you
            want to assemble one.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Truncation</H3>
        <P>
          The label truncates at the row&apos;s width, which means the full text is
          only available on hover or via the accessibility tree. Where the tail of
          the label matters, give the row a <Code>title</Code> so the full string
          is reachable.
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
            <Code>Item</Code> renders a <Code>div</Code> with{" "}
            <Code>cursor-pointer</Code>. It looks pressable and, on its own, is
            not: it has no <Code>tabIndex</Code>, no role, and no key handler, so a
            row carrying only an <Code>onClick</Code> exists for a mouse user and
            for nobody else.
          </P>
          <P>
            Supply the control. Pass a <Code>button</Code> or <Code>a</Code> to{" "}
            <Code>render</Code>-style composition, or nest a real control inside
            and let the row be the decoration around it. In a listbox or menu you
            are building yourself, the roles and arrow-key handling are yours to
            add — <Code>Item</Code> supplies none of them.
          </P>
          <P>
            <Code>active</Code> is styling. It sets <Code>data-active</Code> and no
            ARIA, so pair it with <Code>aria-current</Code> on a navigation row or{" "}
            <Code>aria-selected</Code> in a listbox — otherwise the current row is
            only current if you can see the tint.
          </P>
          <P>
            <Code>disabled</Code> sets <Code>aria-disabled</Code> and removes
            pointer events, which stops the mouse but not the keyboard. A real
            control inside still needs its own <Code>disabled</Code>.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          <Code>ItemIcon</Code> and <Code>ItemLabel</Code> add no props of their
          own — everything, including <Code>className</Code>, goes to the
          underlying <Code>span</Code>. Same for anything you pass{" "}
          <Code>Item</Code> beyond the two below, which reaches its{" "}
          <Code>div</Code>.
        </P>
        <PropsTable props={itemProps} />
      </Stack>
    </DocPage>
  )
}
