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
