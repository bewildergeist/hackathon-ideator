import mistral from "../config/mistral.server";
import type { Route } from "./+types/chat";

export async function action({ request }: Route.ActionArgs) {
  const { message } = await request.json();
  const response = await mistral.chat.complete({
    model: "mistral-small-latest",
    messages: [
      {
        role: "system",
        content: "Always respond with short and concise messages.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });
  return Response.json(response);
}
