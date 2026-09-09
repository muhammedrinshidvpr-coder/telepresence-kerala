import { test, expect } from "@playwright/test";

test("privacy: 3 states switch with WebRTC zero intrusion", async ({ page }) => {
  await page.goto("/#privacy");
  await page.getByTestId("privacy-privacy").click();
  await expect(page.getByTestId("privacy-detail")).toContainText(/Privacy Shield/i);
  await page.getByTestId("privacy-docked").click();
  await expect(page.getByTestId("privacy-detail")).toContainText(/Docked & Resting/i);
  await page.getByTestId("privacy-available").click();
  await expect(page.getByTestId("privacy-detail")).toContainText(/Active Telepresence/i);
});
