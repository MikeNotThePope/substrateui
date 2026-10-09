import { test, expect, type Page } from '@playwright/test';
import { routes } from './pages';

// Two layout rules, on every route the site serves, at the widths people use.
//
// 1. Nothing scrolls sideways. A child wider than the screen widens the whole
//    document, so the full-width header and every band end short of the right
//    edge. That is how the home page looked on a phone: a code sample in a grid
//    with no base column track pushed the page to 522px at 390 (#183).
// 2. One start edge. The header's content, the page's content and the footer's
//    content begin at the same x. The header and footer were max-w-6xl px-6
//    while the home page was max-w-screen-2xl with 16 to 32px gutters, so no
//    two edges matched at any width, and nothing said so.
//
// Measured on the live page because jsdom computes no layout, and neither rule
// is visible to a unit test or to the contrast checks beside this file.
//
// 360 is the floor, the narrowest common Android width. At 320, below every
// current phone, a few demo widgets (Tabs, Input OTP) are wider than the
// column by their own intrinsic size. That is the widget, not the page.
//
// Light only, ltr and rtl. Dark changes colour, never layout, so running it
// there would double the cost and catch nothing. rtl stays: logical padding
// and a sidebar that swaps sides are exactly where an edge can drift.

const WIDTHS = [360, 390, 768, 1280] as const;

/** The parts that overflow, outermost first, skipping anything inside a scroll box. */
async function overflow(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const doc = document.documentElement;
    if (doc.scrollWidth <= doc.clientWidth) return [];
    const width = doc.clientWidth;
    const scrolls = (el: Element) => {
      for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        if (getComputedStyle(a).overflowX !== 'visible') return true;
      }
      return false;
    };
    const out: string[] = [];
    for (const el of document.querySelectorAll('body *')) {
      const box = el.getBoundingClientRect();
      const outside = box.right > width + 0.5 || box.left < -0.5;
      // A 1px box is the sr-only skip link parked off screen: clipped, never seen.
      if (box.width <= 1 || !outside || scrolls(el)) continue;
      const parent = el.parentElement!.getBoundingClientRect();
      if (parent.right > width + 0.5 || parent.left < -0.5) continue;
      const cls = (el.getAttribute('class') ?? '').slice(0, 60);
      const text = (el.textContent ?? '').trim().slice(0, 30);
      out.push(`<${el.tagName.toLowerCase()} class="${cls}"> "${text}"`);
    }
    return [`document is ${doc.scrollWidth}px on a ${width}px screen`, ...out.slice(0, 5)];
  });
}

/** Where each region's content starts, on the inline-start side, in px from that edge. */
async function edges(page: Page): Promise<Record<string, number[]>> {
  return page.evaluate(() => {
    const rtl = getComputedStyle(document.documentElement).direction === 'rtl';
    const width = document.documentElement.clientWidth;
    const start = (el: Element) => {
      const box = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return Math.round(
        rtl ? width - box.right + parseFloat(style.paddingRight) : box.left + parseFloat(style.paddingLeft)
      );
    };
    const all = (selector: string) => [...document.querySelectorAll(selector)].map(start);
    const docs = document.querySelector('[data-docs-shell]') !== null;
    return {
      // The site's own header comes first in the document and its footer
      // last; a block demo between them can carry either element too.
      header: all('header[role="banner"] > div').slice(0, 1),
      footer: all('footer > div:first-child').slice(-1),
      // Docs: the article's box and the search bar above it share an edge;
      // the header and footer are full bleed over the sidebar. Elsewhere every
      // page-level Center (main itself, or a band's Center) shares the header's.
      content: docs
        ? all('main#main-content > div:first-child, main#main-content > [data-slot="center"]')
        : all('main[data-slot="center"], main > [data-slot="center"], main > section > [data-slot="center"]'),
      docs: docs ? [1] : [],
    };
  });
}

test.describe('every route fits the screen and shares one edge', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name.startsWith('dark'), 'dark changes colour, not layout');
  });

  for (const route of routes) {
    test(route, async ({ page }, testInfo) => {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      if (testInfo.project.name.includes('rtl')) {
        await page.waitForFunction(() => document.documentElement.getAttribute('dir') === 'rtl');
      }

      const failed: string[] = [];
      for (const width of WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        // Two frames: one for the resize, one for anything that measures it.
        await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));

        const wide = await overflow(page);
        if (wide.length > 0) failed.push(`${width}px: ${wide.join('\n    ')}`);

        const { header, footer, content, docs } = await edges(page);
        if (header.length === 0 || footer.length === 0 || content.length === 0) {
          failed.push(`${width}px: no header, footer or content box to measure`);
          continue;
        }
        const want = docs.length > 0 ? [header[0]!, footer[0]!] : [header[0]!, footer[0]!, ...content];
        if (new Set(want).size > 1) failed.push(`${width}px: header, footer and content start at ${want.join(', ')}px`);
        if (docs.length > 0 && new Set(content).size > 1) {
          failed.push(`${width}px: search bar and article start at ${content.join(', ')}px`);
        }
      }
      expect(failed, failed.join('\n')).toEqual([]);
    });
  }
});
