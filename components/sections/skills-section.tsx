import { Check } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Go", "Python", "Java", "C#", "TypeScript", "JavaScript", "SQL"],
  },
  {
    title: "Backend & frameworks",
    skills: [".NET / ASP.NET Core", "EF Core", "Node.js / Express", "React", "Angular", "REST APIs", "gRPC", "JWT / Okta"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS Lambda, SQS, Step Functions", "Azure OpenAI, AI Search, Functions", "Terraform", "Docker", "Kubernetes (k3s)", "GitHub Actions"],
  },
  {
    title: "Distributed systems & data",
    skills: ["Kafka", "Raft (hashicorp/raft)", "SQL Server", "DynamoDB", "MongoDB", "Redis"],
  },
  {
    title: "Agentic AI & ML",
    skills: ["LangGraph", "MCP", "RAG", "LangChain", "CrewAI", "TensorFlow", "Hugging Face"],
  },
  {
    title: "Observability & testing",
    skills: ["Datadog APM", "Prometheus", "Grafana", "Sumo Logic", "xUnit", "Cypress"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-14 md:py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="display display-section text-foreground mb-8 md:mb-10">Skills</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {skillCategories.map((category) => (
            <div key={category.title} className="rule-dotted pt-5">
              <h3 className="display display-title text-foreground">{category.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {category.skills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2.5 label text-foreground/85">
                    <Check className="mt-[0.15em] h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
