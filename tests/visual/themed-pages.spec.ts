import { test, expect } from '@playwright/test';

// Scoped subset of pages we snapshot under alternative themes.
// Goal: prove the theme works end-to-end without exploding baselines.
// We pick the landing page, the contrast matrix, two token-heavy
// components (button, field), and the themes foundations page itself.
const themedPages: Array<{ slug: string; path: string }> = [
  { slug: 'landing', path: '/' },
  { slug: 'accessibility-contrast', path: '/docs/accessibility/contrast' },
  { slug: 'component-button', path: '/docs/components/button' },
  { slug: 'component-field', path: '/docs/components/field' },
  { slug: 'foundations-themes', path: '/docs/foundations/themes' },
];

const FROZEN_NOW = new Date('2025-01-15T12:00:00.000Z').valueOf();

test.beforeEach(async ({ page }) => {
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
  await page.waitForLoadState('load');
  await page.evaluate(() => document.fonts.ready);
  // Wait for DirectionController to apply dir from localStorage.
  await page.waitForFunction(() => {
    const expected = localStorage.getItem('substrateui-direction') ?? 'ltr';
    return document.documentElement.getAttribute('dir') === expected;
  });
  // Wait for DocsThemeProvider to apply data-theme from localStorage.
  // Default theme clears the attribute; named themes set it.
  await page.waitForFunction(() => {
    const storedTheme = localStorage.getItem('substrateui-theme') ?? 'default';
    const attr = document.documentElement.getAttribute('data-theme');
    if (storedTheme === 'default') return attr === null;
    return attr === storedTheme;
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

test.describe('themed pages', () => {
  for (const { slug, path } of themedPages) {
    test(`themed: ${slug}`, async ({ page }) => {
      await page.goto(path);
      await preparePage(page);
      await expect(page).toHaveScreenshot(`${slug}.png`, { fullPage: true });
    });
  }
});
