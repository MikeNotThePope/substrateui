"use client"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Stack } from "@/components/ui/stack"
import { H3 } from "@/components/ui/typography"
import { DocPage } from "../../_components/doc-page"
import { ComponentPreview } from "../../_components/component-preview"
import { PropsTable, type PropDef } from "../../_components/props-table"

const commandProps: PropDef[] = [
  {
    name: "className",
    type: "string",
    default: undefined,
    description: "Additional CSS classes to apply to the command container.",
  },
  {
    name: "children",
    type: "React.ReactNode",
    default: undefined,
    description: "Compose with CommandInput, CommandList, CommandGroup, CommandItem, and CommandEmpty.",
    required: true,
  },
]

export default function CommandPage() {
  return (
    <DocPage
      title="Command"
      description="A command palette for searching and selecting from a list of options. Supports keyboard navigation, grouping, and filtering."
    >
      {/* Command Palette */}
      <Stack gap="md">
        <H3>Command Palette</H3>
        <ComponentPreview
          code={`<Command className="rounded-lg border">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
    <CommandGroup heading="Recent">
      <CommandItem>Dashboard</CommandItem>
      <CommandItem>Projects</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
        >
          <Command className="rounded-lg border w-full">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
              <CommandGroup heading="Recent">
                <CommandItem>Dashboard</CommandItem>
                <CommandItem>Projects</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </ComponentPreview>
      </Stack>

      {/* API Reference */}
      <Stack gap="md">
        <H3>API Reference</H3>
        <PropsTable props={commandProps} />
      </Stack>
    </DocPage>
  )
}
