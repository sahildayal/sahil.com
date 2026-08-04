export type Role = {
  id: string;
  company: string;
  title: string;
  team?: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  headline: string;
  bullets: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    id: "paychex-2026",
    company: "Paychex, Inc.",
    title: "Software Engineering Co-op",
    team: "Python Rocks",
    location: "Rochester, NY",
    start: "Jan 2026",
    end: "Aug 2026",
    current: true,
    headline: "Agentic AI pipelines and developer tooling at Fortune 500 scale",
    bullets: [
      "Designed an 8-agent pipeline (GitHub Copilot CLI + MCP) automating the full OpenShift liveness/readiness probe migration and OpenTelemetry adoption lifecycle — cutting per-service time from 1–2 days to under 30 minutes across 8 production microservices.",
      "Built a multi-specialist AI PR review bot integrating Bitbucket, Jira, and Confluence over MCP — routes each PR through 7 specialist reviewers and posts severity-ranked findings. Validated against 5 benchmarked real-world declined PRs.",
      "Built an agentic incident triage system with deterministic entity extraction, ranked root-cause analysis over an evidence ledger, and historical incident similarity matching using Jira as source of truth.",
      "Extended an internal developer AI platform with 7+ production MCP integrations in Go — Webex (OAuth 2.0), Oracle via a custom TNS resolver, SQL Server, Grafana Tempo, Confluence attachments, Bitbucket reviewers, Jira sprints. Adopted by 50+ engineers.",
      "Engineered a security-first data access layer: PHI/PII redaction across 36+ HIPAA-aligned patterns, parameterized SQL injection prevention, SELECT-only enforcement, and append-only audit logging — validated with 128+ unit tests over fully mocked infrastructure.",
      "Served as Scrum Master for the intern team — ran standups, managed the Jira board, tracked sprint velocity.",
    ],
    stack: [
      "Go",
      "Python",
      "MCP Protocol",
      "LangGraph",
      "LangSmith",
      "OpenShift",
      "Jenkins",
      "Oracle SQL",
      "OpenTelemetry",
      "Docker",
    ],
  },
  {
    id: "shaksy-2025",
    company: "Shaksy Engineering Services",
    title: "Security Analyst",
    location: "Muscat, Oman",
    start: "Jun 2025",
    end: "Aug 2025",
    headline: "Network diagnostics and infrastructure automation",
    bullets: [
      "Automated infrastructure monitoring with Python and SQL pipelines.",
      "Diagnosed network connectivity issues with Wireshark and Nmap on Linux, improving system visibility and documenting bottlenecks for senior engineers.",
    ],
    stack: ["Python", "SQL", "Wireshark", "Nmap", "Linux"],
  },
  {
    id: "paychex-2024",
    company: "Paychex, Inc.",
    title: "Software Engineering Co-op",
    team: "Rebel Scrum",
    location: "Rochester, NY",
    start: "Jan 2024",
    end: "May 2024",
    headline: "Backend optimization for payroll systems serving millions",
    bullets: [
      "Diagnosed and optimized Pro*C and SQL query performance across 4+ backend services, reducing runtime errors by 35% on a high-volume payroll platform.",
      "Authored 20+ automated unit and integration tests wired into CI/CD pipelines, improving release confidence and reducing regression risk.",
    ],
    stack: ["Pro*C", "SQL", "Oracle", "Jenkins", "CI/CD"],
  },
];

/** Agentic design rules, pulled out because they're the most senior thing here. */
export const agenticPrinciples = [
  {
    pattern: "Typed AgentState over freeform dict",
    why: "Type safety; no silent key drift between nodes.",
  },
  {
    pattern: "Conditional routing edges over prompt-based routing",
    why: "Deterministic, testable, debuggable — routing is code, not vibes.",
  },
  {
    pattern: "interrupt_before() gates over instructional pauses",
    why: "A hard stop before irreversible actions, not a polite request.",
  },
  {
    pattern: "SQLite checkpointing after every node",
    why: "Crash-resumable. No lost work mid-story.",
  },
  {
    pattern: "LangSmith trace observability",
    why: "Full visibility into every decision the model made.",
  },
  {
    pattern: "Thread-ID per Jira key",
    why: "State continuity across sessions, scoped to the unit of work.",
  },
];
