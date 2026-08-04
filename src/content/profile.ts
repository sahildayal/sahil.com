/**
 * Set to "/resume.pdf" once the file is dropped into public/. While it's null
 * the download link is hidden everywhere rather than shipping a dead link.
 */
export const resumeUrl: string | null = "/resume.pdf";

/** Headshot lives in public/. */
export const headshot = "/headshot.jpg";

export const profile = {
  name: "Sahil Dayal",
  initials: "SD",
  role: "Backend & AI engineer",
  location: "Rochester, NY",
  availability: "Open to full-time SWE — May 2027",

  email: "sd8804@rit.edu",
  linkedin: "https://www.linkedin.com/in/sahil-dayal",
  github: "https://github.com/sahildayal",

  // The split-flap board cycles these. Keep each side ≤ 22 chars so the
  // board doesn't reflow between messages.
  board: [
    { left: "ROCHESTER NY", right: "BASED" },
    { left: "BACKEND / AI", right: "BUILD" },
    { left: "27 COUNTRIES", right: "COOKED" },
    { left: "WORLD CUP 26", right: "WENT" },
    { left: "SWE MAY 2027", right: "OPEN" },
  ],

  tagline: "Backend engineer. AI tinkerer. Occasional chef.",

  intro:
    "I build the infrastructure other engineers depend on — pipelines, developer tooling, and agent systems that quietly make everyone else's job easier.",

  about: [
    "I'm a BS/MS Computer Science student at RIT, finishing my second co-op at Paychex. Most of what I've shipped there lives in the unglamorous middle of the stack: Go MCP tooling used by fifty-odd engineers, an eight-agent pipeline that turned a two-day migration into a thirty-minute one, a data access layer that redacts PHI before it ever reaches a model.",
    "I treat agents like distributed systems rather than prompts. Define state explicitly, route deterministically, checkpoint after every node, and gate every irreversible action. Prompt engineering is a last resort, not a design pattern — most agent failures I've debugged were state-management failures wearing a costume.",
    "Away from the keyboard I cook. Every week I pick a country and make something from it, and twenty-seven weeks in I've become genuinely competent at Moroccan tagine, Vietnamese pho, and Georgian khachapuri. Football is the other one — having the World Cup in the US this year was surreal. I also play piano and read more crime thrillers than I'll admit to.",
  ],

  education: {
    school: "Rochester Institute of Technology",
    degree: "BS/MS Computer Science — combined five-year program",
    graduation: "May 2027",
    gpa: "3.5 / 4.0",
    honors: "Dean's List — Fall '21, '23, '24, '25 · Spring '25",
    focus: "Artificial Intelligence / Machine Learning · Data Science",
    // Graduate-level AI/data coursework, all completed with an A.
    coursework: [
      { code: "CSCI 635", name: "Intro to Machine Learning" },
      { code: "CSCI 630", name: "Foundations of Artificial Intelligence" },
      { code: "CSCI 620", name: "Introduction to Big Data" },
      { code: "CSCI 642", name: "Secure Coding" },
      { code: "CSCI 251", name: "Concepts of Parallel & Distributed Systems" },
    ],
    // Fall 2026, in progress.
    current: [
      { code: "CSCI 720", name: "Big Data Analytics" },
      { code: "CSCI 723", name: "Advanced Databases: Graph Databases" },
      { code: "CSCI 621", name: "Database System Implementation" },
      { code: "CSCI 261", name: "Analysis of Algorithms" },
    ],
  },

  skills: [
    {
      group: "Languages",
      items: ["Go", "Python", "Java", "TypeScript", "C#", "SQL", "C++", "Bash"],
    },
    {
      group: "AI & agents",
      items: ["MCP Protocol", "LangGraph", "LangSmith", "PyTorch", "Scikit-Learn", "PySpark"],
    },
    {
      group: "Infrastructure",
      items: ["OpenShift", "Docker", "Jenkins", "OpenTelemetry", "Grafana Tempo", "Linux"],
    },
    {
      group: "Data",
      items: ["PostgreSQL", "MongoDB", "Oracle SQL", "SQL Server", "SQLite", "Apache Spark"],
    },
  ],

  certifications: [
    {
      name: "AI Engineer Agentic Track: Complete Agent & MCP Course",
      issuer: "Udemy",
      date: "May 2026",
      credential: "UC-a0f216e1-8d1e-4f66-b0a8-0d80e7c49d71",
    },
    {
      name: "LangGraph — Develop LLM Powered AI Agents",
      issuer: "Udemy",
      date: "May 2026",
      credential: "UC-fecc9237-f8fa-47a5-84b0-f37db15bc0b0",
    },
    {
      name: "Docker and Kubernetes: The Complete Guide",
      issuer: "Udemy",
      date: "Mar 2026",
      credential: "UC-f697d1d7-a5f3-421e-bcc3-1742ef0e1143",
    },
    {
      name: "The Complete SQL Bootcamp",
      issuer: "Udemy",
      date: "Mar 2026",
      credential: "UC-67ce5e8e-8352-4ecb-abf6-cbbd040ae50d",
    },
    {
      name: "Understanding APIs and RESTful APIs",
      issuer: "Udemy",
      date: "Mar 2026",
      credential: "UC-2c85cb07-e511-4675-a5bc-1f0310c7cba2",
    },
    {
      name: "Wireshark: Packet Analysis and Ethical Hacking",
      issuer: "Udemy",
      date: "Sep 2021",
      credential: "UC-104c6d8b-f3c6-45cd-8d98-b920356d289d",
    },
    {
      name: "Grade 5 Electronic Keyboards (Level 2 Certificate)",
      issuer: "Trinity College London",
      date: "—",
    },
  ],
} as const;
