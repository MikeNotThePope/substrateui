import AxeBuilder from '@axe-core/playwright';
import { test, expect, type Page } from '@playwright/test';

// The two axe rules an open DropdownMenu tripped in LavaHire's smoke run
// (#160). Both only exist while the menu is open, and jsdom cannot run either:
// `region` needs real landmarks around a real portal, and `aria-hidden-focus`
// reads computed size and tab order. So this drives the docs page's "Portal
// Container" example, which is LavaHire's launcher: `modal={false}`,
// `positionMethod="fixed"`, and a `container` inside `<main>`.
//
// No screenshots, so no baselines to fetch.

const GUARD = '[data-base-ui-focus-guard]';

async function openContainedMenu(page: Page, rtl: boolean) {
  await page.goto('/docs/components/dropdown-menu');
  // Same wait as the drawer spec: DirectionController re-renders the provider
  // from localStorage after mount, and a click before that can land on a
  // trigger whose handlers are being swapped.
  if (rtl) {
    await page.waitForFunction(
      () => document.documentElement.getAttribute('dir') === 'rtl'
    );
  }
  const trigger = page.getByRole('button', { name: 'Account' });
  const menu = page.getByRole('menu');
  // The server renders the trigger before React hydrates it, and an Enter on
  // it before then does nothing. A cold `next start` loses that race on the
  // first test of a worker (CI: menu never opened, passed on retry). So press
  // again until it opens, and never while it is open: a second Enter there
  // would pick an item instead. Waiting on React's own markers on the node
  // was the alternative; they are internals.
  await expect(async () => {
    if (!(await menu.isVisible())) {
      await trigger.focus();
      await page.keyboard.press('Enter');
    }
    await expect(menu).toBeVisible({ timeout: 1000 });
  }).toPass({ timeout: 10000 });
  return { trigger, menu };
}

test.describe('DropdownMenu, open', () => {
  test('portals into the container it is given, inside <main>', async ({
    page,
  }, testInfo) => {
    const { menu } = await openContainedMenu(
      page,
      testInfo.project.name.includes('rtl')
    );
    await expect(page.locator('main').getByRole('menu')).toBeVisible();

    const { violations } = await new AxeBuilder({ page })
      .withRules(['region'])
      .analyze();
    expect(violations).toEqual([]);
    await expect(menu).toBeVisible();
  });

  // aria-hidden-focus is scoped, not fixed: the component comment on
  // DropdownMenuContent says why the rule is wrong about Base UI's guards.
  // This pins both halves of that claim, so the exclusion cannot quietly
  // start hiding something that is not a guard.
  test('trips aria-hidden-focus on focus guards and nothing else', async ({
    page,
  }, testInfo) => {
    await openContainedMenu(page, testInfo.project.name.includes('rtl'));

    const unscoped = await new AxeBuilder({ page })
      .withRules(['aria-hidden-focus'])
      .analyze();
    const flagged = unscoped.violations.flatMap((v) => v.nodes);
    expect(flagged.length).toBeGreaterThan(0);
    for (const node of flagged) {
      expect(node.html).toContain('data-base-ui-focus-guard');
    }

    const scoped = await new AxeBuilder({ page })
      .withRules(['aria-hidden-focus'])
      .exclude(GUARD)
      .analyze();
    expect(scoped.violations).toEqual([]);
  });

  // The guards exist for this. Tab out of an open menu has to close it and
  // land on a real control, never on a guard and never on <body>.
  test('Tab leaves the open menu for a real control', async ({
    page,
  }, testInfo) => {
    const { menu } = await openContainedMenu(
      page,
      testInfo.project.name.includes('rtl')
    );
    await expect(page.getByRole('menuitem', { name: 'Profile' })).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(menu).toBeHidden();
    const landed = await page.evaluate(() => {
      const el = document.activeElement;
      return {
        tag: el?.tagName ?? null,
        guard: el?.hasAttribute('data-base-ui-focus-guard') ?? false,
      };
    });
    expect(landed.guard).toBe(false);
    expect(landed.tag).not.toBe('BODY');
  });
});
