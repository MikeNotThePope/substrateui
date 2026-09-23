import { test, expect, type Page } from '@playwright/test';
import { pages, PALETTES } from './pages';

// What "the visuals work" means, checked on the rendered page rather than
// against a picture of it. This replaced the pixel baselines (#162).
//
// A screenshot proves only that nothing changed since someone last approved
// one. It cannot tell a spinner whose arc is invisible from a working one: it
// blesses whichever it was shown first, and every red one here was an intended
// change approved without a look. `audit:contrast` checks the colour pairs
// someone listed, and axe checks text. A spinner is neither. So this reads the
// colours the browser computed, in every palette and mode, and fails a part a
// person could not see.
//
// The bar is WCAG 2.2's 1.4.11, non-text contrast: 3:1 between a part that
// carries meaning and what is behind it. Four rules:
//
// - A graphic: every SVG shape with a stroke or fill, against the background
//   behind it. An icon, a check mark, a chart line.
// - A control's boundary: a checkbox, radio, switch, text field, select or
//   slider draws its edge with a border or a fill, and the strongest edge has to
//   reach 3:1 against the page. Its states can differ; its outline cannot vanish.
// - A moving part against its track: a thumb, an indicator, a range. A switch
//   whose thumb matches its track reads as off in both positions.
// - The spinner, whose arc has to reach 3:1 against its own track as well as the
//   page. A ring the colour of its arc looks like a spinner that stopped, and
//   the page-only rule above would pass it. It also has to be animating.
//
// Rejected: WCAG's 24px target size. A checkbox is an 18px mark whose label is
// the target, and the spacing exception that makes that legal needs the layout
// read, not one box. A rule that fails correct controls is a rule people learn
// to exempt.
//
// Pixel layout is out of scope on purpose. A component 20px taller than it was
// passes here. If that ever bites, the fix is a check for that property.

const THRESHOLD = 3;

/** Controls whose edge is how a person finds them. */
const CONTROL = [
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="switch"]',
  '[role="slider"]',
  '[role="combobox"]',
  '[role="textbox"]',
  '[role="spinbutton"]',
  'input:not([type="hidden"]):not([type="file"])',
  'textarea',
  'select',
].join(',');

/** The part of a control that moves over, or fills, its track: any filled child of one. */
const MOVING = ':is([role="switch"],[role="progressbar"],[data-slot="slider"]) *';

/**
 * Parts exempt from a rule, by page and selector, each with the reason. An
 * entry is for a part WCAG itself exempts: decoration, a disabled state.
 */
const EXEMPT: Array<{ page: string; where: string; why: string }> = [];

/**
 * What these checks found on their first run, each a real failure waiting on a
 * fix in the component. The list only shrinks: an entry that no longer fails
 * fails the run, and a new failure never goes here. The issue this spec's pull
 * request filed carries the numbers.
 */
const KNOWN: Array<{ page: string; rule: string; where: string }> = [
  // The arc nearly vanishes into its track in every dark palette (lava 1.07:1)
  // and in light proof, substrate and tundra. The spinner that looked stopped.
  { page: 'components/spinner', rule: 'spinner arc vs its track', where: '[data-slot="spinner"]' },
  // The paler series colours sit under 3:1 on the page in every palette.
  { page: 'components/chart', rule: 'graphic', where: '[data-slot="chart"]' },
  // The empty stars, which say how many a full rating has, at 1.85:1.
  { page: 'components/rating', rule: 'graphic', where: '[data-slot="rating"]' },
  // The chevron that says the trigger opens a list, at 2.13:1.
  { page: 'components/select', rule: 'graphic', where: '[data-slot="select-trigger"]' },
  // The page's examples throw a hydration mismatch.
  { page: 'components/overline', rule: 'the page threw', where: '' },
];

const known = (page: string, rule: string, where: string) =>
  KNOWN.some((k) => k.page === page && k.rule === rule && where.startsWith(k.where));

interface Finding {
  rule: string;
  where: string;
  fg: string;
  bg: string;
  ratio: number;
}

/** Everything below runs in the page: it needs computed styles and a canvas. */
async function findings(
  page: Page,
  input: { threshold: number; control: string; moving: string }
): Promise<Finding[]> {
  return page.evaluate(({ threshold, control, moving }) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

    /** Any CSS colour, oklch included, as sRGB 0-255 plus alpha 0-1. */
    const rgba = (css: string): [number, number, number, number] => {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillStyle = css;
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      return [d[0], d[1], d[2], d[3] / 255];
    };
    const over = (top: number[], under: number[]) =>
      [0, 1, 2].map((i) => top[i] * top[3] + under[i] * (1 - top[3])).concat(1);
    const lum = (c: number[]) => {
      const [r, g, b] = c.slice(0, 3).map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a: number[], b: number[]) => {
      const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
      return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
    };
    const hex = (c: number[]) =>
      '#' + c.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');

    /** The opaque colour behind `el`, from its ancestors, or null behind an image or gradient. */
    const behind = (el: Element | null): number[] | null => {
      const layers: number[][] = [];
      for (let n = el; n; n = n.parentElement) {
        const s = getComputedStyle(n);
        if (s.backgroundImage !== 'none') return null;
        const c = rgba(s.backgroundColor);
        if (c[3] > 0) layers.push(c);
        if (c[3] >= 0.999) break;
      }
      return layers.reduceRight<number[]>((acc, c) => over(c, acc), [255, 255, 255, 1]);
    };
    const opacity = (el: Element) => {
      let o = 1;
      for (let n: Element | null = el; n; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity);
      return o;
    };
    const shown = (el: Element) => {
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return false;
      if (getComputedStyle(el).visibility !== 'visible') return false;
      if (el.closest('[disabled],[aria-disabled="true"],[data-disabled]')) return false;
      return opacity(el) > 0.05;
    };
    const where = (el: Element) => {
      const slot = el.closest('[data-slot]');
      return `${slot ? `[data-slot="${slot.getAttribute('data-slot')}"] ` : ''}${el.tagName.toLowerCase()}`;
    };

    const out: Array<{ rule: string; where: string; fg: string; bg: string; ratio: number }> = [];
    const check = (rule: string, el: Element, fg: number[], bg: number[]) => {
      const seen = over(fg, bg);
      const r = ratio(seen, bg);
      if (r < threshold) out.push({ rule, where: where(el), fg: hex(seen), bg: hex(bg), ratio: r });
    };
    // The live examples only: the docs chrome around them is the site's, not a component's.
    const all = (selector: string) =>
      [...document.querySelectorAll('[data-specimen-body]')].flatMap((root) => [
        ...root.querySelectorAll(selector),
      ]);

    for (const el of all('path,circle,rect,line,polyline,polygon,ellipse')) {
      if (!shown(el)) continue;
      const s = getComputedStyle(el);
      const bg = behind(el.closest('svg')?.parentElement ?? null);
      if (!bg) continue;
      const o = opacity(el);
      // A shape is seen by its outline or by its fill, so one of the two has to
      // reach the bar: an area chart's pale fill is fine under a strong line.
      const paints = [
        [s.stroke, s.strokeOpacity, s.strokeWidth],
        [s.fill, s.fillOpacity, '1'],
      ]
        .filter(([paint, , width]) => paint !== 'none' && !paint.startsWith('url(') && parseFloat(width) > 0)
        .map(([paint, alpha]) => {
          const c = rgba(paint);
          c[3] *= parseFloat(alpha) * o;
          return c;
        })
        .filter((c) => c[3] >= 0.05);
      if (paints.length === 0) continue;
      check('graphic', el, paints.reduce((a, c) => (ratio(over(c, bg), bg) > ratio(over(a, bg), bg) ? c : a)), bg);
    }

    const borders = (el: Element) => {
      const s = getComputedStyle(el);
      return ['top', 'right', 'bottom', 'left']
        .filter((side) => parseFloat(s.getPropertyValue(`border-${side}-width`)) > 0)
        .map((side) => rgba(s.getPropertyValue(`border-${side}-color`)))
        .filter((c) => c[3] > 0.05);
    };

    for (const el of all(control)) {
      if (!shown(el)) continue;
      // An input inside an input group draws no edge: the group does. So the
      // edge belongs to the control or to the nearest of its three closest
      // ancestors that draws a border.
      let owner: Element = el;
      for (let n: Element | null = el, i = 0; n && i < 4; n = n.parentElement, i++) {
        if (borders(n).length > 0) {
          owner = n;
          break;
        }
      }
      const bg = behind(owner.parentElement);
      if (!bg) continue;
      const edges = borders(owner)
        .concat([rgba(getComputedStyle(owner).backgroundColor)])
        .filter((c) => c[3] > 0.05);
      if (edges.length === 0) continue;
      const best = edges.reduce((a, c) => (ratio(over(c, bg), bg) > ratio(over(a, bg), bg) ? c : a));
      check('control boundary', el, best, bg);
    }

    for (const el of all(moving)) {
      if (!shown(el)) continue;
      // Only a part sitting on a filled track: the track itself, against the
      // page, is the control's boundary and the rule above has it.
      if (!el.parentElement || rgba(getComputedStyle(el.parentElement).backgroundColor)[3] < 0.05) continue;
      const track = behind(el.parentElement);
      const fill = rgba(getComputedStyle(el).backgroundColor);
      if (!track || fill[3] < 0.05) continue;
      check('moving part vs its track', el, fill, track);
    }

    for (const el of all('[data-slot="spinner"]')) {
      if (!shown(el)) continue;
      const s = getComputedStyle(el);
      const arc = rgba(s.borderTopColor);
      const ring = rgba(s.borderRightColor);
      const bg = behind(el.parentElement);
      if (!bg) continue;
      check('spinner arc vs its track', el, arc, over(ring, bg));
      check('spinner arc vs the page', el, arc, bg);
      if (s.animationName === 'none' || s.animationPlayState !== 'running') {
        out.push({ rule: 'spinner is not animating', where: where(el), fg: s.animationName, bg: '', ratio: 0 });
      }
    }
    return out;
  }, input);
}

/** Puts a palette on <body>, where the `[data-theme]` blocks apply at any depth. */
async function wear(page: Page, palette: string | null) {
  await page.evaluate((palette) => {
    const body = document.body;
    if (palette === null) body.removeAttribute('data-theme');
    else body.setAttribute('data-theme', palette);
    // `[data-theme="x"].dark` wants both on one element, and the mode lives on <html>.
    body.classList.toggle('dark', document.documentElement.classList.contains('dark'));
  }, palette);
}

test.beforeEach(async ({ page }) => {
  // Colours are sampled once, so nothing may be mid-transition when they are.
  await page.addInitScript(() => {
    const style = document.createElement('style');
    style.textContent = '*,*::before,*::after{transition:none!important}';
    document.addEventListener('DOMContentLoaded', () => document.head.append(style));
  });
});

test.describe('every part that carries meaning can be seen', () => {
  for (const { slug, path } of pages) {
    test(slug, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const failed: string[] = [];
      const hit = new Set<string>();
      const note = (rule: string, where: string, line: string) => {
        if (known(slug, rule, where)) hit.add(`${rule} ${where}`);
        else failed.push(line);
      };
      if (errors.length > 0) note('the page threw', '', `the page threw: ${errors[0]?.slice(0, 120)}`);
      for (const palette of PALETTES) {
        await wear(page, palette);
        for (const f of await findings(page, {
          threshold: THRESHOLD,
          control: CONTROL,
          moving: MOVING,
        })) {
          if (EXEMPT.some((e) => e.page === slug && f.where.startsWith(e.where))) continue;
          note(
            f.rule,
            f.where,
            `${palette ?? 'no palette'}: ${f.rule} at ${f.where}, ${f.fg} on ${f.bg} is ${f.ratio}:1`
          );
        }
      }
      expect([...new Set(failed)], `parts under ${THRESHOLD}:1 on ${path}`).toEqual([]);

      // A KNOWN entry that stopped failing is fixed: take it off the list.
      const stale = KNOWN.filter(
        (k) => k.page === slug && ![...hit].some((h) => h.startsWith(`${k.rule} ${k.where}`))
      );
      expect(stale, 'fixed, so drop these from KNOWN').toEqual([]);
    });
  }
});

test('the spinner stays visible with reduced motion on', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/docs/components/spinner');
  for (const palette of PALETTES) {
    await wear(page, palette);
    const spinners = await page.locator('[data-specimen-body] [data-slot="spinner"]').count();
    expect(spinners, 'the spinner page renders a spinner').toBeGreaterThan(0);
    const bad = (
      await findings(page, { threshold: THRESHOLD, control: CONTROL, moving: MOVING })
    ).filter((f) => f.rule.startsWith('spinner arc') && !known('components/spinner', f.rule, f.where));
    expect(bad, `${palette ?? 'no palette'} with reduced motion`).toEqual([]);
  }
});

test('the checks see what they are meant to', async ({ page }) => {
  // Zero parts inspected is zero parts failing, so the rule above would pass
  // the day a selector broke. The spinner page has a spinner; the checkbox page
  // has a control; the switch page has a thumb.
  for (const [path, selector] of [
    ['/docs/components/spinner', '[data-specimen-body] [data-slot="spinner"]'],
    ['/docs/components/checkbox', `[data-specimen-body] :is(${CONTROL})`],
    ['/docs/components/switch', `[data-specimen-body] ${MOVING}`],
  ]) {
    await page.goto(path);
    expect(await page.locator(selector).count(), `${selector} on ${path}`).toBeGreaterThan(0);
  }
});
