import * as React from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Slot, Slottable } from "@/lib/slot"

describe("Slot", () => {
  it("renders the child element with merged className", () => {
    render(
      <Slot className="from-slot" data-testid="target">
        <a href="#x" className="from-child">
          Link
        </a>
      </Slot>
    )
    const el = screen.getByTestId("target")
    expect(el.tagName).toBe("A")
    expect(el).toHaveClass("from-slot")
    expect(el).toHaveClass("from-child")
  })

  it("lets child props win over slot props", () => {
    render(
      <Slot id="slot-id" data-testid="slot">
        <span id="child-id">text</span>
      </Slot>
    )
    expect(screen.getByTestId("slot")).toHaveAttribute("id", "child-id")
  })

  it("chains event handlers from both slot and child", async () => {
    const user = userEvent.setup()
    const slotClick = vi.fn()
    const childClick = vi.fn()
    render(
      <Slot onClick={slotClick}>
        <button onClick={childClick}>go</button>
      </Slot>
    )
    await user.click(screen.getByRole("button"))
    expect(slotClick).toHaveBeenCalledTimes(1)
    expect(childClick).toHaveBeenCalledTimes(1)
  })

  it("merges style objects with child styles winning", () => {
    render(
      <Slot style={{ color: "red", margin: "1px" }} data-testid="styled">
        <div style={{ color: "blue" }} />
      </Slot>
    )
    const el = screen.getByTestId("styled")
    expect(el.style.color).toBe("blue")
    expect(el.style.margin).toBe("1px")
  })

  it("composes refs from slot and child", () => {
    const slotRef = React.createRef<HTMLElement>()
    const childRef = React.createRef<HTMLButtonElement>()
    render(
      <Slot ref={slotRef}>
        <button ref={childRef}>go</button>
      </Slot>
    )
    expect(slotRef.current).toBeInstanceOf(HTMLButtonElement)
    expect(childRef.current).toBe(slotRef.current)
  })

  it("renders nothing for a non-element child", () => {
    const { container } = render(<Slot>plain text</Slot>)
    expect(container).toBeEmptyDOMElement()
  })

  it("supports Slottable so siblings stay inside the slotted element", () => {
    render(
      <Slot className="tab" data-testid="link">
        <Slottable>
          <a href="#a">Label</a>
        </Slottable>
        <span data-testid="badge">3</span>
      </Slot>
    )
    const el = screen.getByTestId("link")
    expect(el.tagName).toBe("A")
    expect(el).toHaveTextContent("Label3")
    expect(screen.getByTestId("badge").parentElement).toBe(el)
  })
})
