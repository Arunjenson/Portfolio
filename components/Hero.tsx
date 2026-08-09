"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import SplitText from "@/components/SplitText";
import Reveal from "@/components/Reveal";
import { useUI } from "@/components/UIProvider";
import { hero, site } from "@/lib/content";

/* [y, width, amber?] — request rows of a waterfall chart */
const WATERFALL_ROWS: [number, number, boolean][] = [
  [0, 120, true],
  [14, 70, false],
  [26, 52, false],
  [38, 96, true],
  [50, 40, false],
  [62, 64, false],
  [74, 30, false],
];

function Waterfall() {
  const ref = useRef<SVGSVGElement>(null);
  const { reducedMotion } = useUI();

  useLayoutEffect(() => {
    if (reducedMotion || !ref.current) return;
    const tweens = Array.from(ref.current.querySelectorAll("rect")).map(
      (r, i) =>
        gsap.fromTo(
          r,
          { attr: { width: 0 } },
          {
            attr: { width: +(r.dataset.w || 0) },
            duration: 1.1,
            delay: 0.5 + i * 0.09,
            ease: "power2.out",
          }
        )
    );
    return () => tweens.forEach((t) => t.kill());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg
      ref={ref}
      className="hidden md:block absolute -top-14 -left-8 w-[118%] h-32 opacity-70 pointer-events-none"
      viewBox="0 0 300 90"
      aria-hidden="true"
    >
      {WATERFALL_ROWS.map(([y, w, amber], i) => (
        <rect
          key={i}
          x="0"
          y={y * 0.8 + 4}
          width={w}
          data-w={w}
          height="6"
          rx="3"
          className={amber ? "fill-amber-500/50" : "fill-emerald-500/50"}
        />
      ))}
    </svg>
  );
}

function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
      {failed ? (
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 text-stone-400 dark:text-stone-600">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span className="font-mono text-[11px]">{hero.portrait.src}</span>
        </div>
      ) : (
        <Image
          src={hero.portrait.src}
          alt={hero.portrait.alt}
          fill
          preload
          sizes="(max-width: 768px) 280px, 33vw"
          className="object-cover grayscale-[15%] transition-all duration-500 hover:grayscale-0 hover:scale-[1.03]"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default function Hero() {
  // continue the char stagger across lines like a single sequence
  let charCount = 0;

  return (
    <header className="grid md:grid-cols-[1.45fr_1fr] gap-10 md:gap-14 items-end pt-8 md:pt-14 pb-8">
      <div className="order-2 md:order-1">
        <Reveal immediate delay={0.45}>
          <p className="font-mono text-[12px] text-emerald-600 dark:text-emerald-400 mb-6">
            {site.location}
          </p>
        </Reveal>

        <h1
          className="font-display leading-[1.04] tracking-[-0.025em] font-medium mb-7"
          style={{ fontSize: "clamp(2rem, 8vw, 3.25rem)" }}
        >
          {hero.headline.map((line) => {
            const delay = charCount * 0.012;
            charCount += line.text.length;
            return (
              <SplitText
                key={line.text}
                text={line.text}
                delay={delay}
                className={`block ${
                  line.accent ? "text-emerald-600 dark:text-emerald-400" : ""
                }`}
              />
            );
          })}
        </h1>

        <Reveal immediate delay={0.54}>
          <p className="text-[16.5px] leading-relaxed text-stone-600 dark:text-stone-400 max-w-md mb-8">
            {hero.blurb}
          </p>
        </Reveal>

        <Reveal immediate delay={0.63} className="flex flex-wrap gap-3">
          {hero.buttons.map((b) => (
            <a
              key={b.label}
              href={b.href}
              className={`magnet font-medium text-[14px] px-5 py-3 rounded-lg ${
                b.primary
                  ? "bg-emerald-600 dark:bg-emerald-400 text-white dark:text-stone-950"
                  : "border border-stone-300 dark:border-stone-700 hover:border-emerald-600 dark:hover:border-emerald-400 transition-colors"
              }`}
            >
              {b.label}
            </a>
          ))}
        </Reveal>
      </div>

      <Reveal
        immediate
        delay={0.72}
        className="order-1 md:order-2 relative md:-mb-6 w-full max-w-[280px] md:max-w-none mx-auto md:mx-0"
      >
        <Waterfall />
        <div className="absolute -inset-3 border border-emerald-600/25 dark:border-emerald-400/25 rounded-2xl rotate-[-2.5deg]" />
        <Portrait />
      </Reveal>
    </header>
  );
}
