import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, within } from "@testing-library/react"

import { Transfer, type TransferItem } from "@/components/ui/transfer"

const data: TransferItem[] = [
  { key: "read", label: "Read records" },
  { key: "write", label: "Write records" },
  { key: "audit", label: "View audit log" },
  { key: "owner", label: "Transfer ownership", disabled: true },
]

/** The two panels, in DOM order: [source, target]. */
function panels() {
  return document.querySelectorAll<HTMLElement>('[data-slot="transfer-panel"]')
}

function checkboxFor(label: string) {
  const row = screen.getByText(label).closest('[data-slot="transfer-item"]')!
  return within(row as HTMLElement).getByRole("checkbox")
}

describe("Transfer", () => {
  it("splits items between source and target by targetKeys", () => {
    render(<Transfer dataSource={data} defaultTargetKeys={["audit"]} />)
    const [source, target] = panels()

    expect(within(source).getByText("Read records")).toBeInTheDocument()
    expect(within(target).getByText("View audit log")).toBeInTheDocument()
    expect(within(source).queryByText("View audit log")).not.toBeInTheDocument()
  })

  it("moves checked items to the target and reports the change", () => {
    const onChange = vi.fn()
    render(<Transfer dataSource={data} onChange={onChange} />)

    fireEvent.click(checkboxFor("Read records"))
    fireEvent.click(screen.getByRole("button", { name: "Move to target" }))

    expect(onChange).toHaveBeenCalledWith(["read"], "target", ["read"])
    expect(within(panels()[1]).getByText("Read records")).toBeInTheDocument()
  })

  it("moves checked items back to the source", () => {
    const onChange = vi.fn()
    render(
      <Transfer dataSource={data} defaultTargetKeys={["read", "write"]} onChange={onChange} />
    )

    fireEvent.click(checkboxFor("Write records"))
    fireEvent.click(screen.getByRole("button", { name: "Move to source" }))

    expect(onChange).toHaveBeenCalledWith(["read"], "source", ["write"])
    expect(within(panels()[0]).getByText("Write records")).toBeInTheDocument()
  })

  it("disables the move buttons until something selectable is checked", () => {
    render(<Transfer dataSource={data} />)
    const toTarget = screen.getByRole("button", { name: "Move to target" })
    expect(toTarget).toBeDisabled()

    fireEvent.click(checkboxFor("Read records"))
    expect(toTarget).toBeEnabled()
  })

  it("never moves disabled items", () => {
    render(<Transfer dataSource={data} />)
    expect(checkboxFor("Transfer ownership")).toHaveAttribute("aria-disabled", "true")

    // Select-all in the source panel skips the disabled row.
    const selectAll = within(panels()[0]).getAllByRole("checkbox")[0]
    fireEvent.click(selectAll)
    fireEvent.click(screen.getByRole("button", { name: "Move to target" }))

    expect(within(panels()[0]).getByText("Transfer ownership")).toBeInTheDocument()
  })

  it("filters a panel with search", () => {
    render(<Transfer dataSource={data} showSearch />)
    const source = panels()[0]

    fireEvent.change(within(source).getByRole("searchbox"), {
      target: { value: "audit" },
    })

    expect(within(source).getByText("View audit log")).toBeInTheDocument()
    expect(within(source).queryByText("Read records")).not.toBeInTheDocument()
  })

  it("honours controlled targetKeys", () => {
    const { rerender } = render(<Transfer dataSource={data} targetKeys={[]} />)
    fireEvent.click(checkboxFor("Read records"))
    fireEvent.click(screen.getByRole("button", { name: "Move to target" }))

    // Controlled: nothing moves until the parent updates the prop.
    expect(within(panels()[0]).getByText("Read records")).toBeInTheDocument()

    rerender(<Transfer dataSource={data} targetKeys={["read"]} />)
    expect(within(panels()[1]).getByText("Read records")).toBeInTheDocument()
  })
})
