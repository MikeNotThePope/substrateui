import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

// Radix UI + jsdom compatibility shims
if (typeof window !== 'undefined') {
  // ResizeObserver isn't in jsdom
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  // matchMedia isn't in jsdom — Radix and next-themes both need it
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })

  // PointerEvent isn't fully in jsdom — Radix uses it heavily
  if (!window.PointerEvent) {
    class PointerEvent extends MouseEvent {
      constructor(type: string, params: PointerEventInit = {}) {
        super(type, params)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.PointerEvent = PointerEvent as any
  }

  // hasPointerCapture / releasePointerCapture / setPointerCapture — Radix calls these
  if (!HTMLElement.prototype.hasPointerCapture) {
    HTMLElement.prototype.hasPointerCapture = () => false
    HTMLElement.prototype.releasePointerCapture = () => {}
    HTMLElement.prototype.setPointerCapture = () => {}
  }

  // scrollIntoView — Radix Select uses this
  HTMLElement.prototype.scrollIntoView = () => {}
}
