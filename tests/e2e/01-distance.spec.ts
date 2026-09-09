import { test, expect } from "@playwright/test";

test("distance: auto-looping animation + city selection", async ({ page }) => {
  await page.goto("/#distance");
  await expect(page.getByTestId("distance")).toBeVisible();
  await page.getByTestId("city-doha").click();
  await expect(page.getByTestId("distance")).toContainText("Doha");
  await page.getByTestId("city-muscat").click();
  await expect(page.getByTestId("distance")).toContainText("Muscat");
});
