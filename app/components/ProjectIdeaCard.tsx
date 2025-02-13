import { type ProjectIdeaType } from "../models/ProjectIdea";

interface ProjectIdeaProps {
  projectIdea: ProjectIdeaType;
}

export default function ProjectIdeaCard({ projectIdea }: ProjectIdeaProps) {
  return (
    <div className="border border-cyan-200 p-4 my-3">
      <h2 className="text-xl mb-2">{projectIdea.projectName}</h2>

      <div className="mb-4">
        <p>{projectIdea.description}</p>
      </div>

      <Collapsible title="Target Audience">
        <p>{projectIdea.targetAudience}</p>
      </Collapsible>

      <Collapsible title="Main Challenge">
        <p>{projectIdea.mainChallenge}</p>
      </Collapsible>

      <Collapsible title="Key Features">
        <ul className="mt-2">
          {projectIdea.keyFeatures.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </Collapsible>

      <Collapsible title="UI Components">
        <ul className="mt-2">
          {projectIdea.uiComponentsUsed.map((component, index) => (
            <li key={index}>{component}</li>
          ))}
        </ul>
      </Collapsible>

      <Collapsible title="Timeline">
        <div className="mt-2">
          {projectIdea.timeline.map((day, index) => (
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
