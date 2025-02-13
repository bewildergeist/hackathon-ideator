import { Schema, model, type InferSchemaType } from "mongoose";

// Define the schema for the "projectideas" collection in MongoDB
const projectIdeaSchema = new Schema(
  {
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    keyFeatures: [{ type: String, required: true }],
    targetAudience: { type: String, required: true },
    timeline: [
      {
        day: { type: Number, required: true },
        tasks: [{ type: String, required: true }],
      },
    ],
    uiComponentsUsed: [{ type: String, required: true }],
    mainChallenge: { type: String, required: true },
  },
  {
    timestamps: true,
    toObject: {
      flattenObjectIds: true,
      getters: true,
    },
  },
);

// Infer TypeScript type for the schema
export type ProjectIdeaType = InferSchemaType<typeof projectIdeaSchema> & {
  id: string;
};

// This model provides an interface to interact with the "projectideas" collection in MongoDB
const ProjectIdea = model<ProjectIdeaType>("ProjectIdea", projectIdeaSchema);

// Export the ProjectIdea model for use in other parts of the application
export default ProjectIdea;
