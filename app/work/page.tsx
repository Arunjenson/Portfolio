import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import Footer from "@/components/Footer";
import { caseStudies } from "@/lib/case-studies";
import { work } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies on web performance and AI-agent tooling — Core Web Vitals across 3,500 pages, and the agents that removed the manual work behind it.",
  alternates: { canonical: "/work" },
};

export default function Work() {
  const upcoming = work.items.filter((i) => i.status === "writing");

  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-8">
      <Nav />

      <header className="pt-6 pb-12 sm:pb-16">
        <Reveal immediate>
          <p className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-emerald-600 dark:text-emerald-400 mb-5">
            Selected work
          </p>
          <h1
            className="font-display font-medium tracking-[-0.025em] leading-[1.06] max-w-[18ch] text-balance"
            style={{ fontSize: "clamp(1.9rem, 5.5vw, 2.6rem)" }}
          >
            Fewer slow pages, and less work to keep them that way.
          </h1>
        </Reveal>
      </header>

      <div className="space-y-4">
        {caseStudies.map((cs) => (
          <Reveal key={cs.slug}>
            <Spotlight className="group border border-stone-200 dark:border-stone-800 rounded-xl hover:border-emerald-600/50 dark:hover:border-emerald-400/50 transition-colors">
              <Link href={cs.href} className="block p-6 sm:p-7">
                <article>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                    <h2 className="font-display text-[19px] font-medium tracking-tight max-w-[30ch]">
                      {cs.title}
                    </h2>
                    <span className="font-mono text-[11px] text-stone-400 dark:text-stone-500 shrink-0">
                      {cs.meta}
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-stone-600 dark:text-stone-400 max-w-2xl mb-4">
                    {cs.blurb}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12.5px] text-emerald-600 dark:text-emerald-400">
                    {cs.metrics.map((m) => (
                      <span key={m.label}>
                        {m.was ? `${m.was} → ${m.value}` : m.value}{" "}
                        <span className="text-stone-400 dark:text-stone-500">
                          {m.label.split(" · ")[0].toLowerCase()}
                        </span>
                      </span>
                    ))}
                    <span className="ml-auto hidden sm:inline text-stone-400 dark:text-stone-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      read →
                    </span>
                  </div>
                </article>
              </Link>
            </Spotlight>
          </Reveal>
        ))}

        {upcoming.map((item) => (
          <Reveal key={item.title}>
            <div className="border border-dashed border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                <h2 className="font-display text-[19px] font-medium tracking-tight text-stone-500 dark:text-stone-400 max-w-[30ch]">
                  {item.title}
                </h2>
                <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 border border-amber-600/40 dark:border-amber-400/40 rounded-full px-2.5 py-0.5 shrink-0">
                  {item.status}
                </span>
              </div>
              <p className="text-[14.5px] leading-relaxed text-stone-500 dark:text-stone-500 max-w-2xl">
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Footer />
    </main>
  );
}
