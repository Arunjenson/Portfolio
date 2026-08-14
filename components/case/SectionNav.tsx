"use client";

import { useEffect, useState } from "react";
import { sections } from "@/lib/case-studies";

const ROW = 30; // px per row — the playhead offset is index * ROW, so keep rows fixed

/* Sticky monitoring rail on xl+, a closed <details> disclosure below it.
   One IntersectionObserver drives both — no scroll listeners, no layout reads.
   The rail is a trace: a hairline that fills to the current section, with a
   playhead that travels down it. Transform and opacity only. */
export default function SectionNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const i = sections.findIndex((s) => seen.get(s.id));
        if (i >= 0) setActive(i);
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const total = sections.length;
  const trackH = total * ROW;

  return (
    <>
      {/* ---------- xl+ : the trace rail ---------- */}
      <nav
        aria-label="Sections"
        className="hidden xl:flex sticky top-0 h-screen flex-col justify-center"
      >
        <p className="font-mono font-medium text-[10.5px] uppercase tracking-[0.12em] text-stone-500 dark:text-stone-400 mb-5 pl-[19px]">
          On this page
        </p>

        <div className="relative" style={{ height: trackH }}>
          {/* the unread track */}
          <span
            aria-hidden="true"
            className="absolute left-[3.5px] top-[15px] bottom-[15px] w-px bg-stone-200 dark:bg-stone-800"
          />
          {/* the read portion, filling downward */}
          <span
            aria-hidden="true"
            className="absolute left-[3.5px] top-[15px] w-px origin-top bg-emerald-600 dark:bg-emerald-400 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,0.7,0.2,1)] motion-reduce:transition-none"
            style={{
              height: trackH - 30,
              transform: `scaleY(${active / Math.max(total - 1, 1)})`,
            }}
          />
          {/* the playhead */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-[11px] w-2 h-2 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,0.7,0.2,1)] motion-reduce:transition-none"
            style={{ transform: `translateY(${active * ROW}px)` }}
          >
            <span className="absolute inset-0 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            <span className="absolute inset-0 rounded-full bg-emerald-500 dark:bg-emerald-400 rail-pulse" />
          </span>

          {sections.map((s, i) => {
            const isActive = i === active;
            const read = i < active;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={isActive ? "true" : undefined}
                style={{ height: ROW }}
                className={`group relative flex items-center gap-2.5 pl-[19px] rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400 ${
                  isActive
                    ? "text-stone-900 dark:text-stone-50"
                    : read
                      ? "text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100"
                      : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
              >
                {/* tick on the scale — hidden under the playhead when active */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[2px] w-[3px] h-[3px] rounded-full transition-colors duration-300 ${
                    read
                      ? "bg-emerald-600/50 dark:bg-emerald-400/50"
                      : "bg-stone-300 dark:bg-stone-700"
                  } ${isActive ? "opacity-0" : "opacity-100"}`}
                />
                <span
                  className={`font-mono text-[13px] tracking-tight transition-transform duration-[450ms] ease-[cubic-bezier(0.22,0.7,0.2,1)] motion-reduce:transition-none ${
                    isActive ? "font-semibold translate-x-[7px]" : "font-medium translate-x-0"
                  }`}
                >
                  {s.label}
                </span>
              </a>
            );
          })}
        </div>

        <p className="font-mono font-medium text-[11px] tabular-nums text-stone-500 dark:text-stone-400 mt-5 pl-[19px]">
          <span className="text-emerald-600 dark:text-emerald-400">
            {sections[active].num}
          </span>
          {" / "}
          {total}
        </p>
      </nav>

      {/* ---------- below xl : closed disclosure ---------- */}
      <details className="xl:hidden mb-10 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
        <summary className="cursor-pointer list-none px-4 py-3 font-mono font-medium text-[12px] uppercase tracking-[0.09em] text-stone-600 dark:text-stone-300 flex items-center justify-between gap-3 outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400">
          Contents
          <span aria-hidden="true" className="text-stone-400 dark:text-stone-500">
            {total}
          </span>
        </summary>
        <div className="px-4 pb-4 pt-1 border-t border-stone-200 dark:border-stone-800 grid sm:grid-cols-2 gap-x-6">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={i === active ? "true" : undefined}
              className={`flex items-center gap-3 py-1.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400 ${
                i === active
                  ? "text-stone-900 dark:text-stone-50 font-semibold"
                  : "text-stone-600 dark:text-stone-300 font-medium"
              }`}
            >
              <span className="font-mono text-[10.5px] tabular-nums text-stone-400 dark:text-stone-500">
                {s.num}
              </span>
              <span className="font-mono text-[13px]">{s.label}</span>
            </a>
          ))}
        </div>
      </details>
    </>
  );
}
