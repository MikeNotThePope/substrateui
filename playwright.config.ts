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
    {
      name: 'forest-light',
      testMatch: /themed-pages\.spec\.ts/,
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
                { name: 'substrateui-theme', value: 'forest' },
              ],
            },
          ],
        },
      },
    },
    {
      name: 'forest-dark',
      testMatch: /themed-pages\.spec\.ts/,
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
                { name: 'substrateui-theme', value: 'forest' },
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
