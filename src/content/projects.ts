export type Category = "AI & Agents" | "Data & Backend" | "Machine Learning" | "Tools";

export type Access =
  | { kind: "public"; repo: string }
  | { kind: "soon"; repo: string; note: string }
  | { kind: "closed"; note: string };

export type Metric = { value: string; label: string };

export type Chapter = {
  year: string;
  name: string;
  repo?: string;
  what: string;
  learned: string;
};

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  year: string;
  category: Category;
  featured: boolean;
  live?: boolean;
  access: Access;
  stack: string[];
  metrics?: Metric[];
  problem: string;
  approach: string[];
  outcome: string;
  chapters?: Chapter[];
};

export const projects: Project[] = [
  {
    slug: "agentic-migration-pipeline",
    title: "8-Agent Migration Pipeline",
    kicker: "Turning a two-day migration into a thirty-minute one",
    year: "2026",
    category: "AI & Agents",
    featured: true,
    access: {
      kind: "closed",
      note: "Built at Paychex. Proprietary — described here, not published.",
    },
    stack: ["GitHub Copilot CLI", "MCP Protocol", "Jenkins", "OpenShift", "Bitbucket", "Jira"],
    metrics: [
      { value: "8", label: "agents in the pipeline" },
      { value: "8", label: "production microservices" },
      { value: "1–2 days → <30 min", label: "per-service migration time" },
    ],
    problem:
      "Every OpenShift liveness/readiness probe migration paired with OpenTelemetry adoption took one to two days of manual work per service. The steps were well understood and almost entirely mechanical — audit the config, write the change, push it through Jenkins, verify the deploy, instrument traces, verify the traces landed — but each one required a human to sit and watch the previous one finish.",
    approach: [
      "Split the lifecycle into eight phases and gave each one a dedicated agent with a narrow instruction set: orchestrator, implementer, deployer, status, PR reviewer, OTel implementer, OTel deployer, OTel status.",
      "Wired the agents to real systems over MCP rather than letting them guess — Jenkins for build state, OpenShift for deploy verification, Bitbucket for PRs, Jira for story tracking.",
      "Made the orchestrator route on observed state rather than on model output. An agent doesn't decide the deploy succeeded; it reads the deploy status and the router branches on that.",
      "Gated every irreversible action — PR creation, deployment — behind an explicit stop rather than an instruction asking the model to pause.",
    ],
    outcome:
      "Deployed across 8 production microservices. Per-service time dropped from 1–2 days to under 30 minutes, and the work became reviewable — each phase leaves a trace you can read after the fact instead of a single opaque prompt loop.",
  },
  {
    slug: "ai-pr-reviewer",
    title: "Multi-Specialist PR Review Bot",
    kicker: "Seven reviewers, each with one job",
    year: "2026",
    category: "AI & Agents",
    featured: true,
    access: {
      kind: "closed",
      note: "Built at Paychex. Proprietary — described here, not published.",
    },
    stack: ["GitHub Copilot CLI", "MCP Protocol", "Node.js", "OpenShift", "Bitbucket", "Jira"],
    metrics: [
      { value: "7", label: "specialist reviewers" },
      { value: "5", label: "declined PRs used as benchmarks" },
    ],
    problem:
      "Code review at scale is inconsistent — not because reviewers are careless, but because each one carries a different mental checklist. The reviewer who always catches missing error handling isn't necessarily the one who notices a security-sensitive URL config.",
    approach: [
      "Split review into seven specialists with focused instruction sets: architecture, security, data-loss, integration and idempotency, performance, testing, maintainability.",
      "Routed every PR through all seven rather than picking one, so coverage doesn't depend on which reviewer is free.",
      "Ranked findings by severity and posted them as structured Bitbucket comments, so the signal survives contact with a busy author.",
      "Pulled context from Jira and Confluence over MCP so a reviewer can reason about why a change exists, not just what it does.",
    ],
    outcome:
      "Validated against 5 real declined PRs mirrored as test cases — spanning Kafka/DLQ patterns, error handling, Ruby/Rails observability, security-sensitive URL configuration, and API gateway changes. Deployed on an OpenShift sandbox with a Recreate strategy and PVC durability hardening.",
  },
  {
    slug: "incident-triage",
    title: "Agentic Incident Triage",
    kicker: "Root-cause analysis with an evidence ledger",
    year: "2026",
    category: "AI & Agents",
    featured: false,
    access: {
      kind: "closed",
      note: "Built at Paychex. Proprietary — described here, not published.",
    },
    stack: ["Python", "GitHub Copilot CLI", "MCP Protocol", "Jira", "OpenShift"],
    problem:
      "Incident triage is slow and inconsistent. An engineer picks up an INC, manually cross-references Jira history looking for something similar, and rebuilds context that someone else already built six months ago.",
    approach: [
      "Extracted entities deterministically rather than asking a model to find them — services, error codes, timestamps — so the same incident always yields the same starting facts.",
      "Ranked candidate root causes and attached an evidence ledger to each, with source bundles pointing at what supported the claim.",
      "Matched against historical incidents to surface prior art.",
      "Started with headless-Chromium scraping of ServiceNow, then abandoned it — the scrape was brittle and the data was second-hand. Moved to Jira/PKAS as the authoritative source instead.",
    ],
    outcome:
      "Deployed on OpenShift for the Rebel Scrum team. The useful lesson was the pivot: the scraping prototype worked and still deserved to be thrown away, because a fragile path to the wrong source is worse than a slower path to the right one.",
  },
  {
    slug: "mcp-platform-tooling",
    title: "MCP Platform Tooling in Go",
    kicker: "Seven integrations and a data layer that redacts before it reads",
    year: "2026",
    category: "AI & Agents",
    featured: true,
    access: {
      kind: "closed",
      note: "Built at Paychex. Proprietary — described here, not published.",
    },
    stack: ["Go", "MCP Protocol", "OAuth 2.0", "Oracle", "SQL Server", "Grafana Tempo"],
    metrics: [
      { value: "7+", label: "MCP integrations shipped" },
      { value: "50+", label: "engineers using them" },
      { value: "128+", label: "unit tests on the data layer" },
      { value: "36+", label: "HIPAA-aligned redaction patterns" },
    ],
    problem:
      "An internal developer AI platform is only as useful as the systems it can actually reach. Ours could reason well and do very little — every integration an engineer wanted was a request that went nowhere.",
    approach: [
      "Shipped seven production MCP integrations in Go: Webex over OAuth 2.0, Oracle through a custom TNS resolver, SQL Server, Grafana Tempo, Confluence attachments, Bitbucket default reviewers, and Jira sprint management.",
      "Built a security-first data access layer in front of anything touching real data — PHI/PII redaction across 36+ HIPAA-aligned patterns, parameterized queries to close SQL injection, SELECT-only enforcement, and append-only audit logging.",
      "Tested the data layer against fully mocked infrastructure with 128+ unit tests, so the security guarantees hold under CI rather than under supervision.",
    ],
    outcome:
      "Adopted by 50+ engineers across the org. The redaction layer is the part I'd defend hardest: in a healthcare-adjacent company, the interesting question isn't whether a model can read the database, it's what it's structurally prevented from seeing.",
  },
  {
    slug: "openmusic",
    title: "OpenMusic",
    kicker: "106 million records, and the joins that wouldn't finish",
    year: "2025",
    category: "Data & Backend",
    featured: true,
    access: {
      kind: "closed",
      note: "Coursework — the repository is school-owned and can't be published.",
    },
    stack: ["PostgreSQL 15", "MongoDB 8.0", "Apache Spark", "PySpark", "Docker Compose", "Python"],
    metrics: [
      { value: "106M+", label: "records ingested" },
      { value: "25.2M", label: "tracks migrated" },
      { value: "9.11 min → O(1)", label: "query cost" },
    ],
    problem:
      "A relational music catalogue of 106M+ records where the queries people actually wanted to run were multi-table joins that took over nine minutes. The data model was correct and unusable.",
    approach: [
      "Built a containerized relational-to-document migration pipeline, ingesting from PostgreSQL 15 and writing into a read-optimized MongoDB 8.0 schema shaped around the read patterns rather than around normalization.",
      "Validated 25.2M tracks through the migration rather than trusting the source, because a fast query over wrong data is worse than a slow one.",
      "Hit Spark OOM failures doing frequent-itemset mining across 1.6M artist records. The cause was a global distributed self-join — every partition talking to every other partition.",
      "Replaced the self-join with localized PySpark map transformations, cutting network shuffle overhead and turning the job linear in the input size.",
    ],
    outcome:
      "Complex join queries collapsed from 9.11 minutes to O(1) index lookups. The Spark debugging was the more valuable half: the failure looked like a memory limit and was actually a data-movement problem, which is a shape of bug I've recognized several times since.",
  },
  {
    slug: "football-forecasting",
    title: "Predicting Football, Three Times",
    kicker: "Three years of being beaten by the draw",
    year: "2025 – 2026",
    category: "Machine Learning",
    featured: true,
    live: true,
    access: {
      kind: "public",
      repo: "https://github.com/sahildayal/EPL_LALIGA_PREDICTOR",
    },
    stack: ["Python", "Scikit-Learn", "XGBoost", "Pandas", "NumPy", "Kalshi API"],
    metrics: [
      { value: "25", label: "seasons of match data" },
      { value: "6", label: "models compared" },
      { value: "3", label: "attempts, so far" },
    ],
    problem:
      "Football is the sport I care most about and one of the harder things to predict, largely because of the draw. Home and away wins have signal you can find. Draws are where confident models go to be humbled — they're the minority class, and they look like whatever the model thinks a close match is.",
    approach: [
      "First attempt was a solo binary classifier — home win or not — over 2000–2019 Premier League data, with engineered form features and a betting simulation on top to check whether the accuracy translated into anything real. It mostly didn't, which was the point.",
      "Second was an academic comparison with a team of four: six models (logistic regression, SVM, Gaussian discriminant analysis, random forest, XGBoost, and an MLP) over 25 seasons, predicting full home/draw/away outcomes and scorelines. The question was whether ensembles actually beat well-calibrated simple baselines on the draw class.",
      "Third is the current one — extending to La Liga and the 2026 World Cup, with a Kalshi parlay engine attached.",
    ],
    outcome:
      "The through-line is calibration over accuracy. A model that's 55% accurate and honest about its confidence is more useful than one that's 58% accurate and certain about everything — which is exactly the lesson the betting simulation in attempt one taught me the expensive way.",
    chapters: [
      {
        year: "2025",
        name: "Premier League betting model",
        repo: "https://github.com/sahildayal/PremierLeagueMLProject",
        what: "Solo. Binary home-win classifier over 2000–2019 data, with form features and an ROI simulation.",
        learned: "Accuracy and profitability are different questions. Mine answered the former.",
      },
      {
        year: "2025",
        name: "Six-model comparison (CSCI 635)",
        what: "Team of four. Logistic regression, SVM, GDA, random forest, XGBoost, MLP over 25 seasons — full H/D/A and scoreline prediction.",
        learned: "Ensembles bought less over calibrated baselines than expected, especially on draws.",
      },
      {
        year: "2026",
        name: "World Cup predictor + Kalshi engine",
        repo: "https://github.com/sahildayal/EPL_LALIGA_PREDICTOR",
        what: "Current. EPL and La Liga extended to the 2026 World Cup, with a parlay engine on Kalshi markets.",
        learned: "Still in progress — the market is a much harsher grader than a test set.",
      },
    ],
  },
  {
    slug: "keylogger-detection",
    title: "Keylogger Detection via OS Telemetry",
    kicker: "Catching a process by how it behaves, not what it is",
    year: "2025",
    category: "Machine Learning",
    featured: true,
    access: {
      kind: "public",
      repo: "https://github.com/sahildayal/Keylogger_CSCI642",
    },
    stack: ["Python", "Scikit-Learn", "Psutil", "PyWin32", "Pynput", "Random Forest"],
    metrics: [
      { value: "17", label: "normalized process metrics" },
      { value: "86%", label: "accuracy on 15:1 imbalance" },
      { value: "≥90%", label: "confidence to auto-terminate" },
    ],
    problem:
      "Signature-based detection only catches keyloggers someone has already seen. I wanted to know whether a user-space keylogger gives itself away purely through how it uses the machine — no signatures, no file inspection.",
    approach: [
      "Sampled 17 normalized per-process metrics in real time: CPU, RSS and VMS memory, handle counts, thread counts, context switches, and I/O counters.",
      "Trained a 200-tree class-balanced random forest, because the dataset is 15:1 imbalanced and an unweighted model would happily call everything benign and score 94%.",
      "Set an autonomous termination threshold at ≥90% confidence — high enough that the cost of a false positive (killing a legitimate process) stays acceptable.",
      "Ranked feature importance by Gini impurity to check the model was learning behavior rather than an artifact of how I collected data.",
    ],
    outcome:
      "86% accuracy on the imbalanced set. `memory_rss`, `read_bytes`, `read_count`, and `num_handles` came out as the top signals — which makes sense: a keylogger's tell is a steady trickle of small reads and a handle it never lets go of.",
  },
  {
    slug: "everyday-todo",
    title: "Everyday",
    kicker: "A to-do app that lives where I already am",
    year: "2026",
    category: "Tools",
    featured: false,
    access: {
      kind: "soon",
      repo: "https://github.com/sahildayal/Everyday-Todo",
      note: "Going public shortly — pending a secrets audit.",
    },
    stack: ["TypeScript", "Next.js", "Telegram Bot API", "SQLite"],
    problem:
      "Every to-do app I've tried fails the same way: capture costs more than the task. If adding an item means opening an app, the item doesn't get added.",
    approach: [
      "Made the primary interface a Telegram bot, because it's the app already open on my phone — capture is one message, no context switch.",
      "Paired it with a web view for the things a chat interface is bad at: reordering, reviewing, and seeing the week at once.",
      "Scoped auth to a single owner rather than building multi-tenancy for a user base of one.",
    ],
    outcome:
      "In daily use. It's the smallest project here and the one I actually rely on, which is its own argument about scope.",
  },
  {
    slug: "magnus",
    title: "Magnus",
    kicker: "A personal assistant, rebuilt as I learned better",
    year: "2024 – 2026",
    category: "AI & Agents",
    featured: false,
    access: {
      kind: "public",
      repo: "https://github.com/sahildayal/Magnus",
    },
    stack: ["Python", "PowerShell", "Speech Recognition", "TTS"],
    problem:
      "I wanted a voice assistant that did what I actually needed rather than what a product manager decided everyone needed.",
    approach: [
      "The 2024 version was straightforward: GPT-3.5 for language, SpeechRecognition for input, gTTS for spoken replies, and a small web UI.",
      "The current version is a rebuild informed by everything the agent work at Paychex taught me — explicit state, real tool integrations, and a dev toolkit split out separately.",
    ],
    outcome:
      "Mostly interesting as a diff. The 2024 version and the 2026 version solve the same problem, and the distance between them is the clearest record I have of what two years changed.",
  },
  {
    slug: "hireme",
    title: "HireMe",
    kicker: "A job search pipeline that deliberately never applies",
    year: "2026",
    category: "Tools",
    featured: false,
    access: {
      kind: "closed",
      note: "Private — it's tuned to one person's job search, which is me.",
    },
    stack: ["Python", "GitHub Actions", "Claude", "ATS APIs"],
    metrics: [
      { value: "~18k", label: "postings pulled nightly" },
      { value: "98", label: "ATS boards polled" },
    ],
    problem:
      "Job searching as a student is a ranking problem disguised as a volume problem. There are thousands of postings, a handful are worth the effort, and finding those by hand is the whole cost.",
    approach: [
      "A nightly GitHub Actions job pulls ~18k postings from 98 public ATS endpoints, dedupes, prefilters, and ranks them with zero credentials involved.",
      "When I sit down, a local pass re-judges the top slice with actual reasoning and tailors my resume only where it demonstrably helps.",
      "It never applies to anything. No browser automation, no LinkedIn scraping, nothing that can submit a form on my behalf — I apply myself, with autofill.",
    ],
    outcome:
      "The constraint is the design. Auto-applying was the easiest feature to build and the one most likely to get an account restricted, produce slop, and waste a recruiter's time. Ranking is the part that was actually hard and actually helps.",
  },
  {
    slug: "federated-learning",
    title: "Federated Learning",
    kicker: "Training without the data ever leaving",
    year: "2025",
    category: "Machine Learning",
    featured: false,
    access: {
      kind: "closed",
      note: "Coursework — school-owned, not published.",
    },
    stack: ["Python", "PyTorch", "Differential Privacy"],
    problem:
      "Centralized training assumes you're allowed to collect the data. Often you aren't — which is the normal case in healthcare, not the exotic one.",
    approach: [
      "Implemented FedAvg across distributed nodes, where models train locally and only gradients are shared.",
      "Added differential privacy guarantees so the shared gradients don't leak the training examples that produced them.",
    ],
    outcome:
      "Reached convergence across distributed nodes with privacy guarantees intact. Small in scope, but it's the theory underneath the redaction work I later did in production.",
  },
];

export const categories: Category[] = [
  "AI & Agents",
  "Data & Backend",
  "Machine Learning",
  "Tools",
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
