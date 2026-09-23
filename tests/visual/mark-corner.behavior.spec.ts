import { test, expect, type Page } from '@playwright/test';

// A checkbox is a box and a radio is a circle, and on an 18px mark that
// difference is one number: the corner. #159: `Checkbox` and the choice card's
// checkbox mark both drew bare `rounded`, which Tailwind resolves to `--radius`
// (0.625rem, 10px) rather than to the `--radius-factor` ladder, and 10px on an
// 18px box clamps to a circle. Every checkbox rendered as a radio.
//
// `choice-card.test.tsx` compares the card's mark to the standalone control
// class for class, and passed the whole time, because both parts wore the same
// wrong token. A comparison between two parts sharing a token cannot see the
// token. So this reads the corner the browser computed and holds it against the
// box's own width, which jsdom cannot do: it computes no CSS.
//
// Every named palette, because `--radius-factor` is per theme. The palette goes
// on <body> rather than <html>: SiteThemeProvider owns the attribute on <html>
// and may still be writing it when this runs, and the `[data-theme]` blocks
// apply at any depth.

/** `plum` is also what no attribute renders; the rest each set their own factor. */
const PALETTES = [null, 'plum', 'proof', 'substrate', 'lava', 'tundra'] as const;

interface Corner {
  width: number;
  /** The largest of the four computed corner radii, in px. */
  radius: number;
}

async function cornersIn(page: Page, selector: string, palette: string | null) {
  return page.evaluate(
    ({ selector, palette }) => {
      if (palette === null) document.body.removeAttribute('data-theme');
      else document.body.setAttribute('data-theme', palette);
      return Array.from(document.querySelectorAll(selector), (el) => {
        const style = getComputedStyle(el);
        const radius = Math.max(
          ...[
            style.borderTopLeftRadius,
            style.borderTopRightRadius,
            style.borderBottomRightRadius,
            style.borderBottomLeftRadius,
          ].map((r) => parseFloat(r))
        );
        return { width: el.getBoundingClientRect().width, radius };
      });
    },
    { selector, palette }
  );
}

/** A box stays a box while its corner is under a quarter of its side. The
 *  roundest theme on the ladder (substrate, 0.4) draws 1.6px on 18px. */
function expectBox(corners: Corner[], what: string) {
  expect(corners.length, `found no ${what}`).toBeGreaterThan(0);
  for (const { width, radius } of corners) {
    expect(radius, `${what}: ${radius}px corner on a ${width}px box`).toBeLessThan(width / 4);
  }
}

/** A circle's corner reaches half its side (Chromium reports the declared
 *  radius, so a pill value reads larger, never smaller). */
function expectCircle(corners: Corner[], what: string) {
  expect(corners.length, `found no ${what}`).toBeGreaterThan(0);
  for (const { width, radius } of corners) {
    expect(radius, `${what}: ${radius}px corner on a ${width}px mark`).toBeGreaterThanOrEqual(
      width / 2
    );
  }
}

test.describe('an 18px mark says which control it is', () => {
  test('Checkbox is a box in every palette', async ({ page }) => {
    await page.goto('/docs/components/checkbox');
    for (const palette of PALETTES) {
      expectBox(
        await cornersIn(page, '[data-slot="checkbox"]', palette),
        `Checkbox under ${palette ?? 'no palette'}`
      );
    }
  });

  test('RadioGroupItem is a circle in every palette', async ({ page }) => {
    await page.goto('/docs/components/radio-group');
    for (const palette of PALETTES) {
      expectCircle(
        await cornersIn(page, '[data-slot="radio-group-item"]', palette),
        `RadioGroupItem under ${palette ?? 'no palette'}`
      );
    }
  });

  test("ChoiceCard's checkbox mark is a box and its radio mark a circle", async ({ page }) => {
    await page.goto('/docs/components/choice-card');
    for (const palette of PALETTES) {
      const name = palette ?? 'no palette';
      expectBox(
        await cornersIn(page, '[data-slot="checkbox-card"] [data-slot="choice-card-mark"]', palette),
        `CheckboxCard mark under ${name}`
      );
      expectCircle(
        await cornersIn(
          page,
          '[data-slot="radio-group-card"] [data-slot="choice-card-mark"]',
          palette
        ),
        `RadioGroupCard mark under ${name}`
      );
    }
  });
});
