import { defineConfig, devices } from '@playwright/test';

// Every project names the spec files it runs. It used to be the other way
// around: four projects each carrying `testIgnore: /themed-pages\.spec\.ts/`,
// which left that file with no project at all and a `visual` job that passed
// by finding nothing (#138). Naming what a project runs turns a spec nobody
// runs into a spec nobody named, and
// `tests/unit/scripts/visual-project-coverage.test.ts` fails on exactly that,
// so the next spec added here cannot arrive switched off in silence.

/** The default palette, across light/dark and ltr/rtl. A `*.behavior.spec.ts`
 *  asserts on the live page and takes no screenshot, so it needs no baseline. */
const DEFAULT_THEME_SPECS = /(?:components|\.behavior)\.spec\.ts$/;

/** The only spec that renders a named palette. Five pages, one project. */
const THEMED_SPECS = /themed-pages\.spec\.ts$/;

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Workers per machine, not total: CI shards this suite across four runners,
  // so the real parallelism is 4 × this. Two is what a standard GitHub runner
  // sustains without the CPU contention that makes pixel-exact screenshots
  // flake, and raising it trades that risk for a few seconds now that each
  // shard only carries a quarter of the tests. Overridable so a larger runner
  // can be tried without editing this file.
  workers: process.env.CI ? Number(process.env.PLAYWRIGHT_WORKERS ?? 2) : undefined,
  reporter: [['html', { open: 'never' }]],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
    },
  },
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
    // CONTRIBUTING.md asks every public theme for scoped visual coverage, and
    // until now nothing gave it any: `audit:contrast` reads tokens and renders
    // no page. Lava first because it is the only palette a stranger ever sees.
    // LavaHire ships `data-theme="lava"` in its root layout, so the one
    // consumer's real UI runs on a palette this library had never
    // screenshotted. Light mode, and only the five pages the spec names:
    // enough to prove the palette reaches a rendered page, far short of the
    // docs site times another theme.
    {
      name: 'lava',
      testMatch: THEMED_SPECS,
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
                // `substrateui-theme` is SiteThemeProvider's key (the palette),
                // `theme` is next-themes' (light/dark). The spec waits on the
                // first of them, which no project had ever set.
                { name: 'substrateui-theme', value: 'lava' },
                { name: 'theme', value: 'light' },
                { name: 'substrateui-direction', value: 'ltr' },
              ],
            },
          ],
        },
      },
    },
  ],
  // Snapshot a production build, not `next dev`. The dev server compiles
  // routes on demand and never releases them — it settles around 4.4GB RSS
  // after a full pass, which OOM-kills it on an 8GB Docker VM and leaves
  // every remaining test with ERR_CONNECTION_REFUSED. `next start` serves
  // prebuilt output at a flat couple hundred MB, and drops the HMR
  // websocket that forces the 'load'-instead-of-'networkidle' workaround
  // in components.spec.ts. `bunx next build` skips the `prebuild` hook so
  // this doesn't drag the Storybook build along.
  webServer: {
    command: 'bunx next build && bunx next start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
  },
});
