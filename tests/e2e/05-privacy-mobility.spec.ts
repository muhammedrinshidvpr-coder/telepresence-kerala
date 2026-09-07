import { test, expect } from "@playwright/test";

test("privacy: 3 states switch", async ({ page }) => {
  await page.goto("/#privacy");
  await page.getByTestId("privacy-privacy").click();
  await expect(page.getByTestId("privacy-detail")).toContainText(/Camera disabled/);
  await page.getByTestId("privacy-docked").click();
  await expect(page.getByTestId("privacy-detail")).toContainText(/Charging begins/);
  await page.getByTestId("privacy-available").click();
  await expect(page.getByTestId("privacy-detail")).toContainText(/announces/);
});

test("mobility: obstacles + fail-safe path", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("obstacle-clutter").click();
  await expect(page.getByTestId("obstacle-status")).toContainText(/Fail-safe/);
  await expect(page.getByTestId("blocked-panel")).toContainText(/Path blocked/);
  await page.getByTestId("btn-retry").click();
  await page.getByTestId("obstacle-threshold").click();
  await expect(page.getByTestId("obstacle-status")).toContainText(/Pass/);
  await expect(page.getByText(/subject to final engineering validation/)).toBeVisible();
});
