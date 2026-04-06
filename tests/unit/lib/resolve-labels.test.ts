import { describe, it, expect } from 'vitest'
import { resolveLabels } from '@/lib/resolve-labels'

interface TestLabels {
  greeting: string
  farewell: string
}

const defaults: TestLabels = {
  greeting: "Hello",
  farewell: "Goodbye",
}

describe('resolveLabels', () => {
  it('returns defaults when no overrides are provided', () => {
    expect(resolveLabels(defaults)).toEqual(defaults)
  })

  it('returns defaults when context and prop are undefined', () => {
    expect(resolveLabels(defaults, undefined, undefined)).toEqual(defaults)
  })

  it('merges context overrides into defaults', () => {
    const result = resolveLabels(defaults, { greeting: "Bonjour" })
    expect(result).toEqual({ greeting: "Bonjour", farewell: "Goodbye" })
  })

  it('merges prop overrides into defaults', () => {
    const result = resolveLabels(defaults, undefined, { farewell: "Au revoir" })
    expect(result).toEqual({ greeting: "Hello", farewell: "Au revoir" })
  })

  it('prop overrides take precedence over context overrides', () => {
    const result = resolveLabels(
      defaults,
      { greeting: "Bonjour", farewell: "Au revoir" },
      { greeting: "Hola" },
    )
    expect(result).toEqual({ greeting: "Hola", farewell: "Au revoir" })
  })

  it('leaves defaults intact for keys not overridden', () => {
    const result = resolveLabels(
      defaults,
      { greeting: "Bonjour" },
      { farewell: "Adiós" },
    )
    expect(result).toEqual({ greeting: "Bonjour", farewell: "Adiós" })
  })
})
