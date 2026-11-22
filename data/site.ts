// All visible content lives here. Roles, projects, metrics and links are copied
// verbatim from the previous site; nothing in this file is invented.

export const site = {
  name: "Ritvik Reddy Gangula",
  shortName: "Ritvik",
  role: "Software engineer",
  url: "https://ritvikreddy.dev",
  description:
    "Software engineer and computer science student at Arizona State University, building backend systems that survive failure and the AI agents that run on them.",
  email: "ritvikreddygangula@gmail.com",
  resume: "https://drive.google.com/file/d/1Cftg989Ngyrtr3NPd3cSpAB34iSJRukc/view?usp=sharing",
  github: { label: "github.com/ritvikreddygangula", href: "https://github.com/ritvikreddygangula" },
  linkedin: { label: "linkedin.com/in/gritvik", href: "https://linkedin.com/in/gritvik" },
  formEndpoint: "https://formspree.io/f/mvgrqndk",
};

export const nav = [
  { name: "About", id: "about" },
  { name: "Experience", id: "experience" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "contact" },
];

export const hero = {
  lede: {
    before: "Software engineer building ",
    infra: "backend systems that stay up when parts of them fail",
    between: ", and ",
    agents: "the AI agents that run on top of them",
    after: ". Computer science at Arizona State, graduating May 2027.",
  },
  // The results the hero shows one at a time. Each points at an entry below, so the
  // words are the same ones used in Experience and Projects.
  results: [
    { from: "experience", index: 0, highlight: 0 },
    { from: "project", index: 2, highlight: 1 },
    { from: "project", index: 1, highlight: 1 },
    { from: "experience", index: 2, highlight: 0 },
    { from: "experience", index: 1, highlight: 1 },
  ] as { from: "experience" | "project"; index: number; highlight: number }[],
};

export const about = {
  statement:
    "I'm a software engineer who likes the layer underneath the product: queues, retries, and the data paths that decide whether a system holds up.",
  facts: [
    { term: "School", detail: "Arizona State University" },
    { term: "Degree", detail: "B.S. Computer Science, May 2027" },
    { term: "GPA", detail: "4.0, Dean's List six times" },
    { term: "Certified", detail: "AWS Cloud Practitioner", badge: true },
    { term: "Karate", detail: "Black belt" },
  ],
  // In the owner's words.
  karate: {
    title: "Karate, black belt",
    text: "Karate taught me focus, and how important feedback is.",
    quote: "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.",
    by: "Bruce Lee",
  },
  // What I'm learning right now; update the date whenever this list changes.
  now: {
    updated: "Oct 2026",
    topics: ["Evaluating LLM systems", "LLM as a judge", "RAG and ways to improve retrieval"],
    cta: {
      label: "Exploring the same? Ping me, happy to chat.",
      href: "mailto:ritvikreddygangula@gmail.com?subject=Evals%20and%20RAG",
    },
  },
};

export type Experience = {
  title: string;
  company: string;
  url?: string;
  // Company mark, shown beside the name.
  logo?: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  // Wrap a result in **double asterisks** to set it in the strong ink.
  achievements: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    title: "Software Engineering Intern",
    company: "GCM Grosvenor",
    url: "https://gcmgrosvenor.com/",
    logo: "/logos/gcm-grosvenor.png",
    location: "Chicago, IL",
    period: "Jun – Aug 2026",
    summary:
      "A $96B AUM investment firm. I built a RAG service on Azure OpenAI and backend services for client-facing platforms.",
    highlights: ["560+ team hours saved per quarter", "730+ clients served", "1.5s median retrieval"],
    achievements: [
      "Engineered a RAG service in C#/.NET on Azure OpenAI (GPT-4o) that drafts client reports grounded in research documents via hybrid retrieval (Azure AI Search, **1.5s** median retrieval latency), covering **500+ portfolios** and saving **560+ team hours per quarter**",
      "Built production backend services for an in-house document portal replacing a third-party platform, using ASP.NET Core Web API, EF Core, and SQL Server, with client-scoped RBAC and SAS-based downloads from Azure Blob Storage, serving **730+ clients** and **500K+ migrated documents**, tested with xUnit and Cypress E2E",
      "Implemented distributed tracing, log correlation, and production dashboards across 6+ .NET web apps and Azure Functions with Datadog APM and Sumo Logic (Serilog trace IDs), cutting diagnosis of a production Azure Function timeout from hours to **under 30 minutes**",
    ],
    stack: ["C#/.NET", "ASP.NET Core", "EF Core", "SQL Server", "Azure OpenAI", "Azure AI Search", "Azure Functions", "Datadog", "xUnit", "Cypress"],
  },
  {
    title: "Jr. Data Analyst",
    company: "Food Forest AI",
    url: "https://www.foodforest.ai/",
    logo: "/logos/food-forest-ai.png",
    location: "Philadelphia, PA",
    period: "Jun – May 2025",
    summary:
      "Automated data enrichment and quality validation pipelines using Python and GPT, improving dataset reliability across analytics workflows.",
    highlights: ["25+ hours saved per week", "~40% more accurate data"],
    achievements: [
      "Improved dataset accuracy by **~40%** through automated validation and consistency checks",
      "Reduced manual data processing by **35%+** by streamlining Google Sheets–based workflows",
      "Implemented anomaly detection to identify data inconsistencies across production datasets",
      "Strengthened downstream ML and analytics reliability with preventative data checks",
    ],
    stack: ["Python", "OpenAI API", "Google Sheets API", "Data analysis"],
  },
  {
    title: "Software Engineering Intern",
    company: "Greater Hyderabad Municipal Corporation",
    location: "Hyderabad, India",
    period: "May – Aug 2024",
    summary:
      "Backend APIs and a fast React frontend for a civic permit portal used by 15,000+ citizens and officers.",
    highlights: ["75% faster reads", "3.4s → 0.8s render", "65% fewer search calls"],
    achievements: [
      "Built cursor-based pagination on DynamoDB (LastEvaluatedKey) and a React frontend with debounced search and react-window virtualization, cutting search API calls by **65%** and initial render of 5K+ record permit histories from **3.4s to 0.8s**",
      "Replaced full-table scans on a 50K+ record permit table with key-based queries by redesigning the DynamoDB partition and sort keys and adding a status GSI, cutting average read latency **75%** (400ms to 100ms, CloudWatch)",
      "Built **15+ REST APIs** in Node.js/Express (TypeScript) with Joi request validation and Okta-based authentication and RBAC, enforcing 6 permission tiers through authorization middleware and role-based guards",
    ],
    stack: ["Node.js", "Express", "TypeScript", "React", "DynamoDB", "AWS", "Okta", "Joi"],
  },
];

export type SceneName = "point" | "diff" | "failover" | "fan" | "chat" | "notes" | "advise" | "forecast";

export type Project = {
  title: string;
  date: string;
  description: string;
  highlights: string[];
  technologies: string[];
  achievements: string[];
  github?: string;
  demo?: string;
  // A recorded walkthrough.
  video?: string;
  // A YouTube video played inside the detail view.
  youtube?: { id: string; poster: string };
  // A short clip shown in the detail view.
  clip?: { src: string; poster: string };
  // A small looping picture of what the project does.
  scene: SceneName;
  sceneAlt: string;
  // A playable model of the system sits in the detail view.
  sim?: boolean;
};

export const projects: Project[] = [
  {
    title: "TagAlong",
    date: "Nov 2026",
    description:
      "When a teacher points at the board and says \"this\", a visually impaired student hears the exact term in their earbud.",
    highlights: ["12s → 2s to read the board", "Near-zero latency whisper", "Built at HackPrinceton"],
    technologies: ["TypeScript", "React", "Express", "WebSockets", "MediaPipe", "Claude", "ElevenLabs", "Amazon Transcribe", "Amazon Polly"],
    achievements: [
      "Cut the time for new writing on the board to appear as readable terms from 12 seconds to 2 seconds",
      "Near-zero latency between the teacher pointing and the student hearing the term, because no AI runs while the teacher is pointing",
      "When new writing appears and the board stays still for a second, Claude reads it and returns each term with its position",
      "The camera tracks the teacher's finger, a pointer stick or a laser dot, in the browser",
      "Speech recognition picks up \"this\", \"that\", \"these\" and \"those\"; the pointed term is spoken from the left or right, depending on where it is on the board",
      "One camera device at the front; every student listens on their own phone, and each phrase is voiced once on the server and shared",
    ],
    github: "https://github.com/Chinmay1545/TagAlong",
    video: "https://www.youtube.com/watch?v=FgkwKn3QVdE",
    youtube: { id: "FgkwKn3QVdE", poster: "/videos/tagalong.jpg" },
    scene: "point",
    sceneAlt: "A board with an equation. A pointer lands on the top term while the teacher says this, and the student hears: the x plus 3 on top",
  },
  {
    title: "DeltaLedger MCP",
    date: "Aug 2026",
    description:
      "A three-agent LangGraph pipeline that turns SEC EDGAR filings into classified, cited findings, served as an MCP server and REST API on AWS.",
    highlights: ["3-agent LangGraph pipeline", "90% eval gate in CI", "MCP server on AWS"],
    technologies: ["Python", "LangGraph", "MCP", "AWS Lambda", "API Gateway", "SQS", "Step Functions", "Terraform"],
    achievements: [
      "Aligner, Classifier, and Verifier agents; the Verifier retries retrieval once and drops unsupported findings",
      "Gated in CI by a 30-pair hand-labeled eval set at a 90% accuracy threshold",
      "Deployed as an MCP server and REST API with SQS-queued async requests, response caching, and Step Functions orchestration",
      "All infrastructure provisioned with Terraform",
    ],
    github: "https://github.com/ritvikreddygangula/DeltaLedger-MCP",
    demo: "https://d30z0su1b3sesp.cloudfront.net/",
    clip: { src: "/videos/deltaledger.mp4", poster: "/videos/deltaledger.jpg" },
    scene: "diff",
    sceneAlt: "Two filings side by side. Two changed passages are found: one becomes a cited finding, the unsupported one is dropped",
  },
  {
    title: "Forge",
    date: "Jan 2026",
    description:
      "A distributed job orchestrator in Go with Raft-replicated coordinators, gRPC workers, and a Kafka-backed event log.",
    highlights: ["16.7 jobs/s", "145 ms leader failover", "0 acknowledged jobs lost"],
    technologies: ["Go", "gRPC", "Kafka", "Raft", "k3s", "Prometheus", "Grafana"],
    achievements: [
      "3 Raft-replicated coordinators and 25 gRPC workers sustaining 16.7 jobs/s across 1,000 real job submissions",
      "Recovered every acknowledged job across 5 process-kill trials, with a 145 ms median leader failover",
      "Followers forward writes to the leader; job state is durably replicated via Kafka",
      "Prometheus/Grafana dashboards plus automated crash and partition fault-injection tests",
    ],
    github: "https://github.com/ritvikreddygangula/Forge",
    clip: { src: "/videos/forge.mp4", poster: "/videos/forge.jpg" },
    scene: "failover",
    sceneAlt: "Three coordinators send jobs to a row of workers. The leader fails, another coordinator takes over, and jobs keep landing",
    sim: true,
  },
  {
    title: "Deep Research Multi-Agent System",
    date: "Jun 2025",
    description:
      "A full-stack AI system that decomposes topics into parallel sub-questions and synthesizes source-backed research reports using a stateful agent workflow.",
    highlights: ["Parallel LangGraph agents", "Live agent graph UI", "Pinecone memory"],
    technologies: ["Gradio", "CrewAI", "LangGraph", "Python", "AI Agents"],
    achievements: [
      "Orchestrates planner, researcher, aggregator, critic, and synthesizer agents using LangGraph with parallel execution",
      "Streams real-time node-level updates to a React UI with live agent graph visualization",
      "Uses Pinecone vector memory to retrieve past context and improve future research quality",
    ],
    github: "https://github.com/ritvikreddygangula/multi-agent-research-",
    demo: "https://multi-agent-research-v773.onrender.com/",
    scene: "fan",
    sceneAlt: "One topic splits into three sub-questions researched in parallel, which merge into a report with source marks",
  },
  {
    title: "Meeting Intelligence Platform",
    date: "Mar 2026",
    description:
      "Turns meeting transcripts into a hierarchical summary and a list of action items with assignees and deadlines.",
    highlights: ["BERT semantic chunking", "Action item extraction", "FastAPI + Next.js"],
    technologies: ["FastAPI", "Next.js", "Python", "SQLAlchemy", "BERT", "Hugging Face", "JWT", "TypeScript"],
    achievements: [
      "BERT-based semantic chunking with overlap for context preservation",
      "Hierarchical extractive summarization (chunk → overall)",
      "Pattern-based action item extraction with assignee & deadline detection",
      "Secure JWT auth with bcrypt and per-user data isolation",
    ],
    github: "https://github.com/ritvikreddygangula/meeting-intelligence",
    scene: "notes",
    sceneAlt: "A meeting transcript is cut into chunks, which become a short summary and two action items with an assignee and a date",
  },
  {
    title: "Chatify",
    date: "Dec 2024",
    description:
      "Real-time chat application with rooms, presence indicators, and multi-device conversation sync.",
    highlights: ["Real-time rooms", "JWT + Redis rate limits", "Dockerized"],
    technologies: ["Node.js", "Express", "Socket.IO", "React", "MongoDB", "Docker", "JWT", "Redis"],
    achievements: [
      "Real-time rooms & presence indicators",
      "MongoDB persistence & multi-device sync",
      "JWT auth & Redis-backed rate limiting",
      "Dockerized full-stack deployment",
    ],
    github: "https://github.com/ritvikreddygangula/chatify",
    demo: "https://chatify-0eq1n.sevalla.app/login",
    scene: "chat",
    sceneAlt: "A chat window: a contact comes online, a message goes each way, a typing indicator, then the reply",
  },
  {
    title: "AI Career Assistant",
    date: "May 2025",
    description: "A career assistant built on LangChain and Hugging Face models that gives personalized guidance and recommendations.",
    highlights: ["LangChain", "Hugging Face models", "Deployed on Vercel"],
    technologies: ["LangChain", "Hugging Face", "Vercel", "React", "AI/ML"],
    achievements: ["Personalized recommendations", "Natural language processing", "Cloud deployment"],
    github: "https://github.com/ritvikreddygangula/ai-career-assistant",
    scene: "advise",
    sceneAlt: "A profile card on the left produces three recommendations on the right, the first one marked",
  },
  {
    title: "Stock Price Forecasting",
    date: "Dec 2024",
    description: "An LSTM model in TensorFlow and Keras that forecasts stock prices from their history.",
    highlights: ["LSTM model", "TensorFlow / Keras", "Time series"],
    technologies: ["TensorFlow", "Keras", "LSTM", "Pandas", "Matplotlib", "Python"],
    achievements: ["High prediction accuracy", "Time series analysis", "Data visualization"],
    github: "https://github.com/ritvikreddygangula/stock-forecasting",
    scene: "forecast",
    sceneAlt: "A price line is drawn up to today, a window slides over the recent points, and a dashed forecast continues upward",
  },
];

export const skillCategories = [
  { title: "Languages", skills: ["Go", "Python", "Java", "C#", "TypeScript", "JavaScript", "SQL"] },
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

export const contact = {
  heading: "Get in touch",
  intro:
    "Hiring for backend or AI engineering, or working on evals and retrieval yourself? Email reaches me fastest.",
};
