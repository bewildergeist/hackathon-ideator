import { data, Form, useFetcher } from "react-router";
import type { Route } from "./+types/home";
import ProjectIdeaCard from "~/components/ProjectIdeaCard";
import ProjectIdea from "~/models/ProjectIdea";
import { generateProjectIdea } from "~/services/generateProjectIdea";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Hackathon Ideator" }];
}

export async function loader() {
  const projectIdeas = await ProjectIdea.find().sort({ createdAt: -1 });
  return { projectIdeas: projectIdeas.map((d) => d.toObject()) };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { projectIdeas } = loaderData;
  const fetcher = useFetcher();
  return (
    <div>
      <h1 className="text-3xl text-center">
        <span className="typing-animation">
          Hackathon Ideator
          <span className="typing-cursor"> ▋</span>
        </span>
      </h1>
      <fetcher.Form method="post" className="flex flex-row my-4">
        <input
          type="text"
          name="message"
          placeholder="Optional idea or prompt"
          className="flex-grow"
        />
        <button name="intent" value="generate" type="submit">
          {fetcher.state === "idle" ? (
            "Generate idea"
          ) : (
            <span className="animate-pulse">Generating...</span>
          )}
        </button>
      </fetcher.Form>
      {projectIdeas.map((projectIdea) => (
        <ProjectIdeaCard key={projectIdea.id} {...projectIdea} />
      ))}
    </div>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  switch (intent) {
    case "generate": {
      const message = formData.get("message") as string;
      const projectIdea = await generateProjectIdea({ message });
      await ProjectIdea.create(projectIdea);
      return data({ ok: true }, { status: 201 });
    }
    case "delete": {
      const id = formData.get("id");
      await ProjectIdea.findByIdAndDelete(id);
      return data({ ok: true }, { status: 204 });
    }
    default: {
      throw new Error("Unexpected action");
    }
  }
}
