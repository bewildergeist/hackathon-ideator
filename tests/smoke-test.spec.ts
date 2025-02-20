import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Hackathon Ideator");
});

test("has input form and button", async ({ page }) => {
  await page.goto("/");

  // Expect the input field for prompt to be visible.
  await expect(page.getByPlaceholder("Optional idea or prompt")).toBeVisible();

  // Expect the button to generate an idea to be visible.
  await expect(
    page.getByRole("button", { name: "Generate idea" }),
  ).toBeVisible();
});
