import Link from "next/link";
import Reveal from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import SectionHeading from "@/components/SectionHeading";
import { work } from "@/lib/content";

const FLAME_BARS = [
  ["h-3", "h-4", "h-2", "h-4", "h-2.5", "h-3.5"],
  ["h-2", "h-4", "h-3", "h-4", "h-2", "h-3.5"],
];

export default function Work() {
  return (
    <section id="work" className="mb-20 sm:mb-24 scroll-mt-8">
      <SectionHeading num={work.num} title={work.title} href="/work" />
      <div className="space-y-4">
        {work.items.map((item, idx) => (
          <Reveal key={item.title}>
            <Spotlight className="group border border-stone-200 dark:border-stone-800 rounded-xl p-6 sm:p-7 hover:border-emerald-600/50 dark:hover:border-emerald-400/50 transition-colors">
              <article className="relative">
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
                  <h3 className="font-display text-[19px] font-medium tracking-tight">
                    {item.href ? (
                      <Link href={item.href} className="after:absolute after:inset-0">
                        {item.title}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <span
                    className={`font-mono text-[11px] rounded-full px-2.5 py-0.5 border ${
                      item.href
                        ? "text-emerald-600 dark:text-emerald-400 border-emerald-600/40 dark:border-emerald-400/40"
                        : "text-amber-600 dark:text-amber-400 border-amber-600/40 dark:border-amber-400/40"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-[14.5px] leading-relaxed text-stone-600 dark:text-stone-400 max-w-2xl mb-4">
                  {item.body}
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12.5px] text-emerald-600 dark:text-emerald-400">
                  {item.metrics.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                  <span
                    aria-hidden="true"
                    className="hidden sm:flex items-end gap-[3px] h-4 ml-auto opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  >
                    {FLAME_BARS[idx % FLAME_BARS.length].map((h, i) => (
                      <span
                        key={i}
                        className={`animate-flame origin-bottom w-[3px] ${h} bg-emerald-500/70`}
                        style={{ animationDelay: `${i * 0.12}s` }}
                      />
                    ))}
                  </span>
                </div>
              </article>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
