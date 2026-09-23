"use client"

import { useRef } from "react"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Stack } from "@/components/ui/stack"
import { H3, P, Code } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { CompositionTree } from "../../_components/composition-tree"
import { ImportLine } from "../../_components/import-line"
import { PropsTable, type PropDef } from "../../_components/props-table"

const dropdownMenuProps: PropDef[] = [
  {
    name: "open",
    type: "boolean",
    default: undefined,
    description: "Controlled open state of the dropdown menu.",
  },
  {
    name: "onOpenChange",
    type: "(open: boolean) => void",
    default: undefined,
    description: "Callback fired when the open state changes.",
  },
]

const contentProps: PropDef[] = [
  {
    name: "container",
    type: "HTMLElement | ShadowRoot | RefObject | null",
    default: "document.body",
    description:
      "Element the popup portals into. Pass one inside <main> to keep the open menu inside a landmark. Submenus follow it.",
  },
  {
    name: "positionMethod",
    type: '"absolute" | "fixed"',
    default: '"absolute"',
    description:
      "CSS position the popup is placed with. Match the trigger: pass \"fixed\" when the trigger is position: fixed.",
  },
]

/** The menu portals into a node inside the page's <main>, not <body>. */
function ContainedMenu() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          Account
        </DropdownMenuTrigger>
        <DropdownMenuContent container={container} positionMethod="fixed">
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div ref={container} />
    </>
  )
}

export default function DropdownMenuPage() {
  return (
    <DocPage
      title="Dropdown Menu"
      description="A menu triggered by a button that displays a list of actions or options. Supports grouping, labels, and separators."
    >
      {/* Basic Dropdown */}
      <Stack gap="md">
        <H3>Grouped Menu</H3>
        <ComponentPreview
          code={`<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
    <MoreHorizontal className="h-4 w-4" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ComponentPreview>
      </Stack>

      <ImportLine
        names={[
          "DropdownMenu",
          "DropdownMenuContent",
          "DropdownMenuItem",
          "DropdownMenuLabel",
          "DropdownMenuSeparator",
          "DropdownMenuTrigger",
        ]}
      />

      <Stack gap="md">
        <H3>Portal Container</H3>
        <P>
          The popup portals into <Code>{"<body>"}</Code> unless{" "}
          <Code>container</Code> names another element. On{" "}
          <Code>{"<body>"}</Code> it sits outside every landmark, which axe
          reports under <Code>region</Code>. Pass an element inside{" "}
          <Code>{"<main>"}</Code> and the open menu stays in it.
        </P>
        <ComponentPreview
          code={`const container = useRef<HTMLDivElement>(null)

<DropdownMenu modal={false}>
  <DropdownMenuTrigger render={<Button variant="outline" />}>Account</DropdownMenuTrigger>
  <DropdownMenuContent container={container} positionMethod="fixed">
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
<div ref={container} />`}
        >
          <ContainedMenu />
        </ComponentPreview>
      </Stack>

      <Stack gap="md">
        <H3>Composition</H3>
        <CompositionTree
          root="DropdownMenu"
          nodes={[
            { name: "DropdownMenuTrigger" },
            {
              name: "DropdownMenuContent",
              children: [
                { name: "DropdownMenuLabel" },
                { name: "DropdownMenuSeparator" },
                { name: "DropdownMenuItem" },
              ],
            },
          ]}
        />
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>Direction</H3>
        <Stack gap="sm">
          <P>
            The submenu indicator is a <Code>ChevronRight</Code>, and it mirrors:
            a submenu opens toward the end of the line, which in RTL is leftward.
            The{" "}
            <a
              href="/docs/accessibility/direction"
              className="underline underline-offset-4 hover:text-primary"
            >
              RTL icon audit
            </a>{" "}
            classifies it <strong>flip in RTL</strong>.
          </P>
          <P>
            What does not mirror is a shortcut hint. <Code>⌘K</Code> is a key name,
            not a direction, so <Code>DropdownMenuShortcut</Code> moves to the
            start edge in RTL but its text stays as written.
          </P>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>Accessibility</H3>
        <Stack gap="sm">
          <P>
            While a menu with <Code>{"modal={false}"}</Code> is open, axe
            reports <Code>aria-hidden-focus</Code> on six empty spans. A modal
            menu has the same spans, but axe reads its backdrop as a modal and
            files them under needs review.
            They are Base UI&apos;s focus guards:{" "}
            <Code>{`<span aria-hidden="true" tabindex="0" data-base-ui-focus-guard>`}</Code>{" "}
            around the trigger and the popup. A guard takes Tab, closes the
            menu and passes focus straight on to the next control on the
            page. Focus never rests on one.
          </P>
          <P>
            The rule is wrong about them. axe accepts an aria-hidden element
            that redirects focus when it carries an <Code>onfocus</Code>{" "}
            handler, but it reads the DOM property, and React attaches the
            handler at the root, so axe finds none. No prop removes the
            guards. Without <Code>tabindex</Code>, Tab walks past them and
            leaves the menu open behind it; without{" "}
            <Code>aria-hidden</Code>, screen readers announce empty spans.
            Scope the rule to them in your axe run instead:
          </P>
          <pre className="whitespace-pre-wrap break-words rounded-md border-2 p-3 font-mono text-xs">
            <code>{`await new AxeBuilder({ page })
  .exclude("[data-base-ui-focus-guard]")
  .analyze()`}</code>
          </pre>
        </Stack>
      </Stack>

      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={dropdownMenuProps} />

        <H3>DropdownMenuContent</H3>
        <PropsTable props={contentProps} />
      </Stack>
    </DocPage>
  )
}
