import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../_components/doc-page"
import { ComponentPreview } from "../_components/component-preview"
import { ImportLine } from "../_components/import-line"
import { PropsTable, type PropDef } from "../_components/props-table"
import {
  DisclosureDemo,
  ClipboardDemo,
  CounterDemo,
  DebouncedDemo,
  ToggleDemo,
  LocalStorageDemo,
  MediaQueryDemo,
  ClickOutsideDemo,
  HotkeysDemo,
  ElementSizeDemo,
  IntersectionDemo,
  PreviousDemo,
  IntervalDemo,
  CountdownHookDemo,
  MountedDemo,
  MergedRefDemo,
  IsMobileDemo,
  AnnouncerDemo,
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
  { name: "useCountdown", type: "(deadline, options?) => CountdownState", default: undefined, description: "Count down to a deadline — units, a locale-formatted string, and a once-only onFinish." },
  { name: "useMounted", type: "() => boolean", default: undefined, description: "True after client mount — gate browser-only UI." },
  { name: "useMergedRef", type: "(...refs) => refCallback", default: undefined, description: "Merge several refs onto one element." },
  { name: "useIsMobile", type: "() => boolean", default: undefined, description: "True below the mobile breakpoint (768px)." },
  { name: "useAnnouncer", type: "() => { announce, clear }", default: undefined, description: "Imperatively announce messages to screen readers via a shared ARIA live region (also exported as announce/clearAnnouncer)." },
]

export default function HooksPage() {
  return (
    <DocPage
      title="Hooks"
      description="React hooks for the state and browser plumbing every app rewrites — disclosure, clipboard, storage, media queries, hotkeys, debouncing, and more. Eighteen of them, each with a worked example below. SSR-safe and tree-shakeable."
    >
      <ComponentPreview
        code={`const [opened, { open, close, toggle }] = useDisclosure(false)

<Switch checked={opened} onCheckedChange={() => toggle()} />
{opened && <Panel />}`}
      >
        <DisclosureDemo />
      </ComponentPreview>

      <ImportLine
        names={["useDisclosure", "useClipboard", "useLocalStorage"]}
        entry="@mikenotthepope/substrateui/hooks"
      />

      <Stack gap="md">
        <H3>A separate entry point</H3>
        <P>
          Hooks come from <Code>@mikenotthepope/substrateui/hooks</Code>, not the
          root. That keeps them out of the bundle of anyone importing only
          components, and it means a hook never drags a component in behind it.
        </P>
      </Stack>

      <Stack gap="md">
        <H3>useToggle</H3>
        <P>
          Cycles a list. With no arguments it is a boolean; with a tuple it walks
          the values in order and wraps. Pass a value to <Code>toggle</Code> to
          jump straight to it.
        </P>
        <ComponentPreview
          code={`const [value, toggle] = useToggle(["sm", "md", "lg", "xl"] as const)

<Button onClick={() => toggle()}>Cycle size</Button>`}
        >
          <ToggleDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useCounter</H3>
        <P>
          A bounded integer. <Code>min</Code> and <Code>max</Code> clamp every
          path in — <Code>increment</Code>, <Code>decrement</Code>, and{" "}
          <Code>set</Code> — so a value out of range cannot get in through the
          back door.
        </P>
        <ComponentPreview
          code={`const [count, { increment, decrement, set, reset }] = useCounter(1, { min: 0, max: 10 })`}
        >
          <CounterDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>usePrevious</H3>
        <P>
          The value from the render before this one. Derived from state adjusted
          during render rather than from a ref, so it stays pure and does not need
          an effect — which also means it is correct under Strict Mode&apos;s
          double render.
        </P>
        <ComponentPreview
          code={`const previous = usePrevious(value)

// Fire only on a real change.
useEffect(() => {
  if (previous !== undefined && previous !== value) onChanged(value)
}, [value, previous])`}
        >
          <PreviousDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useDebouncedValue</H3>
        <P>
          A trailing copy of a value. The input stays controlled and responsive
          while whatever reads the debounced copy — a query, a validation, an
          expensive render — waits for the typing to stop.
        </P>
        <ComponentPreview
          code={`const [value, setValue] = useState("")
const debounced = useDebouncedValue(value, 400)

useEffect(() => { search(debounced) }, [debounced])`}
        >
          <DebouncedDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useInterval</H3>
        <P>
          A timer that keeps the latest callback without restarting. Passing a
          fresh closure each render is the usual way to end up with a{" "}
          <Code>setInterval</Code> that either sees stale state or resets on every
          render; this one does neither. The third argument pauses it.
        </P>
        <ComponentPreview
          code={`useInterval(() => setTicks((n) => n + 1), 1000, running)`}
        >
          <IntervalDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useCountdown</H3>
        <P>
          Counts down to a deadline and hands back the parts, a locale-formatted
          string, and a <Code>finished</Code> flag. <Code>ready</Code> is false
          until mount, so a server render and the first client render agree — a
          countdown is different on the server by definition.
        </P>
        <ComponentPreview
          code={`const { days, hours, minutes, seconds, formatted, finished, ready } =
  useCountdown(deadline, { onFinish: () => refetch() })`}
        >
          <CountdownHookDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useClipboard</H3>
        <P>
          Copies text and flips <Code>copied</Code> for as long as{" "}
          <Code>timeout</Code> says, which is the whole of the &quot;Copied!&quot;
          affordance. <Code>error</Code> is set when the browser refuses — the
          clipboard API needs a secure context and a user gesture, so this fails
          in more situations than you would expect.
        </P>
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
        <H3>useLocalStorage</H3>
        <P>
          Persisted state that survives a reload and stays in step across tabs and
          across every instance reading the same key. It reads nothing during a
          server render, so gate the displayed value on{" "}
          <Code>useMounted</Code> — otherwise the first client render disagrees
          with the server&apos;s and React discards it.
        </P>
        <ComponentPreview
          code={`const [theme, setTheme] = useLocalStorage("theme", "system")

// Same shape as useState, including the updater form.
setTheme((prev) => (prev === "dark" ? "light" : "dark"))`}
        >
          <LocalStorageDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useMediaQuery</H3>
        <P>
          Any media query, tracked. Use it for behaviour, not for layout — layout
          belongs in CSS, where it works before JavaScript runs. The second
          argument is the value used before the first match, which matters on the
          server.
        </P>
        <ComponentPreview
          code={`const isDesktop = useMediaQuery("(min-width: 768px)")
const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")`}
        >
          <MediaQueryDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useIsMobile</H3>
        <P>
          <Code>useMediaQuery</Code> pinned to the one breakpoint the suite itself
          uses — 768px, where <Code>Sidebar</Code> becomes a sheet. Worth using
          rather than restating the number, so your app switches where the
          components do.
        </P>
        <ComponentPreview code={`const isMobile = useIsMobile()`}>
          <IsMobileDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useMounted</H3>
        <P>
          False on the server and on the first client render, true after. That is
          the point: both passes agree, and anything that can only be known in the
          browser waits for the second. Reach for it before{" "}
          <Code>typeof window !== &quot;undefined&quot;</Code>, which does{" "}
          <em>not</em> agree between the two.
        </P>
        <ComponentPreview
          code={`const mounted = useMounted()
if (!mounted) return null   // or a skeleton the server can render too`}
        >
          <MountedDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useClickOutside</H3>
        <P>
          Returns a ref; the handler fires on a pointer event outside that
          element. Bound to <Code>mousedown</Code> and <Code>touchstart</Code>{" "}
          rather than <Code>click</Code>, so a drag that starts inside and ends
          outside doesn&apos;t dismiss.
        </P>
        <P>
          It is not a substitute for a dialog. Escape, focus trapping, and focus
          restoration are not here — use <Code>Dialog</Code> or{" "}
          <Code>Popover</Code> for anything modal, and this for the informal cases.
        </P>
        <ComponentPreview
          code={`const ref = useClickOutside<HTMLDivElement>(() => setOpen(false))

{open && <div ref={ref}>…</div>}`}
        >
          <ClickOutsideDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useHotkeys</H3>
        <P>
          Global bindings, as an array of pairs. <Code>mod</Code> resolves to ⌘ on
          Apple platforms and Ctrl elsewhere, which is the difference between one
          binding and two. <Code>ignoreInputs</Code> stops a shortcut firing while
          the user is typing in a field.
        </P>
        <P>
          Anything you bind is a binding the browser or a screen reader may already
          own. Keep to chords a user expects, and give every shortcut a
          non-keyboard route to the same action.
        </P>
        <ComponentPreview
          code={`useHotkeys([
  ["mod+K", () => setSpotlightOpen(true)],
  ["Escape", () => setSpotlightOpen(false)],
], { ignoreInputs: true })`}
        >
          <HotkeysDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useElementSize</H3>
        <P>
          The element&apos;s own size, from a <Code>ResizeObserver</Code> — so it
          reports a change the window never saw, such as a sibling collapsing or
          content reflowing. A window <Code>resize</Code> listener misses all of
          those.
        </P>
        <ComponentPreview
          code={`const [ref, { width, height }] = useElementSize<HTMLDivElement>()

<div ref={ref}>{Math.round(width)}px wide</div>`}
        >
          <ElementSizeDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useIntersection</H3>
        <P>
          Hands back the raw <Code>IntersectionObserverEntry</Code>, not just a
          boolean, so <Code>intersectionRatio</Code> and{" "}
          <Code>boundingClientRect</Code> are there when you need them. It is{" "}
          <Code>null</Code> until the observer first reports.
        </P>
        <ComponentPreview
          code={`const [ref, entry] = useIntersection<HTMLDivElement>({ threshold: 0.5 })

<section ref={ref} data-visible={entry?.isIntersecting} />`}
        >
          <IntersectionDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useMergedRef</H3>
        <P>
          One element, several refs. Needed whenever you hold your own ref on an
          element another hook also wants — measuring an input you also focus, as
          below. An element takes one <Code>ref</Code> prop, so without this the
          second one silently wins.
        </P>
        <ComponentPreview
          code={`const own = useRef<HTMLInputElement>(null)
const [measured, { width }] = useElementSize<HTMLInputElement>()

<Input ref={useMergedRef(own, measured)} />`}
        >
          <MergedRefDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>useAnnouncer</H3>
        <P>
          Announces a message through a shared ARIA live region, for changes that
          have no visible text of their own — results loaded, an item removed, a
          background save finished. One region for the whole app, created on first
          use. Also exported as bare <Code>announce</Code> and{" "}
          <Code>clearAnnouncer</Code> functions for use outside a component.
        </P>
        <P>
          Prefer marking up the changing content itself as a live region where you
          can. This is for the cases where there is nothing on screen to mark up.
          See{" "}
          <a
            href="/docs/accessibility/announcer"
            className="underline underline-offset-4 hover:text-primary"
          >
            Announcer
          </a>{" "}
          for politeness levels and the timing rules.
        </P>
        <ComponentPreview
          code={`const { announce, clear } = useAnnouncer()

announce(\`\${results.length} results loaded\`)          // polite
announce("Session expired", "assertive")              // interrupts`}
        >
          <AnnouncerDemo />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <P>
          Every hook, with its signature. All eighteen are SSR-safe — they read no
          browser API during render — and each is a separate module, so importing
          one does not pull in the rest.
        </P>
        <PropsTable props={hooks} />
      </Stack>
    </DocPage>
  )
}
