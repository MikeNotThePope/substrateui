"use client"

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
        <H3>API Reference</H3>
        <PropsTable props={dropdownMenuProps} />
      </Stack>
    </DocPage>
  )
}
