"use client";

import * as React from "react";

import { Sortable, SortableItem, reorder } from "@/components/ui/sortable";

const STAGES = ["Screen the CV", "Phone call", "Take-home", "On-site", "Offer"];

/** The list owns its order; Sortable only reports the move. */
export function SortableDemo({
  items: initial = STAGES,
}: {
  items?: string[];
}) {
  const [items, setItems] = React.useState(initial);
  return (
    <Sortable
      className="w-full max-w-sm gap-2"
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
