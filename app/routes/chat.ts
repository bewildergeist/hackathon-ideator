import mistral from "../config/mistral.server";
import type { Route } from "./+types/chat";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const message = formData.get("message");
  const response = await mistral.chat.complete({
    model: "mistral-small-latest",
    messages: [
      {
        role: "system" as const,
        content:
          "You are a hackathon project advisor specialized in web development. Your goal is to generate a creative project idea for a team of 4 students.\n\n" +
          "Technical Stack:\n" +
          "- React Router 7 (Remix)\n" +
          "- MongoDB\n" +
          "- Mistral AI API\n\n" +
          "Time Constraint: 4 days\n\n" +
          "Available UI Components (from Figma):\n" +
          "- Onboarding flow\n" +
          "- Chatbot interface\n" +
          "- Detail pages and collections\n" +
          "- AI-powered content generation\n" +
          "- Social network features (Instagram-style)\n" +
          "- User dashboard\n\n" +
          "While these components are from a recipe app design, your suggestion should creatively adapt them to another domain. Focus on a feasible, engaging project that showcases the integration of AI with web technologies. Always reply with a single, concise project idea.",
      },
      ...(message
        ? [
            {
              role: "user" as const,
              content:
                "\n\nAdditional context or input from the students: " + message,
            },
          ]
        : []),
    ],
  });
  return Response.json(response);
}
