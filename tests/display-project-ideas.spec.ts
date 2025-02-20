import { test, expect } from "@playwright/test";
import mongoose from "mongoose";
import ProjectIdea from "~/models/ProjectIdea";

test.beforeAll(async () => {
  const connectionString = process.env.MONGODB_URI;
  if (!connectionString) {
    throw new Error("MONGODB_URI is not set");
  }
  mongoose.connect(connectionString);
});

test("shows all project ideas from the database", async ({ page }) => {
  const projectIdeaCount = await ProjectIdea.countDocuments();
  // Find and sort the project idea titles similar to how they are fetched in
  // the home.tsx route:
  const projectIdeaTitles = (
    await ProjectIdea.find({}, { projectName: 1, _id: 0 }).sort({
      createdAt: -1,
    })
  ).map((idea) => idea.projectName);

  await page.goto("/");

  // Expect to see an <article> and <h2> for each project idea in the database.
  await expect(page.getByRole("article")).toHaveCount(projectIdeaCount);

  const projectIdeaHeadings = page.getByRole("heading", { level: 2 });

  await expect(projectIdeaHeadings).toHaveCount(projectIdeaCount);
  await expect(projectIdeaHeadings).toHaveText(projectIdeaTitles);
});

test("correctly shows collapsible content", async ({ page }) => {
  // Find the most recent project idea in the database
  const projectIdea = await ProjectIdea.findOne().sort({ createdAt: -1 });
  if (!projectIdea) {
    throw new Error("No project ideas found in the database");
  }

  await page.goto("/");

  // Find the first project idea card
  const firstProjectIdeaCard = page
    .getByRole("article")
    .filter({ hasText: projectIdea.projectName });

  // Description should be visible by default.
  await expect(
    firstProjectIdeaCard.getByText(projectIdea.description),
  ).toBeVisible();

  const collapsibleSections = [
    {
      title: "Target Audience",
      content: projectIdea.targetAudience,
    },
    {
      title: "Main Challenge",
      content: projectIdea.mainChallenge,
    },
    {
      title: "Key Features",
      content: projectIdea.keyFeatures.join(""),
    },
    {
      title: "UI Components",
      content: projectIdea.uiComponentsUsed.join(""),
    },
    {
      title: "Timeline",
      content: projectIdea.timeline
        .map((day) => `Day ${day.day}:${day.tasks.join("")}`)
        .join(""),
    },
  ];

  for (const { title, content } of collapsibleSections) {
    const collapsibleTitle = firstProjectIdeaCard.getByRole("heading", {
      name: title,
    });
    const collapsibleContent = firstProjectIdeaCard.getByText(content);

    await expect(collapsibleContent).not.toBeVisible();
    await collapsibleTitle.click();
    await expect(collapsibleContent).toBeVisible();
  }
});
