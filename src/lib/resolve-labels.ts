/**
 * Merges label overrides into a defaults object.
 *
 * Resolution order (last wins): defaults → context → prop.
 * All three layers share the same shape, but only `defaults` is required
 * to be complete — context and prop are partial overrides.
 */
export function resolveLabels<T extends object>(
  defaults: T,
  context?: Partial<NoInfer<T>>,
  prop?: Partial<NoInfer<T>>,
): T {
  if (!context && !prop) return defaults
  return { ...defaults, ...context, ...prop } as T
}
