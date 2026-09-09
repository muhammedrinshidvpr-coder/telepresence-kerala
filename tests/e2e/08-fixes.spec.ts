import { test, expect } from "@playwright/test";

test("robot views switch camera (label + canvas alive)", async ({ page }) => {
  await page.goto("/#robot");
  await expect(page.getByTestId("robot")).toBeVisible();
  await page.getByTestId("view-side").click();
  await expect(page.getByTestId("robot-view-label")).toContainText("side");
  await page.getByTestId("view-rear").click();
  await expect(page.getByTestId("robot-view-label")).toContainText("rear");
  await expect(page.getByTestId("robot-viewer")).toBeVisible();
});

test("no-WebGL fallback renders and controls still work (?nogl=1)", async ({ page }) => {
  await page.goto("/?nogl=1#robot");
  await page.getByTestId("robot-viewer").scrollIntoViewIfNeeded();
  await expect(page.getByTestId("robot-fallback")).toBeVisible({ timeout: 30000 });
  await page.getByTestId("mode-night").click();
  await expect(page.getByTestId("robot-mode-label")).toContainText("night");
  await page.getByTestId("hotspot-privacy").click();
  await expect(page.getByTestId("hotspot-detail")).toContainText(/privacy/i);
});

test("city choice flows into the greeting", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("city-muscat").click();
  await expect(page.getByTestId("malayalam-greeting")).toContainText("മസ്കറ്റിൽ");
});

test("pre-order token form captures expectations and displays Razorpay step", async ({ page }) => {
  await page.goto("/#cta");
  await expect(page.getByTestId("cta")).toBeVisible();
  await page.locator("#reserve-name").fill("Arun Varma");
  await page.locator("#reserve-phone").fill("+971 50 987 6543");
  await page.locator("#reserve-expectations").fill("Checking in with Amma during evening tea time and moving around the veranda.");
  await page.getByRole("button", { name: /Proceed to Pre-Order Token Payment/i }).click();
  await expect(page.getByText(/Step 2: Pre-Order Token Payment/i)).toBeVisible();
  await expect(page.getByText(/Official Razorpay Pre-Order Token/i)).toBeVisible();
});
