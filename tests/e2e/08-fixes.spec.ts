import { test, expect } from "@playwright/test";

// Regression specs for the P0/P1 fix batch.

test("robot views switch camera (label + canvas alive)", async ({ page }) => {
  await page.goto("/#robot");
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
  await page.getByTestId("hotspot-battery").click();
  await expect(page.getByTestId("hotspot-detail")).toContainText(/charging/i);
});

test("dock during waking cancels timers (no resurrection)", async ({ page }) => {
  await page.goto("/?demoFast=1#control");
  await page.getByTestId("btn-checkin").click();
  await page.getByTestId("btn-dock").click();
  await expect(page.getByTestId("control-phase")).toContainText(/Returning|complete|Docked/i, { timeout: 15000 });
  await page.waitForTimeout(2000);
  await expect(page.getByTestId("control-phase")).toContainText(/complete|Docked/i);
  await expect(page.getByTestId("control-log")).toContainText(/Docked/);
});

test("arrow keys drive without scrolling the page", async ({ page }) => {
  await page.goto("/?demoFast=1#control");
  await page.getByTestId("btn-checkin").click();
  await expect(page.getByTestId("control-phase")).toContainText(/Live video/, { timeout: 15000 });
  const y0 = await page.evaluate(() => window.scrollY);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(300);
  const y1 = await page.evaluate(() => window.scrollY);
  expect(y1).toBe(y0);
});

test("dragging the robot dot moves it", async ({ page }, testInfo) => {
  await page.goto("/?demoFast=1#control");
  await page.getByTestId("btn-checkin").click();
  await expect(page.getByTestId("control-phase")).toContainText(/Live video/, { timeout: 15000 });
  await page.getByTestId("home-map").scrollIntoViewIfNeeded();
  const dot = page.getByTestId("robot-dot");
  const before = await dot.boundingBox();
  const map = page.getByTestId("home-map");
  const box = await map.boundingBox();
  if (!before || !box) throw new Error("no boxes");
  const fromX = before.x + before.width / 2;
  const fromY = before.y + before.height / 2;
  const toX = box.x + box.width * 0.8;
  const toY = box.y + box.height * 0.8;
  if (testInfo.project.name === "mobile") {
    // Real touch drag via CDP (page.mouse doesn't produce touch input).
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: fromX, y: fromY }] });
    for (let i = 1; i <= 8; i++) {
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: fromX + ((toX - fromX) * i) / 8, y: fromY + ((toY - fromY) * i) / 8 }],
      });
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  } else {
    await page.mouse.move(fromX, fromY);
    await page.mouse.down();
    await page.mouse.move(toX, toY, { steps: 8 });
    await page.mouse.up();
  }
  const after = await dot.boundingBox();
  expect(after?.x).not.toBe(before.x);
});

test("room buttons teleport the dot + privacy restores talking", async ({ page }) => {
  await page.goto("/?demoFast=1#control");
  await page.getByTestId("btn-checkin").click();
  await expect(page.getByTestId("control-phase")).toContainText(/Live video/, { timeout: 15000 });
  const dot = page.getByTestId("robot-dot");
  const before = await dot.boundingBox();
  await page.getByTestId("room-1").click();
  const after = await dot.boundingBox();
  expect(after?.x).toBeGreaterThan(before?.x ?? 0);
  await page.getByTestId("btn-talk").click();
  await expect(page.getByTestId("parent-card")).toBeVisible();
  await page.getByTestId("btn-privacy").click();
  await expect(page.getByTestId("privacy-overlay")).toBeVisible();
  await page.getByTestId("btn-privacy").click();
  await expect(page.getByTestId("parent-card")).toBeVisible();
});

test("demo replay resets + tamil/hindi marked soon", async ({ page }) => {
  await page.goto("/?demoFast=1#demo");
  await page.getByTestId("btn-demo-start").click();
  await expect(page.getByTestId("demo-done")).toBeVisible({ timeout: 30000 });
  await page.getByTestId("btn-demo-replay").click();
  await expect(page.getByTestId("demo-timer")).toContainText("0s");
  await expect(page.getByTestId("btn-demo-start")).toBeVisible();
  await expect(page.getByTestId("lang-Tamil")).toBeDisabled();
  await expect(page.getByTestId("lang-Hindi")).toBeDisabled();
});

test("city choice flows into the greeting", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("city-muscat").click();
  await expect(page.getByTestId("malayalam-greeting")).toContainText("മസ്കറ്റിൽ");
});
