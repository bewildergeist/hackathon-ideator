import { test, expect } from "@playwright/test";

test("generate a new project idea", async ({ page }) => {
  await page.goto("/");

  const projectIdeaCount = await page
    .getByRole("heading", { level: 2 })
    .count();

  await page
    .getByPlaceholder("Optional idea or prompt")
    .fill("A new project idea");
  await page.getByRole("button", { name: "Generate idea" }).click();

  await expect(
    page.getByRole("button", { name: "Generate idea" }),
  ).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Generating..." }),
  ).toBeVisible();

  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(
    projectIdeaCount + 1,
    {
      timeout: 15_000,
    },
  );
});

test("delete a project idea", async ({ page }) => {
  await page.goto("/");

  const projectIdeaCount = await page
    .getByRole("heading", { level: 2 })
    .count();

  const firstProjectIdeaCard = page.getByRole("article").first();
  if (!firstProjectIdeaCard) {
    throw new Error("No project ideas found in the database");
  }
  const firstProjectIdeaTitle = (await firstProjectIdeaCard
    .getByRole("heading", { level: 2 })
    .textContent()) as string;

  await firstProjectIdeaCard.getByTitle("Delete project idea").click();

  await expect(page.getByRole("heading", { level: 2 })).toHaveCount(
    projectIdeaCount - 1,
  );

  await expect(
    page.getByRole("heading", { name: firstProjectIdeaTitle }),
  ).not.toBeVisible();
});
