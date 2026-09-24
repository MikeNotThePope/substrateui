import { test, expect, type Page } from '@playwright/test';
import { PALETTES } from './pages';

// A status border is the colour its token names. #144: Alert's status
// variants, an invalid Field input and an invalid FileDropField all drew
// `--border`, because tokens.css's `*` border rule sat unlayered and outranked
// every `border-status-*` class. The class was on the element the whole time,
// so a unit test reading classes passed, and the pixel suite passed too (#169):
// a 2px border was under its 1% pixel budget, and in lava `--border` and
// `--status-error` share a lightness.
//
// `visible.behavior.spec.ts` cannot see it either. It asks whether an edge
// reaches 3:1 against the page, and a grey edge does. The question here is
// which colour, so this reads the border the browser computed and holds it
// against the token resolved in the same place, which jsdom cannot do: it
// computes no CSS.
//
// Colours go through a canvas before they are compared, so two spellings of
// one colour match and the failure prints hex. The palette goes on <body>, for
// the reason `mark-corner.behavior.spec.ts` gives.

interface Case {
  page: string;
  what: string;
  selector: string;
  token: string;
}

const CASES: Case[] = [
  ...(['error', 'success', 'warning', 'info'] as const).map((status) => ({
    page: '/docs/components/alert',
    what: `Alert (${status})`,
    selector: `[data-specimen-body] [data-slot="alert"].border-status-${status}`,
    token: `--status-${status}`,
  })),
  {
    page: '/docs/components/field',
    what: 'invalid Field input',
    selector: '[data-specimen-body] [data-slot="field"] input[aria-invalid="true"]',
    token: '--status-error',
  },
  {
    page: '/docs/components/file-drop-field',
    what: 'invalid FileDropField',
    selector:
      '[data-specimen-body] [data-slot="file-drop-field"]:has(input[aria-invalid="true"])',
    token: '--status-error',
  },
];

interface Border {
  width: number;
  drawn: string;
  token: string;
}

async function bordersIn(page: Page, c: Case, palette: string | null) {
  return page.evaluate(
    ({ selector, token, palette }) => {
      if (palette === null) document.body.removeAttribute('data-theme');
      else document.body.setAttribute('data-theme', palette);

      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
      const hex = (css: string) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillStyle = css;
        ctx.fillRect(0, 0, 1, 1);
        const d = ctx.getImageData(0, 0, 1, 1).data;
        return '#' + [d[0], d[1], d[2], d[3]].map((v) => v.toString(16).padStart(2, '0')).join('');
      };

      return Array.from(document.querySelectorAll(selector), (el) => {
        // The token resolved where the element sits, so a palette scoped
        // anywhere above it applies to both.
        const probe = document.createElement('span');
        probe.style.color = `var(${token})`;
        el.parentElement!.append(probe);
        const expected = getComputedStyle(probe).color;
        probe.remove();
        const style = getComputedStyle(el);
        return {
          width: parseFloat(style.borderTopWidth),
          drawn: hex(style.borderTopColor),
          token: hex(expected),
        };
      });
    },
    { selector: c.selector, token: c.token, palette }
  );
}

function expectToken(borders: Border[], what: string, token: string) {
  expect(borders.length, `found no ${what}`).toBeGreaterThan(0);
  for (const { width, drawn, token: want } of borders) {
    expect(width, `${what}: no border drawn`).toBeGreaterThan(0);
    expect(drawn, `${what}: border is ${drawn}, ${token} is ${want}`).toBe(want);
  }
}

test.describe('a status border wears its status token', () => {
  for (const c of CASES) {
    test(`${c.what} draws ${c.token} in every palette`, async ({ page }) => {
      await page.goto(c.page);
      // A palette switch retints every transitioning border; read where it lands.
      await page.addStyleTag({ content: '* { transition: none !important; }' });
      for (const palette of PALETTES) {
        expectToken(
          await bordersIn(page, c, palette),
          `${c.what} under ${palette ?? 'no palette'}`,
          c.token
        );
      }
    });
  }
});
