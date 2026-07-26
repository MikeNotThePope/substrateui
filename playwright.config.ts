import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
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
      testIgnore: /themed-pages\.spec\.ts/,
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
      testIgnore: /themed-pages\.spec\.ts/,
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
      testIgnore: /themed-pages\.spec\.ts/,
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
      testIgnore: /themed-pages\.spec\.ts/,
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
