// Refuses `Update Visual Baselines` unless the branch's open pull request
// carries Mike's approving review.
//
// The visual suite compares every docs page to screenshots in one Cloudflare
// R2 archive that `main` and every branch read. The workflow this script
// fronts overwrites that archive, so it is the one check in this repository a
// session can loosen to match its own code, and until now nothing recorded it:
// 44 dispatches by hand, all of them Mike's, and the GitHub MCP tools let a
// session press the same button. The rule, from lavahire's `unrecoverable`
// check: nothing that no later commit can undo moves without his review
// (MikeNotThePope/lavahire#797).
//
// The review has to be on a pull request the App opened (`pr-open.yml`),
// because GitHub does not let an author approve their own pull request and a
// session's API calls all arrive as Mike.
//
// The decision is a pure function so the four cases have unit tests
// (`tests/unit/scripts/baselines-gate.test.ts`): no pull request, no review,
// a review from another account, Mike's review. The I/O shell below only
// fetches and prints.

/** Mike's GitHub account. The gate reads his review and nobody else's. */
export const APPROVER = "MikeNotThePope"

export interface Review {
  state: string
  user?: { login?: string } | null
}

export interface PullRequest {
  number: number
  html_url: string
}

/**
 * Whether the reviews carry an approval from `login`. Pure.
 *
 * The last review that took a position wins, so a `CHANGES_REQUESTED` or a
 * dismissal after an approval is not an approval. A `COMMENTED` review takes
 * no position and does not displace one. Same reading as lavahire's
 * `scripts/unrecoverable.mjs`.
 */
export function approvedBy(reviews: Review[], login: string): boolean {
  const positions = reviews.filter(
    (r) =>
      (r.user?.login ?? "").toLowerCase() === login.toLowerCase() &&
      ["APPROVED", "CHANGES_REQUESTED", "DISMISSED"].includes(r.state),
  )
  return positions.at(-1)?.state === "APPROVED"
}

export type Verdict = { allowed: true; pull: PullRequest } | { allowed: false; reason: string }

/**
 * The whole decision. Pure.
 *
 * `pulls` is every open pull request whose head is the dispatched branch,
 * `reviews` is every review on the first of them, oldest first. A branch
 * with no open pull request is refused outright: a review has nowhere to be.
 */
export function verdict(branch: string, pulls: PullRequest[], reviews: Review[], approver = APPROVER): Verdict {
  const pull = pulls[0]
  if (!pull) {
    return { allowed: false, reason: `No open pull request has ${branch} as its head. Push the branch; the App opens one.` }
  }
  if (!approvedBy(reviews, approver)) {
    return {
      allowed: false,
      reason: `${pull.html_url} carries no approving review from ${approver}. The baseline archive is shared by main and every branch, and only that review moves it.`,
    }
  }
  return { allowed: true, pull }
}

// ─── The I/O shell ───────────────────────────────────────────────────

async function github<T>(path: string, token: string): Promise<T> {
  const url = `https://api.github.com${path}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status} ${await res.text()}`)
  return (await res.json()) as T
}

/** Every review on the pull request, oldest first. */
async function reviews(repo: string, pr: number, token: string): Promise<Review[]> {
  const all: Review[] = []
  for (let page = 1; ; page++) {
    const batch = await github<Review[]>(`/repos/${repo}/pulls/${pr}/reviews?per_page=100&page=${page}`, token)
    all.push(...batch)
    if (batch.length < 100) return all
  }
}

async function main() {
  const { GITHUB_REPOSITORY, GITHUB_TOKEN, BRANCH } = process.env
  if (!GITHUB_REPOSITORY || !GITHUB_TOKEN || !BRANCH) {
    console.error("GITHUB_REPOSITORY, GITHUB_TOKEN and BRANCH are all required")
    process.exit(2)
  }
  const owner = GITHUB_REPOSITORY.split("/")[0]
  const pulls = await github<PullRequest[]>(
    `/repos/${GITHUB_REPOSITORY}/pulls?state=open&head=${owner}:${encodeURIComponent(BRANCH)}`,
    GITHUB_TOKEN,
  )
  const first = pulls[0]
  const result = verdict(BRANCH, pulls, first ? await reviews(GITHUB_REPOSITORY, first.number, GITHUB_TOKEN) : [])
  if (!result.allowed) {
    console.log(`Refused: ${result.reason}`)
    process.exit(1)
  }
  console.log(`${result.pull.html_url} carries ${APPROVER}'s approving review; regenerating.`)
}

if (import.meta.main) await main()
