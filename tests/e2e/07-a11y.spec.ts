import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("a11y: no serious or critical violations on homepage", async ({ page }) => {
  await page.goto("/");
  // Settle scroll-triggered fade animations first: axe measures opacity,
  // so mid-animation text would false-positive on color-contrast.
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += Math.max(400, window.innerHeight / 2)) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  const blocking = results.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact ?? "")
  );
  expect(
    blocking.map((v) => `${v.id}: ${v.nodes.length} nodes`)
  ).toEqual([]);
});
