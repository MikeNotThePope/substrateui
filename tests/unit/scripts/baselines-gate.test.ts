import { describe, it, expect } from 'vitest'

import { APPROVER, approvedBy, verdict } from '../../../scripts/baselines-gate'

/**
 * The gate in front of `Update Visual Baselines`. One case per way the
 * dispatch can arrive: no pull request, a pull request nobody reviewed, a
 * review from the wrong account, and Mike's approval. A gate that always
 * passes looks exactly like a gate, so the refusals are the tests that matter.
 */

const pull = { number: 7, html_url: 'https://github.com/MikeNotThePope/substrateui/pull/7' }
const review = (login: string, state: string) => ({ state, user: { login } })

describe('verdict', () => {
  it('refuses a branch with no open pull request', () => {
    const v = verdict('claude/x', [], [])
    expect(v.allowed).toBe(false)
    if (!v.allowed) expect(v.reason).toContain('No open pull request')
  })

  it('refuses a pull request with no review', () => {
    const v = verdict('claude/x', [pull], [])
    expect(v.allowed).toBe(false)
    if (!v.allowed) expect(v.reason).toContain(pull.html_url)
  })

  it("refuses a review from another account", () => {
    const v = verdict('claude/x', [pull], [review('someone-else', 'APPROVED')])
    expect(v.allowed).toBe(false)
  })

  it("allows Mike's approving review", () => {
    const v = verdict('claude/x', [pull], [review(APPROVER, 'APPROVED')])
    expect(v).toEqual({ allowed: true, pull })
  })
})

describe('approvedBy', () => {
  it('lets the last position win', () => {
    expect(approvedBy([review(APPROVER, 'APPROVED'), review(APPROVER, 'CHANGES_REQUESTED')], APPROVER)).toBe(false)
    expect(approvedBy([review(APPROVER, 'CHANGES_REQUESTED'), review(APPROVER, 'APPROVED')], APPROVER)).toBe(true)
  })

  it('treats a dismissal as withdrawing the approval', () => {
    expect(approvedBy([review(APPROVER, 'DISMISSED')], APPROVER)).toBe(false)
  })

  it('ignores a comment after an approval', () => {
    expect(approvedBy([review(APPROVER, 'APPROVED'), review(APPROVER, 'COMMENTED')], APPROVER)).toBe(true)
  })

  it('matches the login without regard to case', () => {
    expect(approvedBy([review('mikenotthepope', 'APPROVED')], APPROVER)).toBe(true)
  })
})
