import type { Meta, StoryObj } from "@storybook/react-vite"
import { Calendar, Search, Settings } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command"

const meta: Meta<typeof Command> = {
  title: "Overlays/Command",
  component: Command,
}

export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {
  render: () => (
    <Command className="w-80 rounded-lg border-2">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="me-2 size-4" /> Calendar
          </CommandItem>
          <CommandItem>
            <Search className="me-2 size-4" /> Search
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <Settings className="me-2 size-4" /> Settings
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}
