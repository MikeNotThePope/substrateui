import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const collapsibleProps: PropDef[] = [
  { name: "open", type: "boolean", default: undefined, description: "The controlled open state." },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Open on first render, when uncontrolled." },
  { name: "onOpenChange", type: "(open: boolean) => void", default: undefined, description: "Fired when the panel should open or close." },
  { name: "disabled", type: "boolean", default: "false", description: "Disable the trigger." },
]

export default function CollapsiblePage() {
  return (
    <DocPage
      title="Collapsible"
      description="One trigger, one panel. Base UI's Collapsible re-exported unstyled — it wires the ARIA and the open state and paints nothing, so the panel looks like whatever you put in it."
    >
      <ComponentPreview
        code={`<Collapsible>
  <CollapsibleTrigger render={<Button variant="outline" />}>
    Show advanced options
  </CollapsibleTrigger>
  <CollapsibleContent>
    <div className="mt-3 rounded-md border-2 p-4 text-sm">
      Retries, timeout, and concurrency live here.
    </div>
  </CollapsibleContent>
</Collapsible>`}
      >
        <Collapsible>
          <CollapsibleTrigger render={<Button variant="outline" />}>
            Show advanced options
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-3 rounded-md border-2 p-4 text-sm">
              Retries, timeout, and concurrency live here.
            </div>
          </CollapsibleContent>
        </Collapsible>
      </ComponentPreview>

      <ImportLine
        names={["Collapsible", "CollapsibleTrigger", "CollapsibleContent"]}
      />

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="Collapsible"
          nodes={[{ name: "CollapsibleTrigger" }, { name: "CollapsibleContent" }]}
        />
      </Stack>

      <Stack gap="md">
        <H3>Collapsible or Accordion</H3>
        <Stack gap="sm">
          <P>
            Collapsible is one panel. Accordion is a set of them that know about
            each other, so opening one can close the last. If you find yourself
            keeping several Collapsibles in step with shared state, you wanted an
            Accordion.
          </P>
          <P>
            Collapsible also ships no styling at all. Accordion brings a divider
            rule, padding, and a rotating chevron; Collapsible brings the
            behaviour and leaves the surface to you.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Open on first render</H3>
        <P>
          <Code>defaultOpen</Code> starts the panel expanded without making the
          component controlled. Reach for <Code>open</Code> and{" "}
          <Code>onOpenChange</Code> only when something outside also needs to
          close it.
        </P>
        <ComponentPreview
          code={`<Collapsible defaultOpen>
  <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
    Stack trace
  </CollapsibleTrigger>
  <CollapsibleContent>
    <pre className="mt-2 overflow-x-auto rounded-md border-2 p-3 font-mono text-xs">
      {"at parseConfig (config.ts:42)\\nat loadTheme (theme.ts:18)"}
    </pre>
  </CollapsibleContent>
</Collapsible>`}
        >
          <Collapsible defaultOpen className="w-full max-w-lg">
            <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
              Stack trace
            </CollapsibleTrigger>
            <CollapsibleContent>
              <pre className="mt-2 overflow-x-auto rounded-md border-2 p-3 font-mono text-xs">
                {"at parseConfig (config.ts:42)\nat loadTheme (theme.ts:18)"}
              </pre>
            </CollapsibleContent>
          </Collapsible>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            The trigger carries <Code>aria-expanded</Code> and{" "}
            <Code>aria-controls</Code>, and the panel is removed from the
            accessibility tree while closed. Pass a real button through{" "}
            <Code>render</Code> — the default is a bare element and a{" "}
            <Code>div</Code> with a click handler is unreachable by keyboard.
          </P>
          <P>
            The trigger&apos;s text should say what the panel holds. &quot;Show
            advanced options&quot; works; &quot;Show more&quot; leaves a
            screen-reader user to expand it to find out.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          These are Base UI&apos;s <Code>Collapsible</Code> parts re-exported
          without changes — see the{" "}
          <a
            href="https://base-ui.com/react/components/collapsible"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Base UI collapsible docs
          </a>{" "}
          for the full surface, including the CSS variables the panel exposes for
          height animation.
        </P>
        <PropsTable props={collapsibleProps} />
      </Stack>
    </DocPage>
  )
}
