/* Static building blocks for the case study body. Server components — no JS shipped.
   Anything that needs the client (Figure, SectionNav) lives in its own file. */

import Reveal from "@/components/Reveal";
import { sections } from "@/lib/case-studies";

/* ---- section heading — the skim anchor. Numbered because the story is a sequence. ---- */
export function Section({
  id,
  children,
}: {
  id: (typeof sections)[number]["id"];
  children: React.ReactNode;
}) {
  const s = sections.find((x) => x.id === id)!;
  return (
    <section id={id} className="scroll-mt-24 mt-16 sm:mt-20 first:mt-0">
      <Reveal>
        <div className="flex items-baseline gap-4 mb-6">
          <span className="font-mono text-[12px] text-emerald-600 dark:text-emerald-400 shrink-0">
            {s.num}
          </span>
          <h2 className="font-display text-[23px] sm:text-[26px] font-medium tracking-tight leading-[1.25] text-balance">
            {s.title}
          </h2>
        </div>
      </Reveal>
      {children}
    </section>
  );
}

/* ---- body copy ---- */
export function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[17px] leading-[1.72] text-stone-600 dark:text-stone-400 mb-5">
      {children}
    </p>
  );
}

/* emphasis inside body copy, so bold reads as ink rather than heavier muted grey */
export function B({ children }: { children: React.ReactNode }) {
  return (
    <strong className="font-semibold text-stone-900 dark:text-stone-100">
      {children}
    </strong>
  );
}

/* ---- bold lead-ins from the source, promoted to real sub-anchors ---- */
export function SubAnchor({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-[17px] font-medium tracking-tight mt-10 mb-3 flex items-center gap-3">
      <span
        aria-hidden="true"
        className="w-4 h-px bg-emerald-600/60 dark:bg-emerald-400/60 shrink-0"
      />
      {children}
    </h3>
  );
}

/* ---- at-a-glance lede ---- */
export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <div className="border-l-2 border-emerald-600 dark:border-emerald-400 pl-5 mb-12">
        <p className="font-mono text-[11.5px] uppercase tracking-[0.1em] text-emerald-600 dark:text-emerald-400 mb-2.5">
          At a glance
        </p>
        <p className="text-[17.5px] leading-[1.7] text-stone-800 dark:text-stone-200">
          {children}
        </p>
      </div>
    </Reveal>
  );
}

/* ---- pull quote — the skimmer's reward. Used 4× on the page, no more. ---- */
export function PullQuote({
  children,
  tone = "emerald",
}: {
  children: React.ReactNode;
  tone?: "emerald" | "amber";
}) {
  return (
    <Reveal>
      <p
        className={`font-display text-[21px] sm:text-[25px] font-medium tracking-tight leading-[1.35] text-balance my-12 pl-5 border-l-2 ${
          tone === "amber"
            ? "border-amber-600 dark:border-amber-400"
            : "border-emerald-600 dark:border-emerald-400"
        }`}
      >
        {children}
      </p>
    </Reveal>
  );
}

/* ---- readout panel — the same instrument as the homepage hero ---- */
export function Readout({
  items,
}: {
  items: { label: string; value: string; was?: string; note?: string }[];
}) {
  return (
    <dl className="grid grid-cols-1 sm:grid-cols-3 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden bg-white/60 dark:bg-stone-900/40">
      {items.map((m) => (
        <div
          key={m.label}
          className="p-5 border-t sm:border-t-0 sm:border-l first:border-t-0 sm:first:border-l-0 border-stone-200 dark:border-stone-800"
        >
          <dt className="font-mono text-[10.5px] uppercase tracking-[0.09em] text-stone-400 dark:text-stone-500 mb-2.5">
            {m.label}
          </dt>
          <dd className="font-mono text-[21px] text-emerald-600 dark:text-emerald-400 leading-none">
            {m.was && (
              <>
                <span className="text-stone-400 dark:text-stone-600 line-through decoration-1">
                  {m.was}
                </span>
                <span className="text-stone-400 dark:text-stone-600 mx-1.5">→</span>
              </>
            )}
            {m.value}
          </dd>
          {m.note && (
            <p className="font-mono text-[10.5px] text-stone-400 dark:text-stone-500 mt-2.5">
              {m.note}
            </p>
          )}
        </div>
      ))}
    </dl>
  );
}

/* ---- before/after bars. scaleX only — no width animation on a page about CLS. ---- */
export function MetricBar({
  caption,
  note,
  rows,
}: {
  caption: string;
  note?: string;
  rows: { tag: string; value: string; pct: number; tone?: "bad" | "good" | "flat" }[];
}) {
  const fill = {
    bad: "bg-red-500/80 dark:bg-red-400/80",
    good: "bg-emerald-600 dark:bg-emerald-400",
    flat: "bg-stone-300 dark:bg-stone-700",
  };
  return (
    <Reveal className="my-8">
      <figure className="border border-stone-200 dark:border-stone-800 rounded-xl p-5">
        <figcaption className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.07em] text-stone-400 dark:text-stone-500 mb-4">
          <span>{caption}</span>
          {note && <span>{note}</span>}
        </figcaption>
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.tag} className="flex items-center gap-3 font-mono text-[11.5px]">
              <span className="w-[68px] shrink-0 text-stone-400 dark:text-stone-500">
                {r.tag}
              </span>
              <span className="flex-1 h-2 rounded-full bg-stone-100 dark:bg-stone-900 overflow-hidden">
                <span
                  className={`block h-full rounded-full origin-left ${
                    fill[r.tone ?? "flat"]
                  }`}
                  style={{ transform: `scaleX(${r.pct / 100})` }}
                />
              </span>
              <span
                className={`w-[58px] shrink-0 text-right ${
                  r.tone === "good"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-stone-500 dark:text-stone-400"
                }`}
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>
      </figure>
    </Reveal>
  );
}

/* ---- a number lifted out of a sentence ---- */
export function Stat({
  values,
  children,
}: {
  values: string[];
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-y border-stone-200 dark:border-stone-800 py-5 my-8">
        {values.map((v) => (
          <span
            key={v}
            className="font-mono text-[27px] tracking-tight text-amber-600 dark:text-amber-400"
          >
            {v}
          </span>
        ))}
        <span className="text-[14px] leading-relaxed text-stone-500 dark:text-stone-400 max-w-[34ch]">
          {children}
        </span>
      </div>
    </Reveal>
  );
}

/* ---- aside. amber = something I got wrong; quiet = a call that ran against the grain. ---- */
export function Aside({
  label,
  tone = "amber",
  children,
}: {
  label: string;
  tone?: "amber" | "quiet";
  children: React.ReactNode;
}) {
  const amber = tone === "amber";
  return (
    <Reveal className="my-9">
      <aside
        className={`rounded-xl border border-l-2 p-5 sm:p-6 ${
          amber
            ? "border-amber-600/40 dark:border-amber-400/40 border-l-amber-600 dark:border-l-amber-400 bg-amber-500/[0.06]"
            : "border-stone-200 dark:border-stone-800 border-l-stone-400 dark:border-l-stone-600 bg-stone-100/60 dark:bg-stone-900/50"
        }`}
      >
        <p
          className={`font-mono text-[10.5px] uppercase tracking-[0.09em] mb-3 ${
            amber
              ? "text-amber-600 dark:text-amber-400"
              : "text-stone-500 dark:text-stone-400"
          }`}
        >
          {label}
        </p>
        <div className="[&>p]:text-[16px] [&>p]:leading-[1.7] [&>p]:text-stone-700 dark:[&>p]:text-stone-300 [&>p]:mb-4 [&>p:last-child]:mb-0">
          {children}
        </div>
      </aside>
    </Reveal>
  );
}
