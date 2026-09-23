import { test, type TestInfo } from '@playwright/test';
import { existsSync } from 'node:fs';

/**
 * Skip a screenshot whose baseline does not exist yet.
 *
 * A new page ships before its baseline does, so on a compare run the
 * assertion is skipped and the pull request that adds the page stays green.
 * `capture-baselines.yml` then writes the missing baseline from `main` after
 * the merge, and every run after compares it. Only a missing baseline is
 * skipped: a changed one still fails, and still waits for Mike's review and
 * Update Visual Baselines (AGENTS.md).
 *
 * A run that writes baselines must not skip, or it would never write the
 * missing one. `--update-snapshots` (all or changed) says so in the config,
 * and the capture run says so with CAPTURE_MISSING=1, because its mode,
 * `missing`, is also Playwright's default and so cannot tell a capture from
 * an ordinary compare run.
 */
export function skipWithoutBaseline(testInfo: TestInfo, name: string) {
  const writing =
    ['all', 'changed'].includes(testInfo.config.updateSnapshots) ||
    process.env.CAPTURE_MISSING === '1';
  test.skip(
    !writing && !existsSync(testInfo.snapshotPath(name)),
    `No visual baseline for "${name}" yet. capture-baselines.yml writes it after the merge to main.`,
  );
}
