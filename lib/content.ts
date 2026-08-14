export const site = {
  name: "Arun Jenson",
  title: "Arun Jenson — Product Engineer | Performance & AI Tooling",
  description:
    "Product engineer building AI-agent tooling and fast web platforms. Cut LCP 59%, migrated 3,500+ pages to Next.js. Based in Chennai.",
  url: "https://arunjenson.vercel.app", // canonical + OG base
  location: "Chennai, IN / ",
  company: "SurveySparrow",
  companyUrl: "https://surveysparrow.com/",
  linkedin: "https://www.linkedin.com/in/arun-jenson-86b43a191/",
  email: "arunjensondev@gmail.com",
  resume: "#",
};

/* soon: true renders a "soon" badge instead of a link */
export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Writing", soon: true },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  headline: [
    { text: "I make slow things", accent: false },
    { text: "fast,", accent: true },
    { text: "and manual things", accent: false },
    { text: "disappear.", accent: true },
  ],
  blurb:
    "Product engineer, frontend-rooted. I work on web performance, platform migrations, and the AI-agent tooling that quietly deletes people's busywork. Currently at SurveySparrow, where I've led a 4-person frontend team through most of it.",
  buttons: [
    { label: "See the work", href: "#work", primary: true },
    { label: "Get in touch", href: "#contact", primary: false },
  ],
  portrait: { src: "/images/profile.avif", alt: "Arun Jenson" },
};

export const focusAreas = {
  num: "01",
  title: "What I actually do",
  items: [
    {
      title: "Web performance",
      body: "Core Web Vitals on real devices, not on my laptop. Bundle weight, rendering paths, and the patience to prove a fix landed in field data.",
    },
    {
      title: "Platform migrations",
      body: "Re-platforming at scale without breaking what already works. Rankings, traffic, and the team's trust all stay intact.",
    },
    {
      title: "AI-agent tooling",
      body: "MCP servers and coding agents that remove categories of work — content ops, CSS splitting, code review — rather than making the same work marginally faster.",
    },
  ],
};

export const ticker = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MCP",
  "Strapi",
  "GSAP",
  "Core Web Vitals",
  "New Relic",
  "Grafana",
];

export const work = {
  num: "02",
  title: "Selected work",
  items: [
    {
      slug: "core-web-vitals",
      title: "We got desktop green. Then mobile refused to move.",
      status: "read",
      href: "/work/core-web-vitals",
      body: "Two years of Core Web Vitals across 3,500 pages — first as one of the engineers, then leading it. Mobile is the strictly harder constraint, so it became the only thing we measured against. LCP, INP, CLS and the blocking time underneath them.",
      metrics: [
        "900+ URLs failing → passing",
        "homepage INP 350ms+ → 162ms",
        "blog INP 149ms",
      ],
    },
    {
      slug: "agent-tooling",
      title: "Deleting work instead of doing it faster",
      status: "writing",
      href: null,
      body: "An MCP server so marketing operates the CMS through agents instead of an admin panel. An agent that traces a route's imports and rewrites its Tailwind config. A review agent that reads the diff. Each one removes a category of manual work rather than speeding it up.",
      metrics: ["RBAC-enforced", "full audit + revert", "rolling out now"],
    },
  ],
};

export const recognition = {
  num: "03",
  title: "Recognition",
  items: [
    {
      title: "Cruising and Crushing It",
      date: "Mar 2026",
      body: "For the Core Web Vitals push that moved every URL into the green — a cross-team effort where performance stopped being a ticket and became a standard.",
      image: "/images/award-cruising.jpg",
    },
    {
      title: "Silent Soldier",
      date: "Nov 2023",
      body: "For consistent delivery in my first year on the team — the unglamorous work that keeps a platform standing while everything else ships on top of it.",
      image: "/images/award-silent-soldier.jpg",
    },
  ],
};

export const footer = {
  heading: "Let's talk performance.",
  body: "Frontend architecture, web performance, or AI-agent tooling — always up for the conversation.",
  hint: ["psst — try typing ", "slow", ", or hit ⌘K"],
  links: [
    { label: "LinkedIn", href: site.linkedin, external: true },
    { label: "Email", href: `mailto:${site.email}`, external: false },
    { label: "Résumé", href: site.resume, external: false },
  ],
};

export const commands = {
  work: "View all work",
  caseStudy: "Read: Core Web Vitals case study",
  writing: "Writing (soon)",
  contact: "Get in touch",
  linkedin: "Open LinkedIn",
  theme: "Toggle theme",
  slow: "Make this site slow (you asked)",
  turbo: "Turbo mode",
};

export const toasts = {
  degrading: "loading… slowly…",
  degraded: "that's what 2.9 seconds felt like. you're welcome.",
  degradedReduced: "that's what 2.9 seconds felt like.",
  fast: "already am. ⚡",
  turboOn: "turbo mode. fps counter live.",
  turboOff: "back to normal.",
  burst: "all URLs green. ✓",
};
