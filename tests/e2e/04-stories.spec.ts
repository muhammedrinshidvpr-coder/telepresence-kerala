import { test, expect } from "@playwright/test";

test("stories + contrast table render", async ({ page }) => {
  await page.goto("/#stories");
  for (const id of ["morning", "missed", "rooms", "grandchildren", "history"]) {
    await expect(page.getByTestId(`usecase-${id}`)).toBeVisible();
  }
  await expect(page.getByTestId("usecase-missed")).toContainText(/No answer/);
  await expect(page.getByTestId("contrast-table")).toContainText(/Spontaneous family presence/);
  await expect(page.getByTestId("story").getByText(/Not just a call. A visit./)).toBeVisible();
});
