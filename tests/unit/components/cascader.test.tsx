import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent, within } from "@testing-library/react"

import { Cascader, type CascaderOption } from "@/components/ui/cascader"

const places: CascaderOption[] = [
  {
    value: "asia",
    label: "Asia",
    children: [
      {
        value: "jp",
        label: "Japan",
        children: [
          { value: "tokyo", label: "Tokyo" },
          { value: "osaka", label: "Osaka" },
        ],
      },
    ],
  },
  {
    value: "europe",
    label: "Europe",
    children: [{ value: "pt", label: "Portugal", disabled: true }],
  },
  { value: "antarctica", label: "Antarctica" },
]

function columns() {
  return document.querySelectorAll<HTMLElement>('[data-slot="cascader-column"]')
}

describe("Cascader", () => {
  it("shows the placeholder and opens to a single root column", () => {
    render(<Cascader options={places} placeholder="Pick a city" />)
    const trigger = screen.getByRole("button", { name: /pick a city/i })
    fireEvent.click(trigger)

    expect(columns()).toHaveLength(1)
    expect(within(columns()[0]).getByText("Asia")).toBeInTheDocument()
    expect(within(columns()[0]).getByText("Antarctica")).toBeInTheDocument()
  })

  it("drills into a branch without committing a value", () => {
    const onChange = vi.fn()
    render(<Cascader options={places} placeholder="Pick a city" onChange={onChange} />)
    fireEvent.click(screen.getByRole("button", { name: /pick a city/i }))

    fireEvent.click(within(columns()[0]).getByText("Asia"))
    expect(columns()).toHaveLength(2)
    expect(within(columns()[1]).getByText("Japan")).toBeInTheDocument()
    expect(onChange).not.toHaveBeenCalled()
  })

  it("commits the full path when a leaf is chosen and closes", () => {
    const onChange = vi.fn()
    render(<Cascader options={places} placeholder="Pick a city" onChange={onChange} />)
    fireEvent.click(screen.getByRole("button", { name: /pick a city/i }))

    fireEvent.click(within(columns()[0]).getByText("Asia"))
    fireEvent.click(within(columns()[1]).getByText("Japan"))
    fireEvent.click(within(columns()[2]).getByText("Tokyo"))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toEqual(["asia", "jp", "tokyo"])
    expect(onChange.mock.calls[0][1].map((o: CascaderOption) => o.value)).toEqual([
      "asia",
      "jp",
      "tokyo",
    ])
    expect(columns()).toHaveLength(0)
    expect(screen.getByRole("button", { name: /asia.*japan.*tokyo/i })).toBeInTheDocument()
  })

  it("commits branches too when changeOnSelect is set", () => {
    const onChange = vi.fn()
    render(
      <Cascader
        options={places}
        placeholder="Pick any level"
        changeOnSelect
        onChange={onChange}
      />
    )
    fireEvent.click(screen.getByRole("button", { name: /pick any level/i }))
    fireEvent.click(within(columns()[0]).getByText("Asia"))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0]).toEqual(["asia"])
    // Still open — a branch selection keeps drilling available.
    expect(columns()).toHaveLength(2)
  })

  it("never selects a disabled option", () => {
    const onChange = vi.fn()
    render(<Cascader options={places} placeholder="Pick a city" onChange={onChange} />)
    fireEvent.click(screen.getByRole("button", { name: /pick a city/i }))
    fireEvent.click(within(columns()[0]).getByText("Europe"))

    const portugal = within(columns()[1]).getByRole("option", { name: "Portugal" })
    expect(portugal).toBeDisabled()
    fireEvent.click(portugal)
    expect(onChange).not.toHaveBeenCalled()
  })

  it("searches whole paths and commits the match", () => {
    const onChange = vi.fn()
    render(
      <Cascader options={places} placeholder="Pick a city" showSearch onChange={onChange} />
    )
    fireEvent.click(screen.getByRole("button", { name: /pick a city/i }))
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "osak" } })

    const results = screen.getAllByRole("option")
    expect(results).toHaveLength(1)
    fireEvent.click(results[0])

    expect(onChange.mock.calls[0][0]).toEqual(["asia", "jp", "osaka"])
  })

  it("reports an empty search with no results", () => {
    render(<Cascader options={places} placeholder="Pick a city" showSearch />)
    fireEvent.click(screen.getByRole("button", { name: /pick a city/i }))
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "zzz" } })

    expect(screen.queryAllByRole("option")).toHaveLength(0)
    expect(screen.getByText("No options")).toBeInTheDocument()
  })

  it("renders a controlled value and reopens on that path", () => {
    render(
      <Cascader options={places} value={["asia", "jp", "tokyo"]} onChange={() => {}} />
    )
    const trigger = screen.getByRole("button", { name: /asia.*japan.*tokyo/i })
    fireEvent.click(trigger)

    // Three columns, because the committed path is restored on open.
    expect(columns()).toHaveLength(3)
    expect(
      within(columns()[2]).getByRole("option", { name: "Tokyo" })
    ).toHaveAttribute("aria-selected", "true")
  })

  it("clears the selection with the clear button", () => {
    const onChange = vi.fn()
    render(
      <Cascader
        options={places}
        defaultValue={["antarctica"]}
        clearable
        onChange={onChange}
      />
    )
    fireEvent.click(screen.getByRole("button", { name: "Clear selection" }))

    expect(onChange).toHaveBeenCalledWith([], [])
    expect(screen.getByRole("button", { name: /select/i })).toBeInTheDocument()
  })

  it("moves between columns with the arrow keys", () => {
    render(<Cascader options={places} placeholder="Pick a city" />)
    fireEvent.click(screen.getByRole("button", { name: /pick a city/i }))

    const asia = within(columns()[0]).getByRole("option", { name: "Asia" })
    asia.focus()
    fireEvent.keyDown(asia, { key: "ArrowDown" })
    expect(document.activeElement).toBe(
      within(columns()[0]).getByRole("option", { name: "Europe" })
    )

    fireEvent.keyDown(document.activeElement!, { key: "ArrowUp" })
    expect(document.activeElement).toBe(asia)

    fireEvent.keyDown(asia, { key: "ArrowRight" })
    expect(columns()).toHaveLength(2)
    expect(document.activeElement).toBe(
      within(columns()[1]).getByRole("option", { name: "Japan" })
    )

    fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" })
    expect(document.activeElement).toBe(asia)
  })
})

describe("Cascader (uncontrolled)", () => {
  it("keeps its own state when only defaultValue is given", () => {
    render(<Cascader options={places} defaultValue={["antarctica"]} />)
    expect(screen.getByRole("button", { name: /antarctica/i })).toBeInTheDocument()
  })
})
