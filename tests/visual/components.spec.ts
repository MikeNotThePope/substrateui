import { test, expect } from '@playwright/test';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { skipWithoutBaseline } from './baseline';

// Layouts are components too: AGENTS.md counts `src/app/docs/layouts` in
// the component inventory, and until #151 no spec visited one, so a change
// to a shell could not go red. Both folders feed the one loop below.
// Snapshot names stay the bare slug, so every component baseline keeps the
// name it already had in R2; the check below `extraPages` stops any two
// pages, a layout and a component among them, from sharing one.
const docSections = ['components', 'layouts'] as const;

function getSlugs(section: (typeof docSections)[number]): string[] {
  const dir = join(process.cwd(), 'src/app/docs', section);
  try {
    return readdirSync(dir)
      .filter((name) => statSync(join(dir, name)).isDirectory())
      .sort();
  } catch {
    return [];
  }
}

const docPages = docSections.flatMap((section) =>
  getSlugs(section).map((slug) => ({ section, slug })),
);

const extraPages: Array<{ slug: string; path: string }> = [
  { slug: 'landing', path: '/' },
  { slug: 'accessibility-contrast', path: '/docs/accessibility/contrast' },
];

const duplicateSlugs = [...docPages, ...extraPages]
  .map(({ slug }) => slug)
  .filter((slug, i, all) => all.indexOf(slug) !== i);
if (duplicateSlugs.length > 0) {
  throw new Error(`Two pages share a snapshot name: ${duplicateSlugs.join(', ')}`);
}

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
  for (const { section, slug } of docPages) {
    const kind = section === 'layouts' ? 'layout' : 'component';
    test(`${kind}: ${slug}`, async ({ page }, testInfo) => {
      skipWithoutBaseline(testInfo, `${slug}.png`);
      await page.goto(`/docs/${section}/${slug}`);
      await preparePage(page);
      await expect(page).toHaveScreenshot(`${slug}.png`, { fullPage: true });
    });
  }
});

test.describe('extra pages', () => {
  for (const { slug, path } of extraPages) {
    test(`page: ${slug}`, async ({ page }, testInfo) => {
      skipWithoutBaseline(testInfo, `${slug}.png`);
      await page.goto(path);
      await preparePage(page);
      await expect(page).toHaveScreenshot(`${slug}.png`, { fullPage: true });
    });
  }
});
