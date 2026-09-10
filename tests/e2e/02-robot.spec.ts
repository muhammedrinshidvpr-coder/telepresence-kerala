import { test, expect } from "@playwright/test";

test("robot: 3D viewer renders and is interactive", async ({ page }) => {
  await page.goto("/#robot");
  await expect(page.getByTestId("robot")).toBeVisible();
  await expect(page.getByTestId("robot-viewer")).toBeVisible();
  const wrap = page.getByTestId("robot-canvas-wrap");
  await wrap.scrollIntoViewIfNeeded().catch(() => {});
  if (await wrap.count()) {
    await expect(page.getByTestId("robot-canvas")).toBeVisible({ timeout: 30000 });
  } else {
    await expect(page.getByTestId("robot-fallback")).toBeVisible();
  }
  await expect(page.getByText(/Drag to rotate freely • Scroll to zoom/i)).toBeVisible();
});
