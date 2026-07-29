import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { act, renderHook } from "@testing-library/react"

import { useCountdown } from "@/hooks/use-countdown"

const NOW = new Date("2030-01-01T00:00:00Z")

describe("useCountdown", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(NOW)
  })
  afterEach(() => vi.useRealTimers())

  const deadlineIn = (seconds: number) => NOW.getTime() + seconds * 1000

  it("measures the remainder once mounted", () => {
    const { result } = renderHook(() => useCountdown(deadlineIn(90)))

    expect(result.current.ready).toBe(true)
    expect(result.current.total).toBe(90_000)
    expect(result.current.minutes).toBe(1)
    expect(result.current.seconds).toBe(30)
    // Both the Intl.DurationFormat path and the fallback agree below a day.
    expect(result.current.formatted).toBe("01:30")
  })

  it("ticks down once a second", () => {
    const { result } = renderHook(() => useCountdown(deadlineIn(90)))

    act(() => void vi.advanceTimersByTime(1000))
    expect(result.current.total).toBe(89_000)
    expect(result.current.formatted).toBe("01:29")

    act(() => void vi.advanceTimersByTime(29_000))
    expect(result.current.formatted).toBe("01:00")
  })

  it("splits multi-day remainders into units", () => {
    const { result } = renderHook(() =>
      useCountdown(deadlineIn(2 * 86400 + 3 * 3600 + 4 * 60 + 5))
    )

    expect(result.current).toMatchObject({ days: 2, hours: 3, minutes: 4, seconds: 5 })
  })

  it("clamps at zero and reports finished", () => {
    const { result } = renderHook(() => useCountdown(deadlineIn(2)))

    act(() => void vi.advanceTimersByTime(10_000))
    expect(result.current.total).toBe(0)
    expect(result.current.finished).toBe(true)
    expect(result.current.formatted).toBe("00:00")
  })

  it("treats an already-passed deadline as finished", () => {
    const { result } = renderHook(() => useCountdown(deadlineIn(-5)))

    expect(result.current.finished).toBe(true)
    expect(result.current.total).toBe(0)
  })

  it("fires onFinish exactly once, not on every later render", () => {
    const onFinish = vi.fn()
    const { result, rerender } = renderHook(() => useCountdown(deadlineIn(2), { onFinish }))

    expect(onFinish).not.toHaveBeenCalled()

    act(() => void vi.advanceTimersByTime(3000))
    expect(result.current.finished).toBe(true)
    expect(onFinish).toHaveBeenCalledTimes(1)

    act(() => void vi.advanceTimersByTime(10_000))
    rerender()
    expect(onFinish).toHaveBeenCalledTimes(1)
  })

  it("fires again when a new deadline is set", () => {
    const onFinish = vi.fn()
    const { rerender } = renderHook(({ d }) => useCountdown(d, { onFinish }), {
      initialProps: { d: deadlineIn(2) },
    })

    act(() => void vi.advanceTimersByTime(3000))
    expect(onFinish).toHaveBeenCalledTimes(1)

    rerender({ d: Date.now() + 2000 })
    act(() => void vi.advanceTimersByTime(3000))
    expect(onFinish).toHaveBeenCalledTimes(2)
  })

  it("stops ticking once finished", () => {
    const { result } = renderHook(() => useCountdown(deadlineIn(1)))
    act(() => void vi.advanceTimersByTime(2000))

    expect(vi.getTimerCount()).toBe(0)
    expect(result.current.finished).toBe(true)
  })

  it("accepts a Date as well as epoch milliseconds", () => {
    const { result } = renderHook(() => useCountdown(new Date(deadlineIn(60))))
    expect(result.current.total).toBe(60_000)
  })

  it("honours a custom tick interval", () => {
    const { result } = renderHook(() => useCountdown(deadlineIn(90), { interval: 5000 }))

    act(() => void vi.advanceTimersByTime(4000))
    expect(result.current.total).toBe(90_000) // no tick yet

    act(() => void vi.advanceTimersByTime(1000))
    expect(result.current.total).toBe(85_000)
  })
})
