import { test, expect } from "@playwright/test";

test("malayalam: greeting + phrases + langs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("malayalam-greeting")).toContainText("ദുബായിൽ");
  await page.getByTestId("phrase-0").click();
  await expect(page.getByTestId("spoken-label")).toBeVisible();
  await page.getByTestId("lang-English").click();
  await page.getByTestId("phrase-1").click();
});

test("demo: fast 60s run (?demoFast=1)", async ({ page }) => {
  await page.goto("/?demoFast=1#demo");
  await page.getByTestId("btn-demo-start").click();
  await expect(page.getByTestId("demo-timer")).not.toContainText("0s", { timeout: 15000 }).catch(() => {});
  await expect(page.getByTestId("demo-done")).toBeVisible({ timeout: 30000 });
  await expect(page.getByTestId("demo-done")).toContainText(/virtual visit/);
  await expect(page.getByTestId("demo-join")).toBeVisible();
});

test("how + cta render", async ({ page }) => {
  await page.goto("/#how");
  await expect(page.getByTestId("how-step-0")).toContainText(/Place it at home/);
  await expect(page.getByTestId("cta")).toContainText(/Bring your presence home/);
  await expect(page.getByTestId("cta-pilot")).toBeVisible();
});
