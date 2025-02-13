import { useFetcher } from "react-router";
import type { ProjectIdeaZodType } from "~/services/generateProjectIdea";

export default function ProjectIdeaCard({
  id,
  projectName,
  description,
  targetAudience,
  mainChallenge,
  keyFeatures = [],
  uiComponentsUsed = [],
  timeline = [],
}: ProjectIdeaZodType) {
  const deleteFetcher = useFetcher();
  return (
    <div className="border border-cyan-200 p-4 my-3">
      <div className="flex justify-between items-start">
        <h2 className="text-xl mb-2">{projectName}</h2>
        <deleteFetcher.Form method="post">
          <input type="hidden" name="id" value={id} />
          <button type="submit" name="intent" value="delete" title="Delete project idea" className="hover:text-yellow-600">
            {deleteFetcher.state !== "idle" ? "..." : "×"}
          </button>
        </deleteFetcher.Form>
      </div>

      <div className="mb-4">
        <p>{description}</p>
      </div>

      <Collapsible title="Target Audience">
        <p>{targetAudience}</p>
      </Collapsible>

      <Collapsible title="Main Challenge">
        <p>{mainChallenge}</p>
      </Collapsible>

      <Collapsible title="Key Features">
        <ul className="mt-2">
          {keyFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </Collapsible>

      <Collapsible title="UI Components">
        <ul className="mt-2">
          {uiComponentsUsed.map((component, index) => (
            <li key={index}>{component}</li>
          ))}
        </ul>
      </Collapsible>

      <Collapsible title="Timeline">
        <div className="mt-2">
          {timeline.map((day, index) => (
            <div key={index} className="ml-4">
              <p>Day {day.day}:</p>
              <ul>
                {day.tasks.map((task, taskIndex) => (
                  <li key={taskIndex}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Collapsible>
    </div>
  );
}

function Collapsible({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="mb-4">
      <summary className="cursor-pointer">
        <h3 className="inline">{title}:</h3>
      </summary>
      {children}
    </details>
  );
}
