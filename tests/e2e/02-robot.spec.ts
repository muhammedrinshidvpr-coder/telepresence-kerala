import { test, expect } from "@playwright/test";

test("robot: modes, views, hotspots", async ({ page }) => {
  await page.goto("/#robot");
  await expect(page.getByTestId("robot")).toBeVisible();
  const wrap = page.getByTestId("robot-canvas-wrap");
  await wrap.scrollIntoViewIfNeeded().catch(() => {});
  if (await wrap.count()) {
    await expect(page.getByTestId("robot-canvas")).toBeVisible({ timeout: 30000 });
  } else {
    await expect(page.getByTestId("robot-fallback")).toBeVisible();
  }
  await page.getByTestId("mode-night").click();
  await expect(page.getByTestId("robot-mode-label")).toContainText("night");
  await page.getByTestId("mode-charging").click();
  await expect(page.getByTestId("robot-mode-label")).toContainText("charging");
  await page.getByTestId("mode-day").click();
  await page.getByTestId("view-side").click();
  for (const h of ["camera", "screen", "tires", "chassis", "privacy", "charging"]) {
    await page.getByTestId(`hotspot-${h}`).click();
    await expect(page.getByTestId("hotspot-detail")).toBeVisible();
  }
  await page.getByTestId("hotspot-privacy").click();
  await expect(page.getByTestId("hotspot-detail")).toContainText(/privacy/i);
});
