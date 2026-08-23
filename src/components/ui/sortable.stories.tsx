import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Sortable, SortableItem, reorder } from "./sortable";

const STEPS = ["Screen the CV", "Phone call", "Take-home", "On-site", "Offer"];

function Demo({ initial = STEPS }: { initial?: string[] }) {
  const [items, setItems] = React.useState(initial);
  return (
    <Sortable
      className="w-80 gap-2"
      onReorder={(from, to) => setItems((xs) => reorder(xs, from, to))}
    >
      {items.map((item, i) => (
        <SortableItem key={item} index={i} label={item}>
          <div className="rounded-md border-2 px-3 py-2 text-sm">{item}</div>
        </SortableItem>
      ))}
    </Sortable>
  );
}

const meta: Meta<typeof Sortable> = {
  title: "Data Display/Sortable",
  component: Sortable,
  render: () => <Demo />,
};

export default meta;
type Story = StoryObj<typeof Sortable>;

export const Default: Story = {};

/** One item: both buttons are at an end, so both are disabled. */
export const Single: Story = {
  render: () => <Demo initial={["Screen the CV"]} />,
};
