import { defineConfig, devices } from '@playwright/test';

// Every project names the spec files it runs. It used to be the other way
// around: four projects each carrying a `testIgnore`, which left one spec with
// no project at all and a `visual` job that passed by finding nothing (#138).
// Naming what a project runs turns a spec nobody runs into a spec nobody
// named, and `tests/unit/scripts/visual-project-coverage.test.ts` fails on
// exactly that, so the next spec added here cannot arrive switched off in
// silence.
//
// There are no screenshots. Every spec asserts on the live page, and the named
// palettes are worn inside a spec rather than given a project each, so there is
// nothing to store and nothing to approve (#162).

/** Light/dark and ltr/rtl; each spec puts the named palettes on the page itself. */
const DEFAULT_THEME_SPECS = /\.behavior\.spec\.ts$/;

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Workers per machine, not total: CI shards this suite across four runners,
  // so the real parallelism is 4 × this. Two is what a standard GitHub runner
  // sustains without CPU contention, and raising it trades that risk for a few
  // seconds now that each shard only carries a quarter of the tests.
  // Overridable so a larger runner can be tried without editing this file.
  workers: process.env.CI ? Number(process.env.PLAYWRIGHT_WORKERS ?? 2) : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  },
  projects: [
    {
      name: 'light',
      testMatch: DEFAULT_THEME_SPECS,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
        storageState: {
          cookies: [],
          origins: [
            {
              origin: 'http://localhost:3000',
              localStorage: [
                { name: 'theme', value: 'light' },
                { name: 'substrateui-direction', value: 'ltr' },
              ],
            },
          ],
        },
      },
    },
    {
      name: 'dark',
      testMatch: DEFAULT_THEME_SPECS,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
        storageState: {
          cookies: [],
          origins: [
            {
              origin: 'http://localhost:3000',
              localStorage: [
                { name: 'theme', value: 'dark' },
                { name: 'substrateui-direction', value: 'ltr' },
              ],
            },
          ],
        },
      },
    },
    {
      name: 'light-rtl',
      testMatch: DEFAULT_THEME_SPECS,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
        storageState: {
          cookies: [],
          origins: [
            {
              origin: 'http://localhost:3000',
              localStorage: [
                { name: 'theme', value: 'light' },
                { name: 'substrateui-direction', value: 'rtl' },
              ],
            },
          ],
        },
      },
    },
    {
      name: 'dark-rtl',
      testMatch: DEFAULT_THEME_SPECS,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        deviceScaleFactor: 1,
        storageState: {
          cookies: [],
          origins: [
            {
              origin: 'http://localhost:3000',
              localStorage: [
                { name: 'theme', value: 'dark' },
                { name: 'substrateui-direction', value: 'rtl' },
              ],
            },
          ],
        },
      },
    },
  ],
  // Test a production build, not `next dev`. The dev server compiles
  // routes on demand and never releases them — it settles around 4.4GB RSS
  // after a full pass, which OOM-kills it on an 8GB Docker VM and leaves
  // every remaining test with ERR_CONNECTION_REFUSED. `next start` serves
  // prebuilt output at a flat couple hundred MB. `bunx next build` skips
  // the `prebuild` hook so this doesn't drag the Storybook build along.
  webServer: {
    command: 'bunx next build && bunx next start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
