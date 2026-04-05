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
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
