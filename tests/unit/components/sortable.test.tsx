import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Sortable, SortableItem, reorder } from "@/components/ui/sortable";

describe("reorder", () => {
  it("moves an element and keeps the rest in order", () => {
    expect(reorder(["a", "b", "c"], 0, 2)).toEqual(["b", "c", "a"]);
    expect(reorder(["a", "b", "c"], 2, 0)).toEqual(["c", "a", "b"]);
  });

  it("returns a copy, never the same array", () => {
    const items = ["a", "b"];
    expect(reorder(items, 0, 0)).not.toBe(items);
    expect(reorder(items, 0, 0)).toEqual(items);
  });

  // The drag reads an index off the DOM, so an out-of-range value is reachable
  // without a caller mistake — it must be inert rather than throw.
  it("leaves the list alone when an index is out of range", () => {
    expect(reorder(["a", "b"], 0, 5)).toEqual(["a", "b"]);
    expect(reorder(["a", "b"], -1, 1)).toEqual(["a", "b"]);
  });
});

function List({
  onReorder = () => {},
}: {
  onReorder?: (from: number, to: number) => void;
}) {
  const items = ["Screen the CV", "Phone call", "Offer"];
  return (
    <Sortable onReorder={onReorder}>
      {items.map((item, i) => (
        <SortableItem key={item} index={i} label={item}>
          {item}
        </SortableItem>
      ))}
    </Sortable>
  );
}

describe("SortableItem", () => {
  it("names its buttons after the item, not the action", () => {
    render(<List />);
    expect(
      screen.getByRole("button", { name: "Move Phone call up" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Move Phone call down" }),
    ).toBeInTheDocument();
  });

  it("disables the move that would leave the list", () => {
    render(<List />);
    expect(
      screen.getByRole("button", { name: "Move Screen the CV up" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Move Offer down" }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Move Phone call up" }),
    ).toBeEnabled();
  });

  it("reports the move rather than performing it", async () => {
    const onReorder = vi.fn();
    render(<List onReorder={onReorder} />);
    await userEvent.click(
      screen.getByRole("button", { name: "Move Phone call up" }),
    );
    expect(onReorder).toHaveBeenCalledWith(1, 0);
  });

  // WCAG 2.1.1: the grip is a mouse shortcut for the buttons, so it must not
  // be the only way to reorder — and must not announce itself as a second one.
  it("hides the drag grip from assistive tech", () => {
    const { container } = render(<List />);
    expect(
      container.querySelectorAll("[aria-hidden='true'][class*='cursor-grab']"),
    ).toHaveLength(3);
  });

  it("throws when used outside Sortable", () => {
    const quiet = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <SortableItem index={0} label="Orphan">
          x
        </SortableItem>,
      ),
    ).toThrow(/must be used inside <Sortable>/);
    quiet.mockRestore();
  });
});
