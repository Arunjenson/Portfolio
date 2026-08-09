export const site = {
  name: "Arun Jenson",
  title: "Arun Jenson — Frontend Engineer",
  description:
    "Product engineer, frontend-rooted. Web performance, platform migrations, and AI-agent tooling.",
  location: "Chennai, IN / SurveySparrow",
  linkedin: "https://www.linkedin.com/in/arun-jenson-86b43a191/",
  email: "REPLACE@email.com",
  resume: "#",
};

/* soon: true renders a "soon" badge instead of a link */
export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Writing", soon: true },
  { label: "Speaking", soon: true },
  { label: "Contact", href: "#contact" },
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
      body: "Core Web Vitals, rendering strategy, and the measurement discipline to prove something actually moved — not just felt faster.",
    },
    {
      title: "Platform migrations",
      body: "Re-platforming at scale without breaking what already works. Rankings, traffic, and the team's trust all stay intact.",
    },
    {
      title: "AI-agent tooling",
      body: "MCP-based systems that let agents operate inside real production workflows — with permissions, audit trails, and an undo button.",
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
      title: "Cutting LCP 59% without touching the rankings",
      status: "writing",
      body: "A 1M-visitor marketing site was failing Core Web Vitals on mobile, and a redesign was off the table. What shipped instead was a re-architecture of the interaction path — selective hydration, transitions, and replacing a component library we'd outgrown.",
      metrics: ["LCP 2.9s → 1.2s", "INP 800ms → 280ms", "75% URLs passing"],
    },
    {
      title: "Deleting a manual workflow with an MCP server",
      status: "writing",
      body: "Every content change used to route through a human clicking through an admin panel. Now AI agents create, update, and audit content directly — role-based permissions enforced, every action revertible.",
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
  work: "View selected work",
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
