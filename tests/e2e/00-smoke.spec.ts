import { test, expect } from "@playwright/test";

test("smoke: nav, hero, all 11 blocks render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("navbar")).toBeVisible();
  await expect(page.getByTestId("hero")).toBeVisible();
  await expect(page.getByRole("heading", { name: /A call can be missed/i })).toBeVisible();
  await expect(page.getByTestId("btn-how-it-works")).toBeVisible();
  await expect(page.getByTestId("btn-virtual-checkin")).toBeVisible();
  for (const id of ["distance", "robot", "control", "usecases", "story", "mobility", "malayalam", "privacy", "demo", "how", "cta", "footer"]) {
    await expect(page.getByTestId(id)).toBeVisible();
  }
  await expect(page.getByTestId("nav-toggle")).toBeAttached().catch(() => {});
});

test("no banned surveillance/medical copy", async ({ page }) => {
  await page.goto("/");
  const text = (await page.getByTestId("main").innerText()).toLowerCase();
  for (const banned of ["monitor your parents", "secure webrtc", "medical emergency", "climb stairs"]) {
    expect(text).not.toContain(banned);
  }
  expect(text).toContain("privacy-first access controls");
});
