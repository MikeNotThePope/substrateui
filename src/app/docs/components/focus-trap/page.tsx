import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"
import { FocusTrapDemo } from "./focus-trap-demo"

const props: PropDef[] = [
  { name: "active", type: "boolean", default: "true", description: "Whether focus is trapped inside the children." },
  { name: "restoreFocus", type: "boolean", default: "true", description: "Return focus to the previously focused element when the trap deactivates." },
  { name: "...div props", type: "React.ComponentProps<'div'>", default: undefined, description: "Forwarded to the wrapper element." },
]

export default function FocusTrapPage() {
  return (
    <DocPage
      title="Focus Trap"
      description="Traps keyboard focus within a region while active — the reusable focus-management primitive behind modals, menus, and any custom overlay. On activation it moves focus inside; Tab / Shift+Tab cycle within; on deactivation it restores focus to wherever it was. Also available as the useFocusTrap hook."
    >
      <P className="text-sm text-muted-foreground">
        Activate the trap, then press Tab repeatedly — focus stays inside the box.
      </P>
      <ComponentPreview
        code={`import { FocusTrap } from "@mikenotthepope/substrateui"

<FocusTrap active={open}>
  <div role="dialog">
    <input placeholder="First field" />
    <button onClick={close}>Close</button>
  </div>
</FocusTrap>`}
      >
        <FocusTrapDemo />
      </ComponentPreview>

      <ImportLine names={["FocusTrap"]} />

      <Stack gap="md">
        <H3>Hook</H3>
        <P>
          Prefer a hook? <Code>useFocusTrap</Code> returns a ref you attach to any
          element, from <Code>@mikenotthepope/substrateui/hooks</Code>.
        </P>
        <ComponentPreview
          code={`import { useFocusTrap } from "@mikenotthepope/substrateui/hooks"

const ref = useFocusTrap(open)
return <div ref={ref} hidden={!open}>…</div>`}
        >
          <P className="text-sm text-muted-foreground">
            <Code>useFocusTrap(active, {`{ restoreFocus }`})</Code> → ref
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <P>
          Focus trapping is essential for modal dialogs: keyboard and screen-reader
          users must not be able to Tab out of an open modal into the inert page
          behind it. Pair the trap with an <Code>aria-modal=&quot;true&quot;</Code>{" "}
          container and remember to restore focus to the trigger on close —{" "}
          <Code>restoreFocus</Code> does this for you.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={props} />
      </Stack>
    </DocPage>
  )
}
