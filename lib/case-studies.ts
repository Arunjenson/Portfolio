/* Case-study frontmatter, shared by the page, /work, generateMetadata and the OG image. */

export type CaseStudy = {
  slug: string;
  title: string;
  /* title split for the hero and OG image, so the turn lands on its own line */
  titleLines: [string, string];
  subtitle: string;
  blurb: string;
  role: string;
  company: string;
  date: string;
  meta: string;
  readingTime: string;
  description: string;
  metrics: { label: string; value: string; was?: string; note?: string }[];
  href: string;
};

export const coreWebVitals: CaseStudy = {
  slug: "core-web-vitals",
  title: "We got desktop green. Then mobile refused to move.",
  titleLines: ["We got desktop green.", "Then mobile refused to move."],
  subtitle:
    "Two years of Core Web Vitals across 3,500 pages — first as one of the engineers, then leading it",
  blurb:
    "Two years of Core Web Vitals across 3,500 pages — first as one of the engineers, then leading it.",
  role: "Core Web Vitals 2024–present · contributor, then lead from 2025",
  company: "SurveySparrow",
  date: "2026-08",
  meta: "2024–present · Performance",
  readingTime: "8 min read",
  description:
    "Two years of Core Web Vitals across 3,500 pages. LCP, INP, CLS and blocking time — 900+ URLs moved from failing to passing and 75% into the passing range on mobile.",
  metrics: [
    { label: "URLs failing → passing", value: "900+", note: "mobile, first wave" },
    { label: "Homepage INP", value: "162ms", was: "350ms+", note: "field data" },
    {
      label: "Demo flow INP",
      value: "280ms",
      was: "800ms",
      note: "at 20× CPU throttling",
    },
    {
      label: "Blog INP · 1,500 posts",
      value: "149ms",
      note: "hardest surface, first module green",
    },
  ],
  href: "/work/core-web-vitals",
};

export const caseStudies: CaseStudy[] = [coreWebVitals];

/* H2s in order — the sticky rail, the mobile Contents disclosure and the headings
   all read from this, so they can never drift apart. */
export const sections = [
  { id: "first-lesson", label: "The first lesson", num: "01", title: "The first thing I learned was that a performance feature can be the performance problem" },
  { id: "mobile", label: "Mobile is the target", num: "02", title: "Mobile is the only target that counts" },
  { id: "lcp", label: "LCP", num: "03", title: "LCP: no single fix, about a dozen" },
  { id: "blocking-time", label: "Blocking time", num: "04", title: "Blocking time: the cheapest win nobody had taken" },
  { id: "inp", label: "INP", num: "05", title: "INP: the metric you can’t test from your own machine" },
  { id: "blog", label: "Blog", num: "06", title: "Blog: the hardest surface, and the fastest feedback loop" },
  { id: "cls", label: "CLS", num: "07", title: "CLS: mostly textbook, one good lesson" },
  { id: "making-it-stick", label: "Making it stick", num: "08", title: "Making it stick" },
  { id: "what-it-cost", label: "What it cost", num: "09", title: "What it cost" },
  { id: "where-it-landed", label: "Where it landed", num: "10", title: "Where it landed" },
] as const;
