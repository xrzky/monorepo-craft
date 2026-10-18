import { expect, test } from "@playwright/test";

test.describe("platform", () => {
  test("renders the home page", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  });

  test("navigates to the about page", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "About" }).click();

    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
  });

  test("loads the about page directly", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
  });
});
