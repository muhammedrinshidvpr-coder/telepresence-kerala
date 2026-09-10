import { test, expect } from "@playwright/test";
import { TALLY_CONFIG } from "../../src/lib/copy";

test.describe("Tally form integration", () => {
  test("tally embed script is present in the DOM", async ({ page }) => {
    await page.goto("/");
    const script = page.locator('script[src="https://tally.so/widgets/embed.js"]');
    await expect(script).toBeAttached();
  });

  test("tally consultation triggers exist in the Final CTA section", async ({ page }) => {
    await page.goto("/#cta");
    await expect(page.getByTestId("cta")).toBeVisible();

    // In-card consultation link
    const inCardConsult = page.getByTestId("form-tally-consult");
    await expect(inCardConsult).toBeVisible();
    await expect(inCardConsult).toHaveAttribute("data-tally-open", TALLY_CONFIG.formId);
    await expect(inCardConsult).toHaveAttribute("data-tally-layout", "modal");
  });

  test("tally inquiry trigger appears on token payment step with prefilled hidden fields", async ({ page }) => {
    await page.goto("/#cta");
    await page.locator("#reserve-name").fill("Devan Menon");
    await page.locator("#reserve-phone").fill("+971 52 111 2233");
    await page.locator("#reserve-expectations").fill("Morning calls with grandmother");
    await page.getByRole("button", { name: /Proceed to Pre-Order Token Payment/i }).click();

    const inquireBtn = page.getByTestId("payment-tally-inquire");
    await expect(inquireBtn).toBeVisible();
    await expect(inquireBtn).toHaveAttribute("data-tally-open", TALLY_CONFIG.formId);
    const hiddenAttr = await inquireBtn.getAttribute("data-tally-hidden");
    expect(hiddenAttr).toContain("Devan%20Menon");
  });
});
