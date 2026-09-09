import { test, expect } from "@playwright/test";

test("control: combined video showcase renders and controls work", async ({ page }) => {
  await page.goto("/#control");
  await expect(page.getByTestId("control")).toBeVisible();
  await expect(page.getByTestId("combined-video-player")).toBeVisible();
  await expect(page.getByRole("heading", { name: /See the App in Hand/i })).toBeVisible();
});
