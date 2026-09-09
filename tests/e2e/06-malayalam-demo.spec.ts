import { test, expect } from "@playwright/test";

test("malayalam: greeting + phrases + langs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("malayalam-greeting")).toContainText("ദുബായിൽ");
  await page.getByTestId("phrase-0").click();
  await expect(page.getByTestId("spoken-label")).toBeVisible();
  await page.getByTestId("lang-English").click();
  await page.getByTestId("phrase-1").click();
});

test("how + cta render", async ({ page }) => {
  await page.goto("/#how");
  await expect(page.getByTestId("how-step-0")).toContainText(/Place it at home/);
  await expect(page.getByTestId("cta")).toContainText(/Bring your presence home/);
  await expect(page.locator("#reserve-expectations")).toBeVisible();
});
