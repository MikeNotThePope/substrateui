import * as React from "react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { renderToStaticMarkup } from "react-dom/server"

import { Countdown } from "@/components/ui/countdown"
import { StatCard } from "@/components/stat-card"
import { LabelsProvider } from "@/components/providers/labels-provider"

const NOW = new Date("2030-01-01T00:00:00Z")
const deadlineIn = (seconds: number) => NOW.getTime() + seconds * 1000

describe("Countdown", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(NOW)
  })
  afterEach(() => vi.useRealTimers())

  it("renders a timer with an accessible name", () => {
    render(<Countdown deadline={deadlineIn(90)} />)

    const timer = screen.getByRole("timer", { name: "Time remaining" })
    expect(timer).toHaveTextContent("01:30")
  })

  it("updates as it ticks", () => {
    render(<Countdown deadline={deadlineIn(90)} />)

    act(() => void vi.advanceTimersByTime(31_000))
    expect(screen.getByRole("timer")).toHaveTextContent("00:59")
  })

  it("does not announce every tick", () => {
    render(<Countdown deadline={deadlineIn(90)} />)

    // role="timer" has an implicit aria-live of "off"; an explicit polite or
    // assertive region here would read the clock aloud once a second.
    expect(screen.getByRole("timer")).not.toHaveAttribute("aria-live")
  })

  it("renders the render prop instead of the default string", () => {
    render(
      <Countdown deadline={deadlineIn(2 * 86400 + 3 * 3600)}>
        {({ days, hours }) => `${days}d ${hours}h`}
      </Countdown>
    )

    expect(screen.getByRole("timer")).toHaveTextContent("2d 3h")
  })

  it("hands the render prop a finished state", () => {
    render(
      <Countdown deadline={deadlineIn(1)}>
        {({ finished }) => (finished ? "Live now" : "Soon")}
      </Countdown>
    )

    act(() => void vi.advanceTimersByTime(2000))
    expect(screen.getByRole("timer")).toHaveTextContent("Live now")
  })

  it("fires onFinish when the deadline passes", () => {
    const onFinish = vi.fn()
    render(<Countdown deadline={deadlineIn(2)} onFinish={onFinish} />)

    act(() => void vi.advanceTimersByTime(3000))
    expect(onFinish).toHaveBeenCalledTimes(1)
  })

  it("takes an accessible name from the labels provider", () => {
    render(
      <LabelsProvider labels={{ countdown: { remaining: "Tiempo restante" } }}>
        <Countdown deadline={deadlineIn(90)} />
      </LabelsProvider>
    )

    expect(screen.getByRole("timer", { name: "Tiempo restante" })).toBeInTheDocument()
  })

  it("lets a prop override the provider label", () => {
    render(
      <LabelsProvider labels={{ countdown: { remaining: "Tiempo restante" } }}>
        <Countdown deadline={deadlineIn(90)} labels={{ remaining: "Until launch" }} />
      </LabelsProvider>
    )

    expect(screen.getByRole("timer", { name: "Until launch" })).toBeInTheDocument()
  })

  it("renders no clock on the server, so hydration cannot mismatch", () => {
    const html = renderToStaticMarkup(<Countdown deadline={deadlineIn(90)} />)

    expect(html).toContain('role="timer"')
    expect(html).not.toMatch(/\d\d:\d\d/)
  })

  it("drops into StatCard as a value", () => {
    render(<StatCard title="Sale ends" value={<Countdown deadline={deadlineIn(90)} />} />)

    expect(screen.getByRole("timer")).toHaveTextContent("01:30")
    expect(screen.getByText("Sale ends")).toBeInTheDocument()
  })
})
