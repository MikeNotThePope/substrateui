"use client"

import { useState } from "react"
import { Bold, Italic, Underline, Pin } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
import { Stack } from "@/components/ui/stack"
import { Cluster } from "@/components/ui/cluster"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const toggleProps: PropDef[] = [
  { name: "variant", type: '"default" | "outline"', default: '"default"', description: "Transparent until pressed, or carrying a 2px border at rest." },
  { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Sets both height and minimum width, so an icon-only toggle stays square." },
  { name: "pressed", type: "boolean", default: undefined, description: "The controlled pressed state." },
  { name: "defaultPressed", type: "boolean", default: "false", description: "Pressed on first render, when uncontrolled." },
  { name: "onPressedChange", type: "(pressed: boolean) => void", default: undefined, description: "Fired when the toggle should change state." },
  { name: "disabled", type: "boolean", default: "false", description: "Disable the toggle." },
]

function ControlledToggle() {
  const [pinned, setPinned] = useState(true)
  return (
    <Stack gap="sm" align="start">
      <Toggle
        variant="outline"
        pressed={pinned}
        onPressedChange={setPinned}
        aria-label="Pin this thread"
      >
        <Pin />
        {pinned ? "Pinned" : "Pin"}
      </Toggle>
      <P className="text-sm text-muted-foreground">
        Thread is {pinned ? "pinned to the top" : "in date order"}.
      </P>
    </Stack>
  )
}

export default function TogglePage() {
  return (
    <DocPage
      title="Toggle"
      description="A button that stays down. One control, two states — bold on or off, a filter applied or not. For a set where the choices are alternatives, use ToggleGroup."
    >
      <ComponentPreview
        code={`<Toggle variant="outline" aria-label="Bold">
  <Bold />
</Toggle>
<Toggle variant="outline" aria-label="Italic">
  <Italic />
</Toggle>
<Toggle variant="outline" aria-label="Underline" defaultPressed>
  <Underline />
</Toggle>`}
      >
        <Cluster gap="sm">
          <Toggle variant="outline" aria-label="Bold">
            <Bold />
          </Toggle>
          <Toggle variant="outline" aria-label="Italic">
            <Italic />
          </Toggle>
          <Toggle variant="outline" aria-label="Underline" defaultPressed>
            <Underline />
          </Toggle>
        </Cluster>
      </ComponentPreview>

      <ImportLine names={["Toggle"]} />

      <Stack gap="md">
        <H3>Variants</H3>
        <P>
          <Code>default</Code> is transparent until pressed, for a dense toolbar
          where borders would become a grid of boxes. <Code>outline</Code> carries
          its border at rest, so the control reads as pressable before you hover
          it.
        </P>
        <ComponentPreview
          code={`<Toggle aria-label="Bold"><Bold /></Toggle>
<Toggle variant="outline" aria-label="Bold"><Bold /></Toggle>`}
        >
          <Cluster gap="md" align="center">
            <Toggle aria-label="Bold">
              <Bold />
            </Toggle>
            <Toggle variant="outline" aria-label="Bold">
              <Bold />
            </Toggle>
          </Cluster>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Sizes</H3>
        <P>
          Each size sets a minimum width as well as a height, so an icon-only
          toggle comes out square instead of collapsing to the icon&apos;s own
          width.
        </P>
        <ComponentPreview
          code={`<Toggle variant="outline" size="sm" aria-label="Bold"><Bold /></Toggle>
<Toggle variant="outline" aria-label="Bold"><Bold /></Toggle>
<Toggle variant="outline" size="lg" aria-label="Bold"><Bold /></Toggle>`}
        >
          <Cluster gap="md" align="center">
            <Toggle variant="outline" size="sm" aria-label="Bold">
              <Bold />
            </Toggle>
            <Toggle variant="outline" aria-label="Bold">
              <Bold />
            </Toggle>
            <Toggle variant="outline" size="lg" aria-label="Bold">
              <Bold />
            </Toggle>
          </Cluster>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Controlled</H3>
        <P>
          <Code>pressed</Code> with <Code>onPressedChange</Code> when the state
          lives in your app — the toggle then renders what you tell it and nothing
          else. Note the label changes with the state, so the button says what it
          is rather than only what it would do.
        </P>
        <ComponentPreview
          code={`const [pinned, setPinned] = useState(true)

<Toggle
  variant="outline"
  pressed={pinned}
  onPressedChange={setPinned}
  aria-label="Pin this thread"
>
  <Pin />
  {pinned ? "Pinned" : "Pin"}
</Toggle>`}
        >
          <ControlledToggle />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            Base UI renders a real button carrying{" "}
            <Code>aria-pressed</Code>, so the state is announced and Space and
            Enter both work. That is the difference between this and a{" "}
            <Code>Checkbox</Code>: a toggle is a button that stays down, a
            checkbox is a form value that gets submitted.
          </P>
          <P>
            An icon-only toggle has no accessible name. Every example above
            passes <Code>aria-label</Code>; without one the button is announced as
            just &quot;button&quot;.
          </P>
          <P>
            The press offset is 1.5px of <Code>translate-y</Code>, and it collapses
            under <Code>prefers-reduced-motion</Code>. The pressed state is also
            carried by colour, so it does not depend on the motion being seen.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          <Code>toggleVariants</Code> is exported alongside the component, for
          giving a non-Toggle element the same geometry —{" "}
          <Code>ToggleGroupItem</Code> uses it for exactly that. Every prop not
          listed goes to Base UI&apos;s <Code>Toggle</Code>; see the{" "}
          <a
            href="https://base-ui.com/react/components/toggle"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Base UI toggle docs
          </a>{" "}
          for that surface.
        </P>
        <PropsTable props={toggleProps} />
      </Stack>
    </DocPage>
  )
}
