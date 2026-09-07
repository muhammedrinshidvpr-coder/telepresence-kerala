import { test, expect } from "@playwright/test";

test("distance: city select + slider + be-there", async ({ page }) => {
  await page.goto("/#distance");
  await expect(page.getByTestId("distance")).toBeVisible();
  await page.getByTestId("city-doha").click();
  await expect(page.getByTestId("route-label")).toContainText("Doha");
  await page.getByTestId("city-muscat").click();
  await expect(page.getByTestId("route-label")).toContainText("Muscat");
  const slider = page.getByTestId("distance-slider");
  await slider.fill("90");
  await expect(page.getByTestId("connection-strength")).toContainText(/weak|robot can be present/);
  await slider.fill("10");
  await expect(page.getByTestId("connection-strength")).toContainText(/close/);
  await expect(page.getByTestId("btn-be-there")).toBeVisible();
  await page.getByTestId("btn-be-there").click();
  await expect(page.getByTestId("control")).toBeInViewport();
});
