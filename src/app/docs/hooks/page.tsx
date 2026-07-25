import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../_components/doc-page"
import { ComponentPreview } from "../_components/component-preview"
import { PropsTable, type PropDef } from "../_components/props-table"
import {
  DisclosureDemo,
  ClipboardDemo,
  CounterDemo,
  DebouncedDemo,
  ToggleDemo,
} from "./hooks-demos"

const hooks: PropDef[] = [
  { name: "useDisclosure", type: "(initial?) => [boolean, { open, close, toggle }]", default: undefined, description: "Open/closed state for dialogs, drawers, and popovers, with onOpen/onClose callbacks." },
  { name: "useToggle", type: "(options?) => [value, toggle]", default: undefined, description: "Cycle through a list of values (defaults to [false, true]); jump to a value by passing it." },
  { name: "useClipboard", type: "({ timeout? }) => { copy, copied, reset, error }", default: undefined, description: "Copy text and track a transient `copied` flag." },
  { name: "useLocalStorage", type: "(key, default) => [value, setValue]", default: undefined, description: "SSR-safe persisted state, synced across tabs and instances." },
  { name: "useMediaQuery", type: "(query, initial?) => boolean", default: undefined, description: "Track whether a CSS media query matches." },
  { name: "useClickOutside", type: "(handler, events?) => ref", default: undefined, description: "Fire a handler on a pointer event outside the ref'd element." },
  { name: "useHotkeys", type: "(bindings, { ignoreInputs? }) => void", default: undefined, description: "Global keyboard shortcuts; `mod` maps to ⌘/Ctrl by platform." },
  { name: "useDebouncedValue", type: "(value, delay?) => value", default: undefined, description: "A debounced copy of a value for search inputs and derived work." },
  { name: "useElementSize", type: "() => [ref, { width, height }]", default: undefined, description: "Observe an element's size with ResizeObserver." },
  { name: "useIntersection", type: "(options?) => [ref, entry]", default: undefined, description: "Observe viewport intersection for lazy-load and reveal-on-scroll." },
  { name: "useCounter", type: "(initial?, { min?, max? }) => [count, handlers]", default: undefined, description: "A bounded integer counter (increment/decrement/set/reset)." },
  { name: "usePrevious", type: "(value) => value | undefined", default: undefined, description: "The value from the previous render." },
  { name: "useInterval", type: "(callback, delay, active?) => void", default: undefined, description: "Run a callback on an interval; latest callback without resetting the timer." },
  { name: "useMounted", type: "() => boolean", default: undefined, description: "True after client mount — gate browser-only UI." },
  { name: "useMergedRef", type: "(...refs) => refCallback", default: undefined, description: "Merge several refs onto one element." },
  { name: "useIsMobile", type: "() => boolean", default: undefined, description: "True below the mobile breakpoint (768px)." },
]

export default function HooksPage() {
  return (
    <DocPage
      title="Hooks"
      description="A batteries-included set of React hooks for the state and browser plumbing every app needs — disclosure, clipboard, storage, media queries, hotkeys, debouncing, and more. Import from @mikenotthepope/substrateui/hooks. SSR-safe and tree-shakeable."
    >
      <Stack gap="md">
        <H3>Installation</H3>
        <ComponentPreview
          code={`import { useDisclosure, useClipboard, useLocalStorage } from "@mikenotthepope/substrateui/hooks"`}
        >
          <P className="text-sm text-muted-foreground">
            Import from <Code>@mikenotthepope/substrateui/hooks</Code>.
          </P>
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useDisclosure</H3>
        <ComponentPreview
          code={`const [opened, { open, close, toggle }] = useDisclosure(false)

<Switch checked={opened} onCheckedChange={() => toggle()} />
{opened && <Panel />}`}
        >
          <DisclosureDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useClipboard</H3>
        <ComponentPreview
          code={`const clipboard = useClipboard({ timeout: 1500 })

<Button onClick={() => clipboard.copy("npx substrateui init")}>
  {clipboard.copied ? "Copied" : "Copy command"}
</Button>`}
        >
          <ClipboardDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useCounter</H3>
        <ComponentPreview
          code={`const [count, { increment, decrement }] = useCounter(1, { min: 0, max: 10 })`}
        >
          <CounterDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useDebouncedValue</H3>
        <ComponentPreview
          code={`const [value, setValue] = useState("")
const debounced = useDebouncedValue(value, 400)`}
        >
          <DebouncedDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useToggle</H3>
        <ComponentPreview
          code={`const [value, toggle] = useToggle(["sm", "md", "lg", "xl"] as const)

<Button onClick={() => toggle()}>Cycle size</Button>`}
        >
          <ToggleDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>All hooks</H3>
        <PropsTable props={hooks} />
      </Stack>
    </DocPage>
  )
}
