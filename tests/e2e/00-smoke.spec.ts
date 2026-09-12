import { test, expect } from "@playwright/test";
import { BANNED_COPY } from "../../src/lib/copy";

test("smoke: nav, hero, all active blocks render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("navbar")).toBeVisible();
  await expect(page.getByTestId("hero")).toBeVisible();
  await expect(page.getByRole("heading", { name: /A call can be missed/i })).toBeVisible();
  await expect(page.getByTestId("btn-how-it-works")).toBeVisible();
  for (const id of ["problem-stats", "distance", "robot", "health-alerts", "control", "usecases", "story", "malayalam", "privacy", "how", "founder-section", "cta", "footer"]) {
    await expect(page.getByTestId(id)).toBeVisible();
  }
});

test("no banned surveillance/medical copy", async ({ page }) => {
  await page.goto("/");
  const text = (await page.getByTestId("main").innerText()).toLowerCase();
  for (const banned of BANNED_COPY) {
    expect(text).not.toContain(banned);
  }
  expect(text).toContain("webrtc");
});
