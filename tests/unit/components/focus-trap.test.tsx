import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"

import { FocusTrap } from "@/components/ui/focus-trap"

describe("FocusTrap", () => {
  it("focuses the first focusable element on activation", () => {
    render(
      <FocusTrap active>
        <button>First</button>
        <button>Second</button>
      </FocusTrap>
    )
    expect(screen.getByText("First")).toHaveFocus()
  })

  it("wraps focus from the last element back to the first on Tab", () => {
    render(
      <FocusTrap active>
        <button>First</button>
        <button>Last</button>
      </FocusTrap>
    )
    const last = screen.getByText("Last")
    last.focus()
    expect(last).toHaveFocus()

    fireEvent.keyDown(document, { key: "Tab" })
    expect(screen.getByText("First")).toHaveFocus()
  })

  it("wraps backwards from first to last on Shift+Tab", () => {
    render(
      <FocusTrap active>
        <button>First</button>
        <button>Last</button>
      </FocusTrap>
    )
    screen.getByText("First").focus()
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true })
    expect(screen.getByText("Last")).toHaveFocus()
  })

  it("does not move focus when inactive", () => {
    render(
      <>
        <button>Outside</button>
        <FocusTrap active={false}>
          <button>Inside</button>
        </FocusTrap>
      </>
    )
    const outside = screen.getByText("Outside")
    outside.focus()
    expect(outside).toHaveFocus()
  })

  it("restores focus to the previously focused element on deactivate", () => {
    const { rerender } = render(
      <>
        <button>Trigger</button>
        <FocusTrap active={false}>
          <button>Inside</button>
        </FocusTrap>
      </>
    )
    const trigger = screen.getByText("Trigger")
    trigger.focus()
    expect(trigger).toHaveFocus()

    rerender(
      <>
        <button>Trigger</button>
        <FocusTrap active>
          <button>Inside</button>
        </FocusTrap>
      </>
    )
    expect(screen.getByText("Inside")).toHaveFocus()

    rerender(
      <>
        <button>Trigger</button>
        <FocusTrap active={false}>
          <button>Inside</button>
        </FocusTrap>
      </>
    )
    expect(trigger).toHaveFocus()
  })
})
