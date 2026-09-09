import { test, expect } from "@playwright/test";

test("stories: 3 key features and 3 scenes render", async ({ page }) => {
  await page.goto("/#stories");
  for (const id of ["missed", "rooms", "grandchildren"]) {
    await expect(page.getByTestId(`usecase-${id}`)).toBeVisible();
  }
  await expect(page.getByTestId("usecase-missed")).toContainText(/No answer/);
  await expect(page.getByTestId("contrast-table")).toContainText(/Spontaneous everyday connection/);
  const scenes = page.getByTestId("story-scene");
  await expect(scenes).toHaveCount(3);
});
