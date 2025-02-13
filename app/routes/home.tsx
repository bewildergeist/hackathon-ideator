import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Hackathon Ideator" },
  ];
}

export default function Home() {
  return <div>
    <h1 className="text-3xl tracking-wide text-center">
      <span className="typing-animation">
        Hackathon Ideator
        <span className="typing-cursor"> ▋</span>
      </span>
    </h1>
  </div>
}
