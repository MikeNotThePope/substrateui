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

/** SiteThemeProvider's localStorage key, seeded by the `lava` project in
 *  playwright.config.ts. */
const THEME_STORAGE_KEY = 'substrateui-theme';

/** The palette SiteThemeProvider represents by removing `data-theme` rather
 *  than setting it. Mirrors DEFAULT_THEME in src/components/theme-picker.tsx. */
const UNATTRIBUTED_THEME = 'plum';

/** Stored names that still name a live palette after a rename. Mirrors RENAMED
 *  in src/components/theme-picker.tsx. */
const RENAMED_THEMES: Record<string, string> = { default: UNATTRIBUTED_THEME, press: 'proof' };

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
  // Wait for SiteThemeProvider to apply data-theme from localStorage.
  //
  // What it does, from src/components/theme-picker.tsx: on mount it reads
  // `substrateui-theme`, maps a value left over from a rename forward, and
  // sets `data-theme` for every palette except the default one, whose
  // attribute it removes. The palette that wears no attribute is `plum`;
  // "default" is only an old stored name that maps to it. This wait used to
  // assume the opposite, so it would have hung forever on a project seeding
  // `plum`, and with nothing stored it was satisfied at once, before the page
  // had hydrated, which is a wait that proves nothing. No project seeded the
  // key at all until the `lava` one, so neither case ever ran.
  //
  // With `lava` stored the attribute only appears once the provider's effect
  // has run, so this is a real barrier: the screenshot cannot catch the
  // default palette mid-swap.
  await page.waitForFunction(
    ({ key, unattributed, renamed }) => {
      const stored = localStorage.getItem(key);
      const attr = document.documentElement.getAttribute('data-theme');
      // Nothing stored: the provider leaves the attribute alone. The `dir`
      // wait above is the hydration barrier in that case, since
      // DirectionController sets `dir` on mount whether or not anything is
      // stored.
      if (stored === null) return attr === null;
      const theme = renamed[stored] ?? stored;
      return theme === unattributed ? attr === null : attr === theme;
    },
    { key: THEME_STORAGE_KEY, unattributed: UNATTRIBUTED_THEME, renamed: RENAMED_THEMES },
  );
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
