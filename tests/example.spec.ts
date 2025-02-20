import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
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

// TODO: This runs against the connected database, and should be updated to run
// against a test database:
// https://playwright.dev/docs/test-global-setup-teardown
test("has correct number of project ideas", async ({ page }) => {
  await page.goto("/");

  // Expect exactly 6 article elements with the correct headings
  await expect(page.getByRole("article")).toHaveCount(6);
  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(6);
  await expect(page.getByRole("heading", { level: 2 })).toHaveText([
    "GroupNameGenie",
    "AI-Powered Fitness Coach",
    "AI Art Mentor",
    "AI Home Design Assistant",
    "Beach Cabin Concierge",
    "AI-Driven Travel Planner",
  ]);
});
