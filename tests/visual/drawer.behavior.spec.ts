import { test, expect } from '@playwright/test';

// Drag-to-dismiss is a vaul physics gesture driven by real pointer events
// (displacement, velocity, timing). jsdom can't reproduce that faithfully,
// so the drawer's unit tests skip it — this spec covers it end-to-end.

test.describe('Drawer drag-to-dismiss', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/docs/components/drawer');
    await page.getByRole('button', { name: 'Open Drawer' }).first().click();
    // Wait for the drawer content to be visible before interacting.
    await expect(
      page.getByRole('dialog', { name: 'Move to folder' })
    ).toBeVisible();
  });

  test('dragging the drawer down past the threshold dismisses it', async ({
    page,
  }) => {
    const drawer = page.getByRole('dialog', { name: 'Move to folder' });
    const box = await drawer.boundingBox();
    if (!box) throw new Error('Drawer had no bounding box');

    // Grip near the top of the drawer (where vaul's drag handle sits) and
    // drag well past the dismiss threshold in a multi-step gesture so vaul
    // can compute velocity.
    const startX = box.x + box.width / 2;
    const startY = box.y + 12;

    // vaul computes drag velocity from timestamp deltas between pointer
    // events, so we step the drag with real waits between moves — otherwise
    // Playwright fires the whole gesture on a single tick and velocity is 0.
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    const totalDistance = box.height + 200;
    const stepCount = 10;
    const stepPx = totalDistance / stepCount;
    for (let i = 1; i <= stepCount; i++) {
      await page.mouse.move(startX, startY + stepPx * i);
      await page.waitForTimeout(16); // ~60fps, gives vaul real timestamps
    }
    await page.mouse.up();

    await expect(drawer).toBeHidden();
  });

  test('a small drag that does not cross the threshold snaps back open', async ({
    page,
  }) => {
    const drawer = page.getByRole('dialog', { name: 'Move to folder' });
    const box = await drawer.boundingBox();
    if (!box) throw new Error('Drawer had no bounding box');

    const startX = box.x + box.width / 2;
    const startY = box.y + 12;
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    // Only ~30px of displacement — below vaul's dismiss threshold.
    await page.mouse.move(startX, startY + 30, { steps: 6 });
    await page.mouse.up();

    await expect(drawer).toBeVisible();
  });
});
