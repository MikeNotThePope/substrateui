"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { resolveLabels } from "@/lib/resolve-labels";
import { useLabels } from "@/components/providers/labels-provider";

// ─── i18n labels ────────────────────────────────────────────────────

/** Translatable strings used by SortableItem. All keys have English defaults.
 *
 * `{item}` is replaced with the item's `label`. Strings rather than functions:
 * a translator can move the placeholder inside the sentence, and a string
 * survives being written in a JSON message catalogue.
 */
interface SortableLabels {
  /** Accessible name for the move-up button. */
  moveUp?: string;
  /** Accessible name for the move-down button. */
  moveDown?: string;
}

const defaultSortableLabels: Required<SortableLabels> = {
  moveUp: "Move {item} up",
  moveDown: "Move {item} down",
};

const fill = (template: string, item: string) =>
  template.replace("{item}", item);

// ─── Context ────────────────────────────────────────────────────────

interface SortableContextValue {
  count: number;
  dragging: number | null;
  setDragging: (index: number | null) => void;
  onReorder: (from: number, to: number) => void;
}

const SortableContext = React.createContext<SortableContextValue | null>(null);

function useSortable(component: string) {
  const ctx = React.useContext(SortableContext);
  if (!ctx) throw new Error(`${component} must be used inside <Sortable>`);
  return ctx;
}

// ─── reorder ────────────────────────────────────────────────────────

/** A copy of `items` with the element at `from` moved to `to`.
 *
 * Out-of-range indices return the list unchanged, so a caller need not guard
 * the ends — the buttons are disabled there anyway, and a drag that leaves the
 * list should do nothing rather than throw.
 */
export function reorder<T>(items: readonly T[], from: number, to: number): T[] {
  if (from === to) return [...items];
  if (from < 0 || to < 0 || from >= items.length || to >= items.length)
    return [...items];
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved as T);
  return next;
}

// ─── Sortable ───────────────────────────────────────────────────────

/** Props for Sortable. */
interface SortableProps extends React.ComponentPropsWithRef<"div"> {
  /** Called with the index moved from and the index moved to. */
  onReorder: (from: number, to: number) => void;
}

/** A vertical list whose items can be reordered by button or by drag.
 *
 * Controlled and stateless about order: it reports a move and the caller owns
 * the array. That is what lets the same list drive a form field, a draft that
 * saves on submit, or an optimistic write.
 *
 * The buttons are the control and the drag is a mouse shortcut on top of them,
 * not the other way round. A drag handle alone has no keyboard equivalent —
 * WCAG 2.1.1 — so `SortableItem` renders the buttons itself and the grip is
 * `aria-hidden`. There is deliberately no prop to turn them off.
 */
function Sortable({ className, children, onReorder, ...props }: SortableProps) {
  const [dragging, setDragging] = React.useState<number | null>(null);
  const count = React.Children.count(children);

  // While a grip is held, swap the dragged item toward whatever item the
  // pointer is over. Listeners live on window so the drag survives the pointer
  // leaving the grip; body user-select is killed so nothing highlights.
  React.useEffect(() => {
    if (dragging === null) return;
    const onMove = (event: PointerEvent) => {
      const el = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest("[data-sortable-index]");
      const over = el
        ? Number(el.getAttribute("data-sortable-index"))
        : Number.NaN;
      if (Number.isNaN(over) || over === dragging) return;
      onReorder(dragging, over);
      setDragging(over);
    };
    const onUp = () => setDragging(null);
    const previous = document.body.style.userSelect;
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      document.body.style.userSelect = previous;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, onReorder]);

  const value = React.useMemo(
    () => ({ count, dragging, setDragging, onReorder }),
    [count, dragging, onReorder],
  );

  return (
    <SortableContext.Provider value={value}>
      <div
        data-slot="sortable"
        className={cn("flex flex-col", className)}
        {...props}
      >
        {children}
      </div>
    </SortableContext.Provider>
  );
}

// ─── SortableItem ───────────────────────────────────────────────────

/** Props for SortableItem. */
interface SortableItemProps extends React.ComponentPropsWithRef<"div"> {
  /** This item's position in the list. */
  index: number;
  /** What the move buttons call this item — a screen reader hears it. */
  label: string;
  labels?: SortableLabels;
}

/** One row of a Sortable: move buttons, a drag grip, then your content.
 *
 * The buttons are named after the item rather than the action, so a screen
 * reader hears "Move Shipping address up" instead of eight identical
 * "Move up"s.
 */
function SortableItem({
  className,
  children,
  index,
  label,
  labels: labelsProp,
  ...props
}: SortableItemProps) {
  const { count, dragging, setDragging, onReorder } =
    useSortable("SortableItem");
  const ctx = useLabels();
  const labels = resolveLabels(defaultSortableLabels, ctx.sortable, labelsProp);
  const isDragging = dragging === index;

  return (
    <div
      data-slot="sortable-item"
      data-sortable-index={index}
      data-dragging={isDragging || undefined}
      className={cn(
        "flex items-center gap-2",
        isDragging && "opacity-60",
        className,
      )}
      {...props}
    >
      <div className="flex flex-none flex-col">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-5 px-1"
          disabled={index === 0}
          aria-label={fill(labels.moveUp, label)}
          onClick={() => onReorder(index, index - 1)}
        >
          <ChevronUp className="size-3.5" aria-hidden />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-5 px-1"
          disabled={index === count - 1}
          aria-label={fill(labels.moveDown, label)}
          onClick={() => onReorder(index, index + 1)}
        >
          <ChevronDown className="size-3.5" aria-hidden />
        </Button>
      </div>
      {/* The grip is the mouse shortcut for the two buttons above, so it is
          decorative to assistive tech and carries no name of its own. */}
      <span
        aria-hidden
        onPointerDown={() => setDragging(index)}
        className={cn(
          "flex-none touch-none text-muted-foreground select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
      >
        <GripVertical className="size-4" />
      </span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export { Sortable, SortableItem, type SortableLabels };
