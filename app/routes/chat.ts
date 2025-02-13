import { generateProjectIdea } from "~/services/generateProjectIdea";
import type { Route } from "./+types/chat";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const message = formData.get("message") as string;
  const projectIdea = await generateProjectIdea({ message });
  return Response.json(projectIdea);
}
