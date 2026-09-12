import { test, expect } from "@playwright/test";

test("robot viewer renders and is centered", async ({ page }) => {
  await page.goto("/#robot");
  await expect(page.getByTestId("robot")).toBeVisible();
  await expect(page.getByTestId("robot-viewer")).toBeVisible();
  await expect(page.getByText(/Drag to rotate freely • Scroll to zoom/i)).toBeVisible();
});

test("no-WebGL fallback renders on query parameter (?nogl=1)", async ({ page }) => {
  await page.goto("/?nogl=1#robot");
  await page.getByTestId("robot-viewer").scrollIntoViewIfNeeded();
  await expect(page.getByTestId("robot-fallback")).toBeVisible({ timeout: 30000 });
});

test("city choice flows into the greeting", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("city-muscat").click();
  await expect(page.getByTestId("malayalam-greeting")).toContainText("മസ്കറ്റിൽ");
});

test("demo request form captures expectations and displays confirmation with WhatsApp contact", async ({ page }) => {
  await page.goto("/#cta");
  await expect(page.getByTestId("cta")).toBeVisible();
  await page.locator("#reserve-name").fill("Arun Varma");
  await page.locator("#reserve-phone").fill("+971 50 987 6543");
  await page.locator("#reserve-expectations").fill("Checking in with Amma during evening tea time and moving around the veranda.");
  await page.getByRole("button", { name: /Request a Free Private Demo/i }).click();
  await expect(page.getByText(/Demo Request Confirmed/i)).toBeVisible();
  await expect(page.getByText(/Chat directly with Founder on WhatsApp/i)).toBeVisible();
});

