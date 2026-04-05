import { test, expect } from '@playwright/test';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const componentsDir = join(process.cwd(), 'src/app/docs/components');

function getComponentSlugs(): string[] {
  try {
    return readdirSync(componentsDir)
      .filter((name) => {
        const fullPath = join(componentsDir, name);
        return statSync(fullPath).isDirectory();
      })
      .sort();
  } catch {
    return [];
  }
}

const componentSlugs = getComponentSlugs();

const extraPages: Array<{ slug: string; path: string }> = [
  { slug: 'landing', path: '/' },
  { slug: 'accessibility-contrast', path: '/docs/accessibility/contrast' },
];

const FROZEN_NOW = new Date('2025-01-15T12:00:00.000Z').valueOf();

test.beforeEach(async ({ page }) => {
  // Freeze Date and Math.random so calendars, date pickers, and any
  // randomness-driven demos render deterministically across runs.
  await page.addInitScript((frozenNow) => {
    const OriginalDate = Date;
    class FrozenDate extends OriginalDate {
      constructor(...args: unknown[]) {
        if (args.length === 0) {
          super(frozenNow);
        } else {
          super(...(args as ConstructorParameters<typeof Date>));
        }
      }
      static now() {
        return frozenNow;
      }
    }
    // @ts-expect-error - overriding global Date
    globalThis.Date = FrozenDate;

    let seed = 0x12345678;
    Math.random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 0x100000000;
    };
  }, FROZEN_NOW);
});

async function preparePage(page: import('@playwright/test').Page) {
  // Next.js dev server keeps HMR websockets open, so 'networkidle' never
  // resolves. 'load' fires once the main resources have settled, which is
  // enough for a deterministic snapshot when combined with document.fonts.ready.
  await page.waitForLoadState('load');
  await page.evaluate(() => document.fonts.ready);
  // Wait for DirectionController to apply dir from localStorage so the
  // snapshot never captures an LTR-flash before the RTL toggle kicks in.
  await page.waitForFunction(() => {
    const expected = localStorage.getItem('substrateui-direction') ?? 'ltr';
    return document.documentElement.getAttribute('dir') === expected;
  });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
      }
    `,
  });
}

test.describe('component docs pages', () => {
  for (const slug of componentSlugs) {
    test(`component: ${slug}`, async ({ page }) => {
      await page.goto(`/docs/components/${slug}`);
      await preparePage(page);
      await expect(page).toHaveScreenshot(`${slug}.png`, { fullPage: true });
    });
  }
});

test.describe('extra pages', () => {
  for (const { slug, path } of extraPages) {
    test(`page: ${slug}`, async ({ page }) => {
      await page.goto(path);
      await preparePage(page);
      await expect(page).toHaveScreenshot(`${slug}.png`, { fullPage: true });
    });
  }
});
