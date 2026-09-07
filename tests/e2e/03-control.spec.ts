import { test, expect } from "@playwright/test";

test("control: full check-in loop (?demoFast=1)", async ({ page }) => {
  await page.goto("/?demoFast=1#control");
  await expect(page.getByTestId("control")).toBeVisible();
  // start
  await page.getByTestId("btn-checkin").click();
  await expect(page.getByTestId("control-phase")).toContainText(/Ringing|Waking|Live/i);
  await expect(page.getByTestId("control-phase")).toContainText(/Live video/, { timeout: 15000 });
  // drive
  const dot = page.getByTestId("robot-dot");
  await expect(dot).toBeVisible();
  await page.getByTestId("move-right").click();
  await page.getByTestId("move-down").click();
  await page.getByTestId("room-1").click();
  await expect(page.getByTestId("control-room-label")).toContainText("Dining area");
  // talk
  await page.getByTestId("btn-talk").click();
  await expect(page.getByTestId("parent-card")).toBeVisible();
  await expect(page.getByTestId("parent-card")).toContainText(/ദുബായിൽ/);
  // privacy toggle
  await page.getByTestId("btn-privacy").click();
  await expect(page.getByTestId("privacy-overlay")).toBeVisible();
  await page.getByTestId("btn-privacy").click();
  // dock
  await page.getByTestId("btn-dock").click();
  await expect(page.getByTestId("control-phase")).toContainText(/Returning|complete|Docked/i, { timeout: 15000 });
  await expect(page.getByTestId("control-log")).toContainText(/Docked/);
});

test("control: keyboard driving works", async ({ page }) => {
  await page.goto("/?demoFast=1#control");
  await page.getByTestId("btn-checkin").click();
  await expect(page.getByTestId("control-phase")).toContainText(/Live video/, { timeout: 15000 });
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowDown");
  await expect(page.getByTestId("control-log")).toBeVisible();
});
