import { test, expect } from '@playwright/test';

// Drag-to-dismiss is a vaul physics gesture driven by real pointer events
// (displacement, velocity, timing). jsdom can't reproduce that faithfully,
// so the drawer's unit tests skip it — this spec covers it end-to-end.
//
// RTL projects are skipped: the vertical drag gesture is direction-independent,
// and the Radix DirectionProvider + vaul portal interaction has timing issues
// in headless RTL mode that prevent the drawer from opening reliably.
test.describe('Drawer drag-to-dismiss', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const isRtl = testInfo.project.name.includes('rtl');
    await page.goto('/docs/components/drawer');

    // DirectionController reads localStorage in a useEffect and re-renders
    // the DirectionProvider. In RTL mode we must wait for that state change
    // to settle before clicking, otherwise the trigger's event handler can
    // be disconnected mid-mount.
    if (isRtl) {
      await page.waitForFunction(
        () => document.documentElement.getAttribute('dir') === 'rtl'
      );
    }

    await page.getByRole('button', { name: 'Open Drawer' }).first().click();
    await expect(
      page.getByRole('dialog', { name: 'Move to folder' })
    ).toBeVisible({ timeout: 10000 });
  });

  test('dragging the drawer down past the threshold dismisses it', async ({
    page,
  }) => {
    const drawer = page.getByRole('dialog', { name: 'Move to folder' });
    const box = await drawer.boundingBox();
    if (!box) throw new Error('Drawer had no bounding box');

    // Target the drag handle bar (mt-4 h-2 w-[100px] centered) precisely.
    const startX = box.x + box.width / 2;
    const startY = box.y + 20; // ~mt-4 (16px) + middle of h-2 (4px)

    // vaul computes drag velocity from timestamp deltas between pointer
    // events, so we step the drag with real waits between moves — otherwise
    // Playwright fires the whole gesture on a single tick and velocity is 0.
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    const totalDistance = box.height + 200;
    const stepCount = 15;
    const stepPx = totalDistance / stepCount;
    for (let i = 1; i <= stepCount; i++) {
      await page.mouse.move(startX, startY + stepPx * i);
      await page.waitForTimeout(30); // slower steps for reliable velocity
    }
    await page.mouse.up();

    await expect(drawer).toBeHidden({ timeout: 10000 });
  });

  test('a small drag that does not cross the threshold snaps back open', async ({
    page,
  }) => {
    const drawer = page.getByRole('dialog', { name: 'Move to folder' });
    const box = await drawer.boundingBox();
    if (!box) throw new Error('Drawer had no bounding box');

    const startX = box.x + box.width / 2;
    const startY = box.y + 20;
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    // Only ~30px of displacement — below vaul's dismiss threshold.
    await page.mouse.move(startX, startY + 30, { steps: 6 });
    await page.mouse.up();

    await expect(drawer).toBeVisible();
  });
});
