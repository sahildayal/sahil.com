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
    slug: "argus",
    title: "Argus",
    kicker: "Letting AI tools see the screen they're working on",
    year: "2026",
    category: "AI & Agents",
    featured: true,
    access: {
      kind: "public",
      repo: "https://github.com/sahildayal/argus",
    },
    stack: ["Python", "MCP Protocol", "Windows API", "uv", "GitHub Actions"],
    metrics: [
      { value: "6", label: "AI clients it registers with" },
      { value: "PyPI", label: "published as argus-screens" },
      { value: "MIT", label: "open source" },
    ],
    problem:
      "Coding agents are blind. You can describe a layout bug, paste an error, crop a screenshot and upload it \u2014 but the tool you are talking to cannot simply look at the monitor the problem is on. On a multi-monitor Windows desktop that gap is constant, and working around it is tedious.",
    approach: [
      "Built an MCP server, a CLI and a system-tray app over one capture core, so the same code answers an agent, a terminal and a hotkey.",
      "Made the targeting the hard part rather than the screenshot: a look() call skips the terminal or editor the agent is running inside and picks the window the person was actually using.",
      "Added offline OCR through the Windows OCR engine, so text can be read out of a capture without anything leaving the machine and without any API key existing.",
      "Shipped a small visual-regression kit \u2014 save a baseline, compare against it, wait for the screen to settle or for specific text to appear \u2014 which turns the same capture core into a test harness.",
      "Set the public default to prompting before every capture. You opt out of consent explicitly with a flag; you do not opt in. Someone's screen is not a resource to take quietly.",
      "Packaged it for real use: published to PyPI as argus-screens through Trusted Publishing, so no token is stored anywhere, with CI running on Windows.",
    ],
    outcome:
      "Installs with one command and registers itself with six different AI clients. The decision I would defend hardest is the consent default \u2014 a screenshot tool that is quiet by default is a surveillance tool, so the no-prompt setup is the exception I run locally rather than the shipped behaviour.",
  },
  {
    slug: "murmur",
    title: "Murmur",
    kicker: "Dictation that never leaves the machine",
    year: "2026",
    category: "Tools",
    featured: false,
    access: {
      kind: "closed",
      note: "Private while the rebrand settles \u2014 going public once the offline build is stable.",
    },
    stack: ["Rust", "Tauri v2", "Parakeet 0.6B", "Windows"],
    metrics: [
      { value: "0", label: "network calls at runtime" },
      { value: "CPU", label: "no GPU required" },
    ],
    problem:
      "I dictate all day through a commercial tool that sends audio to someone else's servers. I wanted the same hold-to-talk behaviour with nothing leaving the laptop, and I wanted it to survive being installed on a managed corporate machine with no admin rights.",
    approach: [
      "Started by proposing to reverse-engineer the tool I was replacing, then dropped the idea: its terms forbid decompiling, and it runs recognition in the cloud anyway, so the local binary had nothing to teach. The specification became its observable behaviour, which I know from using it every day.",
      "Forked Handy (MIT, Tauri v2, Rust) rather than starting from zero, and rebranded it, because Handy's own name and mark are not covered by that licence.",
      "Chose a single English model small enough to run on CPU, since the target machine may have no usable GPU.",
      "Built an offline profile that compiles the HTTP client and model downloader out of the binary entirely and removes the auto-updater, so there is no network path left to disable later.",
      "Designed for the worst case on a managed laptop: portable mode, no installer, no admin rights.",
    ],
    outcome:
      "Running locally as a daily driver. The binding constraint turned out to be organisational rather than technical \u2014 hold-to-talk needs a low-level keyboard hook, which is indistinguishable from a keylogger to an endpoint-security agent, so code signing and IT approval are the real shipping hurdles rather than the model.",
  },
  {
    slug: "mycourses-mcp",
    title: "myCourses MCP",
    kicker: "An API for a system that offers students none",
    year: "2026",
    category: "AI & Agents",
    featured: false,
    access: {
      kind: "public",
      repo: "https://github.com/sahildayal/mycourses-mcp",
    },
    stack: ["TypeScript", "MCP Protocol", "D2L Brightspace", "GitHub Actions"],
    problem:
      "Every assignment, deadline, grade and discussion thread at RIT lives in Brightspace, and none of it is reachable programmatically by the students it belongs to. Brightspace does have an OAuth API, but clients can only be registered by an administrator and there is no self-service path for a student.",
    approach: [
      "Authenticated the way the web interface itself does, rather than pretending an API key was obtainable: a captured session plus the CSRF token D2L requires on every non-GET request.",
      "Wrote the official OAuth path anyway and left it inert, so the day the university issues credentials it becomes a configuration change rather than a rewrite.",
      "Positioned it as any Brightspace instance with RIT as the default host, because the protocol is identical across every university running D2L.",
      "Opened it to contributors properly: MIT licence, CI running typecheck, build and a tool-listing smoke test, plus a contributing guide and issue templates.",
      "Squashed the history before publishing, to keep real course identifiers and local paths out of the commit record.",
    ],
    outcome:
      "Public, and usable by any student or faculty member on a Brightspace instance. The useful part was reading the authentication story honestly: the documented path was closed to me, and the confident-sounding answer would have been to suggest asking for an API key that nobody at my level can be granted.",
  },
  {
    slug: "fergie-time",
    title: "Fergie Time",
    kicker: "Formation as agent topology",
    year: "2026",
    category: "AI & Agents",
    featured: false,
    access: {
      kind: "public",
      repo: "https://github.com/sahildayal/fergie-time",
    },
    stack: ["TypeScript", "Node", "Claude Code", "git"],
    metrics: [{ value: "11", label: "agents on the pitch" }],
    problem:
      "Running several coding agents at once is a coordination problem more than a model problem. They need somewhere to see each other's work, a way to divide it, and someone to decide what actually gets merged.",
    approach: [
      "Forked munder-difflin (MIT) rather than rebuilding it, because it already ran real agent CLIs in real terminals coordinating through a git repository as shared state, which is the genuinely hard part.",
      "Registered a new theme against the extension seam the upstream maintainers had already shipped, so this stays an extension rather than a divergence that can never be merged back.",
      "Made the football metaphor load-bearing instead of decorative: the formation is the topology. Switching between 4-3-3, 4-2-3-1 and 3-5-2 changes how many agents land in each lane \u2014 gate, review, infrastructure, architecture, build.",
    ],
    outcome:
      "Runs locally with eleven agents and a manager deciding what ships. The idea worth keeping is the formation one: expressing parallelism as a shape people already understand turns out to be a good interface for deciding how much review capacity a task needs versus how much build capacity.",
  },
  {
    slug: "ucl-predictor",
    title: "UCL Predictor",
    kicker: "Odds-blind, and measuring what that costs",
    year: "2026",
    category: "Machine Learning",
    featured: false,
    live: true,
    access: {
      kind: "public",
      repo: "https://github.com/sahildayal/UCL_PREDICTOR",
    },
    stack: ["Python", "Scikit-Learn", "Pandas", "GitHub Pages", "GitHub Actions"],
    metrics: [{ value: "6", label: "competing model arms" }],
    problem:
      "The companion football work concluded that the betting market is extremely hard to beat. This asks the opposite question: how well can a competition be forecast using only what happened on the pitch, with the odds deliberately withheld from the model?",
    approach: [
      "Built it odds-blind on purpose. No market price is an input anywhere, so the result measures how much information the odds were actually carrying.",
      "Ran six arms against the 2026/27 Champions League league phase rather than one model, so differences between approaches stay visible instead of being averaged away.",
      "Published the dashboard from the repository itself, with a season scoreboard and a permanent archive page for every matchday, so past predictions cannot be quietly revised after results land.",
    ],
    outcome:
      "Live and updating through the league phase. The immutable per-matchday archive is the decision that matters most: a forecasting project that can edit its own history is not evidence of anything.",
  },
  {
    slug: "potluck",
    title: "Potluck",
    kicker: "A live app under one hard constraint: no credit card, ever",
    year: "2026",
    category: "Data & Backend",
    featured: false,
    live: true,
    access: {
      kind: "public",
      repo: "https://github.com/sahildayal/potluck",
    },
    stack: ["TypeScript", "Cloudflare Pages", "Render", "PostgreSQL", "Terraform", "Kubernetes"],
    metrics: [
      { value: "1,287", label: "recipes in the catalog" },
      { value: "$0", label: "running cost" },
    ],
    problem:
      "A recipe keeper my friends and I actually use, with one absolute constraint: no card details on any service at any point. That rules out most of the obvious cloud providers immediately, and turns what is normally a purchasing decision into the central design problem.",
    approach: [
      "Split the deployment by what each tier needed: the frontend on Cloudflare Pages where it stays warm for free, the API on a free tier that sleeps after fifteen minutes of silence, which is acceptable for this audience.",
      "Kept the repository public deliberately, because public repositories get unlimited CI minutes and the whole build design leans on that.",
      "Wrote the Kubernetes and Terraform for a self-hosted path, then chose not to provision it \u2014 the managed free tier shipped sooner, and infrastructure code loses nothing by waiting.",
      "Loaded a real catalog rather than seed data, so search, filtering and pagination were exercised against 1,287 records from the first day.",
    ],
    outcome:
      "Live and in use by the friend group it was built for, at no running cost. The constraint made it a better exercise than an unconstrained version would have been: every architectural choice had to be justified against a free tier's real limits rather than against a credit card.",
  },
  {
    slug: "football-forecasting",
    title: "Forecasting Against a Market That's Already Right",
    kicker: "Three years of trying to beat the line, and what happened when I measured it properly",
    year: "2025 \u2013 2026",
    category: "Machine Learning",
    featured: true,
    live: true,
    access: {
      kind: "public",
      repo: "https://github.com/sahildayal/EPL_LALIGA_PREDICTOR",
    },
    stack: ["Python", "Scikit-Learn", "XGBoost", "Dixon-Coles", "Pandas", "Kalshi API"],
    metrics: [
      { value: "16", label: "seasons of walk-forward CV" },
      { value: "0 of 32", label: "folds where a model beat the line" },
      { value: "0.00", label: "fitted model blend weight" },
      { value: "4", label: "paper arms running" },
    ],
    problem:
      "Football is the thing I would talk about for an hour unprompted, and predicting it is genuinely hard \u2014 the draw especially. I spent three years building models to beat the bookmakers, and eventually got far enough to test that ambition properly instead of assuming it.",
    approach: [
      "Started in 2025 with a binary home-win classifier over 2000\u20132019 Premier League data, with a betting simulation on top to check whether accuracy turned into anything real. It mostly did not, which was the point.",
      "Followed it with an academic comparison across six models and 25 seasons \u2014 logistic regression, SVM, Gaussian discriminant analysis, random forest, XGBoost and an MLP \u2014 asking whether ensembles actually beat calibrated baselines on the draw class.",
      "Then ran the test that settled it: walk-forward cross-validation across 16 seasons. No model beat the de-vigged sharp line in any of 32 fold-league combinations, and when I fitted a blend between my model and the market, the weight on my model converged to 0.00 in both leagues.",
      "Rebuilt the system around that result rather than arguing with it. The sharp consensus became the reference, and the model's job became finding where another venue's prices disagree with it.",
      "Ran four paper arms of $10,000 each with no reloads, including a model-only arm expected to lose \u2014 a control is worthless if you only run the arms you believe in.",
      "Deleted the order-placement path entirely rather than putting a flag in front of it, so no configuration mistake can turn any of this into real money.",
    ],
    outcome:
      "The honest finding is a negative one, and it is the most useful thing I have measured: a well-calibrated market had already priced in everything my features knew. Three years of work aimed at beating the line became evidence of how efficient the line is \u2014 which is exactly why the follow-up project withholds odds from the model entirely.",
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
