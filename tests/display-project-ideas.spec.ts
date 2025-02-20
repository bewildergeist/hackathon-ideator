import { test, expect } from "@playwright/test";

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
