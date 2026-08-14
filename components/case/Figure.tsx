"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

type Panel = { src: string; alt: string; state?: string; tone?: "bad" | "good" | "soon"; hint: string };

/* Renders a labelled placeholder until the file lands in /public/images/cwv/.
   Same onError fallback as Portrait and AwardImage on the homepage. */
function Panel({ src, alt, state, tone = "soon", hint }: Panel) {
  const [failed, setFailed] = useState(false);
  const stateTone = {
    bad: "text-red-600 dark:text-red-400",
    good: "text-emerald-600 dark:text-emerald-400",
    soon: "text-amber-600 dark:text-amber-400",
  }[tone];

  return (
    <div className="relative aspect-[16/10] bg-stone-100/70 dark:bg-stone-900/60 border-t sm:border-t-0 sm:border-l first:border-t-0 sm:first:border-l-0 border-stone-200 dark:border-stone-800">
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-center p-5">
          {state && (
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.1em] border border-current rounded-full px-2.5 py-0.5 ${stateTone}`}
            >
              {state}
            </span>
          )}
          <span className="font-mono text-[11px] text-stone-500 dark:text-stone-400 break-all">
            {src}
          </span>
          <span className="text-[12px] leading-snug text-stone-400 dark:text-stone-500 max-w-[34ch]">
            {hint}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 760px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default function Figure({
  id,
  caption,
  panels,
}: {
  id: string;
  caption: string;
  panels: Panel[];
}) {
  return (
    <Reveal className="my-10">
      <figure>
        <div
          className={`grid grid-cols-1 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 hover:border-emerald-600/50 dark:hover:border-emerald-400/50 transition-colors ${
            panels.length > 1 ? "sm:grid-cols-2" : ""
          }`}
        >
          {panels.map((p) => (
            <Panel key={p.src} {...p} />
          ))}
        </div>
        <figcaption className="flex flex-wrap gap-x-3 gap-y-1 items-baseline font-mono text-[11.5px] text-stone-400 dark:text-stone-500 mt-3">
          <span className="text-emerald-600 dark:text-emerald-400 shrink-0">{id}</span>
          <span>{caption}</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}
